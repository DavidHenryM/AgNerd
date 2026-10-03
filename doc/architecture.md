# AgNerd Architecture

AgNerd is a Next.js 16 (App Router) farm-management application backed by PostgreSQL via Prisma 7. It manages farms, livestock and pasture, and provides an RTK-capable GNSS guidance screen fed by a companion GNSS reader service and NTRIP correction forwarder.

## 1. System context

```mermaid
flowchart LR
    user(["Farmer / Operator<br/>(browser)"])

    subgraph host["AgNerd host (Linux, e.g. in-cab computer)"]
        app["AgNerd Next.js app<br/>(agnerd.service)"]
        reader["GNSS reader<br/>scripts/gnss-reader.mjs<br/>(agnerd-gnss.service)"]
        fwd["NTRIP forwarder<br/>Node net/tls + serialport"]
        gpsd["gpsd"]
        statusFile[("GNSS status file<br/>/tmp/agnerd-gnss-status.json")]
    end

    receiver["GNSS receiver<br/>(u-blox, USB/serial)"]
    db[("PostgreSQL")]
    brevo["Brevo<br/>transactional email"]
    ga["Geoscience Australia<br/>CORS metadata API"]
    caster["GA NTRIP caster<br/>ntrip.data.gnss.ga.gov.au"]
    cesium["Cesium ion<br/>(globe, terrain, reverse geocode)"]
    vercel["Vercel Analytics"]

    user -- "HTTPS" --> app
    user -- "tiles / terrain" --> cesium
    user -. "analytics" .-> vercel

    receiver -- "NMEA / UBX" --> gpsd
    receiver -- "NMEA / UBX (serial mode)" --> reader
    gpsd -- "JSON TPV/SKY :2947" --> reader
    reader -- "writes every 1s" --> statusFile
    reader -- "POST /api/gnss/position" --> app

    app -- "reads" --> statusFile
    app -- "Prisma (adapter-pg)" --> db
    app -- "sign-in emails" --> brevo
    app -- "CORS site list" --> ga
    app -- "reverse geocode" --> cesium

    fwd -- "GET /api/gnss/cors?closestNtripPath=true" --> app
    caster -- "RTCM corrections" --> fwd
    fwd -- "RTCM (serial or TCP :2101)" --> receiver
```

## 2. Deployment

Installed by [install.sh](../install.sh). The app, GNSS reader, and NTRIP forwarder run under systemd and log to the journal.

```mermaid
flowchart TB
    subgraph etc["/etc/agnerd"]
        appEnv[".env<br/>DATABASE_URL, BETTER_AUTH_SECRET,<br/>BREVO_API_KEY, EMAIL_FROM,<br/>GNSS_INTERNAL_TOKEN, CESIUM_ION_TOKEN,<br/>GA_NTRIP_*"]
        gnssEnv["gnss.env<br/>GNSS_SOURCE, GPSD_HOST/PORT,<br/>GNSS_READ_DEVICE, GNSS_INGEST_URL,<br/>GNSS_INTERNAL_TOKEN, GNSS_STATUS_FILE"]
        ntripEnv["ntrip.env<br/>GA_NTRIP_*, API_BASE_URL"]
    end

    subgraph opt["/opt/agnerd"]
        build["Next.js build<br/>(npm start)"]
        readerScript["scripts/gnss-reader.mjs"]
        ntripScript["scripts/ntrip-forwarder.mjs"]
    end

    subgraph systemd["systemd"]
        svcApp["agnerd.service"]
        svcGnss["agnerd-gnss.service"]
        svcNtrip["agnerd-ntrip.service"]
    end

    gpsdSvc["gpsd (apt)"]
    svcApp -- "EnvironmentFile" --> appEnv
    svcApp -- "ExecStart" --> build
    svcGnss -- "EnvironmentFile" --> gnssEnv
    svcGnss -- "ExecStart node" --> readerScript
    svcNtrip -- "EnvironmentFile" --> ntripEnv
    svcNtrip -- "ExecStart node" --> ntripScript
    readerScript --> gpsdSvc
    ntripScript -- "native TLS or TCP" --> caster
    caster["NTRIP caster"]
```

## 3. Application structure

```mermaid
flowchart TB
    subgraph pages["Pages (app/)"]
        pHome["/home"]
        pFarm["/farm, /farm/[slug]"]
        pPasture["/pasture"]
        pLivestock["/livestock<br/>/livestock/commercial<br/>/livestock/seedstock"]
        pNav["/navigation"]
        pSettings["/settings"]
        pAdmin["/admin"]
        pSignin["/signin, /signin-error"]
    end

    subgraph components["Components (app/components)"]
        cShell["Navbar, TopBar, Footer,<br/>ControlBar, Background"]
        cCards["cards/: FarmCard,<br/>StockPreview, StockingRateCard"]
        cStock["screens/LiveStockCards"]
        cDialogs["dialogues/: CreateNewBeast,<br/>EditLivestock, AddWeight,<br/>Preg, Treatment, Filter, Sort, Confirm"]
        cNav["screens/Navigation (Cesium viewer)<br/>screens/NavigationControls"]
        cAuth["SignInOutButton, UserAvatar"]
    end

    subgraph lib["Library (app/lib)"]
        lQueries["queries.ts<br/>(server actions: reads + livestock writes)"]
        lMutations["mutations.ts<br/>(server actions: user / org / active flag)"]
        lPrisma["prisma.ts<br/>(PrismaClient + PrismaPg)"]
        lAuth["auth.ts<br/>(better-auth server)"]
        lAuthClient["auth-client.ts, session.ts<br/>(better-auth React client)"]
        lBrevo["brevo.ts (sendEmail)"]
        lGeo["hooks/geolocation.ts<br/>(polls /api/gnss/status 1 Hz)"]
    end

    subgraph api["Route handlers (app/api)"]
        aAuth["/api/auth/[...all]"]
        aStatus["/api/gnss/status"]
        aPosition["/api/gnss/position"]
        aCors["/api/gnss/cors"]
    end

    generated["app/generated/prisma<br/>(prisma generate)"]

    pages --> components
    pLivestock --> cStock --> cCards
    cStock --> cDialogs
    pNav --> cNav
    cNav --> lGeo --> aStatus
    cNav --> lQueries
    cDialogs --> lQueries
    cDialogs --> lMutations
    cAuth --> lAuthClient --> aAuth
    pSignin --> lAuthClient
    aAuth --> lAuth --> lBrevo
    lAuth --> lPrisma
    lQueries --> lPrisma
    lMutations --> lPrisma
    aPosition --> lPrisma
    aCors --> lPrisma
    lPrisma --> generated
```

## 4. GNSS position flow

`gnss-reader.mjs` reads from gpsd (default) or directly from the serial port (NMEA RMC + UBX NAV-PVT). Every `GNSS_POST_INTERVAL_MS` (default 1 s) it writes a status file and posts the latest fix to the app.

```mermaid
sequenceDiagram
    autonumber
    participant RX as GNSS receiver
    participant GPSD as gpsd
    participant R as gnss-reader.mjs
    participant F as Status file
    participant API as Next.js API
    participant DB as PostgreSQL
    participant UI as Navigation screen

    RX->>GPSD: NMEA / UBX
    R->>GPSD: ?WATCH={"enable":true,"json":true}
    GPSD-->>R: TPV (lat, lon, track, speed, epx) / SKY (uSat)

    loop every 1 s
        R->>F: atomic write (tmp + rename)<br/>{latest, ubx, lastPostStatus, ...}
        R->>API: POST /api/gnss/position<br/>x-gnss-token
        API->>API: validate token and lat/lon range
        API->>DB: INSERT GeoPoint
    end

    loop every 1 s (useGeolocation)
        UI->>API: GET /api/gnss/status
        API->>F: read candidates<br/>(GNSS_STATUS_FILE, /etc/agnerd/gnss.env, /tmp, /var/tmp)
        API-->>UI: {service.statusFilePresent, latestPosition}
    end

    opt NEXT_PUBLIC_ENABLE_BROWSER_GEO_FALLBACK=true
        UI->>UI: navigator.geolocation.watchPosition (fallback)
    end
```

## 5. NTRIP correction flow

```mermaid
sequenceDiagram
    autonumber
    participant N as ntrip-forwarder.mjs
    participant API as /api/gnss/cors
    participant F as Status file / DB
    participant CES as Cesium reverse geocode
    participant GA as GA CORS metadata API
    participant C as GA NTRIP caster
    participant S as Native Node NTRIP client
    participant RX as GNSS receiver

    N->>API: GET ?closestNtripPath=true
    API->>F: auto-detect position<br/>(status file, then latest GeoPoint)
    API->>CES: reverse geocode lat/lon (cached 5 min)
    CES-->>API: country_code = AU
    API->>GA: GET /api/corsSites (all pages)
    GA-->>API: sites
    API->>API: haversine: nearest site
    API-->>N: result.ntripPath = ntrip://user:pass@host:port/MOUNT
    alt resolve fails and GA_NTRIP_MOUNT set
        N->>N: fall back to static mount
    end
    N->>S: Connect with built-in TCP or TLS
    S->>C: NTRIP GET with Basic authentication
    C-->>S: ICY/HTTP success and binary RTCM3 stream
    S-->>RX: RTCM3 (serialport or TCP listener)
    Note over RX: Fix upgrades to RTK_FLOAT / RTK_FIXED<br/>(reported via UBX flags in gnss-reader)
```

## 6. Authentication flow

Passwordless sign-in via better-auth with the `magicLink` and `emailOTP` plugins. The magic link is cached in memory for 5 minutes and delivered in the same email as the OTP.

```mermaid
sequenceDiagram
    autonumber
    actor U as User
    participant P as /signin page
    participant C as session.ts (authClient)
    participant A as /api/auth/[...all]
    participant BA as better-auth (auth.ts)
    participant DB as PostgreSQL
    participant B as Brevo

    U->>P: enter email
    P->>C: signIn(email)
    C->>A: POST signIn.magicLink
    A->>BA: sendMagicLink
    BA->>BA: cache URL (5 min TTL)
    C->>A: POST emailOtp.sendVerificationOtp (sign-in)
    A->>BA: sendVerificationOTP
    BA->>BA: consume cached magic link
    BA->>B: sendTransacEmail (OTP + link)
    B-->>U: email
    alt click link
        U->>A: GET magic-link verify
    else enter OTP
        U->>P: OTP
        P->>C: signInWithOtp(email, otp)
        C->>A: POST signIn.emailOtp
    end
    A->>DB: create Session
    A-->>U: session cookie, redirect /home
```

## 7. Data model (core entities)

Source: [prisma/schema.prisma](../prisma/schema.prisma). The client is generated to `app/generated/prisma`. `app/prisma/schema.prisma` is a legacy schema and is not used by `prisma.config.ts`.

```mermaid
erDiagram
    Organization ||--o{ Farm : owns
    Organization ||--o{ Member : has
    Organization ||--o{ Invitation : issues
    Organization ||--o{ Ownership : "owns stock"
    User ||--o{ Organization : "contact for"
    User }o--|| Farm : "belongs to"
    User ||--o{ Session : has
    User ||--o{ Account : has
    User ||--o{ Member : is
    User ||--o{ Address : "billing / shipping"
    Organization ||--o{ Address : "billing / shipping"

    Farm |o--o| GeoPoint : "locationCentre"
    Farm }o--o{ Stud : runs
    Farm ||--o{ OnFarm : hosts

    Stud ||--o{ StudSocietyRegistration : registered
    StudSociety ||--o{ StudSocietyRegistration : registers
    Stud }o--o{ LivestockUnit : "born at"

    LivestockUnit ||--o{ OnFarm : "on-farm history"
    LivestockUnit ||--o{ Ownership : "ownership history"
    LivestockUnit |o--o{ LivestockUnit : "sire / dam"
    LivestockUnit }o--o| Mob : "member of"
    LivestockUnit ||--o{ WeightRecord : weighed
    LivestockUnit ||--o{ ChemicalTreatment : treated
    LivestockUnit ||--o{ LivestockUnitPregnancy : ""
    LivestockUnit ||--o{ EstimatedBreedingValueResult : EBVs
    LivestockUnit |o--o| Breed : ""

    Pregnancy ||--o{ LivestockUnitPregnancy : ""
    Pregnancy ||--o{ PregnancyTest : tested

    ChemicalProduct ||--o{ ChemicalTreatment : used
    ChemicalProduct ||--o{ ActiveIngredient : contains
    EstimatedBreedingValueDefinition ||--o{ EstimatedBreedingValueResult : defines

    Mob ||--o{ GrazeMob : ""
    Graze ||--o{ GrazeMob : ""
    Paddock ||--o{ Graze : grazed
    Paddock ||--o{ GeoPoint : polygon
    LivestockUnitPosition |o--o| GeoPoint : location
    LivestockUnitPosition |o--o| Paddock : paddock

    GeoPoint {
        string id
        float latitude
        float longitude
        float heading
    }
    LivestockUnit {
        string id
        string nlisId
        StockClass class
        CommercialClass commercialClass
        Sex sex
        datetime birthDate
        boolean active
    }
```

Standalone tables: `Verification` (better-auth), `LoraDevice` (future LoRaWAN tags).

## 8. Navigation screen

[Navigation.tsx](../app/components/screens/Navigation.tsx) hosts a Cesium viewer, opens framed on Australia, flies to the GPS fix (or the farm's `locationCentre`) and renders a tractor model with a heading-following chase camera. While tracking, it paints coverage strips of the configured implement width/offset and accumulates area.

```mermaid
stateDiagram-v2
    [*] --> Searching
    Searching --> Connected: status file present,<br/>no fix
    Connected --> Active: latestPosition received
    Searching --> Active: latestPosition received
    Active --> Connected: fix lost
    Connected --> Searching: status file missing
    Active --> Searching: status file missing

    state Active {
        [*] --> Idle
        Idle --> Tracking: Start
        Tracking --> Idle: Stop
        Tracking --> Tracking: moved >= 0.5 m<br/>add strip, area += dist x width
        Idle --> Idle: Reset clears strips
    }
```

## 9. Key scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js app |
| `npm run generate` (also `postinstall`) | `prisma generate` to `app/generated/prisma` |
| `npm run copy-cesium` | Copy Cesium static assets to `public/cesium` |
| `npm run gnss:reader` | Run [gnss-reader.mjs](../scripts/gnss-reader.mjs) |
| `npm run gnss:ntrip` | Run [ntrip-forwarder.mjs](../scripts/ntrip-forwarder.mjs) (closest CORS station) |
| `npm run gnss:ntrip:bash` | Compatibility alias for the JavaScript NTRIP forwarder |

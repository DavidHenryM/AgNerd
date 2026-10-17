-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "PregnancyTestResult" AS ENUM ('PREGNANT', 'NOT_PREGNANT', 'INCONCLUSIVE');

-- CreateEnum
CREATE TYPE "PregnancyTestType" AS ENUM ('MANUAL_RECTAL_PALPATATION', 'ULTRASOUND', 'BIOPRYN');

-- CreateEnum
CREATE TYPE "Units" AS ENUM ('KILOGRAMS', 'DAYS', 'PERCENTAGE', 'CENTIMETRES', 'SQUARE_CENTIMETRES', 'MILLIMETRES', 'KILOGRAMS_PER_DAY', 'STRUCTURAL_SCORE', 'DOLLARS_AUSTRALIAN');

-- CreateEnum
CREATE TYPE "Measurement" AS ENUM ('CARCASE_WEIGHT', 'LIVE_WEIGHT', 'CIRCUMFERENCE', 'CALVING_UNASSISTED', 'GESTATION', 'DOCILE_CALVES', 'MUSCLE_AREA', 'FAT_DEPTH', 'SALEABLE_BEEF', 'INTRAMUSCULAR_FAT', 'FEED_CONSUMED', 'CLAW_SET', 'FOOT_ANGLE', 'LEG_ANGLE', 'JOINING_TO_CALVING', 'NET_PROFITABILITY');

-- CreateEnum
CREATE TYPE "EbvCategory" AS ENUM ('CALVING_EASE', 'GROWTH', 'FERTILITY', 'TEMPERAMENT', 'CARCASE', 'FEED_EFFICIENCY', 'STRUCTURAL', 'SELECTION_INDEX');

-- CreateEnum
CREATE TYPE "Ingredient" AS ENUM ('TRICLABENDAZOLE', 'ABAMECTIN');

-- CreateEnum
CREATE TYPE "ChemicalType" AS ENUM ('DRENCH', 'VACCINE', 'SUPPLEMENT', 'ANTIBIOTICS');

-- CreateEnum
CREATE TYPE "ApplicationMethod" AS ENUM ('ORAL', 'TRANSDERMAL', 'SUB_CUT_INJECTION', 'INTRAVENUS_INJECTION');

-- CreateEnum
CREATE TYPE "GateState" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "FeedSourceType" AS ENUM ('MANUAL', 'DERIVED_ESTIMATE');

-- CreateEnum
CREATE TYPE "PaddockWorkType" AS ENUM ('CHEMICAL_TREATMENT', 'LIME', 'SEED_SOWING', 'FERTILISER');

-- CreateEnum
CREATE TYPE "VisualIdColour" AS ENUM ('WHITE', 'ORANGE', 'LIGHT_GREEN', 'PURPLE', 'YELLOW', 'RED', 'SKY_BLUE', 'BLACK');

-- CreateEnum
CREATE TYPE "ChemicalManufacturer" AS ENUM ('BOEHRINGER_INGLEHEIM');

-- CreateEnum
CREATE TYPE "ChemicalProductName" AS ENUM ('AVOMEC_PLUS_POUR_ON');

-- CreateEnum
CREATE TYPE "LoraActivationMethod" AS ENUM ('OTAA', 'ABP');

-- CreateEnum
CREATE TYPE "StockClass" AS ENUM ('CATTLE', 'SHEEP', 'GOAT', 'CAMEL', 'ALPACA', 'LLAMA', 'CHICKEN', 'DUCK', 'TURKEY');

-- CreateEnum
CREATE TYPE "WeighMethod" AS ENUM ('SCALES', 'IMAGE_ANALYSIS', 'VISUAL_ESTIMATE', 'MOB_AVERAGE');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "CommercialClass" AS ENUM ('COMMERCIAL', 'SEEDSTOCK', 'PET');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('ACT', 'NSW', 'QLD', 'VIC', 'SA', 'NT', 'WA', 'TAS');

-- CreateTable
CREATE TABLE "EmbeddedBackup" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "capturedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checksum" TEXT NOT NULL,
    "payload" BYTEA NOT NULL,

    CONSTRAINT "EmbeddedBackup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmbeddedSyncState" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT,
    "pendingId" TEXT,
    "pendingData" BYTEA,
    "checksum" TEXT,
    "capturedAt" TIMESTAMP(3),
    "leaseUntil" TIMESTAMP(3),
    "leaseId" TEXT,
    "lastSyncedAt" TIMESTAMP(3),
    "lastError" TEXT,

    CONSTRAINT "EmbeddedSyncState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "businessName" TEXT,
    "lotSectionPlan" TEXT[],
    "abn" TEXT,
    "acn" TEXT,
    "pic" TEXT,
    "locationCentreId" TEXT,
    "areaHa" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "organizationId" TEXT,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "preferredName" TEXT,
    "lastName" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mobileNumber" TEXT,
    "landlineNumber" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "unit" INTEGER,
    "streetNumber" INTEGER NOT NULL,
    "streetName" TEXT NOT NULL,
    "streetType" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" "State" NOT NULL,
    "country" TEXT NOT NULL,
    "postCode" INTEGER NOT NULL,
    "billingUserid" TEXT,
    "shippingUserid" TEXT,
    "billingOrgid" TEXT,
    "shippingOrgid" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Graze" (
    "id" TEXT NOT NULL,
    "startDatetime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3),
    "paddockId" TEXT NOT NULL,
    "dseDaysPerHectare" DOUBLE PRECISION,

    CONSTRAINT "Graze_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Breed" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "class" "StockClass" NOT NULL,
    "livestockUnitId" TEXT NOT NULL,

    CONSTRAINT "Breed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mob" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "name" TEXT,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Mob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrazeMob" (
    "grazeId" TEXT NOT NULL,
    "mobId" TEXT NOT NULL,

    CONSTRAINT "GrazeMob_pkey" PRIMARY KEY ("grazeId","mobId")
);

-- CreateTable
CREATE TABLE "LivestockUnit" (
    "id" TEXT NOT NULL,
    "nlisId" TEXT,
    "visualIdLine1" TEXT,
    "visualIdLine2" TEXT,
    "visualIdLine3" TEXT,
    "visualIdBackgroundColour" "VisualIdColour",
    "visualIdTextColour" "VisualIdColour",
    "class" "StockClass" NOT NULL,
    "commercialClass" "CommercialClass",
    "name" TEXT,
    "comment" TEXT,
    "sex" "Sex" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "desexed" BOOLEAN NOT NULL,
    "sireId" TEXT,
    "damId" TEXT,
    "mobRef" TEXT,
    "drySheepEquivalent" INTEGER NOT NULL DEFAULT 1,
    "purchasePrice" DOUBLE PRECISION,
    "purchaseDate" TIMESTAMP(3),
    "angusTechId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "LivestockUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnFarm" (
    "id" TEXT NOT NULL,
    "livestockUnitId" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),

    CONSTRAINT "OnFarm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ownership" (
    "id" TEXT NOT NULL,
    "livestockUnitId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "Ownership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stud" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Stud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudSocietyRegistration" (
    "id" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "studRegistrationNumber" TEXT,
    "studRegistrationName" TEXT,
    "studRegistrationPrefix" TEXT,
    "studId" TEXT NOT NULL,

    CONSTRAINT "StudSocietyRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudSociety" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "StudSociety_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pregnancy" (
    "id" TEXT NOT NULL,
    "earliestPossibleConception" TIMESTAMP(3),
    "latestPossibleConception" TIMESTAMP(3),
    "conception" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "earliestPossibleBirth" TIMESTAMP(3),
    "latestPossibleBirth" TIMESTAMP(3),
    "pregnancySireId" TEXT NOT NULL,

    CONSTRAINT "Pregnancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LivestockUnitPregnancy" (
    "livestockUnitId" TEXT NOT NULL,
    "pregnancyId" TEXT NOT NULL,

    CONSTRAINT "LivestockUnitPregnancy_pkey" PRIMARY KEY ("livestockUnitId","pregnancyId")
);

-- CreateTable
CREATE TABLE "PregnancyTest" (
    "id" TEXT NOT NULL,
    "testDate" TIMESTAMP(3) NOT NULL,
    "testType" "PregnancyTestType" NOT NULL,
    "resultDate" TIMESTAMP(3) NOT NULL,
    "result" "PregnancyTestResult" NOT NULL,
    "pregnancyId" TEXT NOT NULL,
    "cost" DOUBLE PRECISION,

    CONSTRAINT "PregnancyTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChemicalTreatment" (
    "id" TEXT NOT NULL,
    "livestockUnitId" TEXT NOT NULL,
    "treatmentDate" TIMESTAMP(3) NOT NULL,
    "applicationMethod" "ApplicationMethod" NOT NULL,
    "chemicalProductId" TEXT NOT NULL,
    "volumeMl" INTEGER NOT NULL,

    CONSTRAINT "ChemicalTreatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChemicalProduct" (
    "id" TEXT NOT NULL,
    "manufacturer" "ChemicalManufacturer" NOT NULL,
    "productName" "ChemicalProductName" NOT NULL,
    "serialNumber" TEXT,
    "batchNumber" TEXT,
    "volumeMl" INTEGER,
    "cost" DOUBLE PRECISION,
    "type" "ChemicalType" NOT NULL,
    "witholdingPeriodDays" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ChemicalProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActiveIngredient" (
    "id" TEXT NOT NULL,
    "ingredient" "Ingredient" NOT NULL,
    "mgPermL" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ActiveIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimatedBreedingValueDefinition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "category" "EbvCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "higherIsBetter" BOOLEAN NOT NULL,
    "units" "Units" NOT NULL,
    "measurement" "Measurement" NOT NULL,
    "angusTechFieldNameValue" TEXT,
    "angusTechFieldNamePercentile" TEXT,
    "angusTechFieldNameAccuracy" TEXT,

    CONSTRAINT "EstimatedBreedingValueDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimatedBreedingValueResult" (
    "id" TEXT NOT NULL,
    "estimatedBreedingValueDefinitionId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "percentile" DOUBLE PRECISION NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "livestockUnitId" TEXT NOT NULL,

    CONSTRAINT "EstimatedBreedingValueResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paddock" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "areaHa" DOUBLE PRECISION NOT NULL,
    "livestockUnitPositionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Paddock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LivestockUnitPosition" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LivestockUnitPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeoPoint" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "heading" DOUBLE PRECISION,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "paddockId" TEXT,
    "livestockUnitPositionId" TEXT,
    "farmBoundaryId" TEXT,

    CONSTRAINT "GeoPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gate" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "fromPaddockId" TEXT NOT NULL,
    "toPaddockId" TEXT NOT NULL,
    "name" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Gate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GateStateChange" (
    "id" TEXT NOT NULL,
    "gateId" TEXT NOT NULL,
    "state" "GateState" NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GateStateChange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobMembership" (
    "id" TEXT NOT NULL,
    "mobId" TEXT NOT NULL,
    "livestockUnitId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MobMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobMovement" (
    "id" TEXT NOT NULL,
    "mobId" TEXT NOT NULL,
    "fromPaddockId" TEXT,
    "toPaddockId" TEXT NOT NULL,
    "movedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MobMovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaddockFeedRecord" (
    "id" TEXT NOT NULL,
    "paddockId" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "feedKgDmPerHa" DOUBLE PRECISION NOT NULL,
    "sourceType" "FeedSourceType" NOT NULL,
    "estimateMethod" TEXT,
    "confidencePct" DOUBLE PRECISION,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaddockFeedRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaddockWorkEvent" (
    "id" TEXT NOT NULL,
    "paddockId" TEXT NOT NULL,
    "workType" "PaddockWorkType" NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "productName" TEXT,
    "rate" DOUBLE PRECISION,
    "rateUnit" TEXT,
    "totalQuantity" DOUBLE PRECISION,
    "totalQuantityUnit" TEXT,
    "cost" DOUBLE PRECISION,
    "operatorName" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PaddockWorkEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeightRecord" (
    "id" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "dateMeasured" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "method" "WeighMethod" NOT NULL DEFAULT 'SCALES',
    "livestockUnitId" TEXT NOT NULL,

    CONSTRAINT "WeightRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoraDevice" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "deviceId" TEXT NOT NULL,
    "deviceEui" TEXT NOT NULL,
    "appEui" TEXT NOT NULL,
    "appKey" TEXT NOT NULL,
    "manufacturer" TEXT,
    "partNumber" TEXT,
    "activationMethod" "LoraActivationMethod" NOT NULL DEFAULT 'OTAA',

    CONSTRAINT "LoraDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "activeOrganizationId" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "metadata" TEXT,
    "contactPersonId" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member',
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inviterId" TEXT NOT NULL,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FarmToStud" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FarmToStud_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LivestockUnitToStud" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LivestockUnitToStud_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "EmbeddedBackup_deviceId_createdAt_idx" ON "EmbeddedBackup"("deviceId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Farm_slug_key" ON "Farm"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Graze_paddockId_key" ON "Graze"("paddockId");

-- CreateIndex
CREATE UNIQUE INDEX "Breed_livestockUnitId_key" ON "Breed"("livestockUnitId");

-- CreateIndex
CREATE UNIQUE INDEX "PregnancyTest_pregnancyId_key" ON "PregnancyTest"("pregnancyId");

-- CreateIndex
CREATE UNIQUE INDEX "Paddock_livestockUnitPositionId_key" ON "Paddock"("livestockUnitPositionId");

-- CreateIndex
CREATE UNIQUE INDEX "GeoPoint_livestockUnitPositionId_key" ON "GeoPoint"("livestockUnitPositionId");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE INDEX "member_organizationId_idx" ON "member"("organizationId");

-- CreateIndex
CREATE INDEX "member_userId_idx" ON "member"("userId");

-- CreateIndex
CREATE INDEX "invitation_organizationId_idx" ON "invitation"("organizationId");

-- CreateIndex
CREATE INDEX "invitation_email_idx" ON "invitation"("email");

-- CreateIndex
CREATE INDEX "_FarmToStud_B_index" ON "_FarmToStud"("B");

-- CreateIndex
CREATE INDEX "_LivestockUnitToStud_B_index" ON "_LivestockUnitToStud"("B");

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_locationCentreId_fkey" FOREIGN KEY ("locationCentreId") REFERENCES "GeoPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_billingUserid_fkey" FOREIGN KEY ("billingUserid") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_shippingUserid_fkey" FOREIGN KEY ("shippingUserid") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_billingOrgid_fkey" FOREIGN KEY ("billingOrgid") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_shippingOrgid_fkey" FOREIGN KEY ("shippingOrgid") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Graze" ADD CONSTRAINT "Graze_paddockId_fkey" FOREIGN KEY ("paddockId") REFERENCES "Paddock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Breed" ADD CONSTRAINT "Breed_livestockUnitId_fkey" FOREIGN KEY ("livestockUnitId") REFERENCES "LivestockUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mob" ADD CONSTRAINT "Mob_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrazeMob" ADD CONSTRAINT "GrazeMob_grazeId_fkey" FOREIGN KEY ("grazeId") REFERENCES "Graze"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrazeMob" ADD CONSTRAINT "GrazeMob_mobId_fkey" FOREIGN KEY ("mobId") REFERENCES "Mob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LivestockUnit" ADD CONSTRAINT "LivestockUnit_sireId_fkey" FOREIGN KEY ("sireId") REFERENCES "LivestockUnit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LivestockUnit" ADD CONSTRAINT "LivestockUnit_damId_fkey" FOREIGN KEY ("damId") REFERENCES "LivestockUnit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LivestockUnit" ADD CONSTRAINT "LivestockUnit_mobRef_fkey" FOREIGN KEY ("mobRef") REFERENCES "Mob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnFarm" ADD CONSTRAINT "OnFarm_livestockUnitId_fkey" FOREIGN KEY ("livestockUnitId") REFERENCES "LivestockUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnFarm" ADD CONSTRAINT "OnFarm_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ownership" ADD CONSTRAINT "Ownership_livestockUnitId_fkey" FOREIGN KEY ("livestockUnitId") REFERENCES "LivestockUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ownership" ADD CONSTRAINT "Ownership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudSocietyRegistration" ADD CONSTRAINT "StudSocietyRegistration_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "StudSociety"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudSocietyRegistration" ADD CONSTRAINT "StudSocietyRegistration_studId_fkey" FOREIGN KEY ("studId") REFERENCES "Stud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LivestockUnitPregnancy" ADD CONSTRAINT "LivestockUnitPregnancy_livestockUnitId_fkey" FOREIGN KEY ("livestockUnitId") REFERENCES "LivestockUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LivestockUnitPregnancy" ADD CONSTRAINT "LivestockUnitPregnancy_pregnancyId_fkey" FOREIGN KEY ("pregnancyId") REFERENCES "Pregnancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PregnancyTest" ADD CONSTRAINT "PregnancyTest_pregnancyId_fkey" FOREIGN KEY ("pregnancyId") REFERENCES "Pregnancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChemicalTreatment" ADD CONSTRAINT "ChemicalTreatment_livestockUnitId_fkey" FOREIGN KEY ("livestockUnitId") REFERENCES "LivestockUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChemicalTreatment" ADD CONSTRAINT "ChemicalTreatment_chemicalProductId_fkey" FOREIGN KEY ("chemicalProductId") REFERENCES "ChemicalProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveIngredient" ADD CONSTRAINT "ActiveIngredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ChemicalProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimatedBreedingValueResult" ADD CONSTRAINT "EstimatedBreedingValueResult_estimatedBreedingValueDefinit_fkey" FOREIGN KEY ("estimatedBreedingValueDefinitionId") REFERENCES "EstimatedBreedingValueDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimatedBreedingValueResult" ADD CONSTRAINT "EstimatedBreedingValueResult_livestockUnitId_fkey" FOREIGN KEY ("livestockUnitId") REFERENCES "LivestockUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paddock" ADD CONSTRAINT "Paddock_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paddock" ADD CONSTRAINT "Paddock_livestockUnitPositionId_fkey" FOREIGN KEY ("livestockUnitPositionId") REFERENCES "LivestockUnitPosition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeoPoint" ADD CONSTRAINT "GeoPoint_paddockId_fkey" FOREIGN KEY ("paddockId") REFERENCES "Paddock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeoPoint" ADD CONSTRAINT "GeoPoint_livestockUnitPositionId_fkey" FOREIGN KEY ("livestockUnitPositionId") REFERENCES "LivestockUnitPosition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeoPoint" ADD CONSTRAINT "GeoPoint_farmBoundaryId_fkey" FOREIGN KEY ("farmBoundaryId") REFERENCES "Farm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gate" ADD CONSTRAINT "Gate_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gate" ADD CONSTRAINT "Gate_fromPaddockId_fkey" FOREIGN KEY ("fromPaddockId") REFERENCES "Paddock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gate" ADD CONSTRAINT "Gate_toPaddockId_fkey" FOREIGN KEY ("toPaddockId") REFERENCES "Paddock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GateStateChange" ADD CONSTRAINT "GateStateChange_gateId_fkey" FOREIGN KEY ("gateId") REFERENCES "Gate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobMembership" ADD CONSTRAINT "MobMembership_mobId_fkey" FOREIGN KEY ("mobId") REFERENCES "Mob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobMembership" ADD CONSTRAINT "MobMembership_livestockUnitId_fkey" FOREIGN KEY ("livestockUnitId") REFERENCES "LivestockUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobMovement" ADD CONSTRAINT "MobMovement_mobId_fkey" FOREIGN KEY ("mobId") REFERENCES "Mob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobMovement" ADD CONSTRAINT "MobMovement_fromPaddockId_fkey" FOREIGN KEY ("fromPaddockId") REFERENCES "Paddock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobMovement" ADD CONSTRAINT "MobMovement_toPaddockId_fkey" FOREIGN KEY ("toPaddockId") REFERENCES "Paddock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaddockFeedRecord" ADD CONSTRAINT "PaddockFeedRecord_paddockId_fkey" FOREIGN KEY ("paddockId") REFERENCES "Paddock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaddockWorkEvent" ADD CONSTRAINT "PaddockWorkEvent_paddockId_fkey" FOREIGN KEY ("paddockId") REFERENCES "Paddock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "SprayTrack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalAreaSqMeters" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "widthMeters" DOUBLE PRECISION NOT NULL,
    "offsetMeters" DOUBLE PRECISION NOT NULL,
    "forwardOffsetMeters" DOUBLE PRECISION NOT NULL,
    "revision" INTEGER NOT NULL DEFAULT 0,
    "lastSaveId" TEXT,
    "lastSaveHash" TEXT
);

CREATE INDEX "SprayTrack_userId_startedAt_id_idx" ON "SprayTrack"("userId", "startedAt", "id");

CREATE TABLE "SprayTrackStrip" (
    "trackId" TEXT NOT NULL REFERENCES "SprayTrack"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "sequence" INTEGER NOT NULL,
    "coordinates" DOUBLE PRECISION[],
    "areaSqMeters" DOUBLE PRECISION NOT NULL,
    PRIMARY KEY ("trackId", "sequence")
);

-- AddForeignKey
ALTER TABLE "WeightRecord" ADD CONSTRAINT "WeightRecord_livestockUnitId_fkey" FOREIGN KEY ("livestockUnitId") REFERENCES "LivestockUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_contactPersonId_fkey" FOREIGN KEY ("contactPersonId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FarmToStud" ADD CONSTRAINT "_FarmToStud_A_fkey" FOREIGN KEY ("A") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FarmToStud" ADD CONSTRAINT "_FarmToStud_B_fkey" FOREIGN KEY ("B") REFERENCES "Stud"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LivestockUnitToStud" ADD CONSTRAINT "_LivestockUnitToStud_A_fkey" FOREIGN KEY ("A") REFERENCES "LivestockUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LivestockUnitToStud" ADD CONSTRAINT "_LivestockUnitToStud_B_fkey" FOREIGN KEY ("B") REFERENCES "Stud"("id") ON DELETE CASCADE ON UPDATE CASCADE;

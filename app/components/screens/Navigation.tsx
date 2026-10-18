"use client";
import {
  Cartesian2,
  Cartesian3,
  Viewer as CesiumViewer,
  Color,
  HeadingPitchRange,
  Math as CesiumMath,
  ScreenSpaceEventType,
  Entity,
  ConstantPositionProperty,
  HeightReference,
  ColorMaterialProperty,
  Rectangle,
  ImageryLayer,
  UrlTemplateImageryProvider,
  GeographicTilingScheme,
  ConstantProperty,
  Cartographic,
  ParticleSystem,
  ClockStep,
  ColorBlendMode,
  PropertyBag,
} from "cesium";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Box } from "@mui/material";
import NavigationMapInfo from "./NavigationMapInfo";
import { parseMapManifest, type MapManifest } from "@lib/map-manifest";
import { getUsersFarm } from "@lib/queries";
import useGeolocation from "@lib/hooks/geolocation";
import { fetchNavigationApi } from "@lib/navigation-auth";
import { sprayBoom, SprayTrail } from "@lib/spray-boom";
import { navigationHeading } from "@lib/navigation-heading";
import { TRACTOR_WORLD_SCALE, tractorOrientation } from "@lib/tractor-model";
import { BOOM_CLEARANCE_METERS, boomNodeTransformations, boomWorldEndpoints } from "@lib/boom-model";
import { BoomSprayEmitter, createSprayParticles, createSprayTexture, sprayEmissionRate, SPRAY_PARTICLES_ENABLED } from "@lib/spray-particles";
import NavigationControls, {
  MODEL_COLORS,
} from "@components/screens/NavigationControls";
import { useSprayTracks } from "@lib/hooks/spray-tracks";
import { navigationZoomIn, navigationZoomOut } from "@lib/navigation-zoom";
import { SprayCoverage, SPRAY_SURFACE_HEIGHT_METERS } from "@lib/spray-coverage";
import { navigationMapScale, SCALE_KEY_MAX_PIXELS, type NavigationMapScale } from "@lib/navigation-scale";

// ── Geo helpers ─────────────────────────────────────────────────────
const MIN_CAMERA_CLEARANCE_METERS = 2;
const AUSTRALIA_RECTANGLE = Rectangle.fromDegrees(112, -44, 154, -10);

// ── Component ───────────────────────────────────────────────────────
interface GpsPoint {
  lat: number;
  lon: number;
}

export default function NavigationScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<CesiumViewer | null>(null);
  const modelEntityRef = useRef<Entity | null>(null);
  const boomEntityRef = useRef<Entity | null>(null);
  const sprayParticlesRef = useRef<ParticleSystem | null>(null);
  const sprayEmitterRef = useRef<BoomSprayEmitter | null>(null);
  const sprayTextureRef = useRef<HTMLCanvasElement | null>(null);
  const sprayTrailRef = useRef(new SprayTrail());
  const boomPositionRef = useRef<GpsPoint | null>(null);
  const boomHeadingRef = useRef(0);
  const boomSettingsRef = useRef({ width: 6, offset: 0, forwardOffset: -1.5 });
  const initialFlyDone = useRef(false);
  const [mapConfig, setMapConfig] = useState<MapManifest | null>();
  const [mapError, setMapError] = useState<string | null>(null);
  const [viewerReady, setViewerReady] = useState(false);
  const [mapSource, setMapSource] = useState<"local" | "online">("local");
  const mapScaleRef = useRef<HTMLDivElement>(null);
  const [{ mapScaleMeters, mapScalePixels }, setMapScale] = useState<NavigationMapScale>({
    mapScaleMeters: null, mapScalePixels: SCALE_KEY_MAX_PIXELS,
  });

  useEffect(() => {
    const controller = new AbortController();
    async function loadMapConfig() {
      try {
        const response = await fetchNavigationApi("/api/maps/manifest", {
          cache: "no-store",
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(5000)]),
        });
        if (!response.ok) throw new Error(`Map configuration request failed: HTTP ${response.status}`);
        const payload: unknown = await response.json();
        if (!payload || typeof payload !== "object" || !("enabled" in payload)) {
          throw new Error("Invalid map configuration response");
        }
        if (payload.enabled === false) setMapConfig(null);
        else if (payload.enabled === true && "manifest" in payload) setMapConfig(parseMapManifest(payload.manifest));
        else throw new Error("Invalid map configuration response");
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Navigation map configuration failed:", error);
          setMapError(error instanceof Error ? error.message : String(error));
        }
      }
    }
    void loadMapConfig();
    return () => controller.abort();
  }, []);

  // GPS from hook
  const {
    latitude,
    longitude,
    locationTimestamp,
    heading,
    speed,
    accuracy,
    fixType,
    satellites,
    fixStatusStale,
    positionSource,
    displayPredictor,
    fusionStatus,
    gnssDebug,
  } = useGeolocation();

  // Tracking state
  const [sprayingEnabled, setSprayingEnabled] = useState(false);
  const { session: trackSession, state: trackState } = useSprayTracks(setSprayingEnabled);
  const isSpraying = sprayingEnabled && !trackState.busy && !trackState.error;
  const [historyError, setHistoryError] = useState<string | null>(null);
  const historyRequestRef = useRef(false);
  const lastRecordedTimestampRef = useRef<number | null>(null);
  const [widthMeters, setWidthMeters] = useState(6);
  const [offsetMeters, setOffsetMeters] = useState(0);
  const [forwardOffsetMeters, setForwardOffsetMeters] = useState(-1.5);
  const totalAreaSqMeters = trackState.totalAreaSqMeters;
  const [cameraRangeMeters, setCameraRangeMeters] = useState(100);
  const [selectedColor] = useState(MODEL_COLORS[0].hex);
  const coverageRef = useRef<SprayCoverage | null>(null);

  useEffect(() => {
    trackSession.setSettings({ widthMeters, offsetMeters, forwardOffsetMeters });
  }, [trackSession, widthMeters, offsetMeters, forwardOffsetMeters]);

  useEffect(() => trackSession.subscribe(() => {
    if (trackSession.getSnapshot().error) setSprayingEnabled(false);
  }), [trackSession]);

  const paintStrip = useCallback((coordinates: number[]) => {
    coverageRef.current?.append(coordinates);
  }, []);

  useEffect(() => {
    if (!isSpraying || latitude === null || longitude === null || locationTimestamp === null ||
      fixStatusStale || fixType === "NO_FIX" || historyRequestRef.current ||
      lastRecordedTimestampRef.current === locationTimestamp) return;
    const timestamp = locationTimestamp;
    historyRequestRef.current = true;
    void (async () => {
      try {
        const response = await fetchNavigationApi("/api/gnss/position", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(5000),
          body: JSON.stringify({
            spraying: true,
            latitude, longitude, heading, timestamp: new Date(timestamp).toISOString(),
            fixType, satellites, horizontalAccuracyMeters: accuracy, speedKnots: speed,
          }),
        });
        if (!response.ok) throw new Error(`Spray history request failed: HTTP ${response.status}. Check database availability and account limits.`);
        const result: unknown = await response.json();
        if (!result || typeof result !== "object" || !("recorded" in result) || result.recorded !== true) {
          throw new Error("Spray history was not recorded.");
        }
        lastRecordedTimestampRef.current = timestamp;
        setHistoryError(null);
      } catch (error) {
        console.error("Spray history recording failed:", error);
        setHistoryError(error instanceof Error ? error.message : String(error));
      } finally {
        historyRequestRef.current = false;
      }
    })();
  }, [isSpraying, latitude, longitude, locationTimestamp, heading, fixStatusStale, fixType, satellites, accuracy, speed]);

  // Fetch farm location for initial camera position
  const userId = "current";
  const [farmLat, setFarmLat] = useState<number | null>(null);
  const [farmLon, setFarmLon] = useState<number | null>(null);

  useEffect(() => {
    void getUsersFarm(userId)
      .then((farm) => {
        if (farm?.locationCentre) {
          setFarmLat(farm.locationCentre.latitude);
          setFarmLon(farm.locationCentre.longitude);
        }
      })
      .catch((error: unknown) => {
        console.error("Failed to load farm location:", error);
      });
  }, [userId]);

  // ── Create Cesium viewer ──────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el || viewerRef.current || mapConfig === undefined) return;

    const viewer = new CesiumViewer(el, {
      homeButton: false,
      animation: false,
      timeline: false,
      shouldAnimate: true,
      sceneModePicker: false,
      baseLayerPicker: false,
      geocoder: false,
      navigationHelpButton: false,
      fullscreenButton: true,
      infoBox: false,
      selectionIndicator: false,
      ...(mapConfig ? { baseLayer: false as const } : {}),
    });
    const sprayTrail = sprayTrailRef.current;
    viewerRef.current = viewer;
    const coverage = new SprayCoverage();
    coverageRef.current = coverage;
    viewer.scene.primitives.add(coverage.primitives);
    const removeCoverageListener = viewer.scene.preRender.addEventListener(() => coverage.update());
    // Live GNSS and particle time must not wait for asynchronous ground geometry.
    viewer.allowDataSourcesToSuspendAnimation = false;
    viewer.clock.clockStep = ClockStep.SYSTEM_CLOCK;
    viewer.camera.setView({ destination: mapConfig ? Rectangle.fromDegrees(...mapConfig.bounds) : AUSTRALIA_RECTANGLE });
    setViewerReady(true);

    // Avoid double-zoom handling: we handle wheel zoom ourselves via state.
    viewer.scene.screenSpaceCameraController.enableZoom = false;
    viewer.scene.screenSpaceCameraController.enableCollisionDetection = true;
    viewer.scene.screenSpaceCameraController.minimumZoomDistance =
      MIN_CAMERA_CLEARANCE_METERS;

    // Safety clamp: if camera ever goes below terrain, snap it just above ground.
    const removeClampCameraListener = viewer.scene.postRender.addEventListener(() => {
      const carto = viewer.camera.positionCartographic;
      const terrainHeight = viewer.scene.globe.getHeight(carto) ?? 0;
      const minHeight = terrainHeight + MIN_CAMERA_CLEARANCE_METERS;

      if (carto.height < minHeight) {
        viewer.camera.setView({
          destination: Cartesian3.fromRadians(
            carto.longitude,
            carto.latitude,
            minHeight
          ),
          orientation: {
            heading: viewer.camera.heading,
            pitch: viewer.camera.pitch,
            roll: viewer.camera.roll,
          },
        });
      }
    });
    let lastScaleUpdate = -Infinity;
    const removeScaleListener = viewer.scene.postRender.addEventListener(() => {
      const now = performance.now();
      if (now - lastScaleUpdate < 200) return;
      lastScaleUpdate = now;
      const bar = mapScaleRef.current?.getBoundingClientRect();
      const canvas = viewer.canvas.getBoundingClientRect();
      const next = bar && bar.width > 0 && bar.height > 0
        ? navigationMapScale(viewer.scene, new Cartesian2(
          bar.right - canvas.left, bar.top + bar.height / 2 - canvas.top,
        ))
        : { mapScaleMeters: null, mapScalePixels: SCALE_KEY_MAX_PIXELS };
      setMapScale(previous => previous.mapScaleMeters === next.mapScaleMeters &&
        Math.abs(previous.mapScalePixels - next.mapScalePixels) < 0.1 ? previous : next);
    });

    // Keep app zoom state in sync when user zooms with the mouse wheel.
    viewer.screenSpaceEventHandler.setInputAction(
      (delta: number) => {
        if (!Number.isFinite(delta) || delta === 0) return;
        setCameraRangeMeters((r) => {
          const next = delta > 0 ? r * 1.15 : r * 0.87;
          return Math.max(20, Math.min(10_000, next));
        });
      },
      ScreenSpaceEventType.WHEEL
    );

    const observer = new ResizeObserver(() => viewer.resize());
    observer.observe(el);

    return () => {
      observer.disconnect();
      viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.WHEEL);
      removeClampCameraListener();
      removeCoverageListener();
      removeScaleListener();
      if (!viewer.isDestroyed()) viewer.destroy();
      viewerRef.current = null;
      modelEntityRef.current = null;
      boomEntityRef.current = null;
      sprayParticlesRef.current = null;
      sprayTrail.reset();
      boomPositionRef.current = null;
      coverageRef.current = null;
      initialFlyDone.current = false;
    };
  }, [mapConfig]);

  // Change only imagery layers so camera, tractor and painted coverage survive.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !viewerReady || !mapConfig) return;
    const removers: (() => void)[] = [];
    const reportImageryError = (error: unknown) => {
      console.error(`Navigation ${mapSource} imagery failed:`, error);
      setMapError(mapSource === "local"
        ? "Local imagery could not be loaded. Check tile coverage or local storage."
        : "Online imagery could not be loaded. Check the internet connection or select Local maps.");
    };
    const layers = mapSource === "local" ? [
      new ImageryLayer(new UrlTemplateImageryProvider({
        url: "/cesium/Assets/Textures/NaturalEarthII/{z}/{x}/{reverseY}.jpg",
        tilingScheme: new GeographicTilingScheme(),
        maximumLevel: 2,
        credit: "Natural Earth II (low-resolution background)",
      })),
      new ImageryLayer(new UrlTemplateImageryProvider({
        url: `/api/maps/${mapConfig.id}/{z}/{x}/{y}`,
        rectangle: Rectangle.fromDegrees(...mapConfig.bounds),
        minimumLevel: mapConfig.minZoom,
        maximumLevel: mapConfig.maxZoom,
        credit: mapConfig.attribution,
      })),
    ] : [ImageryLayer.fromWorldImagery({})];
    for (const layer of layers) {
      removers.push(layer.errorEvent.addEventListener(reportImageryError));
      if (layer.ready) {
        removers.push(layer.imageryProvider.errorEvent.addEventListener(reportImageryError));
      } else {
        removers.push(layer.readyEvent.addEventListener(provider => {
          removers.push(provider.errorEvent.addEventListener(reportImageryError));
        }));
      }
      viewer.imageryLayers.add(layer);
    }
    return () => {
      removers.forEach(remove => remove());
      if (!viewer.isDestroyed()) layers.forEach(layer => viewer.imageryLayers.remove(layer, true));
    };
  }, [mapConfig, mapSource, viewerReady]);

  const handleMapSourceChange = useCallback((source: "local" | "online") => {
    if (source !== mapSource) {
      setMapError(null);
      setMapSource(source);
    }
  }, [mapSource]);

  // ── Initial camera fly to farm ────────────────────────────────────
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || initialFlyDone.current) return;
    const lat = latitude ?? farmLat;
    const lon = longitude ?? farmLon;
    if (lat === null || lon === null) return;
    initialFlyDone.current = true;
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(lon, lat, 500),
    });
  }, [latitude, longitude, farmLat, farmLon, viewerReady]);

  useEffect(() => {
    if (latitude === null || longitude === null || fixStatusStale || fixType === "NO_FIX") {
      boomPositionRef.current = null;
      return;
    }
    const current = { lat: latitude, lon: longitude };
    const previous = boomPositionRef.current;
    const speedMps = speed === null ? null : positionSource === "gnss-status" ? speed * 0.514444 : speed;
    boomHeadingRef.current = navigationHeading(boomHeadingRef.current, previous, current, heading, speedMps);
    boomPositionRef.current = current;
  }, [latitude, longitude, heading, speed, positionSource, fixStatusStale, fixType]);

  // Create the tractor here; the frame listener owns all live pose/camera updates.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || latitude === null || longitude === null) return;

    const position = Cartesian3.fromDegrees(longitude, latitude, 0);

    if (!modelEntityRef.current) {
      const entity = viewer.entities.add({
        position,
        orientation: tractorOrientation(position, boomHeadingRef.current),
        model: {
          uri: "/models/Tractor.glb",
          // World-space sizing: stays constant relative to terrain regardless of zoom.
          scale: TRACTOR_WORLD_SCALE,
          heightReference: HeightReference.CLAMP_TO_GROUND,
        },
      });
      modelEntityRef.current = entity;
    }
  }, [latitude, longitude, viewerReady]);

  // The displayed boom and spray polygons share exactly the same endpoints.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    if (latitude === null || longitude === null || fixStatusStale || fixType === "NO_FIX") {
      if (boomEntityRef.current) boomEntityRef.current.show = false;
      if (sprayParticlesRef.current) {
        viewer.scene.primitives.remove(sprayParticlesRef.current);
        sprayParticlesRef.current = null;
      }
      sprayTrailRef.current.reset();
      boomPositionRef.current = null;
      return;
    }

    const cur: GpsPoint = { lat: latitude, lon: longitude };
    const boom = sprayBoom(cur, boomHeadingRef.current, widthMeters, offsetMeters, forwardOffsetMeters);
    const settings = boomSettingsRef.current;
    if (settings.width !== widthMeters || settings.offset !== offsetMeters ||
      settings.forwardOffset !== forwardOffsetMeters) {
      // Configuration edits move the preview, not a spraying vehicle.
      sprayTrailRef.current.reset();
      boomSettingsRef.current = { width: widthMeters, offset: offsetMeters, forwardOffset: forwardOffsetMeters };
    }
    const boomPositions = [
      Cartesian3.fromDegrees(boom.left.lon, boom.left.lat, SPRAY_SURFACE_HEIGHT_METERS),
      Cartesian3.fromDegrees(boom.right.lon, boom.right.lat, SPRAY_SURFACE_HEIGHT_METERS),
    ];
    const color = Color.fromCssColorString(selectedColor).withAlpha(isSpraying ? 1 : 0.65);
    const centre = Cartographic.fromCartesian(Cartesian3.midpoint(boomPositions[0], boomPositions[1], new Cartesian3()));
    const modelPosition = Cartesian3.fromRadians(centre.longitude, centre.latitude, BOOM_CLEARANCE_METERS);
    const orientation = tractorOrientation(modelPosition, boomHeadingRef.current);
    const nodeTransformations = boomNodeTransformations(widthMeters);
    const modelColor = Color.WHITE.withAlpha(isSpraying ? 1 : 0.65);
    if (!boomEntityRef.current) {
      boomEntityRef.current = viewer.entities.add({
        name: "Spray boom",
        position: modelPosition,
        orientation,
        model: {
          uri: "/models/Boom.glb",
          heightReference: HeightReference.RELATIVE_TO_GROUND,
          nodeTransformations,
          color: modelColor,
          colorBlendMode: ColorBlendMode.MIX,
          colorBlendAmount: 0,
        },
        polyline: { positions: boomPositions, width: 2, clampToGround: false, material: color },
      });
    } else {
      boomEntityRef.current.show = true;
      (boomEntityRef.current.position as ConstantPositionProperty).setValue(modelPosition);
      boomEntityRef.current.orientation = new ConstantProperty(orientation);
      if (boomEntityRef.current.model) {
        boomEntityRef.current.model.nodeTransformations = new PropertyBag(nodeTransformations);
        boomEntityRef.current.model.color = new ConstantProperty(modelColor);
      }
      if (boomEntityRef.current.polyline) {
        boomEntityRef.current.polyline.positions = new ConstantProperty(boomPositions);
        boomEntityRef.current.polyline.material = new ColorMaterialProperty(color);
      }
    }
    if (!isSpraying) {
      if (sprayParticlesRef.current) {
        viewer.scene.primitives.remove(sprayParticlesRef.current);
        sprayParticlesRef.current = null;
      }
      sprayTrailRef.current.reset();
      return;
    }
    if (SPRAY_PARTICLES_ENABLED) {
      const groundHeight = viewer.scene.globe.getHeight(centre) ?? 0;
      const particleEndpoints = boomWorldEndpoints(
        Cartesian3.fromRadians(centre.longitude, centre.latitude, groundHeight + BOOM_CLEARANCE_METERS),
        boomHeadingRef.current, widthMeters,
      );
      const emitter = sprayEmitterRef.current ??= new BoomSprayEmitter();
      emitter.setEndpoints(particleEndpoints[0], particleEndpoints[1]);
      if (!sprayParticlesRef.current) {
        sprayTextureRef.current ??= createSprayTexture();
        const system = createSprayParticles(emitter, sprayTextureRef.current, widthMeters);
        viewer.scene.primitives.add(system);
        sprayParticlesRef.current = system;
      } else {
        sprayParticlesRef.current.emissionRate = sprayEmissionRate(widthMeters);
      }
    }
    const strip = sprayTrailRef.current.update(cur, boom);
    if (strip) {
      trackSession.append(strip.coordinates, strip.distance * widthMeters);
      paintStrip(strip.coordinates);
    }
  }, [latitude, longitude, heading, speed, positionSource, fixStatusStale, fixType, isSpraying, widthMeters, offsetMeters, forwardOffsetMeters, selectedColor, viewerReady, trackSession, paintStrip]);

  // Display-only pose: the 20 Hz fused/predicted pose moves the models and camera every frame.
  // Coverage, tracks, history and the boom paint line stay on raw GNSS fixes.
  const liveDisplayRef = useRef({ latitude, longitude, rawValid: false, cameraRangeMeters, widthMeters, offsetMeters, forwardOffsetMeters, isSpraying });
  useEffect(() => {
    liveDisplayRef.current = {
      latitude, longitude, rawValid: latitude !== null && longitude !== null && !fixStatusStale && fixType !== "NO_FIX",
      cameraRangeMeters, widthMeters, offsetMeters, forwardOffsetMeters, isSpraying,
    };
  });
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !viewerReady) return;
    return viewer.scene.preRender.addEventListener(() => {
      const live = liveDisplayRef.current;
      const tractor = modelEntityRef.current;
      if (!live.rawValid || live.latitude === null || live.longitude === null || !tractor) return;
      const pose = displayPredictor.pose(performance.now()) ?? {
        latitude: live.latitude, longitude: live.longitude, headingDeg: null,
      };
      const headingRad = pose.headingDeg === null ? boomHeadingRef.current : CesiumMath.toRadians(pose.headingDeg);
      const position = Cartesian3.fromDegrees(pose.longitude, pose.latitude, 0);
      (tractor.position as ConstantPositionProperty).setValue(position);
      (tractor.orientation as ConstantProperty).setValue(tractorOrientation(position, headingRad));
      viewer.camera.lookAt(position, new HeadingPitchRange(headingRad, CesiumMath.toRadians(-35), live.cameraRangeMeters));

      const boomEntity = boomEntityRef.current;
      if (!boomEntity?.show) return;
      const boom = sprayBoom({ lat: pose.latitude, lon: pose.longitude }, headingRad, live.widthMeters, live.offsetMeters, live.forwardOffsetMeters);
      const ends = Cartesian3.fromDegreesArray([boom.left.lon, boom.left.lat, boom.right.lon, boom.right.lat]);
      const centre = Cartographic.fromCartesian(Cartesian3.midpoint(ends[0], ends[1], new Cartesian3()));
      const modelPosition = Cartesian3.fromRadians(centre.longitude, centre.latitude, BOOM_CLEARANCE_METERS);
      (boomEntity.position as ConstantPositionProperty).setValue(modelPosition);
      (boomEntity.orientation as ConstantProperty).setValue(tractorOrientation(modelPosition, headingRad));
      const emitter = sprayEmitterRef.current;
      if (SPRAY_PARTICLES_ENABLED && live.isSpraying && emitter && sprayParticlesRef.current) {
        const groundHeight = viewer.scene.globe.getHeight(centre) ?? 0;
        const particleEndpoints = boomWorldEndpoints(
          Cartesian3.fromRadians(centre.longitude, centre.latitude, groundHeight + BOOM_CLEARANCE_METERS),
          headingRad, live.widthMeters,
        );
        emitter.setEndpoints(particleEndpoints[0], particleEndpoints[1]);
      }
    });
  }, [viewerReady, displayPredictor]);

  // Break coverage across stopped or paused travel, without clearing existing paint.
  useEffect(() => {
    if (!isSpraying) sprayTrailRef.current.reset();
  }, [isSpraying]);

  const handlePause = useCallback(() => {
    setSprayingEnabled(false);
    sprayTrailRef.current.reset();
    void trackSession.flush();
  }, [trackSession]);

  const handleSprayingToggle = useCallback(async () => {
    if (isSpraying) handlePause();
    else if (await trackSession.start()) {
      sprayTrailRef.current.reset();
      setSprayingEnabled(true);
    }
  }, [isSpraying, handlePause, trackSession]);

  const clearCoverage = useCallback(() => {
    const viewer = viewerRef.current;
    if (viewer) {
      if (sprayParticlesRef.current) {
        viewer.scene.primitives.remove(sprayParticlesRef.current);
        sprayParticlesRef.current = null;
      }
    }
    coverageRef.current?.clear();
    sprayTrailRef.current.reset();
  }, []);

  const handleNewTrack = useCallback(async () => {
    handlePause();
    if (await trackSession.newTrack()) { clearCoverage(); return true; }
    return false;
  }, [handlePause, trackSession, clearCoverage]);

  const handleResumeTrack = useCallback(async (id: string, discard = false) => {
    handlePause();
    if (!await trackSession.resume(id, discard)) return false;
    clearCoverage();
    for (const strip of trackSession.strips) paintStrip(strip.coordinates);
    const track = trackSession.getSnapshot().track;
    if (track) {
      setWidthMeters(track.widthMeters);
      setOffsetMeters(track.offsetMeters);
      setForwardOffsetMeters(track.forwardOffsetMeters);
    }
    return true;
  }, [handlePause, trackSession, clearCoverage, paintStrip]);

  const handleDeleteTrack = useCallback(async () => {
    handlePause();
    if (await trackSession.deleteCurrent()) { clearCoverage(); return true; }
    return false;
  }, [handlePause, trackSession, clearCoverage]);

  const handleZoomIn = useCallback(() => {
    setCameraRangeMeters(navigationZoomIn);
  }, []);

  const handleZoomOut = useCallback(() => {
    setCameraRangeMeters(navigationZoomOut);
  }, []);

  return (
    <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      <Box
        ref={containerRef}
        sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <Box sx={{ position: "absolute", top: 12, left: 12, maxWidth: "min(360px, 45vw)", zIndex: 1200 }}>
        {mapConfig && <NavigationMapInfo manifest={mapConfig} source={mapSource} />}
        {mapError && <Alert severity="error" sx={{ mt: 1 }}>{mapError}</Alert>}
        {historyError && <Alert severity="error" sx={{ mt: 1 }}>Spray history not saved: {historyError}</Alert>}
      </Box>
      <NavigationControls
        latitude={latitude}
        longitude={longitude}
        locationTimestamp={locationTimestamp}
        accuracy={accuracy}
        fixType={fixType}
        satellites={satellites}
        fixStatusStale={fixStatusStale}
        browserLocation={positionSource === "browser"}
        speed={speed}
        fusionStatus={fusionStatus}
        gpsConnected={gnssDebug.statusFilePresent === true}
        isSpraying={isSpraying}
        onSprayingToggle={() => { void handleSprayingToggle(); }}
        trackState={{ ...trackState, busy: trackState.busy || !viewerReady }}
        onPause={handlePause}
        onNewTrack={handleNewTrack}
        onResumeTrack={handleResumeTrack}
        onDeleteTrack={handleDeleteTrack}
        onRetrySave={() => { void trackSession.flush(); }}
        widthMeters={widthMeters}
        setWidthMeters={setWidthMeters}
        offsetMeters={offsetMeters}
        setOffsetMeters={setOffsetMeters}
        forwardOffsetMeters={forwardOffsetMeters}
        setForwardOffsetMeters={setForwardOffsetMeters}
        totalAreaSqMeters={totalAreaSqMeters}
        selectedColor={selectedColor}
        mapScaleMeters={mapScaleMeters}
        mapScalePixels={mapScalePixels}
        mapScaleRef={mapScaleRef}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        mapSource={mapConfig ? mapSource : undefined}
        onMapSourceChange={mapConfig ? handleMapSourceChange : undefined}
      />
    </Box>
  );
}

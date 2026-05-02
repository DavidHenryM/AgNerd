"use client";
import {
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
  ClassificationType,
} from "cesium";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/material";
import { getUsersFarm } from "@lib/queries";
import useGeolocation from "@lib/hooks/geolocation";
import NavigationControls, {
  MODEL_COLORS,
} from "@components/screens/NavigationControls";

// ── Geo helpers ─────────────────────────────────────────────────────
const EARTH_RADIUS = 6_371_000; // metres
const TRACTOR_TARGET_WIDTH_METERS = 2;
// Update this if the source GLB width differs; scale = targetWidth / sourceWidth.
const TRACTOR_SOURCE_WIDTH_METERS = 2;
const TRACTOR_WORLD_SCALE =
  TRACTOR_TARGET_WIDTH_METERS / TRACTOR_SOURCE_WIDTH_METERS;
const SCALE_KEY_BASE_PIXELS = 120;
const SCALE_KEY_ZOOM_FACTOR = 1 / 3;
const MIN_CAMERA_CLEARANCE_METERS = 2;

function roundNiceDistance(meters: number): number {
  const power = 10 ** Math.floor(Math.log10(meters));
  const normalized = meters / power;

  if (normalized < 1.5) return 1 * power;
  if (normalized < 3) return 2 * power;
  if (normalized < 7) return 5 * power;
  return 10 * power;
}

function zoomLevelDistanceForPixelSpan(
  cameraRangeMeters: number,
  pixelSpan: number
): number | null {
  if (!Number.isFinite(cameraRangeMeters) || cameraRangeMeters <= 0) return null;
  if (!Number.isFinite(pixelSpan) || pixelSpan <= 0) return null;

  const normalizedSpan = pixelSpan / SCALE_KEY_BASE_PIXELS;
  const distance = cameraRangeMeters * SCALE_KEY_ZOOM_FACTOR * normalizedSpan;

  if (!Number.isFinite(distance) || distance <= 0) return null;
  return distance;
}

/** Haversine distance in metres between two lat/lng points. */
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Bearing in radians from (lat1,lon1) to (lat2,lon2). 0 = north, clockwise. */
function bearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLon = toRad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
  return Math.atan2(y, x);
}

/** Destination point given start, bearing (radians) and distance (metres). */
function destinationPoint(
  lat: number,
  lon: number,
  brng: number,
  dist: number
): [number, number] {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const angDist = dist / EARTH_RADIUS;
  const lat1 = toRad(lat);
  const lon1 = toRad(lon);
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(angDist) +
      Math.cos(lat1) * Math.sin(angDist) * Math.cos(brng)
  );
  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(brng) * Math.sin(angDist) * Math.cos(lat1),
      Math.cos(angDist) - Math.sin(lat1) * Math.sin(lat2)
    );
  return [toDeg(lat2), toDeg(lon2)];
}

/**
 * Build a quad (4-corner polygon) representing the painted strip
 * between two consecutive GPS points with the given width and lateral offset.
 *
 * Returns an array of Cartesian3 positions for the polygon.
 */
function buildStripQuad(
  prevLat: number,
  prevLon: number,
  curLat: number,
  curLon: number,
  widthMeters: number,
  offsetMeters: number
): Cartesian3[] {
  const brng = bearing(prevLat, prevLon, curLat, curLon);
  const perpLeft = brng - Math.PI / 2;
  const perpRight = brng + Math.PI / 2;

  const halfWidth = widthMeters / 2;
  const leftDist = halfWidth + offsetMeters;
  const rightDist = halfWidth - offsetMeters;

  const [p1Lat, p1Lon] = destinationPoint(prevLat, prevLon, perpLeft, leftDist);
  const [p2Lat, p2Lon] = destinationPoint(prevLat, prevLon, perpRight, rightDist);
  const [p3Lat, p3Lon] = destinationPoint(curLat, curLon, perpRight, rightDist);
  const [p4Lat, p4Lon] = destinationPoint(curLat, curLon, perpLeft, leftDist);

  return Cartesian3.fromDegreesArray([
    p1Lon, p1Lat,
    p2Lon, p2Lat,
    p3Lon, p3Lat,
    p4Lon, p4Lat,
  ]);
}

// ── Component ───────────────────────────────────────────────────────
interface GpsPoint {
  lat: number;
  lon: number;
}

export default function NavigationScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<CesiumViewer | null>(null);
  const modelEntityRef = useRef<Entity | null>(null);
  const initialFlyDone = useRef(false);

  // GPS from hook
  const {
    latitude,
    longitude,
    locationTimestamp,
    heading,
    speed,
    accuracy,
  } = useGeolocation();

  // Tracking state
  const [isTracking, setIsTracking] = useState(false);
  const [widthMeters, setWidthMeters] = useState(12);
  const [offsetMeters, setOffsetMeters] = useState(0);
  const [totalAreaSqMeters, setTotalAreaSqMeters] = useState(0);
  const [cameraRangeMeters, setCameraRangeMeters] = useState(100);
  const [selectedColor] = useState(MODEL_COLORS[0].hex);
  const prevPointRef = useRef<GpsPoint | null>(null);
  const stripEntitiesRef = useRef<Entity[]>([]);

  const { mapScaleMeters, mapScalePixels } = useMemo(() => {
    const rawMeters = zoomLevelDistanceForPixelSpan(
      cameraRangeMeters,
      SCALE_KEY_BASE_PIXELS
    );

    if (rawMeters === null) {
      return {
        mapScaleMeters: null,
        mapScalePixels: SCALE_KEY_BASE_PIXELS,
      };
    }

    const roundedMeters = roundNiceDistance(rawMeters);
    const pixelWidth = Math.max(
      40,
      Math.min(
        SCALE_KEY_BASE_PIXELS,
        (roundedMeters / rawMeters) * SCALE_KEY_BASE_PIXELS
      )
    );

    return {
      mapScaleMeters: roundedMeters,
      mapScalePixels: pixelWidth,
    };
  }, [cameraRangeMeters]);

  // Fetch farm location for initial camera position
  const userId = "current";
  const [farmLat, setFarmLat] = useState<number | null>(null);
  const [farmLon, setFarmLon] = useState<number | null>(null);

  useEffect(() => {
    getUsersFarm(userId).then((farm) => {
      if (farm?.locationCentre) {
        setFarmLat(farm.locationCentre.latitude);
        setFarmLon(farm.locationCentre.longitude);
      }
    });
  }, [userId]);

  // ── Create Cesium viewer ──────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el || viewerRef.current) return;

    const viewer = new CesiumViewer(el, {
      homeButton: false,
      animation: false,
      timeline: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      geocoder: false,
      navigationHelpButton: false,
      fullscreenButton: true,
      infoBox: false,
      selectionIndicator: false,
    });
    viewerRef.current = viewer;

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
      if (!viewer.isDestroyed()) viewer.destroy();
      viewerRef.current = null;
    };
  }, []);

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
  }, [latitude, longitude, farmLat, farmLon]);

  // ── 3D model entity – create once, then update position/heading ──
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || latitude === null || longitude === null) return;

    const position = Cartesian3.fromDegrees(longitude, latitude, 0);

    if (!modelEntityRef.current) {
      const entity = viewer.entities.add({
        position,
        model: {
          uri: "/models/Tractor.glb",
          // World-space sizing: stays constant relative to terrain regardless of zoom.
          scale: TRACTOR_WORLD_SCALE,
          heightReference: HeightReference.CLAMP_TO_GROUND,
        },
      });
      modelEntityRef.current = entity;
    } else {
      const entity = modelEntityRef.current;
      (entity.position as ConstantPositionProperty).setValue(position);

    }
    

    // Heading-oriented camera: look from behind and above
    const headingRad =
      heading !== null
        ? CesiumMath.toRadians(heading)
        : 0;
    viewer.camera.lookAt(
      position,
      new HeadingPitchRange(
        headingRad,
        CesiumMath.toRadians(-35), // pitched forward
        cameraRangeMeters // distance
      )
    );
  }, [latitude, longitude, heading, selectedColor, cameraRangeMeters]);

  // ── Path painting while tracking ──────────────────────────────────
  useEffect(() => {
    if (!isTracking || latitude === null || longitude === null) return;
    const viewer = viewerRef.current;
    if (!viewer) return;

    const cur: GpsPoint = { lat: latitude, lon: longitude };
    const prev = prevPointRef.current;

    if (prev) {
      const dist = haversineDistance(prev.lat, prev.lon, cur.lat, cur.lon);
      // Only paint if moved at least 0.5 m to avoid stacking at standstill
      if (dist >= 0.5) {
        const positions = buildStripQuad(
          prev.lat,
          prev.lon,
          cur.lat,
          cur.lon,
          widthMeters,
          offsetMeters
        );

        const stripEntity = viewer.entities.add({
          polygon: {
            hierarchy: positions,
            material: new ColorMaterialProperty(
              Color.fromCssColorString(selectedColor).withAlpha(0.45)
            ),
            classificationType: ClassificationType.BOTH,
          },
        });

        stripEntitiesRef.current.push(stripEntity);

        // Accumulate area (rectangle approximation: distance × width)
        const stripArea = dist * widthMeters;
        setTotalAreaSqMeters((a) => a + stripArea);
      }
    }

    prevPointRef.current = cur;
  }, [latitude, longitude, isTracking, widthMeters, offsetMeters, selectedColor]);

  // Reset prev point when tracking stops
  useEffect(() => {
    if (!isTracking) {
      prevPointRef.current = null;
    }
  }, [isTracking]);

  // ── Reset function ────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    const viewer = viewerRef.current;
    if (viewer) {
      for (const e of stripEntitiesRef.current) {
        viewer.entities.remove(e);
      }
    }
    stripEntitiesRef.current = [];
    setTotalAreaSqMeters(0);
    prevPointRef.current = null;
    setIsTracking(false);
  }, []);

  const handleZoomIn = useCallback(() => {
    setCameraRangeMeters((r) => Math.max(20, r * 0.75));
  }, []);

  const handleZoomOut = useCallback(() => {
    setCameraRangeMeters((r) => Math.min(10_000, r * 1.33));
  }, []);

  return (
    <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      <Box
        ref={containerRef}
        sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <NavigationControls
        latitude={latitude}
        longitude={longitude}
        locationTimestamp={locationTimestamp}
        accuracy={accuracy}
        speed={speed}
        isTracking={isTracking}
        setIsTracking={setIsTracking}
        widthMeters={widthMeters}
        setWidthMeters={setWidthMeters}
        offsetMeters={offsetMeters}
        setOffsetMeters={setOffsetMeters}
        totalAreaSqMeters={totalAreaSqMeters}
        selectedColor={selectedColor}
        mapScaleMeters={mapScaleMeters}
        mapScalePixels={mapScalePixels}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
      />
    </Box>
  );
}



"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Collapse,
  Fab,
  IconButton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SpeedIcon from "@mui/icons-material/Speed";
import TuneIcon from "@mui/icons-material/Tune";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { footerHeight } from "@app/settings";
import { GnssFixType, formatGnssFixStatus } from "@lib/gnss-status";
import InternetStatus from "@components/InternetStatus";

// ── colour palette offered to the user ──────────────────────────────
export const MODEL_COLORS: { label: string; hex: string }[] = [
  { label: "Green", hex: "#4CAF50" },
  { label: "Red", hex: "#F44336" },
  { label: "Blue", hex: "#2196F3" },
  { label: "Yellow", hex: "#FFEB3B" },
  { label: "Orange", hex: "#FF9800" },
];

// ── helpers ─────────────────────────────────────────────────────────
function formatAccuracy(meters: number | null): { text: string; color: string } {
  if (meters === null) return { text: "—", color: "#888" };
  let color: string;
  if (meters <= 0.1) color = "#00E676";
  else if (meters <= 1) color = "#00BCD4";   // Excellent
  else if (meters <= 5) color = "#2196F3";   // Good
  else if (meters <= 15) color = "#FFC107";  // Moderate
  else color = "#F44336";                     // Poor

  const text = meters < 1 ? `${(meters * 100).toFixed(0)} cm` : `${meters.toFixed(1)} m`;
  return { text, color };
}

function formatSpeed(speedMs: number | null): string {
  if (speedMs === null || speedMs < 0) return "— km/h";
  return `${(speedMs * 3.6).toFixed(1)} km/h`;
}

function formatArea(sqMeters: number): { ha: string; acres: string } {
  const ha = sqMeters / 10_000;
  const acres = sqMeters / 4_046.86;
  return {
    ha: ha < 10 ? ha.toFixed(3) : ha.toFixed(1),
    acres: acres < 10 ? acres.toFixed(3) : acres.toFixed(1),
  };
}

function formatDistance(meters: number): string {
  if (meters >= 1000) return `${(meters / 1000).toFixed(2)} km`;
  if (meters >= 100) return `${meters.toFixed(0)} m`;
  return `${meters.toFixed(1)} m`;
}

// ── overlay panel styling ───────────────────────────────────────────
const panelSx = {
  background: "rgba(0,0,0,0.75)",
  color: "white",
  borderRadius: 2,
  px: 2,
  py: 1.5,
  backdropFilter: "blur(4px)",
  "& .MuiTypography-caption": { fontSize: 16, lineHeight: 1.35 },
};

const touchButtonSx = {
  width: 56,
  height: 56,
  minHeight: 56,
  flexShrink: 0,
  "& .MuiSvgIcon-root": { fontSize: 32 },
};

const adjustmentButtonSx = {
  ...touchButtonSx,
  color: "white",
};

const sliderSx = {
  flex: 1,
  mx: 1,
  height: 8,
  "& .MuiSlider-thumb": { width: 28, height: 28 },
};

// ── props ───────────────────────────────────────────────────────────
export interface NavigationControlsProps {
  latitude: number | null;
  longitude: number | null;
  locationTimestamp: number | null;
  accuracy: number | null;
  speed: number | null;
  gpsConnected: boolean;
  fixType: GnssFixType | null;
  satellites: number | null;
  fixStatusStale: boolean;
  browserLocation: boolean;
  isTracking: boolean;
  setIsTracking: Dispatch<SetStateAction<boolean>>;
  widthMeters: number;
  setWidthMeters: Dispatch<SetStateAction<number>>;
  offsetMeters: number;
  setOffsetMeters: Dispatch<SetStateAction<number>>;
  totalAreaSqMeters: number;
  selectedColor: string;
  mapScaleMeters: number | null;
  mapScalePixels: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export default function NavigationControls(props: NavigationControlsProps) {
  const {
    latitude,
    longitude,
    locationTimestamp,
    accuracy,
    speed,
    gpsConnected,
    fixType,
    satellites,
    fixStatusStale,
    browserLocation,
    isTracking,
    setIsTracking,
    widthMeters,
    setWidthMeters,
    offsetMeters,
    setOffsetMeters,
    totalAreaSqMeters,
    selectedColor,
    mapScaleMeters,
    mapScalePixels,
    onZoomIn,
    onZoomOut,
    onReset,
  } = props;

  const [settingsOpen, setSettingsOpen] = useState(false);

  const acc = formatAccuracy(accuracy);
  const area = formatArea(totalAreaSqMeters);
  const fix = formatGnssFixStatus(fixType, fixStatusStale, browserLocation);
  const hasPosition = latitude !== null && longitude !== null;

  return (
    <>
      {/* ── Top-right: GPS status + accuracy + speed + area ────────── */}
      <Box
        sx={{
          position: "fixed",
          top: { xs: "calc(56px + 12px)", sm: "calc(64px + 12px)" },
          right: 12,
          zIndex: 1200,
        }}
      >
        <Box sx={{
          ...panelSx,
          maxWidth: "calc(100vw - 24px)",
          maxHeight: "calc(100dvh - 180px)",
          overflowY: "auto",
        }}>
          {/* GPS status */}
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            GPS: {hasPosition && !fixStatusStale && fixType !== "NO_FIX"
              ? "Active"
              : hasPosition && fixStatusStale
                ? "Stale"
              : gpsConnected
                ? "Connected"
                : "Searching"}
          </Typography>
          <Box sx={{ mt: 0.5, mb: 0.5 }}>
            <InternetStatus />
          </Box>
          <Typography variant="caption" sx={{ display: "block" }}>
            {hasPosition
              ? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
              : "—"}
          </Typography>
          <Stack component="output" direction="row" spacing={1} sx={{ alignItems: "center", mt: 0.5 }} aria-live="polite">
            <Box sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: fix.color, flexShrink: 0 }} />
            <Typography variant="body1" sx={{ fontWeight: 700, fontSize: 20 }}>Fix: {fix.label}</Typography>
          </Stack>
          {satellites !== null && (
            <Typography variant="caption" sx={{ display: "block" }}>Satellites: {satellites}</Typography>
          )}
          <Typography variant="caption" sx={{ display: "block" }}>
            {locationTimestamp
              ? new Date(locationTimestamp).toLocaleTimeString()
              : ""}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 0.5 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                bgcolor: acc.color,
                flexShrink: 0,
              }}
            />
            <Typography variant="body1" sx={{ fontSize: 20 }}>Accuracy: {accuracy === null ? "Unknown" : `±${acc.text}`}</Typography>
          </Stack>

          {/* Speedometer */}
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 1 }}>
            <SpeedIcon sx={{ fontSize: 28 }} />
            <Typography variant="body1" sx={{ fontWeight: 700, fontSize: 24 }}>
              {formatSpeed(speed)}
            </Typography>
          </Stack>

          {/* Area counter */}
          <Stack direction="row" spacing={1} sx={{ mt: 0.5, alignItems: "center" }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Area
            </Typography>
            <Typography variant="body1" sx={{ fontSize: 20 }}>{area.ha} ha / {area.acres} ac</Typography>
          </Stack>

          {/* Zoom controls */}
          <Stack direction="row" spacing={1.5} sx={{ mt: 1 }}>
            <Fab
              aria-label="Zoom out"
              onClick={onZoomOut}
              sx={{
                ...touchButtonSx,
                color: "white",
                bgcolor: "rgba(255,255,255,0.15)",
              }}
            >
              <ZoomOutIcon />
            </Fab>
            <Fab
              aria-label="Zoom in"
              onClick={onZoomIn}
              sx={{
                ...touchButtonSx,
                color: "white",
                bgcolor: "rgba(255,255,255,0.15)",
              }}
            >
              <ZoomInIcon />
            </Fab>
          </Stack>
        </Box>
      </Box>

      {/* ── Bottom-right panel: map distance key ──────────────────── */}
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 12, md: `calc(${footerHeight} + 12px)` },
          right: 12,
          zIndex: 1200,
        }}
      >
        <Box sx={panelSx}>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Distance Key
          </Typography>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", mt: 0.25 }}>
            <Box
              sx={{
                position: "relative",
                width: mapScalePixels,
                height: 14,
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 6,
                  borderTop: "3px solid rgba(255,255,255,0.95)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 1,
                  height: 12,
                  borderLeft: "3px solid rgba(255,255,255,0.95)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 1,
                  height: 12,
                  borderRight: "3px solid rgba(255,255,255,0.95)",
                }}
              />
            </Box>
            <Typography variant="caption">
              {mapScaleMeters === null ? "—" : formatDistance(mapScaleMeters)}
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* ── Bottom panel: controls ─────────────────────────────────── */}
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 12, md: `calc(${footerHeight} + 12px)` },
          left: 12,
          zIndex: 1200,
        }}
      >
        {/* Collapsible settings panel */}
        <Collapse in={settingsOpen} sx={{ mb: 1 }}>
          <Stack spacing={1} sx={{
            width: 360,
            maxWidth: "calc(100vw - 24px)",
            maxHeight: "calc(100dvh - 180px)",
            overflowY: "auto",
          }}>
            {/* ─ Width control ─ */}
            <Box sx={panelSx}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Width
              </Typography>
              <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                <IconButton
                  aria-label="Decrease width"
                  sx={adjustmentButtonSx}
                  onClick={() => setWidthMeters((w) => Math.max(1, w - 1))}
                >
                  <RemoveIcon />
                </IconButton>
                <Slider
                  value={widthMeters}
                  aria-label="Implement width"
                  min={1}
                  max={50}
                  step={0.5}
                  onChange={(_, v) => setWidthMeters(v as number)}
                  sx={{ ...sliderSx, color: selectedColor }}
                />
                <IconButton
                  aria-label="Increase width"
                  sx={adjustmentButtonSx}
                  onClick={() => setWidthMeters((w) => Math.min(50, w + 1))}
                >
                  <AddIcon />
                </IconButton>
                <Typography variant="body1" sx={{ fontSize: 20, minWidth: 64, textAlign: "right" }}>
                  {widthMeters.toFixed(1)}m
                </Typography>
              </Stack>
            </Box>

            {/* ─ Offset control ─ */}
            <Box sx={panelSx}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Offset
              </Typography>
              <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                <IconButton
                  aria-label="Decrease offset"
                  sx={adjustmentButtonSx}
                  onClick={() => setOffsetMeters((o) => Math.max(-25, o - 0.5))}
                >
                  <RemoveIcon />
                </IconButton>
                <Slider
                  value={offsetMeters}
                  aria-label="Implement offset"
                  min={-25}
                  max={25}
                  step={0.5}
                  onChange={(_, v) => setOffsetMeters(v as number)}
                  sx={{ ...sliderSx, color: selectedColor }}
                />
                <IconButton
                  aria-label="Increase offset"
                  sx={adjustmentButtonSx}
                  onClick={() => setOffsetMeters((o) => Math.min(25, o + 0.5))}
                >
                  <AddIcon />
                </IconButton>
                <Typography variant="body1" sx={{ fontSize: 20, minWidth: 64, textAlign: "right" }}>
                  {offsetMeters > 0 ? "+" : ""}
                  {offsetMeters.toFixed(1)}m
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Collapse>

        {/* Action buttons row */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          {/* ─ Start / Stop ─ */}
          <Fab
            aria-label={isTracking ? "Stop tracking" : "Start tracking"}
            aria-pressed={isTracking}
            color={isTracking ? "error" : "success"}
            onClick={() => setIsTracking((v) => !v)}
            sx={{ ...touchButtonSx, width: 72, height: 72, minHeight: 72 }}
          >
            {isTracking ? <StopIcon /> : <PlayArrowIcon />}
          </Fab>

          {/* ─ Reset ─ */}
          <Fab
            aria-label="Reset coverage"
            onClick={onReset}
            sx={{ ...touchButtonSx, color: "white", bgcolor: "rgba(0,0,0,0.75)" }}
          >
            <DeleteSweepIcon />
          </Fab>

          {/* ─ Settings toggle ─ */}
          <Fab
            aria-label="Navigation settings"
            aria-expanded={settingsOpen}
            onClick={() => setSettingsOpen((o) => !o)}
            sx={{
              ...touchButtonSx,
              bgcolor: settingsOpen ? selectedColor : "rgba(0,0,0,0.75)",
              color: "white",
            }}
          >
            <TuneIcon />
          </Fab>
        </Stack>
      </Box>
    </>
  );
}

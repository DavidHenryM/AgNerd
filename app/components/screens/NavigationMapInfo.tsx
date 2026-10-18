"use client";
import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { MapManifest } from "@lib/map-manifest";

export default function NavigationMapInfo({
  manifest, source,
}: {
  manifest: MapManifest;
  source: "local" | "online";
}) {
  return (
    <Box component="details" sx={{ color: "white" }}>
      <Box
        component="summary"
        aria-label="Map information"
        title="Map information"
        sx={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 48, height: 48, borderRadius: 1, cursor: "pointer",
          bgcolor: "rgba(0,0,0,0.75)", listStyle: "none",
          "&::-webkit-details-marker": { display: "none" },
          "&:hover": { bgcolor: "rgba(0,0,0,0.9)" },
          "&:focus-visible": { outline: "2px solid white", outlineOffset: 2 },
        }}
      >
        <InfoOutlinedIcon />
      </Box>
      <Typography sx={{
        mt: 1, p: 1, borderRadius: 1, bgcolor: "rgba(0,0,0,0.85)",
        overflowWrap: "anywhere", maxHeight: "40vh", overflowY: "auto",
      }}>
        {source === "local" ? (
          <>
            Local imagery · {manifest.resolutionMeters} m/pixel · {manifest.capturedAt ?? "Mixed / unknown dates"}
            {manifest.notes && <><br />{manifest.notes}</>}
            <br />Outside coverage: low-resolution background
          </>
        ) : "Online imagery"}
      </Typography>
    </Box>
  );
}

"use client"

import {
  Cartesian3,
  Color,
  Viewer as CesiumViewer,
  Ion,
  VerticalOrigin,
} from "cesium"
import { Box } from "@mui/material"
import { useEffect, useMemo, useRef } from "react"
import { centroidFromPoints } from "@lib/farmUtils"
import type { FarmWorkspaceFarm } from "@lib/types/farmWorkspace"

if (typeof window !== "undefined") {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).CESIUM_BASE_URL = "/cesium/"
}

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN || ""

function coordinatesToDegreesArray(points: { latitude: number; longitude: number }[]): number[] {
  return points.flatMap((point) => [point.longitude, point.latitude])
}

export default function FarmMap({ farm }: { farm: FarmWorkspaceFarm }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<CesiumViewer | null>(null)

  const currentMobLocations = useMemo(() => {
    return farm.mobs
      .map((mob) => {
        const latestMovement = mob.movements[mob.movements.length - 1]
        if (!latestMovement) {
          return null
        }

        const paddock = farm.paddocks.find((candidate) => candidate.id === latestMovement.toPaddockId)
        if (!paddock) {
          return null
        }

        const centroid = centroidFromPoints(paddock.polygon)
        if (!centroid) {
          return null
        }

        const dse = mob.members.reduce((sum, member) => sum + member.drySheepEquivalent, 0)

        return {
          id: mob.id,
          name: mob.name,
          latitude: centroid.latitude,
          longitude: centroid.longitude,
          paddockName: paddock.name,
          dse,
        }
      })
      .filter((value): value is NonNullable<typeof value> => value !== null)
  }, [farm.mobs, farm.paddocks])

  useEffect(() => {
    const element = containerRef.current
    if (!element || viewerRef.current) {
      return
    }

    const viewer = new CesiumViewer(element, {
      animation: false,
      timeline: false,
      geocoder: false,
      homeButton: false,
      baseLayerPicker: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      fullscreenButton: false,
      infoBox: false,
      selectionIndicator: false,
    })

    viewerRef.current = viewer

    return () => {
      if (!viewer.isDestroyed()) {
        viewer.destroy()
      }
      viewerRef.current = null
    }
  }, [])

  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) {
      return
    }

    viewer.entities.removeAll()

    if (farm.boundaryPoints.length >= 3) {
      viewer.entities.add({
        name: `${farm.name} boundary`,
        polygon: {
          hierarchy: Cartesian3.fromDegreesArray(coordinatesToDegreesArray(farm.boundaryPoints)),
          material: Color.fromCssColorString("#2E7D32").withAlpha(0.18),
          outline: true,
          outlineColor: Color.fromCssColorString("#1B5E20"),
        },
      })
    }

    farm.paddocks.forEach((paddock, index) => {
      if (paddock.polygon.length >= 3) {
        viewer.entities.add({
          name: paddock.name,
          polygon: {
            hierarchy: Cartesian3.fromDegreesArray(coordinatesToDegreesArray(paddock.polygon)),
            material: Color.fromHsl((index % 8) / 8, 0.65, 0.5, 0.25),
            outline: true,
            outlineColor: Color.WHITE,
          },
        })
      }

      const centroid = centroidFromPoints(paddock.polygon)
      if (centroid) {
        viewer.entities.add({
          position: Cartesian3.fromDegrees(centroid.longitude, centroid.latitude),
          label: {
            text: `${paddock.name}\n${paddock.areaHa.toFixed(2)} ha`,
            scale: 0.55,
            fillColor: Color.WHITE,
            outlineColor: Color.BLACK,
            outlineWidth: 2,
            showBackground: true,
            backgroundColor: Color.BLACK.withAlpha(0.55),
            verticalOrigin: VerticalOrigin.BOTTOM,
          },
        })
      }
    })

    farm.gates.forEach((gate) => {
      const latestState = gate.stateChanges[0]?.state ?? "CLOSED"
      const color = latestState === "OPEN" ? Color.LIME : Color.RED

      viewer.entities.add({
        position: Cartesian3.fromDegrees(gate.longitude, gate.latitude),
        point: {
          pixelSize: 12,
          color,
          outlineColor: Color.BLACK,
          outlineWidth: 2,
        },
        label: {
          text: `${gate.name ?? "Gate"}\n${latestState}`,
          scale: 0.5,
          showBackground: true,
          backgroundColor: Color.BLACK.withAlpha(0.55),
          fillColor: Color.WHITE,
          pixelOffset: new Cartesian3(0, -20, 0),
        },
      })
    })

    currentMobLocations.forEach((location) => {
      viewer.entities.add({
        position: Cartesian3.fromDegrees(location.longitude, location.latitude),
        label: {
          text: `${location.name}\n${location.dse} DSE\n${location.paddockName}`,
          scale: 0.55,
          fillColor: Color.YELLOW,
          outlineColor: Color.BLACK,
          outlineWidth: 2,
          showBackground: true,
          backgroundColor: Color.BLACK.withAlpha(0.65),
        },
      })
    })

    const flyTarget =
      farm.locationCentre ??
      centroidFromPoints(farm.boundaryPoints) ??
      centroidFromPoints(farm.paddocks[0]?.polygon ?? [])

    if (flyTarget) {
      viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(flyTarget.longitude, flyTarget.latitude, 1800),
        duration: 0,
      })
    }
  }, [currentMobLocations, farm])

  return <Box ref={containerRef} sx={{ width: "100%", minHeight: 520, borderRadius: 2, overflow: "hidden" }} />
}

"use client";
import { Cartesian3 } from "cesium";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import { Grid } from "@mui/material";
import { getUsersFarm } from "@lib/queries";
import useGeolocation from "@lib/hooks/geolocation";

const Viewer = dynamic(() => import('resium').then((mod) => mod.Viewer),
  {
    ssr: false, // Set to false if the component relies on browser APIs
    loading: () => <Loading />, // Optional loading state
  }
);

const CameraFlyTo = dynamic(() => import('resium').then((mod) => mod.CameraFlyTo),
  {
    ssr: false, // Set to false if the component relies on browser APIs
    loading: () => <Loading />, // Optional loading state
  }
);



export default function NavigationScreen() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationTimestamp, setLocationTimestamp] = useState<number | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const userId = "current"; // Placeholder for current user ID
  const location = useGeolocation();


  useEffect(() => {
    // Set the CESIUM_BASE_URL globally
    //eslint-disable-next-line no-explicit-any
    if (typeof window !== "undefined" && !(window as any).CESIUM_BASE_URL) {
      //eslint-disable-next-line no-explicit-any
      (window as any).CESIUM_BASE_URL = "/cesium/"; // Must match the public path from the cpx script
    }
  }, []);

  useEffect(() => {
    getUsersFarm(userId).then((farm) => {
      if(farm){
        if (farm.locationCentre) {
          setLatitude(farm.locationCentre.latitude);
          setLongitude(farm.locationCentre.longitude);
        }
      }
    })
  }, [userId]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setLocationTimestamp(position.timestamp);
        setHeading(position.coords.heading);
      },
      (error) => console.error("Error accessing GPS:", error),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
  <>
    <Grid size={12} spacing={2} alignItems="center" justifyContent="center" style={{ height: '100%' }}>
      <Viewer
        full
        homeButton={false}
        animation={false}
        timeline={false}
        sceneModePicker={false}
        baseLayerPicker={false}
        geocoder={false}
        navigationHelpButton={false}
        fullscreenButton={false}
        infoBox={false}
        selectionIndicator={false}
      >
        <CameraFlyTo
          destination={Cartesian3.fromDegrees(
            longitude ?? 0,
            latitude ?? 0,
            1000
          )}
        />
      </Viewer>

      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          padding: "8px 12px",
          background: "rgba(0,0,0,0.55)",
          color: "white",
          borderRadius: 8,
          fontSize: 12,
          lineHeight: 1.4,
          pointerEvents: "none",
        }}
      >
        <div>GPS: {latitude && longitude ? "Active" : "Searching"}</div>
        <div>
          {latitude && longitude
            ? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
            : "—"}
        </div>
        <div>
          {locationTimestamp
            ? new Date(locationTimestamp).toLocaleTimeString()
            : ""}
        </div>
      </div>
    </Grid>
  </>
  );
}



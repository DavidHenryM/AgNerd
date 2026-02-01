import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationTimestamp, setLocationTimestamp] = useState<number | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSuccess = (position: GeolocationPosition) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setLocationTimestamp(position.timestamp);
    setHeading(position.coords.heading);
    setError(null);
    setLoading(false);
  };

  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
    setLatitude(null);
    setLongitude(null);
    setLocationTimestamp(null);
    setHeading(null);
    setLoading(false);
  };



  useEffect(() => {
    async function fetchLocation() {
      setLoading(true);
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setLoading(false);
        return;
      }
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      // Start watching the position
      const watchId = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        options
      );

      // Cleanup function to stop watching when the component unmounts
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }

    fetchLocation();
  }, []); // Empty dependency array means this runs once on mount

  return { latitude, longitude, locationTimestamp, heading, error, loading };
};

export default useGeolocation;

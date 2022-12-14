import './App.css';
import { useQuery, gql } from '@apollo/client';
import { GeoPoint } from '../../api/src/prisma/generated/type-graphql/index'
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { Draggable, type LatLngExpression } from 'leaflet';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import "leaflet/dist/leaflet.css"
import { useState, useEffect } from 'react';
import axios from 'axios';

const theme = extendTheme({
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  }
})

function QueryRest() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const gursaID = '75208823';

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        `https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Land_Parcel_Property_Theme/FeatureServer/12/query?where=gurasid=${gursaID}&geometryType=esriGeometryPolygon&spatialRel=esriSpatialRelIntersects&units=esriSRUnit_Meter&returnGeometry=true&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnZ=false&returnM=false&multipatchOption=xyFootprint&returnTrueCurves=false&returnExceededLimitFeatures=false&returnCentroid=false&featureEncoding=esriDefault&f=geojson`,
        );
      
      setData(result.data.features[0].geometry.coordinates[0].map(reverseLatLngExpression));
      setLoading(false);
    }

    fetchData();
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <Polygon positions={data} />
  );
}


let reverseLatLngExpression = (latLng: number[]): LatLngExpression => {
  const reversedLatLng: LatLngExpression = [latLng[1], latLng[0]];
  return reversedLatLng;
};
  

function geoPointToLatLngExpression (geoPoint: GeoPoint): LatLngExpression {
  return [geoPoint.longitude, geoPoint.latitude]
}


function DisplayPaddocks() {
  const GET_PADDOCKS = gql`
    query Query {
      paddocks {
        id
        name
        polygon {
          latitude
          longitude
        }
      }
    }`;
  const queryResult = useQuery(GET_PADDOCKS);
  const data: any = queryResult.data;
  if (queryResult.loading) return <p>Loading...</p>;
  if (queryResult.error) return <p>Error :(</p>;
  return (
        <Polygon pathOptions={{color: 'purple'}} positions={data.paddocks[0].polygon.map(geoPointToLatLngExpression)}/>
  );
};


export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <div>
        <h1>
          Ag Nerd
          <span role="img" aria-label="rocket">
            ????
          </span>
        </h1>
        <br />
        
        <div>
          <MapContainer center={[-36.555417, 148.829788]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <div>
              <QueryRest></QueryRest>
              <DisplayPaddocks></DisplayPaddocks>
            </div>
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </ChakraProvider>
  );
}
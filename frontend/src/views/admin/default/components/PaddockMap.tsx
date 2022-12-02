import { useQuery, gql } from '@apollo/client';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { Draggable, type LatLngExpression } from 'leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { MdBarChart } from 'react-icons/md';



export function QueryRest() {
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
  
  
  let reverseLatLngExpression = (latLng: number[]): any => {
    const reversedLatLng: any = [latLng[1], latLng[0]];
    return reversedLatLng;
  };
    
  
  function geoPointToLatLngExpression (geoPoint: any): any {
    return [geoPoint.longitude, geoPoint.latitude]
  }
  
  
  export function DisplayPaddocks() {
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

  export default function PaddockMap(props: { [x: string]: any }) {
    const { ...rest } = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });
    return (
        <Card alignItems='center' flexDirection='column' w='100%' {...rest}>
			<Flex align='center' w='100%' px='15px' py='10px'>
				<Text me='auto' color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%'>
					Weekly Revenue
				</Text>
				<Button
					alignItems='center'
					justifyContent='center'
					bg={bgButton}
					_hover={bgHover}
					_focus={bgFocus}
					_active={bgFocus}
					w='37px'
					h='37px'
					lineHeight='100%'
					borderRadius='10px'
					{...rest}>
					<Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
				</Button>
			</Flex>

			<Box h='240px' mt='auto' w='100%'>
                <div>
                    <MapContainer center={[-36.555417, 148.829788]} zoom={13} scrollWheelZoom={true} style={{ height: "200px", minHeight: "100%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
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
			</Box>
		</Card>
        
    );
  };
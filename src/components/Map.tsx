import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { useCities } from '../contexts';
import { useGeolocation, useUrlPosition } from '../hooks';
import Button from './Button';
import styles from './Map.module.css';

const Map = () => {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([
    51.505, -0.09,
  ] as LatLngTuple);
  const {
    position: geolocationPosition,
    isLoading: isLoadingPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  // Rendering Markers
  const renderedMarkers = cities.map((city) => (
    <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
      {city.notes ? (
        <Popup>
          <span>{city.notes}</span>
        </Popup>
      ) : null}
    </Marker>
  ));

  // Set Map Position when URL Query String changes
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([+mapLat, +mapLng]);
  }, [mapLat, mapLng]);

  // Set Map to your Geolocation Position
  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : 'Use your position'}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={7}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {renderedMarkers}
        <ChangePosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

// Enable Map Reactivity
const ChangePosition = ({ position }: { position: LatLngTuple }) => {
  const map = useMap();
  map.setView(position);
  return null;
};
// Read Lat & Lng from Map to Form
const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
};

export default Map;

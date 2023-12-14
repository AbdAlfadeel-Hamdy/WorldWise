import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import styles from './Map.module.css';

const Map = () => {
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([
    51.505, -0.09,
  ] as LatLngTuple);
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

  return (
    <div className={styles.mapContainer}>
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

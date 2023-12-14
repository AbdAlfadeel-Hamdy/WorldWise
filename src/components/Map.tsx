import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { useCities } from '../contexts';
import styles from './Map.module.css';

const Map = () => {
  const navigate = useNavigate();
  const { cities } = useCities();
  console.log(cities);
  const [mapPosition, setMapPosition] = useState([
    51.505, -0.09,
  ] as LatLngTuple);

  const renderedMarkers = cities.map((city) => (
    <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
      <Popup>{city.notes}</Popup>
    </Marker>
  ));

  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {renderedMarkers}
      </MapContainer>
    </div>
  );
};

export default Map;

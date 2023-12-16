import { Link } from 'react-router-dom';
import { useCities } from '../hooks';
import { formatDate } from '../utils';
import { City } from '../types';
import styles from './CityItem.module.css';

type CityItemProps = {
  city: City;
};

const CityItem = ({ city }: CityItemProps) => {
  const { currentCity, deleteCity } = useCities();
  const {
    id,
    position: { lat, lng },
    emoji,
    cityName,
    date,
  } = city;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteCity(city.id);
  };

  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          id === currentCity?.id && styles['cityItem--active']
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date, false)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;

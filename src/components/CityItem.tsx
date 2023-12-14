import { Link } from 'react-router-dom';
import { useCities } from '../contexts';
import { formatDate } from '../utils';
import { City } from '../types';
import styles from './CityItem.module.css';

type CityItemProps = {
  city: City;
};

const CityItem: React.FC<CityItemProps> = ({ city }) => {
  const { currentCity } = useCities();
  const {
    id,
    position: { lat, lng },
    emoji,
    cityName,
    date,
  } = city;

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
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;

import { useParams } from 'react-router-dom';
import { formatDate } from '../utils';
import { CityType } from '../types';
import styles from './City.module.css';

type CityProps = {
  cities: CityType[];
};

const City: React.FC<CityProps> = ({ cities }) => {
  const { id } = useParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  const currentCity = cities.find((city) => id && city.id === +id);
  const { cityName, emoji, date, notes } = currentCity || {};

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{date && formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target='_blank'
          rel='noreferrer'
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>{/* <ButtonBack /> */}</div>
    </div>
  );
};

export default City;

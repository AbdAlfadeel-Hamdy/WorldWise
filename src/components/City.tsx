import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import { useCities } from '../contexts';
import { formatDate } from '../utils';
import styles from './City.module.css';
import BackButton from './BackButton';

const City = () => {
  const { id } = useParams();
  const { isLoading, currentCity, getCity } = useCities();
  const { cityName, emoji, date, notes } = currentCity;

  // Fetch City
  useEffect(() => {
    if (id) getCity(+id);
  }, [id, getCity]);

  if (isLoading) return <Spinner />;

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

      <div>
        <BackButton />
      </div>
    </div>
  );
};

export default City;

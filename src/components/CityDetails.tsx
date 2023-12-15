import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCities } from '../hooks';
import Spinner from './Spinner';
import BackButton from './BackButton';
import { formatDate } from '../utils';
import styles from './CityDetails.module.css';

const CityDetails = () => {
  const { id } = useParams();
  const { isLoading, currentCity, getCity } = useCities();

  // Fetch City
  useEffect(() => {
    if (id) getCity(+id);
  }, [id, getCity]);

  if (isLoading) return <Spinner />;
  //Temp
  if (!currentCity) return <p>Error</p>;

  const { cityName, emoji, date, notes } = currentCity;

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

export default CityDetails;

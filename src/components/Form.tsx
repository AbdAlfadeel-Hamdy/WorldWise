import { useEffect, useState } from 'react';
import { useUrlPosition } from '../hooks';
import Button from './Button';
import BackButton from './BackButton';
import Spinner from './Spinner';
import {
  REVERSE_GEOLOCATION_API_BASE_URL,
  convertToEmoji,
  customFetch,
} from '../utils';
import styles from './Form.module.css';
import Message from './Message';

const Form = () => {
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [emoji, setEmoji] = useState('');
  const [date, setDate] = useState(new Date().toString());
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchCityData = async () => {
      setIsLoadingGeocoding(true);
      setGeocodingError(null);
      try {
        const { data } = await customFetch(
          `${REVERSE_GEOLOCATION_API_BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.city)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );
        setCityName(data.city);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        if (err instanceof Error) setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };

    if (lat && lng) fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <input
          id='date'
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
};

export default Form;

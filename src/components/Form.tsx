import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUrlPosition } from '../hooks';
import { useCities } from '../hooks';
import Button from './Button';
import BackButton from './BackButton';
import Spinner from './Spinner';
import Message from './Message';
import {
  REVERSE_GEOLOCATION_API_BASE_URL,
  convertToEmoji,
  customFetch,
} from '../utils';
import styles from './Form.module.css';

const Form = () => {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { isLoading, createCity } = useCities();
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

  // Create NEW City
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cityName || !date || !lat || !lng) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: +lat, lng: +lng },
    };
    await createCity(newCity);
    navigate('/app');
  };

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat || !lng)
    return <Message message='Start by clicking somewhere on the map' />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
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
        <DatePicker
          id='date'
          selected={new Date(date)}
          onChange={(date) =>
            setDate(date?.toString() || new Date().toString())
          }
          dateFormat='dd/MM/yyyy'
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

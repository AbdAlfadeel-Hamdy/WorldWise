import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { customFetch } from '../utils';
import { City } from '../types';
import { AxiosError } from 'axios';

// Cities Context
type CitiesContextType = {
  cities: City[];
  isLoading: boolean;
  error: string | null;
  currentCity: City | null;
  getCity: (id: number) => Promise<void>;
  createCity: (city: City) => Promise<void>;
};

const CitiesContext = createContext({} as CitiesContextType);

// useCities Custom Hook
const useCities = () => {
  const value = useContext(CitiesContext);
  if (!Object.keys(value).length)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return value;
};

// Cities Provider
type CitiesProviderProps = {
  children: React.ReactNode;
};

const CitiesProvider = ({ children }: CitiesProviderProps) => {
  const [cities, setCities] = useState([] as City[]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  // Fetch Cities
  useEffect(() => {
    const fetchCities = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const { data } = await customFetch('/cities.json');
        setCities(data);
      } catch (err) {
        if (err instanceof AxiosError || err instanceof Error)
          setError(err.message);
        else setError('Something went wrong, please try again');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  // Get City
  const getCity = useCallback(async (id: number) => {
    setError(null);
    setIsLoading(true);
    try {
      const { data } = await customFetch(`/cities.json`);
      const city = (data as City[]).find((city) => city.id === id);
      if (city) setCurrentCity(city);
    } catch (err) {
      if (err instanceof AxiosError || err instanceof Error)
        setError(err.message);
      else setError('Something went wrong, please try again');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create City
  const createCity = async (city: City) => {
    setError(null);
    setIsLoading(true);
    try {
      const { data } = await customFetch.post(`/cities.json`, city);
      setCities((cities) => [...cities, city]);
    } catch (err) {
      if (err instanceof AxiosError || err instanceof Error)
        setError(err.message);
      else setError('Something went wrong, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, error, currentCity, getCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesProvider, useCities };

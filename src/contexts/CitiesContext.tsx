import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { customFetch } from '../utils';
import { City } from '../types';

// Cities Context
type CitiesContextType = {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  getCity: (id: number) => Promise<void>;
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
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  // Fetch Cities
  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const { data } = await customFetch('/cities.json');
        setCities(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  // Get City
  const getCity = useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      const { data } = await customFetch(`/cities.json`);
      const city = (data as City[]).find((city) => city.id === id);
      if (city) setCurrentCity(city);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesProvider, useCities };

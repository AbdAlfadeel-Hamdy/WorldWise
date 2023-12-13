import { createContext, useContext, useState, useEffect } from 'react';
import { customFetch } from '../utils';
import { CityType } from '../types';

// Cities Context
type CitiesContextType = {
  cities: CityType[];
  isLoading: boolean;
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
  const [cities, setCities] = useState([] as CityType[]);
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesProvider, useCities };

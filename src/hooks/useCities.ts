import { useContext } from 'react';
import { CitiesContext } from '../contexts';

export const useCities = () => {
  const value = useContext(CitiesContext);
  if (!Object.keys(value).length)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return value;
};

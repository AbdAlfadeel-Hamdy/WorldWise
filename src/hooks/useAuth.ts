import { useContext } from 'react';
import { AuthContext } from '../contexts';

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!Object.keys(value).length)
    throw new Error('AuthContext was used outside the AuthProvider');
  return value;
};

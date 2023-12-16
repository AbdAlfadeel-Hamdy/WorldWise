import { createContext, useEffect, useCallback, useReducer } from 'react';
import { AxiosError } from 'axios';
import { customFetch } from '../utils';
import { City } from '../types';

// Cities Context
type CitiesContextType = {
  cities: City[];
  isLoading: boolean;
  error: string | null;
  currentCity: City | null;
  getCity: (id: number) => Promise<void>;
  createCity: (city: Omit<City, 'id'>) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
};

export const CitiesContext = createContext({} as CitiesContextType);

// Cities Reducer Initial State
type CitiesState = {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  error: string | null;
};

const initialState: CitiesState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: null,
};

// Actions Types
type LoadingAction = {
  type: 'loading';
};

type RejectedAction = {
  type: 'rejected';
  payload: string;
};

type LoadCitiesAction = {
  type: 'cities/loaded';
  payload: City[];
};

type LoadCityAction = {
  type: 'city/loaded';
  payload: City;
};

type CreateCityAction = {
  type: 'city/created';
  payload: City;
};

type DeleteCityAction = {
  type: 'city/deleted';
  payload: number;
};

// Cities Reducer
const reducer = (
  state: CitiesState,
  action:
    | LoadingAction
    | RejectedAction
    | LoadCitiesAction
    | LoadCityAction
    | CreateCityAction
    | DeleteCityAction
): CitiesState => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true, error: null };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity:
          state.currentCity?.id === action.payload ? null : state.currentCity,
      };
    default:
      return state;
  }
};

// Cities Provider
type CitiesProviderProps = {
  children: React.ReactNode;
};

export const CitiesProvider = ({ children }: CitiesProviderProps) => {
  const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Fetch Cities
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' });
      try {
        const { data } = await customFetch('/cities.json');
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (err) {
        if (err instanceof AxiosError || err instanceof Error)
          dispatch({ type: 'rejected', payload: err.message });
        else
          dispatch({
            type: 'rejected',
            payload: 'Something went wrong, please try again',
          });
      }
    };
    fetchCities();
  }, []);

  // Get City
  const getCity = useCallback(
    async (id: number) => {
      if (id === currentCity?.id) return;

      dispatch({ type: 'loading' });
      try {
        const { data } = await customFetch(`/cities.json`);
        const city = (data as City[]).find((city) => city.id === id);
        if (city) dispatch({ type: 'city/loaded', payload: city });
      } catch (err) {
        if (err instanceof AxiosError || err instanceof Error)
          dispatch({ type: 'rejected', payload: err.message });
        else
          dispatch({
            type: 'rejected',
            payload: 'Something went wrong, please try again',
          });
      }
    },
    [currentCity?.id]
  );

  // Create City
  const createCity = async (city: Omit<City, 'id'>) => {
    dispatch({ type: 'loading' });
    try {
      // const { data } = await customFetch.post(`/cities.json`, city);
      // await customFetch.post(`/cities.json`, city);
      dispatch({
        type: 'city/created',
        payload: { ...city, id: Math.random() },
      });
    } catch (err) {
      if (err instanceof AxiosError || err instanceof Error)
        dispatch({ type: 'rejected', payload: err.message });
      else
        dispatch({
          type: 'rejected',
          payload: 'Something went wrong, please try again',
        });
    }
  };

  // Delete City
  const deleteCity = async (id: number) => {
    dispatch({ type: 'loading' });
    try {
      // await customFetch.delete(`/cities.json/${id}`);
      dispatch({ type: 'city/deleted', payload: id });
    } catch (err) {
      if (err instanceof AxiosError || err instanceof Error)
        dispatch({ type: 'rejected', payload: err.message });
      else
        dispatch({
          type: 'rejected',
          payload: 'Something went wrong, please try again',
        });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

import { createContext, useReducer } from 'react';

type User = {
  name: string;
  avatar: string;
};

// Auth Context
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

// Auth Reducer Initial State
type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

// Auth Action Types
type LoginAction = {
  type: 'login';
  payload: User;
};

type LogoutAction = {
  type: 'logout';
};

// Auth Reducer
const reducer = (
  state: AuthState,
  action: LoginAction | LogoutAction
): AuthState => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'logout':
      return initialState;
    default:
      throw new Error('Unknown action type');
  }
};

// Auth Provider
type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email: string, password: string) => {
    console.log(email, password);
    const user = {
      name: 'Jack',
      avatar: 'https://i.pravatar.cc/100?u=zz',
    };
    dispatch({ type: 'login', payload: user });
  };

  const logout = () => {
    dispatch({ type: 'logout' });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

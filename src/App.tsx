import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  AppLayout,
  Homepage,
  Login,
  PageNotFound,
  Pricing,
  Product,
  ProtectedRoute,
} from './pages';
import { AuthProvider, CitiesProvider } from './contexts';
import { CityDetails, CityList, CountryList, Form } from './components';

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path='product' element={<Product />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='login' element={<Login />} />
            <Route
              path='app'
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to='cities' replace />} />
              <Route path='cities' element={<CityList />} />
              <Route path='countries' element={<CountryList />} />
              <Route path='cities/:id' element={<CityDetails />} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;

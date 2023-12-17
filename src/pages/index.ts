import { lazy } from 'react';

export const Homepage = lazy(() => import('./Homepage'));
export const Product = lazy(() => import('./Product'));
export const Pricing = lazy(() => import('./Pricing'));
export const Login = lazy(() => import('./Login'));
export const AppLayout = lazy(() => import('./AppLayout'));
export const PageNotFound = lazy(() => import('./PageNotFound'));
export const ProtectedRoute = lazy(() => import('./ProtectedRoute'));

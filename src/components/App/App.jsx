import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { authOperations, authSelectors } from '../../redux/auth';
import Loader from '../Loader/Loader';
import AppBar from '../AppBar/AppBar';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from 'routes/PrivatRoutes';
import PublicRoute from 'routes/PublicRoutes';

const PageHome = lazy(() => import('pages/PageHome/PageHome'));
const PageRegistration = lazy(() =>
  import('pages/PageRegistration/PageRegistration')
);
const PageLogin = lazy(() => import('pages/PageLogin/PageLogin'));
const PageContacts = lazy(() => import('pages/PageContacts/PageContacts'));

const App = () => {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {!isFetchingCurrentUser && (
        <>
          <AppBar />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <PageHome />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute redirectTo="/contacts" restricted>
                    <PageRegistration />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute redirectTo="/contacts" restricted>
                    <PageLogin />
                  </PublicRoute>
                }
              />
              <Route
                path="/contacts"
                element={
                  <PrivateRoute>
                    <PageContacts />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
          <ToastContainer autoClose={3700} position="top-center" />
        </>
      )}
    </>
  );
};

export default App;

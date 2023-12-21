import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import authOperations from '../../redux/auth/authOperations';
import authSelectors from '../../redux/auth/authSelectors';

import AppBar from '../AppBar/AppBar';

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
          <Routes>
            <Route path="/" element={<AppBar />}>
              <Route index element={<PageHome />} />
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
                  <PrivateRoute redirectTo="/login">
                    <PageContacts />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;

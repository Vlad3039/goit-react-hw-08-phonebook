import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import authSelectors from '../redux/auth/authSelectors';

const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const isRefreshing = useSelector(authSelectors.getIsFetchingCurrent);
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : children;
};

export default PrivateRoute;

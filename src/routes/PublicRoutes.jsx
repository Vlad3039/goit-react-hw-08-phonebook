import { Navigate } from 'react-router-dom';
import authSelectors from '../redux/auth/authSelectors';

const PublicRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn } = authSelectors();

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
export default PublicRoute;

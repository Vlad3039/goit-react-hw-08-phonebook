import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/authSelectors';
import AuthForm from 'components/AuthForm/AuthForm';
import Navigation from 'components/Navigation/Navigation';
import UserMenu from 'components/UserMenu/UserMenu';

import { Header, Box } from './AppBar.styled';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Loader from 'components/Loader/Loader';

function AppBar() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <>
      <Header>
        <Box>
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthForm />}
        </Box>
      </Header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default AppBar;

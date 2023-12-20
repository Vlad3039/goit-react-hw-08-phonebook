import { useSelector } from 'react-redux';

import authSelectors from '../../redux/auth/authSelectors';

import { Link } from './Navigation.styled';

function Navigation() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <div>
      <Link to="/">Home</Link>

      {isLoggedIn && <Link to="/contacts">Contacts</Link>}
    </div>
  );
}

export default Navigation;

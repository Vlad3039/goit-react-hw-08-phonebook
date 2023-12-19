import { Link } from './AuthForm.styled';

function AuthForm() {
  return (
    <nav>
      <Link to="/register">Sign up</Link>
      <Link to="/login">Log in</Link>
    </nav>
  );
}
export default AuthForm;

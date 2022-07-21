import { Link, useNavigate } from 'react-router-dom';

// import { logout } from '../../firebase/firebase-auth';
import { useAuthContext } from '../../context/auth-context';

import classes from './Navigation.module.css';

const Navigation = () => {
  const { logout: logoutCtx, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    // try {
    // await logout();
    logoutCtx();

    navigate('/auth/admin', { replace: true });
    // } catch (error) {
    //   const errorCode = error.code;
    //   alert(errorCode);
    // }
  };

  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </>
        )}

        {!isLoggedIn && (
          <li>
            <Link to="/auth/admin">
              <button>Login</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

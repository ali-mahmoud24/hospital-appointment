import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import AuthContext from '../../shared/context/auth-context';
import { useAuth } from '../../shared/hooks/use-auth';

import classes from './Navigation.module.css';

const Navigation = () => {
  const { logout, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/auth', { replace: true });
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
            <Link to="/auth">
              <button>Login</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

import React, { useState, useEffect, useCallback, useContext } from 'react';

let logoutTimer;

const calculateRemainingTime = expirationTime => expirationTime - Date.now();

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  // logout the user before one minute (3600 ms) of finishing the expiry date
  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  // const tokenData = retrieveStoredToken();

  // let initialToken;
  // if (tokenData) {
  //   initialToken = tokenData.token;
  // }

  // const [token, setToken] = useState(initialToken);
  const [isLoggedIn, setIsloggedIn] = useState(false);

  // const userIsLoggedIn = !!token;

  // useCallBack() ==> Because we're using logoutHandler in useEffect(),so we make sure that the function isn't re-created un-necessarily
  //  thus preventing infinite loops or un-necessary effect executions.
  const logoutHandler = useCallback(() => {
    setIsloggedIn(false);
    // setToken(null);
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationTime');
    // if (logoutTimer) {
    //   clearTimeout(logoutTimer);
    // }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setIsloggedIn(true);
    // setToken(token);
    // localStorage.setItem('token', token);
    // localStorage.setItem('expirationTime', expirationTime);
    // const remainingTime = calculateRemainingTime(expirationTime);
    // logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  // useEffect(() => {
  //   if (tokenData) {
  //     const remainingDuration = tokenData.duration;
  //     // console.log(remainingDuration);
  //     logoutTimer = setTimeout(logoutHandler, remainingDuration);
  //   }
  // }, [tokenData, logoutHandler]);

  const contextValue = {
    // token,
    // isLoggedIn: userIsLoggedIn,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

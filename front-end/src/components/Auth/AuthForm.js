import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import Card from '../UI/Card';
import Input from '../UI/Input';
import useInput from '../../hooks/use-input';

// import { login, signup } from '../../firebase/firebase-auth';
// import { useAuthContext } from '../../context/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  // const { login: loginCtx } = useAuthContext();

  const [isLoggingIn, setIsLoggingIn] = useState(true);

  // const navigate = useNavigate();

  const validateEmail = value => value.trim() !== '' && value.includes('@');
  const validatePassword = value => value.trim() !== '' && value.length >= 6;

  const {
    value: enteredEmail,
    isValid: enterdEmailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInput: resetEmailInput,
  } = useInput(validateEmail);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetInput: resetPasswordInput,
  } = useInput(validatePassword);

  // Form validity
  let formIsValid = false;

  if (enterdEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = async event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    // const authService = isLoggingIn ? login : signup;

    // try {
    //   const { idToken, expirationTime } = await authService(
    //     enteredEmail,
    //     enteredPassword
    //   );

    //   loginCtx(idToken, expirationTime);

    //   resetEmailInput();
    //   resetPasswordInput();

    //   navigate('/products', { replace: true });
    // } catch (error) {
    //   const errorCode = error.code;
    //   alert(errorCode);
    // }
  };

  const switchAuthModeHandler = () => {
    setIsLoggingIn(prevState => !prevState);
  };

  return (
    <div className={classes.flex}>
      <Card className={classes.card}>
        <h1>{isLoggingIn ? 'Login' : 'Sign Up'}</h1>

        <form onSubmit={formSubmitHandler}>
          <Input
            id="email"
            type="email"
            label="Your Email"
            onChangeHandler={emailChangeHandler}
            onBlurHandler={emailBlurHandler}
            InputHasError={emailInputHasError}
            value={enteredEmail}
            errorMessage="Please enter a valid email."
          />

          <Input
            id="password"
            type="password"
            label="Your Password"
            onChangeHandler={passwordChangeHandler}
            onBlurHandler={passwordBlurHandler}
            InputHasError={passwordInputHasError}
            value={enteredPassword}
            errorMessage="Please enter a password more than 6 characters."
          />

          <div className={classes.actions}>
            {<button>{isLoggingIn ? 'Login' : 'Create Account'}</button>}

            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLoggingIn
                ? 'Create new account'
                : 'Login with existing account'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AuthForm;

// return (
//   <div className={classes.container}>
//     <Card>
//       <form onSubmit={formSubmitHandler} className={classes.form}>
//         <div className={usernameInputClasses}>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             onChange={usernameChangeHandler}
//             onBlur={usernameBlurHandler}
//             value={enteredUsername}
//           />
//           {usernameInputHasError && <p>Please enter a valid username.</p>}
//         </div>

//         <div className={passwordInputClasses}>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             onChange={passwordChangeHandler}
//             onBlur={passwordBlurHandler}
//             value={enteredPassword}
//           />
//           {passwordInputHasError && (
//             <p>Please enter password more than 6 characters.</p>
//           )}
//         </div>

//         <button>Login</button>
//       </form>
//     </Card>
//   </div>
// );

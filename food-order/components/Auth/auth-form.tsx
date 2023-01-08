import React, { useState, useContext } from 'react';

import Input from '../ui/FormElements/Input';
import Button from '../ui/FormElements/button';

import useForm from '../../hooks/use-form';

import AuthContext from '../../context/auth-context';
import { useRouter } from 'next/router';

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../utils/validators';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const auth = useContext(AuthContext);

  const router = useRouter();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const switchAuthModeHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  const switchRoleHandler = () => {
    setIsOwner((prevState) => !prevState);
  };

  const formSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formState.isValid) {
      return;
    }

    if (isLoginMode) {
      // POST LOGIN DATA

      try {
        const loginResponse = await fetch('http://localhost:8000/login', {
          method: 'POST',
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // console.log(loginResponse);

        const loginData = await loginResponse.json();

        auth.login(loginData.userId, loginData.token, null, loginData.isOwner);

        if (loginData.isOwner) {
          // router.replace(`/restaurants/${restaurntId}`);
        }

        router.replace('/restaurants');
      } catch (error) {
        alert(error);
      }
    } else {
      // POST SIGNUP DATA

      let responseBody;

      if (!isOwner) {
        responseBody = {
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        };
        
      } else {
        responseBody = {
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          isOwner: true,
        };
      }

      try {
        const signupResponse = await fetch('http://localhost:8000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(responseBody),
        });

        const signupData = await signupResponse.json();

        auth.login(
          signupData.userId,
          signupData.token,
          null,
          signupData.isOwner
        );

        if (signupData.isOwner) {
          // router.replace(`/restaurants/${restaurntId}`);
        }

        router.replace('/restaurants');
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes['img-container']}></div>

      <div className={classes.authentication}>
        <h2>
          {isLoginMode
            ? 'Login Required'
            : `Sign Up  ${isOwner ? '(As Owner)' : ''}`}
        </h2>
        <form onSubmit={formSubmitHandler}>
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorMessage="Please enter a valid email."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorMessage="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />

          <div className={classes.action}>
            <Button submit>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
          </div>
        </form>

        <p className={classes.toggle}>
          {isLoginMode ? 'Not a member' : 'Already a member?'}{' '}
          <a onClick={switchAuthModeHandler}>
            {isLoginMode ? 'Signup' : 'Login'}
          </a>
        </p>

        {!isLoginMode && (
          <p className={classes.toggle}>
            {isOwner ? 'Are you a client?' : 'Are you a restaurant Owner?'}{' '}
            <a onClick={switchRoleHandler}>
              {' '}
              {isOwner ? 'Signup as client' : 'Signup now!'}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;

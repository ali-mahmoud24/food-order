import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

const getUserData = () => {
  let userData = {
    token: null,
    tokenExpirationDate: null,
    userId: null,
    isOwner: false,
  };

  try {
    const localStorageResult =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('userData'))
        : null;

    if (localStorageResult) {
      userData = localStorageResult;
    }
  } catch (error) {
    console.log(error);
  }

  return userData;
};

export const useAuth = () => {
  const [userSession, setUserSession] = useState(getUserData());
  const { token, tokenExpirationDate, userId, isOwner } = userSession;

  const login = useCallback((uid, token, expirationDate, isOwner) => {
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setUserSession({
      token,
      userId: uid,
      tokenExpirationDate,
      isOwner,
    });
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
        isOwner,
      })
    );

    // console.log('logged In', token, userId);
  }, []);

  const logout = useCallback(() => {
    setUserSession({
      token: null,
      userId: null,
      tokenExpirationDate: null,
      isOwner: null,
    });
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration),
        storedData.isOwner
      );
    }
  }, [login]);

  return { token, login, logout, userId, isOwner };
};

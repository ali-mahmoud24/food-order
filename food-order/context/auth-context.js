import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  isOwner: false,
  userId: null,
  token: null,
  login: (userId, token, expirationDate, isOwner) => {},
  logout: () => {},
});

export default AuthContext;

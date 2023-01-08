import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  isOwner: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;

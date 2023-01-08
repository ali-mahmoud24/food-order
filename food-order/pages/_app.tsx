import '../styles/globals.css';
import type { AppProps } from 'next/app';

// import Layout from '../components/layout/layout';

import AuthContext from '../context/auth-context';
import { useAuth } from '../hooks/use-auth';
import Layout from '../components/temp/Layout';

export default function App({ Component, pageProps }: AppProps) {
  const { token, login, logout, userId, isOwner } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        isOwner,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  );
}

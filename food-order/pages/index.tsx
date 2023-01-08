import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import AuthForm from '../components/Auth/auth-form';
import AuthContext from '../context/auth-context';

export default function Home() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    authCtx.token ? router.push('/restaurants') : router.push('/');
  }, []);
  return (
    <>
      <Head>
        <title>Food order</title>
        <meta
          name="description"
          content="Order from your favorite resturants"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthForm />;
    </>
  );
}

import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import AuthForm from '../components/Auth/auth-form';
import AuthContext from '../context/auth-context';

export default function Home() {
  const { isLoggedIn, isOwner } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/restaurants');
    }
    // if(isOwner){
    //   router.replace('')
    // }
  }, [isLoggedIn, isOwner]);
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

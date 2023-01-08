import Head from 'next/head';

import Hero from '../components/home-page/hero';
export default function Home() {
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

      <Hero />
    </>
  );
}

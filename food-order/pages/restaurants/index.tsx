import ResturantList from '../../components/restaurants/restaurant-list';

import { GetStaticProps } from 'next';
import Restaurant from '../../models/restaurant';

import axios from 'axios';
import { useEffect, useState } from 'react';

const AllRestaurantsPage: React.FC<{ restaurants: Restaurant[] }> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedRestaurants, setLoadedRestaurants] = useState<Restaurant[]>(
    props.restaurants
  );

  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);

      const res = await fetch(`http://localhost:8000/client/restaurants`);

      const allRestaurants = await res.json();

      console.log(allRestaurants);
      setIsLoading(false);

      setLoadedRestaurants(allRestaurants);
    };
    fetchRestaurants();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // const { restaurants } = props;
  return (
    <>
      <ResturantList restaurants={loadedRestaurants} />;
    </>
  );
};

export default AllRestaurantsPage;

export const getStaticProps: GetStaticProps = async () => {
  const allRestaurants = await axios.get(
    `http://localhost:8000/client/restaurants`
  );

  console.log(allRestaurants);

  if (!allRestaurants) {
    return { notFound: true };
  }

  return {
    props: {
      restaurants: allRestaurants,
    },
    revalidate: 100,
  };
};

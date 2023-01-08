import ResturantList from '../../components/restaurants/restaurant-list';

import { GetStaticProps } from 'next';
import Restaurant from '../../models/restaurant';

import axios from 'axios';

const AllRestaurantsPage: React.FC<{ restaurants: Restaurant[] }> = (props) => {
  const { restaurants } = props;

  if (!restaurants) {
    return <div>Loading...</div>;
  }

  if (restaurants.length === 0) {
    return <div>Sorry, no restaurants available now.</div>;
  }

  return (
    <>
      <ResturantList restaurants={restaurants} />;
    </>
  );
};

export default AllRestaurantsPage;

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(`http://localhost:8000/client/restaurants`);

  const { restaurants } = response.data;

  if (!restaurants) {
    return { notFound: true };
  }

  return {
    props: {
      restaurants: restaurants,
    },
    revalidate: 100,
  };
};

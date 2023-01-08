import { getRestaurantById } from '../../dummy-data';
import { GetServerSideProps } from 'next';

import { useRouter } from 'next/router';

import Resturant from '../../models/restaurant';

import RestaurantSummary from '../../components/restaurant-detail/restaurant-summary';
import RestaurantLogistics from '../../components/restaurant-detail/restaurant-logistics';
import RestaurantContent from '../../components/restaurant-detail/restaurant-content';

import axios from 'axios';

import Menu from '../../components/menu/menu';

const ResturantDetailPage: React.FC<{ restaurant: Resturant }> = (props) => {
  const { restaurant } = props;

  const router = useRouter();
  const { restaurantId } = router.query;

  if (!restaurant) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <RestaurantSummary title={restaurant.name} />
      <RestaurantLogistics
        address={restaurant.address}
        image={restaurant.image}
        imageAlt={restaurant.name}
        category={restaurant.category}
      />
      {/* <Button link="owner/edit-restaurant">Edit Restaurant</Button> */}
      {/* <RestaurantContent>
        <p>{restaurant.category}</p>
      </RestaurantContent> */}
      <Menu menuItems={restaurant.products} />;
    </>
  );
};

export default ResturantDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { restaurantId } = context.params;
  console.log(context.params);

  const loadedRestaurant = await axios.get(
    `http://localhost:8000/client/restaurants/${restaurantId}`
  );

  if (!loadedRestaurant) {
    return { notFound: true };
  }

  return {
    props: { restaurant: loadedRestaurant },
  };
};

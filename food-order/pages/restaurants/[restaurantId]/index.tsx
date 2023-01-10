import { getRestaurantById } from '../../../dummy-data';
import { GetServerSideProps } from 'next';

import { useRouter } from 'next/router';

import Resturant from '../../../models/restaurant';

import RestaurantSummary from '../../../components/restaurant-detail/restaurant-summary';
import RestaurantLogistics from '../../../components/restaurant-detail/restaurant-logistics';
import RestaurantContent from '../../../components/restaurant-detail/restaurant-content';

import axios from 'axios';

import Menu from '../../../components/menu/menu';
import Button from '../../../components/ui/FormElements/button';

import AuthContext from '../../../context/auth-context';
import { useContext } from 'react';

const ResturantDetailPage: React.FC<{ restaurant: Resturant }> = (props) => {
  const { restaurant } = props;
  const { isOwner } = useContext(AuthContext);

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

      {isOwner && (
        <>
          <div className="center" style={{ marginTop: 2 + 'rem' }}>
            <Button link={`/restaurants/${restaurantId}/update-restaurant`}>
              Edit Restaurant
            </Button>
          </div>

          <div className="center" style={{ marginTop: 2 + 'rem' }}>
            <Button link={`/restaurants/${restaurantId}/add-product`}>
              Add products
            </Button>
          </div>
        </>
      )}
      {restaurant.products.length === 0 ? (
        <p
          className="center"
          style={{ fontSize: 2 + 'rem', marginTop: 2 + 'rem' }}
        >
          No proudcts in this restaurant.
        </p>
      ) : (
        <Menu products={restaurant.products} restaurantId = {restaurantId} />
      )}
    </>
  );
};

export default ResturantDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { restaurantId } = context.params;

  const response = await axios.get(
    `http://localhost:8000/client/restaurants/${restaurantId}`
  );

  const { restaurant } = response.data;

  if (!restaurant) {
    return { notFound: true };
  }

  return {
    props: { restaurant: restaurant },
  };
};

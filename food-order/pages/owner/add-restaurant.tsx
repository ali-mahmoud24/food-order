import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../context/auth-context';
import NewRestaurant from '../../components/restaurants/new-restaurant';

const NewRestaurantPage: React.FC = () => {
  const router = useRouter();
  const { isOwner } = useContext(AuthContext);
  
  useEffect(() => {
    if (!isOwner) {
      router.replace('/restaurants');
    }
  }, [isOwner]);

  return <NewRestaurant />;
};

export default NewRestaurantPage;

import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import UpdateRestaurant from '../../../components/restaurants/update-restaurant';
import AuthContext from '../../../context/auth-context';

const UpdateRestaurantPage: React.FC = () => {
  const router = useRouter();
  const { isOwner } = useContext(AuthContext);

  useEffect(() => {
    if (!isOwner) {
      router.replace('/restaurants');
    }
  }, [isOwner]);

  return <UpdateRestaurant />;
};

export default UpdateRestaurantPage;

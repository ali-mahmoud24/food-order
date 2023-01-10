import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import UpdateProduct from '../../../../components/forms/update-product';
import AuthContext from '../../../../context/auth-context';

const UpdateProductPage: React.FC = () => {
  const router = useRouter();
  const { isOwner } = useContext(AuthContext);

  useEffect(() => {
    if (!isOwner) {
      router.replace('/restaurants');
    }
  }, [isOwner]);

  return <UpdateProduct />;
};

export default UpdateProductPage;

import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import NewProduct from '../../../components/forms/new-product';
import AuthContext from '../../../context/auth-context';

const NewProductPage: React.FC = () => {
  const router = useRouter();
  const { isOwner } = useContext(AuthContext);

  useEffect(() => {
    if (!isOwner) {
      router.replace('/restaurants');
    }
  }, [isOwner]);
  return <NewProduct />;
};

export default NewProductPage;

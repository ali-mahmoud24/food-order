import OrderList from '../../components/orders/order-list';

import { getAllOrders } from '../../dummy-data';
import { GetStaticProps } from 'next';
import Order from '../../models/order';

const AllOrdersPage: React.FC<{ orders: Order[] }> = (props) => {
  const { orders } = props;
  return <OrderList orders={orders} />;
};

export default AllOrdersPage;

export const getStaticProps: GetStaticProps = async () => {
  const allOrders = getAllOrders();

  return {
    props: {
      orders: allOrders,
    },
    revalidate: 100,
  };
};

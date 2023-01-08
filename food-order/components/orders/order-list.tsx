import Order from '../../models/order';

import OrderItem from './order-item';

import classes from './order-list.module.css';

const OrderList: React.FC<{ orders: Order[] }> = (props) => {
  const { orders } = props;

  return (
    <>
      <ul className={classes.list}>
        {orders.map((order: Order) => (
          <OrderItem
            key={order.id}
            id={order.id}
            restaurant={order.restaurant}
            totalPrice={order.totalPrice}
            location={order.location}
            date={order.date}
            status={order.status}
          />
        ))}
      </ul>
    </>
  );
};

export default OrderList;

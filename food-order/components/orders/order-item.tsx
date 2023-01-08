import Restaurant from '../../models/restaurant';

import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';

import classes from './order-item.module.css';

const OrderItem: React.FC<{
  id: string;
  restaurant: Restaurant;
  //   user: User;
  date: string;
  location: string;
  totalPrice: number;
  status: string;
}> = (props) => {
  const { id, restaurant, date, location, totalPrice, status } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-us', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');

  return (
    <li className={classes.item}>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h3>{restaurant.name}</h3>
          <h4>Customer: Ali Mahmoud</h4>
          <h4>Total Price: {totalPrice}</h4>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{formattedAddress}</address>
        </div>

        <div className={classes.date}>
          <DateIcon />
          <time>{humanReadableDate}</time>
        </div>

        <div>Status: {status}</div>
      </div>
    </li>
  );
};

export default OrderItem;

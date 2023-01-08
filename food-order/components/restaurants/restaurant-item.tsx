import Image from 'next/image';

import Button from '../ui/FormElements/button';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import classes from './restaurant-item.module.css';

const RestaurantItem: React.FC<{
  id: number;
  name: string;
  image: string;
  location: string;
  category: string;
}> = (props) => {
  const { id, name, image, location, category } = props;

  const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/restaurants/${id}`;

  return (
    <li className={classes.item}>
      <Image
        src={`/images/restaurants/${image}`}
        alt={name}
        width={300}
        height={300}
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{name}</h2>
          <h4>Category: {category}</h4>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{formattedAddress}</address>
        </div>
      </div>
      <div className={classes.actions}>
        <Button link={exploreLink}>
          <span>Order Now!</span>
          <span className={classes.icon}>
            <ArrowRightIcon />
          </span>
        </Button>
      </div>
    </li>
  );
};

export default RestaurantItem;

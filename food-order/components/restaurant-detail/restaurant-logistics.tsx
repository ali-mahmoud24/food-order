import Image from 'next/image';

import AddressIcon from '../icons/address-icon';
import LogisticsItem from './logistics-item';

import classes from './restaurant-logistics.module.css';

const RestaurantLogistics: React.FC<{
  address: string;
  image: string;
  imageAlt: string;
  category: string;
}> = (props) => {
  const { address, image, imageAlt, category } = props;

  const addressText = address.replace(', ', '\n');

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image
          src={`/images/restaurants/${image}`}
          alt={imageAlt}
          width={300}
          height={300}
        />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
        <div>{category}</div>
      </ul>
    </section>
  );
};

export default RestaurantLogistics;

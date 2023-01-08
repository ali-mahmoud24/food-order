import { useContext } from 'react';

import Image from 'next/image';

import MealItemForm from './menu-item-form';

import CartContext from '../../store/cart-context';

import classes from './menu-item.module.css';

const MenuItem: React.FC<{
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}> = (props) => {
  const { id, name, price, description, image } = props;

  const formattedPrice = `EGP ${price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.item}>
      <Image
        src={`/images/products/${image}`}
        alt={name}
        width={300}
        height={300}
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{name}</h2>
          <h5>{description}</h5>
          <h4>EGP {formattedPrice}</h4>
        </div>
      </div>
      <MealItemForm id={id} onAddTocart={addToCartHandler} />
    </li>
  );
};

export default MenuItem;

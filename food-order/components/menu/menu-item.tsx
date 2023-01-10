import { useContext } from 'react';

import AuthContext from '../../context/auth-context';
import CartContext from '../../store/cart-context';

import { useRouter } from 'next/router';

import MealItemForm from './menu-item-form';
import Button from '../ui/FormElements/button';

import axios from 'axios';

import classes from './menu-item.module.css';

const MenuItem: React.FC<{
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  restaurantId: string;
  onDelete: (productId: string) => void;
}> = (props) => {
  const {
    id: productId,
    title,
    price,
    description,
    image,
    restaurantId,
  } = props;

  const { isOwner } = useContext(AuthContext);
  const router = useRouter();

  const formattedPrice = `EGP ${price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({
      id: productId,
      name: title,
      amount: amount,
      price: price,
    });
  };

  const deleteProductHandler = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/owner/restaurants/${restaurantId}/${productId}`
      );
      console.log(response);
      props.onDelete(productId);
    } catch (err) {
      console.log(err);
    }
  };

  const redirectToEdit = () => {
    router.push(`restaurants/${restaurantId}/${productId}/update-product`);
  };

  return (
    <li className={classes.item}>
      <div className={classes.img}>
        <img src={`http://localhost:8000/${image}`} alt={title} />
      </div>

      <div className={classes.content}>
        <div className={classes.summary}>
          <h3>{title}</h3>
          <h5>{description}.</h5>
          <h4>{formattedPrice}</h4>
        </div>

        <div className={classes.actions}>
          {isOwner ? (
            <>
              <Button
                link={`/restaurants/${restaurantId}/${productId}/update-product`}
              >
                Edit
              </Button>
              <Button onClick={deleteProductHandler}>Delete</Button>
            </>
          ) : (
            <MealItemForm id={productId} onAddTocart={addToCartHandler} />
          )}
        </div>
      </div>
    </li>
  );
};

export default MenuItem;

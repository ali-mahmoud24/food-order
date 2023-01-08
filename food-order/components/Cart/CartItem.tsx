import classes from './CartItem.module.css';

const CartItem: React.FC<{
  onAdd: () => void;
  onRemove: () => void;
  name: string;
  price: number;
  amount: number;
}> = (props) => {
  const { name, price, amount } = props;

  const formattedPrice = `EGP ${price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{formattedPrice}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;

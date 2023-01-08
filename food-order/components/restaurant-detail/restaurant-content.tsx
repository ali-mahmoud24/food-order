import classes from './restaurant-content.module.css';

const RestaurantContent: React.FC = (props) => {
  return <section className={classes.content}>{props.children}</section>;
};

export default RestaurantContent;

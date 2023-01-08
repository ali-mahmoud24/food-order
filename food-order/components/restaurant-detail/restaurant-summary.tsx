import classes from './restaurant-summary.module.css';

const RestaurantSummary: React.FC<{ title: string }> = (props) => {
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export default RestaurantSummary;

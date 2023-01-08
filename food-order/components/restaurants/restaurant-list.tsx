import Restaurant from '../../models/restaurant';

import ResturantsSearch from './restaurants-search';
import ResturantItem from './restaurant-item';

import { useState } from 'react';

import classes from './restaurant-list.module.css';

const ResturantList: React.FC<{ restaurants: Restaurant[] }> = (props) => {
  const { restaurants } = props;

  const [restaurantsList, setRestaurants] = useState<Restaurant[]>(restaurants);

  const findRestaurantsHandler = (
    enteredName: string,
    selectedCategory: string
  ) => {
    setRestaurants((prevRestaurants) => {
      return prevRestaurants.filter(
        (restaurant: Restaurant) =>
          restaurant.name.includes(enteredName) &&
          restaurant.category === selectedCategory
      );
    });
  };

  return (
    <>
      <ResturantsSearch onSearch={findRestaurantsHandler} />

      <ul className={classes.list}>
        {restaurantsList.map((restaurant: Restaurant) => (
          <ResturantItem
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            image={restaurant.image}
            category={restaurant.category}
            location={restaurant.location}
          />
        ))}
      </ul>
    </>
  );
};

export default ResturantList;

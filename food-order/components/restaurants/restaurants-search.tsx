import React, { useRef } from 'react';

import Button from '../ui/FormElements/button';
import classes from './restaurants-search.module.css';

const RestaurantsSearch: React.FC<{
  onSearch: (enteredName: string, selectedCategory: string) => void;
}> = (props) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredName = nameInputRef.current!.value.toLowerCase();
    const selectedCategory = categoryInputRef.current!.value;

    if (
      enteredName.trim().length === 0 ||
      selectedCategory.trim().length === 0
    ) {
      return;
    }

    props.onSearch(enteredName, selectedCategory);

    console.log(enteredName, selectedCategory);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="resturant">Resturant name</label>
          <input
            id="resturant"
            ref={nameInputRef}
            placeholder="Search By name"
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryInputRef}>
            <option value="syrian-food">Syrian Food</option>
            <option value="fried-chicken">Fried Chicken</option>
            <option value="burger">Burger</option>
            <option value="pizza">Pizza</option>
          </select>
        </div>
      </div>
      <Button>Find Resturants</Button>
    </form>
  );
};

export default RestaurantsSearch;

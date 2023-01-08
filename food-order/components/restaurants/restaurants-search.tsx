import { categoryOptions } from '../../utils/categoryList';

import classes from './restaurants-search.module.css';

const RestaurantsSearch: React.FC<{
  onSearch: ({ name, category }) => void;
  name: string;
  category: string;
}> = ({ name, category, onSearch }) => {
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="resturant">Resturant name</label>
          <input
            id="resturant"
            value={name}
            onChange={(event) => onSearch({ name: event.target.value })}
            placeholder="Search By name"
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(event) => onSearch({ category: event.target.value })}
          >
            <option value="">Select</option>
            {categoryOptions}
          </select>
        </div>
      </div>
    </form>
  );
};

export default RestaurantsSearch;

import Product from '../../models/product';

import MenuItem from './menu-item';

import classes from './menu.module.css';

const Menu: React.FC<{ menuItems: Product[] }> = (props) => {
  const { menuItems } = props;

  return (
    <ul className={classes.list}>
      {menuItems?.map((item: Product) => (
        <MenuItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          description={item.description}
          image={item.image}
        />
      ))}
    </ul>
  );
};

export default Menu;

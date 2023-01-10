import { useState } from 'react';
import Product from '../../models/product';

import MenuItem from './menu-item';

import classes from './menu.module.css';

const Menu: React.FC<{ products: Product[]; restaurantId: string }> = (
  props
) => {
  const { products, restaurantId } = props;

  const [loadedProducts, setLoadedProducts] = useState(products);

  const productDeletedHandler = (deletedProductId: string) => {
    setLoadedProducts((prevProducts) =>
      prevProducts.filter((product: Product) => product.id !== deletedProductId)
    );
  };

  return (
    <ul className={classes.list}>
      {loadedProducts?.map((item: Product) => (
        <MenuItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
          image={item.image}
          restaurantId={restaurantId}
          onDelete={productDeletedHandler}
        />
      ))}
    </ul>
  );
};

export default Menu;

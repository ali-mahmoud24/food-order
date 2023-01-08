// import MainHeader from './main-header';
import { useState } from 'react';

import Header from './Header';
import CartProvider from '../../store/CartProvider';
import Cart from '../Cart/Cart';

const Layout: React.FC = (props) => {
  const [cartIsShown, setCartIsShown] = useState<boolean>(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>{props.children}</main>
      </CartProvider>
    </>
  );
};

export default Layout;

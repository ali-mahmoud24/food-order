import Cart from '../Cart/Cart';
import Header from './Navigation';

import classes from './Layout.module.css';
import MainHeader from './MainHeader';
import Navigation from './Navigation';

const Layout: React.FC<{ children: any; onShowCart: () => void }> = ({
  children,
  onShowCart,
}) => {
  return (
    <>
      <MainHeader onShowCart={onShowCart} />
      <main className={classes.main}>{children}</main>
    </>
  );
};

export default Layout;

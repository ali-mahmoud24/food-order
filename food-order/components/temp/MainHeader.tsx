import Link from 'next/link';
import Navigation from './Navigation';

import HeaderCartButton from '../layout/HeaderCartButton';

import classes from './MainHeader.module.css';

const MainHeader: React.FC<{ onShowCart: () => void }> = (props) => {
  return (
    <header className={classes.header}>
      <h1>
        <Link href={'/'}>Food Order</Link>
      </h1>
      {/* <HeaderCartButton /> */}

      <Navigation onShow={props.onShowCart} />
    </header>
  );
};

export default MainHeader;

import HeaderCartButton from '././HeaderCartButton';
import Image from 'next/image';
import mealsImage from '../../assets/meals.jpg';

import classes from './Header.module.css';

const Header: React.FC<{ onShowCart: () => void }> = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <Image src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;

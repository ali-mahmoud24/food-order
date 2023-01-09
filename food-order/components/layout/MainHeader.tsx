import { useRouter } from 'next/router';
import { useContext } from 'react';

import AuthContext from '../../context/auth-context';

import Navigation from './Navigation';
import HeaderCartButton from '../Cart/HeaderCartButton';

import classes from './MainHeader.module.css';

const MainHeader: React.FC<{ onShowCart: () => void }> = (props) => {
  const { logout, isLoggedIn, isOwner } = useContext(AuthContext);
  const router = useRouter();

  const logoutHandler = () => {
    logout();
    router.replace('/');
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <h2>Food Order</h2>
      </div>
      <Navigation />

      {!isOwner && isLoggedIn && (
        <HeaderCartButton onClick={props.onShowCart} />
      )}
      {isLoggedIn && (
        <button onClick={logoutHandler} className={classes['btn-login']}>
          Logout
        </button>
      )}
    </header>
  );
};

export default MainHeader;

import { useRouter } from 'next/router';
import Link from 'next/link';
// import { useContext } from 'react';

// import CartButton from '../ui/FormElements/';

import AuthContext from '../../context/auth-context';

import classes from './Navigation.module.css';
import HeaderCartButton from '../layout/HeaderCartButton';
import { useContext } from 'react';

const Navigation: React.FC<{ onShow: () => void }> = (props) => {
  const { logout, token } = useContext(AuthContext);
  const router = useRouter();

  const logoutHandler = async () => {
    logout();
    router.replace('/');
  };

  return (
    <nav className={classes.nav}>
      <ul>
        {token && (
          <>
            <li>
              <HeaderCartButton onClick={props.onShow} />
            </li>

            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </>
        )}

        {/* {!token && (
          <li>
            <Link href={'/'}>
              <button>Login</button>
            </Link>
          </li>
        )} */}
      </ul>
    </nav>
  );
};

export default Navigation;

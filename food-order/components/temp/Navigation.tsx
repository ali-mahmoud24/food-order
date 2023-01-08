import { useRouter } from 'next/router';
import Link from 'next/link';
// import { useContext } from 'react';

// import CartButton from '../ui/FormElements/';

import AuthContext from '../../context/auth-context';
import { useAuth } from '../../hooks/use-auth';

import classes from './Navigation.module.css';
import HeaderCartButton from '../layout/HeaderCartButton';

const Navigation: React.FC<{ onShow: () => void }> = (props) => {
  const { token, login, logout, userId, isOwner } = useAuth();
  // const router = useRouter();

  const logoutHandler = async () => {
    logout();
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

        {!token && (
          <li>
            <Link href={'/auth'}>
              <button>Login</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

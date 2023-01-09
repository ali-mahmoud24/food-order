import Link from 'next/link';

import { useContext } from 'react';

import AuthContext from '../../context/auth-context';

import { useRouter } from 'next/router';

import classes from './Navigation.module.css';

const Navigation: React.FC = () => {
  const { logout, isLoggedIn, isOwner } = useContext(AuthContext);
  const router = useRouter();

  const logoutHandler = () => {
    logout();
    router.replace('/');
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes['nav-center']}>
        <ul className={classes['nav-links']}>
          {isLoggedIn && (
            <>
              {!isOwner && (
                <li>
                  <Link className={classes['nav-link']} href="/restaurants">
                    Restaurants
                  </Link>
                </li>
              )}

              <li>
                <Link className={classes['nav-link']} href="/Orders">
                  Orders
                </Link>
              </li>

              {isOwner && (
                <li>
                  <Link
                    className={classes['nav-link']}
                    href="/owner/add-restaurant"
                  >
                    Add Restaurant
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Navigation;

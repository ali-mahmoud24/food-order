import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// import logo from '../../images/logo-1.svg';

import Link from 'next/link';

import { useState, useContext } from 'react';

import AuthContext from '../../context/auth-context';

import { useRouter } from 'next/router';

import classes from './Header.module.css';
const Header: React.FC = () => {
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks((state) => !state);
  };

  const { logout, isLoggedIn, isOwner } = useContext(AuthContext);
  const router = useRouter();

  const logoutHandler = () => {
    logout();
    router.replace('/');
  };

  return (
    <header>
      <nav className={classes.navbar}>
        <div className={classes['nav-center']}>
          <div className={classes['nav-header']}>
            <div className="center">
              <button onClick={toggleLinks} className={classes['nav-toggle']}>
                <FontAwesomeIcon icon={faBars} />
              </button>
              <div className={classes.logo}>
                {/* <Link href={'/restaurants'}> */}
                <h2>Food Order</h2>
                {/* </Link> */}
              </div>
            </div>

            {isLoggedIn && (
              <button
                onClick={logoutHandler}
                className={classes['btn-login-mobile']}
              >
                Logout
              </button>
            )}
          </div>

          <ul
            className={`${classes['nav-links']} ${
              showLinks ? classes['show-links'] : ''
            }`}
          >
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

          {isLoggedIn && (
            <button
              onClick={logoutHandler}
              className={classes['btn-login-desktop']}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;

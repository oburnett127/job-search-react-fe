import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './UserContext';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Jobs
            </NavLink>
          </li>
          {!isLoggedIn && (
              <li>
                <NavLink
                  to="/auth"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Login / Signup
                </NavLink>
              </li>
            )
          }
          {isLoggedIn && (
              <li>
                <NavLink
                  to="/logout"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Logout
                </NavLink>
              </li>             
            )
          }
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

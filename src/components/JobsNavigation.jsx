import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './UserContext';
import classes from './JobsNavigation.module.css';

function JobsNavigation() {
  const { isLoggedIn } = useContext(UserContext);
  const { user } = useContext(UserContext);

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Jobs
            </NavLink>
          </li>
          <li>
          {isLoggedIn && user?.roles === 'EMPLOYER' && (
            <NavLink
              to="/jobs/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Job
            </NavLink>
          )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default JobsNavigation;

import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './JobsNavigation.module.css';

function JobsNavigation() {
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
            <NavLink
              to="/jobs/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Job
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default JobsNavigation;

import React from 'react';
import PageContent from '../components/PageContent';
import {Link} from 'react-router-dom';
import classes from './Home.module.css';

function HomePage() {
  return (
    <PageContent title="Welcome!">
      <p>There's a job for everyone!</p>
      <div className={classes.flex}>
          <Link className={classes.link} to={"/jobs"}>Find a job</Link>
          <Link className={classes.link} to={"/jobs/new"}>Post a job</Link>
      </div>
      <div className={classes.floatRight}>

      </div>
    </PageContent>
  );
}

export default HomePage;

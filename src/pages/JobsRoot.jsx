import React from 'react';
import { Outlet } from 'react-router-dom';
import JobsNavigation from '../components/JobsNavigation';

function JobsRootLayout() {
  return (
    <>
      <JobsNavigation />
      <Outlet />
    </>
  );
}

export default JobsRootLayout;

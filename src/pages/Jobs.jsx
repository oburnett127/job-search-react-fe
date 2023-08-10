import React from 'react';
import JobsList from '../components/JobsList';
import { useQuery } from 'react-query';
import axios from "axios";

function JobsPage() {
  const csrfToken = sessionStorage.getItem('csrfToken');
  const jwtToken = localStorage.getItem('jwtToken');

  const { data: jobsData, isLoading: isLoadingJobs } = useQuery('jobs',
      () => { return axios.get(process.env.REACT_APP_SERVER_URL + '/job/list', {
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfToken,
          'Authorization': `Bearer ${jwtToken}`,
      },
      credentials: 'include'
      });}
  );

  const jobs = isLoadingJobs ? [] : jobsData;
  //console.log(jobs);

  return (
      <>
        {isLoadingJobs && <p>Loading...</p>}
        
        {!isLoadingJobs && (
            <JobsList jobs={jobs} />
        )}
      </>
  );
}

export default JobsPage;

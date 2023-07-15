import React from 'react';
import JobsList from '../components/JobsList';
import { useQuery } from 'react-query';
import axios from "axios";

function JobsPage() {
  const { data: jobsData, isLoading: isLoadingJobs } = useQuery('jobs',
      () => { return axios.get(process.env.REACT_APP_SERVER_URL + '/job/list');}
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

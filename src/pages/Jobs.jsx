import React, { useContext } from 'react';
import JobsList from '../components/JobsList';
import { useQuery } from 'react-query';
import axios from "axios";
import { checkAuthLoader } from '../util/auth';
import { UserContext } from '../components/UserContext';

function JobsPage() {
  const { isLoggedIn } = useContext(UserContext);
  const token = checkAuthLoader();
  //console.log("jwt string: " + token);

  const { data: jobsData, isLoading: isLoadingJobs } = useQuery('jobs',
      () => { return axios.get("http://localhost:8080/job/list", {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });},
      { keepPreviousData: true }
  );

  const jobs = isLoadingJobs ? [] : jobsData;
  //console.log(jobs);

  return (
      <>
        {!isLoggedIn && <p style={{textAlign:'center'}}>You must login before you can view the available job opportunities</p>}
        {isLoggedIn && isLoadingJobs && <p>Loading...</p>}
        
        {!isLoadingJobs && (
            <JobsList jobs={jobs} />
        )}
      </>
  );
}

export default JobsPage;

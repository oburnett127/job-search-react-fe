import React, { useState } from 'react';
import JobsList from '../components/JobsList';
import { useQuery } from 'react-query';
import axios from "axios";
import { checkAuthLoader } from '../util/auth';

function JobsPage() {
  const token = checkAuthLoader();

  console.log("jwt string: " + token);

  const [page, setPage] = useState(1);

  const { data: jobsData, isLoading: isLoadingJobs } = useQuery(['jobs', page],
      () => { return axios.get("http://localhost:8080/job/list", {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });},
      { keepPreviousData: true }
  );

  const jobs = isLoadingJobs ? [] : jobsData;

  console.log(jobs);

  return (
      <>
        {isLoadingJobs && <p>Loading...</p>}
        
        {!isLoadingJobs && (
          <>
            <JobsList jobs={jobs} />

            <div className="nav btn-container">
              <button
                onClick={() => setPage((prevState) => Math.max(prevState - 1, 0))}
                disabled={page === 1}
              >
                Prev Page
              </button>

              <button onClick={() => setPage((prevState) => prevState + 1)}>
                Next Page
              </button>
            </div>
          </>
        )}
      </>
  );
}

export default JobsPage;
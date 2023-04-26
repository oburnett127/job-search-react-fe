import React from 'react';
import { useLocation } from 'react-router-dom';
import JobApplyForm from "../components/JobApplyForm";

function ApplyJobPage() {
  const location = useLocation();
  const job = location.state.job;

  console.log(job);

  return (
    <JobApplyForm job={job} />
  );
}

export default ApplyJobPage;

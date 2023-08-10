import React from 'react';
import { useLocation } from 'react-router-dom';
import JobUpdateForm from "../components/JobUpdateForm";

function UpdateJobPage() {
 const location = useLocation();
 const job = location.state.jobData;

  return <JobUpdateForm job={job} />;
}

export default UpdateJobPage;

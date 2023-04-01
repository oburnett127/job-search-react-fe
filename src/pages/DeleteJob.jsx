import React from 'react';
import JobDeleteForm from "../components/JobDeleteForm";
import {useParams} from "react-router-dom";

function DeleteJobPage() {
  const {id} = useParams();

  return <JobDeleteForm id={id}/>;
}

export default DeleteJobPage;

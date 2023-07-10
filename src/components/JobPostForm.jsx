import React, { useState, useContext } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import classes from './JobPostForm.module.css';
import { UserContext } from './UserContext';
import { useForm } from 'react-hook-form';

function JobPostForm({ method }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const isSubmitting = navigation.state === 'submitting';
  const [message, setMessage] = useState(null);

  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = (data) => {
    console.log("inside handleSubmit, empID is: " + user?.employerId);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: data.title, employerId: user?.employerId, description: data.description})
    };
  
    fetch('http://localhost:8080/job/create', requestOptions)
    .then((response) => {
      console.log(response);
      if(response.ok) {
        setMessage('Your job was successfully created.');
      }
    })
    .catch((error => {
      if(error.response) {
        console.log(error.response);
        setMessage('An error occurred. Your job could not be created.');
      } else if(error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    }));
  }

  const handleCancel = () => {
    navigate('..');
  }

  return (
    <>
      <p className={classes.message}>{message}</p>
      <form method={method} className={classes.form} errors={errors} onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" {...register("title", {required: true})} />
        </p>
        {errors?.title && <span>The title is required.</span>}
        <p>
          <label htmlFor="description">Description</label>
          <textarea {...register("description", {required: true})} />
        </p>
        {errors?.description && <span>The description is required.</span>}
        <div className={classes.actions}>
          <button type="button" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default JobPostForm;

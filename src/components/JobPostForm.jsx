import React, { useState, useContext } from 'react';
import { Form, useNavigate, useNavigation, useActionData, json, redirect } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import classes from './JobPostForm.module.css';
import { UserContext } from './UserContext';

function JobPostForm({ method }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { userEmail } = useContext(UserContext);

  const isSubmitting = navigation.state === 'submitting';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const { data: userAccount } = useQuery('userAccount',
      () => { return axios.get(`http://localhost:8080/auth/get/${userEmail}`)});

  const createJob = useMutation(
      (formData) => axios.post('http://localhost:8080/job/create', formData),
      {
            onSuccess: () => {
              console.log('Job created successfully.');
              setMessage('Job created successfully.');
              setSuccess(true);
            },
            onError: () => {
              console.log('An error occurred. Job could not be saved.');
              setMessage('An error occurred. Job could not be saved.');
            }
      }
  );

  const employerId = userAccount.employerId;

  const handleSubmit = (e) => {
    e.preventDefault();
    createJob.mutate({ employerId, title, description });
  };

  function cancelHandler() {
    navigate('..');
  }

  return (
    <>
      <p className={classes.message}>{message}</p>
      {
        !success &&
        <Form method={method} className={classes.form} onSubmit={handleSubmit}>
          {data && data['errors'] && (
            <ul>
              {Object.values(data['errors'].map((err) => (
                <li key={err}>{err}</li>
              )))}
            </ul>
          )}
          <p>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows={5}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </p>
          <div className={classes.actions}>
            <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
              Cancel
            </button>
            <button disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Save'}
            </button>
          </div>
        </Form>
      }
    </>
  );
}

export default JobPostForm;

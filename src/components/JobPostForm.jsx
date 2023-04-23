import React, { useState, useContext } from 'react';
import { Form, useNavigate, useNavigation, useActionData } from 'react-router-dom';
import { useQuery, QueryClient } from 'react-query';
import axios from 'axios';
import classes from './JobPostForm.module.css';
import { UserContext } from './UserContext';

function JobPostForm({ method }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { email } = useContext(UserContext);
  const queryClient = new QueryClient();

  console.log(email);

  const isSubmitting = navigation.state === 'submitting';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const { data: employer } = useQuery('empId',
      () => { return axios.get(`http://localhost:8080/auth/get/${email}`)},{ queryClient });

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = employer.data.id;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, employerId: id, description: description})
    };
  
    fetch('http://localhost:8080/job/create', requestOptions);
  };

  function cancelHandler() {
    navigate('..');
  }

  return (
    <>
      <p className={classes.message}>{message}</p>
      {
        !success &&
        <Form method={method} className={classes.form}>
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
            <button disabled={isSubmitting} onClick={handleSubmit}>
              {isSubmitting ? 'Submitting...' : 'Save'}
            </button>
          </div>
        </Form>
      }
    </>
  );
}

export default JobPostForm;

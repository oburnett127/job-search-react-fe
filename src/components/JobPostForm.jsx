import React, { useState, useEffect, useContext } from 'react';
import { Form, useNavigate, useNavigation, useActionData } from 'react-router-dom';
import axios from 'axios';
import classes from './JobPostForm.module.css';
import { UserContext } from './UserContext';

function JobPostForm({ method }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { email, userId } = useContext(UserContext);
  const isSubmitting = navigation.state === 'submitting';
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [employer, setEmployer] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("user's email " + email);

    axios.get(`http://localhost:8080/auth/getemployer/${email}`)
      .then((response) => {
        console.log("get employer response " + response?.data);
        setEmployer(response?.data);
      })
      .catch((error => {
        if(error.response) {
          console.log(error.response);
          setMessage('You must login before you can post a job.');
        } else if(error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }));
  }, [email]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("inside handleSubmit: " + employer?.id);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: formData.title, employerId: employer?.id, description: formData.description})
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
            value={formData.title}
            required
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            rows={5}
            required
            onChange={handleInputChange}
          />
        </p>
        <div className={classes.actions}>
          <button type="button" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  );
}

export default JobPostForm;

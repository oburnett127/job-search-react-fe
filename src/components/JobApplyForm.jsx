import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const JobApplyForm = ({ job }) => {

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const { userId } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(job);
        console.log(job.id);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId, jobId: job.id })
          };

        fetch('http://localhost:8080/job/apply', requestOptions)
        .then((response) => {
            console.log(response);
            if(response.ok) {
                setMessage('Your job application was submitted.');
            }
        })
        .catch((error => {
            if(error.response) {
                console.log(error.response);
                setMessage('An error occurred. Your job application could not be submitted.');
            } else if(error.request) {
                console.log("network error");
            } else {
                console.log(error);
            }
        }));

    };

    const handleCancel = (e) => {
        navigate('..');
    };

    return (
        <form>
            <div>
                {message}<br />
                {job.title}
                <p>Are you sure you want to apply for this job?</p>
            </div>
            <button type="button" onClick={handleCancel}>
                Cancel
            </button>
            <button type="submit" onClick={handleSubmit}>
                Yes
            </button>
        </form>
    );
};

export default JobApplyForm;

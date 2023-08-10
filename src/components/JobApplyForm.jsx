import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './UserContext';
import { useNavigate, useParams } from 'react-router-dom';

const JobApplyForm = () => {
    const [message, setMessage] = useState("");
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        fetch(process.env.REACT_APP_SERVER_URL + '/job/get/' + id, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                setMessage('An error occurred. Job details could not be retrieved.');
                throw new Error('Job details could not be retrieved.');
            }
            return response.json();
        })
        .then(data => setJob(data))
        .catch(error => console.error(error));
    }, [id]);
           
    const handleSubmit = async (e) => {

        e.preventDefault();

        setIsSubmitting(true);

        const jwtToken = localStorage.getItem('jwtToken');
    
        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + '/application/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jobId: job.id.toString(), applicantId: user.id.toString() }),
            });
    
            if(!response.ok) {
                setMessage('An error occurred. Your job application could not be submitted.');
                console.error('application submit failed.');
            } else {
                setMessage("Your job application was submitted successfully.");
            }
        } catch (error) {
            setMessage('Application submit failed.');
            console.error('error:', error);
        }
    
        setIsSubmitting(false);
    };

    const handleCancel = () => {
        navigate('/jobs');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {message}<br />
                {job?.title}
                <p>Are you sure you want to apply for this job?</p>
            </div>
            <button type="button" onClick={handleCancel} disabled={isSubmitting}>
                Cancel
            </button>
            <button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                Yes
            </button>
        </form>
    );
};

export default JobApplyForm;

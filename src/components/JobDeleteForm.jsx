import React from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const JobDeleteForm = (id) => {
    const navigate = useNavigate();
    const [jobDeleted, setJobDeleted] = useState(false);
    const [message, setMessage] = useState("Are you sure you want to delete this job?");

    //console.log(id);

    const jwtToken = localStorage.getItem('jwtToken');

    const deleteJob = useMutation(
        async () => {
            try {
                await axios.delete(process.env.REACT_APP_SERVER_URL + `/job/delete/${id.id}`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                    },
                });
            } catch (error) {
                throw error;
            }
        },
        {
            onSuccess: () => {
                console.log("Job was deleted.");
                setMessage("The job was successfully deleted.");
                setJobDeleted(true);
            },
            onError: (error) => {
                console.log("Error! The job could not be deleted.");
                setMessage("Error! The job could not be deleted.");
            },
        }
    );

    const handleDelete = () => {
        deleteJob.mutate();
    };

    const handleCancel = () => {
        navigate('..');
    }

    return (
        <>
            <p>{message}</p>
            { !jobDeleted &&
                <>
                    <button onClick={handleCancel}>
                        Cancel
                    </button>
                    <button onClick={handleDelete}>
                        Yes, I am sure
                    </button>
                </>
            }
        </>
    );
};

export default JobDeleteForm;

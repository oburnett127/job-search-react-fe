import React from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const JobDeleteForm = (id) => {
    const navigate = useNavigate();
    const [jobDeleted, setJobDeleted] = useState(false);
    const [message, setMessage] = useState("Are you sure you want to delete this job?");

    console.log(id);

    const deleteJob = useMutation(
        async () => {
            await axios.post(`http://localhost:8080/job/delete/${id.id}`);
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
                    <button onClick={handleDelete}>
                        Yes
                    </button>
                    <button onClick={handleCancel}>
                        Cancel
                    </button>
                </>
            }

        </>
    );
};

export default JobDeleteForm;

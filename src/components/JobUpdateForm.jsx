import React from 'react';
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const JobUpdateForm = ({ job }) => {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState(job.title);
    const [description, setDescription] = useState(job.description);

    const { mutate, isLoading } = useMutation(
        (updatedJob) => axios.post(`http://localhost:8080/job/update/${job.id}`, updatedJob),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("jobs");
            },
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({ title, description });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update"}
            </button>
        </form>
    );
};

export default JobUpdateForm;

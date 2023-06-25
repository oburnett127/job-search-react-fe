import React, {useState} from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useForm } from 'react-hook-form';
import classes from './JobUpdateForm.module.css';

const JobUpdateForm = ({ job }) => {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const queryClient = useQueryClient();
    const isSubmitting = navigation.state === 'submitting';
    const [message, setMessage] = useState(null);

    const {register, handleSubmit, formState: {errors}} = useForm();

    const { mutate } = useMutation(
        (updatedJob) => axios.post(`http://localhost:8080/job/update/${job.id}`, updatedJob),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("jobs");
            },
        }
    );

    const onSubmit = (data) => {
        const title = data.title;
        const description = data.description;
        
        try {
            mutate({ title, description });
        } catch(error) {
            setMessage('Job update failed.');
            return;
        }

        setMessage("Job update was successful.");
    };

    const handleCancel = () => {
        navigate('..');
      }

    return (
        <>
            <p className={classes.message}>{message}</p>
            <form errors={errors} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" {...register("title", {required: true})} />
                </div>
                {errors?.title && <span>The title is required.</span>}
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea {...register("description", {required: true})} />
                </div>
                {errors?.description && <span>The description is required.</span>}
                <button type="button" onClick={handleCancel} disabled={isSubmitting}>
                    Cancel
                </button>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default JobUpdateForm;

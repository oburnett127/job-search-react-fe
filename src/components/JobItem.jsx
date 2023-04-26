import React from 'react';
import { Link } from 'react-router-dom';
import classes from './JobItem.module.css';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

function JobItem({ job }) {
    console.log(job);

    return (

        <article className={classes.job}>
            <h2>{job.title}</h2>
            <h3>{job.employerName}</h3>
            <time>{job.postDate}</time>
            <p>{job.description}</p>
            <menu className={classes.actions}>
                <Link to={{ pathname: `/jobs/${job.id}/apply` }} state={{job}}>
                    <CheckIcon />
                </Link>
                <Link to={{ pathname: `/jobs/${job.id}/edit` }} state={{job}}>
                    <EditIcon />
                </Link>
                <Link to={{ pathname: `/jobs/${job.id}/delete` }}>
                    <ClearIcon />
                </Link>
            </menu>
        </article>

    );
}

export default JobItem;
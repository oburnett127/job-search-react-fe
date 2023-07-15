import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useQuery } from 'react-query';
import axios from 'axios';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import classes from './JobsList.module.css';

function JobsList({jobs}) {

    //console.log(jobs);

    const { user } = useContext(UserContext);

    const { data: applications } = useQuery('applications',
      () => { return axios.get(process.env.REACT_APP_SERVER_URL + `/application/getbyapplicantid/${user.id}`);}
    );

    let jobIds = [];

    if(applications?.data?.length > 0) {
        jobIds = applications?.data?.map(application => application.jobId);

        console.log("job ids: ", jobIds);
    }

    return (
        jobs?.data && (
            <div className={classes.jobs}>
                <h1>All Jobs</h1>
                <ul className={classes.list}>
                    {jobs.data?.map((job) => (
                        <li key={uuidv4()} className={classes.item}>
                            <Link to={{ pathname: `/jobs/${job.id}` }}>
                                <div className={classes.content}>
                                    <h2>{job.title}</h2>
                                    <p>Employer Name: {job.employerName}</p>
                                    <p>Posted on: {job.postDate}</p>
                                    {jobIds?.includes(job.id) && (
                                        <div>
                                            <span><DoneOutlineIcon /></span>
                                            <p>Applied</p>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    )
}

export default JobsList;
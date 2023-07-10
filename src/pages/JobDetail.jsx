import React from 'react';
import axios from "axios";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import JobItem from "../components/JobItem";

function JobDetailPage() {
    const {id} = useParams();

    const { isLoading, error, data: jobDetail } = useQuery('jobDetail', () =>
        axios('http://localhost:8080/job/get/' + id).then((res) => res.data)
    );

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error['message']}</div>;

    return <JobItem job={jobDetail} />
}

export default JobDetailPage;
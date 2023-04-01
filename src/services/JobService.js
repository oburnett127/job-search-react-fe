import axios from 'axios';

const JOBSEARCH_BASE_URL = "http://localhost:8080/job";

class JobService {

    getAllJobs(){
        return axios.get(JOBSEARCH_BASE_URL + "/list");
    }

    createJob(job: any){
        return axios.post(JOBSEARCH_BASE_URL, job);
    }

    getJobById(jobId: string){
        return axios.get(JOBSEARCH_BASE_URL + "/get/" + jobId);
    }

    updateEmployee(job: any, jobId: string){
        return axios.put(JOBSEARCH_BASE_URL + "/edit/" + jobId, job);
    }

    deleteEmployee(jobId: string){
        return axios.delete(JOBSEARCH_BASE_URL + "/delete/" + jobId);
    }
}

export default new JobService()

// import request from "../components/Request"
// import * as url from "url";
// import axios from "axios";
//
// export default class JobService {
//     // @ts-ignore
//     static async getJob({ jobId }) {
//         let res = await axios.get(`http://localhost:8080/job/get?id=2`);
//
//         let data = res.data;
//         console.log(data);
//
//         // return request({
//         //     url: "/job/get",
//         //     method: "GET",
//         //     params: {
//         //         "id": jobId
//         //     }
//         // });
//     }
//     static getAllJobs() {
//         return request({
//             url: "/job/list",
//             method: "GET"
//         });
//     }
// }
import { getJobs, getJobById } from "../../services/jobService";
import { useState, useEffect, use } from "react";

export const useJobPost = () => {
    const [jobs, setJobs] = useState([])
    const [selectedJob, setSelectedJob] = useState(null)
    const [jobLoading, setJobLoading] = useState(false)
    const [filter, setFilter] = useState({keyword: '', employmentTypes: '', location: '', pageNumber: 1, pageSize: 8})
    
    const fetchJobsAdvance = async () => {
        setJobLoading(true);
        try {
            const data = await getJobs(filter);
            setJobs(data);
        } catch (error) { console.error("Fetch error", error); }
        finally {setJobLoading(false);}
    }

    const fetchJobById = async (id) => {
        try {
            const data = await getJobById(id);
            setSelectedJob(data);
        } catch (error) { console.error("Fetch error", error); }
    }

    useEffect(() => {
        fetchJobsAdvance();
    }, [filter]);

    return {
        jobs, fetchJobsAdvance, jobLoading, filter, setFilter, selectedJob, fetchJobById
    }
}
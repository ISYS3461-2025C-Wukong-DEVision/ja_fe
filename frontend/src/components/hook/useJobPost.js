import { getJobs } from "../../services/jobService";
import { useState, useEffect } from "react";

export const useJobPost = () => {
    const [jobs, setJobs] = useState([])
    const [jobLoading, setJobLoading] = useState(false)
    const [filter, setFilter] = useState({keyword: '', employmentTypes: '', location: '', salaryMin: 0, salaryMax: 0, pageNumber: 1, pageSize: 8})
    
    const fetchJobsAdvance = async () => {
        setJobLoading(true);
        try {
            const data = await getJobs(filter);
            setJobs(data);
        } catch (error) { console.error("Fetch error", error); }
        finally {setJobLoading(false);}
    }

    return {
        jobs, fetchJobsAdvance, jobLoading, filter, setFilter
    }
}
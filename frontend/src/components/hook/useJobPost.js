import { getJobs, getJobById } from "../../services/jobService";
import { useState, useEffect, use } from "react";

export const useJobPost = () => {
    const [jobs, setJobs] = useState([])
    const [selectedJob, setSelectedJob] = useState(null)
    const [jobLoading, setJobLoading] = useState(false)
    const [filter, setFilter] = useState({
        keyword: '', 
        employmentTypes: '', 
        location: '', 
        salaryMin: 0, 
        salaryMax: 0,
        pageNumber: 1, 
        pageSize: 5
    })
    
    const fetchJobsAdvance = async () => {
        // Chỉ hiện loading nếu chưa có job nào (lần đầu tải trang)
        // Để tránh màn hình nhấp nháy khi filter
        if (!jobs?.data?.content?.length) {
            setJobLoading(true);
        }
        
        try {
            // --- BƯỚC QUAN TRỌNG: LÀM SẠCH DỮ LIỆU ---
            const cleanedParams = {};
            Object.keys(filter).forEach(key => {
                const value = filter[key];
                
                // 1. Luôn giữ lại phân trang
                if (key === 'pageNumber' || key === 'pageSize') {
                    cleanedParams[key] = value;
                    return;
                }

                // 2. Chỉ giữ lại các trường có giá trị thực
                // (Khác rỗng, khác null, khác undefined)
                if (value !== '' && value !== null && value !== undefined) {
                    // Với lương, nếu bằng 0 thì bỏ qua (trừ khi cậu muốn tìm lương = 0)
                    if ((key === 'salaryMin' || key === 'salaryMax') && value === 0) {
                        return;
                    }
                    cleanedParams[key] = value;
                }
            });

            const data = await getJobs(cleanedParams);
            setJobs(data);
        } catch (error) { 
            console.error("Fetch error", error); 
        } finally {
            setJobLoading(false);
        }
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
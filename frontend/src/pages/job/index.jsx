import { useTranslation } from "react-i18next";
import { Bars3Icon, ChevronDownIcon, BanknotesIcon, ArrowTrendingUpIcon, MapPinIcon, XMarkIcon} from "@heroicons/react/24/outline";
import JobCard from "../../components/job/jobCard";
import React, {useState, useEffect} from "react";
import dayjs from "dayjs";
import LoadingAnimation from "../../components/common/loadingAnimation";
import { useSalaryFormatter } from "../../utils/formatSalary";
import { parseJobDescription } from "../../utils/parseJobDescription";
import ApplicationCard from "../../components/application/applicationCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useJobPost } from "../../components/hook/useJobPost";
import FilterCard from "../../components/job/filterCard";
import Pagination from "../../components/common/Pagination";
import { useCompany } from "../../components/hook/useCompany";
import { getLatestMediaByType } from "../../utils/companyMapper";
import { useAuth } from "../../components/hook/useAuth";

const Job = () => {
    const {jobs, fetchJobsAdvance, jobLoading, filter, setFilter, selectedJob, fetchJobById, isApplied, fetchMyAppliedJob} = useJobPost();
    const { user, isAuthenticated } = useAuth()
    const applicantId = user?.id;
    const {selectedCompany, fetchCompanyById } = useCompany();
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const { formatByType } = useSalaryFormatter();
    const [isToggle, setIsToggle] = useState(false);
    const navigate = useNavigate()

    const handleSelectJob = (job) => {
        setSelectedJobId(job.id);
        fetchJobById(job.id);
        fetchCompanyById(job.companyId);
    };
    const companyLogo = getLatestMediaByType(selectedCompany?.data?.mediaList, 'AVATAR');

    useEffect(() => {
        if (isAuthenticated) {
            fetchMyAppliedJob(applicantId, selectedJob?.data?.id)
        }
    },[selectedJob])

    if (jobLoading) 
        return <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center"><LoadingAnimation text={t('loading')} /></div>;

    return (
        <div className="flex flex-col justify-center items-center">

            {/* Applied card */}
            {isToggle && (
                    <ApplicationCard 
                    job_post_id = {selectedJobId} 
                    onClose = {() => setIsToggle(false)}
                    />
            )}

            {/* Loading trong view */}
            {isLoading && (<div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center"><LoadingAnimation text={t('loading')} /></div>)}

            <div className="flex-1 justify-center items-center bg-primary/30 w-full p-6 lg:px-36 md:px-16">
                <FilterCard
                    filters={filter}
                    setFilters={setFilter}
                    t={(key) => key}
                />
            </div>
            <div className="flex flex-col xl:flex-row items-start justify-center w-screen p-6 max-xl:space-y-4 lg:px-36 md:px-16">
                <div className="flex flex-col xl:items-center items-start justify-center w-full xl:w-full xl:max-w-md space-y-3">
                    <div className="px-2 w-full">
                        <div className="flex max-w-md text-start text-gray-700 bg-primary/30 p-5 pl-10 rounded-md w-full">{t('result')} {jobs?.data?.totalElements}</div>
                    </div>
                    <div className='flex flex-row w-full xl:flex-col xl:w-full xl:h-[75vh] xl:overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
                        {jobs?.data?.content?.map((job) => {
                            const isActive = selectedJobId === job.id;

                            return (
                            <div
                                key={job.id}
                                onClick={() => handleSelectJob(job)}
                                className="p-2"
                            >
                                <JobCard
                                company={job.companyName || "Company Name"}
                                title={job.title}
                                city={`${job.city} - ${job.country}`}
                                employmentType={job.employmentTypes}
                                minSalary={job.salaryMin}
                                maxSalary={job.salaryMax}
                                salary_est_type={job.salaryEstType}
                                post_date={job.createdAt}
                                expired_date={job.expiredAt}
                                is_fresher={job.isFresher}
                                is_applied={false}
                                is_active= {isActive}
                                />
                            </div>
                            );
                        })}
                    </div>
                    <div className="flex items-center justify-center w-full mb-6 xl:mb-px">
                        <Pagination 
                            filters={filter} 
                            setFilters={setFilter} 
                            totalPages={jobs?.data?.totalPages || 1} 
                        />
                    </div>
                </div>
                <div className="flex w-full xl:px-2">
                    {/* MAIN CARD */}
                    <div className="flex-1 border border-gray-300 rounded-md p-4 flex flex-col space-y-6">
                        {selectedJob != null ? (   
                            <>
                                {/* ================= HEADER (KHÔNG SCROLL) ================= */}
                                <div className="space-y-6">
                                    <div className="flex sm:flex-row flex-col w-full border border-primary rounded-md justify-between">
                                        <div className="flex items-start justify-start p-2">
                                            {/* RIGHT: company image */}
                                            <img
                                                src={companyLogo?.url || '/d.png'}
                                                alt={selectedCompany?.data?.name || 'Company Logo'}
                                                className="h-16 w-16 object-cover rounded-sm mr-3 mt-1 ml-1 border border-gray-300"
                                            />

                                            {/* LEFT */}
                                            <div className="flex flex-col items-start justify-start space-y-4">
                                                {/* Công việc */}
                                                <h3 className="text-lg font-bold text-primary-dark line-clamp-2">
                                                {selectedJob?.data?.title}
                                                </h3>

                                                {/* Tên công ty */}
                                                <h2 className="text-sm font-normal text-gray-600 line-clamp-1">
                                                {selectedJob?.data?.companyName || "Company Name"}
                                                </h2>

                                                {/* Mức lương */}
                                                <p className="text-primary-dark font-bold text-sm mb-1">
                                                {t("salary")}:{" "}
                                                {formatByType(
                                                    selectedJob?.data?.salaryEstType,
                                                    selectedJob?.data?.salaryMin,
                                                    selectedJob?.data?.salaryMax
                                                )}
                                                </p>

                                                {/* Địa điểm */}
                                                <div className="flex items-center text-gray-600 text-sm mb-2">
                                                    <MapPinIcon className="h-4 w-4 mr-1 -ml-1 text-gray-600" />
                                                    <span>
                                                        {selectedJob?.data?.country} - {selectedJob?.data?.city}
                                                    </span>
                                                </div>

                                                {/* Skill */}
                                                <div className="flex flex-wrap gap-2 items-center">
                                                    {selectedJob?.data?.tags.map((e, index) => (
                                                        <div
                                                        key={index}
                                                        className="px-4 border border-primary text-primary font-medium rounded-full text-sm whitespace-nowrap"
                                                        >
                                                            {e.name || "Undifined"}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* RIGHT */}
                                        <div className="flex flex-col justify-end items-end p-2 space-y-2">
                                            <div className="text-gray-500 text-xs bg-gray-200 rounded-sm text-center whitespace-nowrap p-1">
                                                {t('expired')}: {dayjs(selectedJob?.data?.expiredAt).format("DD/MM/YYYY")}
                                            </div>

                                            <button
                                                // 1. Chặn click nếu đã apply
                                                disabled={isApplied} 
                                                // 2. Nếu đã apply thì không chạy hàm setIsToggle
                                                onClick={() => isApplied && setIsToggle(true)}
                                                className={`py-1 px-10 rounded-sm text-sm whitespace-nowrap transition-all duration-200 
                                                    ${isApplied 
                                                        ? "bg-gray-400 opacity-70 cursor-not-allowed text-gray-100" // Style khi disable
                                                        : "bg-primary-dark text-white hover:bg-primary active:scale-95" // Style khi bình thường
                                                    }`}
                                            >
                                                {/* 3. Đổi text dựa trên isApplied */}
                                                {isApplied ? t('already_applied') : t('apply_now')}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="w-full h-px bg-primary" />
                                </div>

                                {/* ================= DESCRIPTION (SCROLL) ================= */}
                                <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-left scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                    {parseJobDescription(selectedJob?.data?.description).map((sec, idx) => (
                                        <div key={idx} className="mb-4">
                                            {/* Chỉ hiện title nếu có */}
                                            {sec.title && (
                                            <h3 className="font-semibold text-base mb-2">
                                                {sec.title}
                                            </h3>
                                            )}

                                            <ul className={`${sec.title ? 'list-disc pl-5' : 'list-none'} space-y-1 text-gray-700 text-sm`}>
                                            {sec.items.map((item, i) => (
                                                <li key={i}>
                                                {/* Dùng Markdown như **text**, hãy dùng thư viện để render */}
                                                {item} 
                                                </li>
                                            ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center w-full text-gray-500 border border-gray-500 border-dashed rounded-md p-24 text-center h-60">
                                {t('no_job_selected')}
                            </div>
                        )}
                        
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Job;
import { useTranslation } from "react-i18next";
import { Bars3Icon, ChevronDownIcon, BanknotesIcon, ArrowTrendingUpIcon, MapPinIcon, XMarkIcon} from "@heroicons/react/24/outline";
import JobCard from "../../components/job/jobCard";
import React, {useState, useEffect} from "react";
import dayjs from "dayjs";
import LoadingAnimation from "../../components/common/loadingAnimation";
import { useSalaryFormatter } from "../../utils/formatSalary";
import { parseJobDescription } from "../../utils/parseJobDescription";
import ApplicationCard from "../../components/application/applicationCard";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useJobPost } from "../../components/hook/useJobPost";


const Job = () => {
    const {jobs, fetchJobsAdvance, jobLoading, filter, setFilter, selectedJob, fetchJobById} = useJobPost();

    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const { formatByType } = useSalaryFormatter();
    const [isToggle, setIsToggle] = useState(false);
    const isAuthenticate = !authService.isAuthenticated();
    const navigate = useNavigate()

    const handleApplied = () => {
        if (isAuthenticate) {
            setIsLoading(true);

            setTimeout(() => {
            navigate("/login");
            }, 500);
            toast.error(`${t('need_login')}`);
            return;
        }

        setIsToggle(!isToggle);
    };


    const handleSelectJob = (job) => {
        setSelectedJobId(job.id);
        fetchJobById(job.id);
    };

    useEffect(() => {
        setSelectedJobId(jobs?.data?.content[0]?.id);
        fetchJobById(jobs?.data?.content[0]?.id);
    }, []);

    if (jobLoading) 
        return <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center"><LoadingAnimation text={t('loading')} /></div>;

    return (
        <div className="flex flex-col justify-center items-center">

            {/* Applied card */}
            {isToggle && (
                <div className="fixed inset-0 z-50 bg-black/30 flex flex-col items-center justify-center space-y-4">
                    <ApplicationCard job_post_id = {selectedJobId} />
                    <button onClick={() => setIsToggle(!isToggle)} className="p-2 rounded-full border border-gray-100 shadow-md shadow-primary/40 bg-white hover:shadow-lg hover:shadow-primary/70 m-1">
                        <XMarkIcon className="h-7 w-7 text-primary"/>
                    </button>
                </div>)
            }

            {/* Loading trong view */}
            {isLoading && (<div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center"><LoadingAnimation text={t('loading')} /></div>)}

            <div className="flex flex-col justify-start items-center bg-primary/30 w-full p-6 lg:px-36 md:px-16">
                <div className="flex flex-row justify-center items-center w-full">
                    <button onClick={console.log("filter job title")} className="flex items-center justify-center py-5 px-4 bg-primary rounded-md hover:bg-primary-dark min-w-[100px] ml-2 shrink-0 overflow-hidden h-[72px]">
                        <Bars3Icon className="sm:w-6 w-px h-6 text-white font-bold shrink-0"/>
                        <span className="ml-1 text-white whitespace-nowrap">{t('category')}</span>
                    </button>
                    <div className="relative w-full flex items-center lg:order-none other-3 mx-2">
                        {/* SEARCHING FIELD */}
                        <input
                            type="text"
                            placeholder={t('searching')}
                            className="border border-primary rounded-md px-3 py-6 pr-10 w-full focus:outline-none focus:ring-1 focus:ring-primary-dark [&::placeholder]:italic [&::placeholder]:text-sm"
                        />
                        <button onClick={console.log("searching")} className="absolute inset-y-0 right-2 text-center text-white border border-primary bg-primary hover:bg-primary-dark rounded-md my-2 px-6">
                            {t('search')}
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap justify-start items-center w-full my-3 space-x-4 px-2">
                    <div className="flex flex-wrap gap-2 items-center">
                        <button onClick={console.log("filter location")} className="flex items-center bg-white rounded-full px-3 border border-gray-50 hover:bg-gray-50">
                            <span className="text-gray-700 whitespace-nowrap">{t('location')}</span>
                            <ChevronDownIcon className="w-4 h-4 ml-1 transition-transform duration-200 text-gray-700" />
                        </button>
                        <button onClick={console.log("filter location")} className="flex items-center bg-white rounded-full px-3 border border-gray-50 hover:bg-gray-50">
                            <ArrowTrendingUpIcon className="w-4 h-4 mr-1 transition-transform duration-200 text-gray-700" />
                            <span className="text-gray-700 whitespace-nowrap">{t('type')}</span>
                            <ChevronDownIcon className="w-4 h-4 ml-1 transition-transform duration-200 text-gray-700" />
                        </button>
                        <button onClick={console.log("filter location")} className="flex items-center bg-white rounded-full px-3 border border-gray-50 hover:bg-gray-50">
                            <BanknotesIcon className="w-4 h-4 mr-1 transition-transform duration-200 text-gray-700" />
                            <span className="text-gray-700 whitespace-nowrap">{t('salary')}</span>
                            <ChevronDownIcon className="w-4 h-4 ml-1 transition-transform duration-200 text-gray-700" />
                        </button>
                    </div>
                </div>
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
                                company={job.companyName}
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
                        Pagination
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

                                            <div className="flex flex-col items-start justify-start space-y-4">
                                                {/* Công việc */}
                                                <h3 className="text-lg font-bold text-primary-dark line-clamp-2">
                                                {selectedJob?.data?.title}
                                                </h3>

                                                {/* Tên công ty */}
                                                <h2 className="text-sm font-normal text-gray-600 line-clamp-1">
                                                {selectedJob?.data?.companyName}
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
                                                    {selectedJob?.data?.tags.map((e) => (
                                                        <div
                                                        className="px-4 border border-primary text-primary font-medium rounded-full text-sm whitespace-nowrap"
                                                        >
                                                            {e.name}
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
                                                onClick={() => handleApplied()}
                                                className="py-1 px-10 bg-primary-dark text-white rounded-sm text-sm whitespace-nowrap"
                                            >
                                                {t('apply_now')}
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
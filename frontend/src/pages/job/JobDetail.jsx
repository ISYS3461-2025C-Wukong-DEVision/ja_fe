import { useEffect } from "react";
import { useCompany } from "../../components/hook/useCompany";
import { useJobPost } from "../../components/hook/useJobPost";
import { getLatestMediaByType } from "../../utils/companyMapper";
import { useParams } from 'react-router-dom';
import { parseJobDescription } from "../../utils/parseJobDescription";
import { useSalaryFormatter } from "../../utils/formatSalary";
import { MapPinIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const JobDetail = () => {
    const {t} = useTranslation()
    const { id } = useParams()
    const {selectedCompany, fetchCompanyById} = useCompany();
    const { formatByType } = useSalaryFormatter()
    const {fetchJobById, selectedJob} = useJobPost()
    const companyLogo = getLatestMediaByType(selectedCompany?.data?.mediaList, 'AVATAR');
    const companyBackground = getLatestMediaByType(selectedCompany?.data?.mediaList, 'IMAGE');

    useEffect(() => {
        const loadData = async () => {
        // Phải có await ở đây để lấy data thực tế từ Promise
            const data = await fetchJobById(id); 
            
            // Kiểm tra xem data có tồn tại và có companyId không
            if (data && data.companyId) {
                await fetchCompanyById(data.companyId);
            } else if (data && data.data?.companyId) { 
                await fetchCompanyById(data.data.companyId);
            }
        };

        if (id) {
            loadData();
        }
    }, [id])

    return (
        <div className="flex-1 justify-center items-center p-6 lg:px-40 md:px-28 sm:px-16">
            <div className="flex-1 border border-gray-300 rounded-md p-4 flex flex-col space-y-6">
                {selectedJob != null ? (   
                    <>
                        {/* ================= HEADER (KHÔNG SCROLL) ================= */}
                        <div className="space-y-6">
                            <img 
                                src={companyBackground?.url || '/assets/icons/logoName.png'} 
                                alt={selectedCompany?.data?.name || 'Company Background'}
                                className={`h-48 w-full rounded-lg ${companyBackground?.url != null ? "object-cover" : "bg-primary/30 object-contain"}`}
                            />
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
                                        disabled
                                        className="py-1 px-10 bg-primary-dark text-white rounded-sm text-sm whitespace-nowrap 
                                                opacity-70 cursor-not-allowed grayscale-[50%]"
                                    >
                                        {t('already_applied')}
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
    );
}

export default JobDetail;
import { useEffect } from "react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useNavigate } from "react-router-dom";

dayjs.extend(utc);
dayjs.extend(timezone);

const ProfileJobApplied = ({fetchMyApplied, myApplied, applicantId}) => {
    const navigate = useNavigate()
    const getStatusStyles = (status) => {
        switch (status?.toUpperCase()) {
        case 'ARCHIVED':
            return { text: status, class: 'bg-green-100 text-green-700 border-green-200' };
        case 'PENDING':
            return { text: status, class: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
        default:
            return { text: status, class: 'bg-blue-100 text-blue-700 border-blue-200' };
        }
    };

    useEffect (() => {
        fetchMyApplied(applicantId)
    }, [])

    return (
        <div className='flex flex-col w-full bg-white shadow-md rounded-md p-6 text-left'>
            <span className='text-2xl font-bold mb-4'>My Job Application</span>
            <div className='flex flex-col justify-center items-start space-y-6 border border-dashed border-gray-400 rounded-md p-6 min-h-48'>
                {myApplied && myApplied.length > 0 ? (
                    myApplied.map((trans, index) => {
                        // Xử lý style và format ngày tháng
                        const statusStyle = getStatusStyles(trans.status);
                        const formattedDate = dayjs(trans.createdAt)
                            .tz("Asia/Ho_Chi_Minh")
                            .format('DD/MM/YYYY HH:mm:ss');

                        return (
                            <div 
                                key={trans.id || index} 
                                onClick={() => navigate(`/jobs/${trans.jobPostId}`)}
                                className="w-full bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-md cursor-pointer hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] hover:shadow-primary p-5 flex items-center justify-between transition-all duration-300"
                            >
                                {/* Bên trái: Title và Date */}
                                <div className="flex flex-col ml-6">
                                    <div className="text-lg font-bold text-gray-900">
                                        {trans.jobPost?.title || "No Title"} 
                                    </div>
                                    <div className="text-xs text-gray-500 italic mt-1">
                                        {formattedDate}
                                    </div>
                                </div>

                                {/* Bên phải: Status */}
                                <div className="lg:mr-36 md:mr-24 sm:mr-12 mr-6">
                                    <span className={`px-5 py-2 rounded-lg text-sm font-semibold border ${statusStyle.class}`}>
                                        {statusStyle.text}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col text-center justify-center h-full w-full  italic text-gray-400 min-h-44 max-h-[70hv]">
                        You hadn't applied in any job before.
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileJobApplied;
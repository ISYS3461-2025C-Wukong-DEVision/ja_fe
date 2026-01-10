import { useEffect } from "react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const ProfileJobApplied = ({fetchMyApplied, myApplied, applicantId}) => {
    const getStatusStyles = (status) => {
        switch (status?.toUpperCase()) {
        case 'ARCHIVED':
            return { text: 'Success', class: 'bg-green-100 text-green-700 border-green-200' };
        case 'PENDING':
            return { text: 'Failed', class: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
        default:
            return { text: 'Pending', class: 'bg-blue-100 text-blue-700 border-blue-200' };
        }
    };

    useEffect (() => {
        fetchMyApplied(applicantId)
    }, [])

    return (
        <div className='flex flex-col w-full bg-white shadow-md rounded-md p-6 text-left'>
            <span className='text-2xl font-bold mb-4'>My Job Application</span>
            <div className='flex flex-col justify-center items-start space-y-6 border border-dashed border-gray-400 rounded-md p-6'>
                {myApplied && myApplied.length > 0 ? (
                    myApplied.map((trans, index) => {
                        // Xử lý dữ liệu cho từng item trong vòng lặp
                        const statusStyle = getStatusStyles(trans.status);
                        const formattedDate = dayjs(trans.createdAt)
                            .tz("Asia/Ho_Chi_Minh")
                            .format('DD/MM/YYYY HH:mm:ss');

                        return (
                            <div key={trans.id || index} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-5 space-y-3">
                                {/* Dòng 1: Transaction ID */}
                                <div className="text-sm text-gray-500 truncate">
                                    <span className="font-semibold text-gray-700">Job id: </span> {trans.jobId}
                                </div>

                                {/* Dòng 2: Amount & Status */}
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-bold text-gray-900">
                                        Amount: {trans.amount} {trans.currency === 'string' ? 'USA' : trans.currency}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyle.class}`}>
                                        {statusStyle.text}
                                    </span>
                                </div>
                                {/* Dòng 4: Date */}
                                <div className="text-xs text-gray-400 italic">
                                    <span className="font-semibold text-gray-700 not-italic">Date: </span> {formattedDate}
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
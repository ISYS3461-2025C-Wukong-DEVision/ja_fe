import { useEffect } from "react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import LoadingAnimation from "../../components/common/loadingAnimation";


// Cấu hình để sử dụng múi giờ
dayjs.extend(utc);
dayjs.extend(timezone);

const ProfileTransaction = ({fetchMyTransaction, myTransaction}) => {

    // 1. Xử lý hiển thị Status (Chỉ viết hoa chữ đầu, chọn màu)
    const getStatusStyles = (status) => {
        switch (status?.toUpperCase()) {
        case 'SUCCESS':
            return { text: 'Success', class: 'bg-green-100 text-green-700 border-green-200' };
        case 'FAILED':
            return { text: 'Failed', class: 'bg-red-100 text-red-700 border-red-200' };
        default: // PENDING
            return { text: 'Pending', class: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
        }
    };


    useEffect(() => {
        fetchMyTransaction()
    },[])

    return (
        <div className='flex flex-col w-full bg-white shadow-md rounded-md p-6 text-left'>
            <span className='text-2xl font-bold mb-4'>Transaction</span>
            <div className='flex flex-col justify-center items-start space-y-6 border border-dashed border-gray-400 rounded-md p-6'>
                {myTransaction && myTransaction.length > 0 ? (
                    myTransaction.map((trans, index) => {
                        // Xử lý dữ liệu cho từng item trong vòng lặp
                        const statusStyle = getStatusStyles(trans.status);
                        const formattedDate = dayjs(trans.createdAt)
                            .tz("Asia/Ho_Chi_Minh")
                            .format('DD/MM/YYYY HH:mm:ss');

                        return (
                            <div key={trans.id || index} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-5 space-y-3">
                                {/* Dòng 1: Transaction ID */}
                                <div className="text-sm text-gray-500 truncate">
                                    <span className="font-semibold text-gray-700">Transaction id: </span> {trans.id}
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

                                {/* Dòng 3: Phương thức thanh toán */}
                                <div className="text-sm text-gray-600">
                                    <span className="font-semibold text-gray-700">Phương thức thanh toán:</span>{' '}
                                    {trans.externalProvider && trans.externalProvider !== 'string' ? trans.externalProvider : 'PayPal'}
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
                        No Transaction is made before.
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileTransaction;
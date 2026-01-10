import { useEffect } from "react";
import { useNotification } from "../../components/hook/useNotification";
import { useTranslation } from "react-i18next";
import LoadingAnimation from "../../components/common/loadingAnimation";
import { timeAgo } from "../../utils/time";
import Pagination from "../../components/common/Pagination";


const Notification = () => {
    const { myNotification, fetchMyNotification, setPagination, loading, pagination} = useNotification();
    const { t } = useTranslation()

    useEffect(() => {
        fetchMyNotification(pagination);
    }, [pagination])

    if (loading)
        return <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center"><LoadingAnimation text={t('loading')} /></div>;

    return (
        <div className="flex flex-col items-center justify-start min-h-screen px-4 sm:px-16 md:px-32 lg:px-44 xl:px-56 pt-6 pb-12 bg-gray-100 overflow-hidden">
            <span className='text-gray-400 text-sm font-semibold mb-1 block uppercase text-left w-full'>Notification</span>
            <div className="flex-col flex items-start justify-start bg-white shadow-md rounded-md p-6 space-y-2 w-full">
                <span className="font-bold text-2xl ml-2">Notification</span>
                <div className=" flex flex-col items-start justify-center w-full min-h-44 border border-dashed border-gray-400 rounded-md p-4">
                    {myNotification?.content?.length > 0 ? (
                        myNotification?.content.map((no, index) => {
                            const formattedDate = dayjs(no.createdAt)
                                .tz("Asia/Ho_Chi_Minh")
                                .format('DD/MM/YYYY HH:mm:ss');
                            return(
                                <div key={index} className="flex items-end justify-between p-4 pr-12 w-full shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-md cursor-pointer hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] hover:shadow-primary ">
                                        <div className="flex flex-col items-start justify-center w-full">
                                            <span className="text-bold text-2xl text-primary">{no.title}</span>
                                            <span className="italic text-sm text-gray-500">{no.description}</span>
                                        </div>
                                        <span className="text-sm">{timeAgo(no.createdAt, t)}</span>
                                </div>
                            )
                        })
                    ) : (
                        <div className="flex justify-center w-full h-full text-gray-600 italic">
                            <span>
                                There is no Notification yet.
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-full items-center">
                    <Pagination
                        type = 'notification'
                        setFilters={setPagination}
                        filters={pagination}
                        totalPages={myNotification?.totalPages || 1}
                    />
                </div>
            </div>
        </div>
    );
}

export default Notification;
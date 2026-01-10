import { useEffect, useState, useRef } from "react";
import { getLatestMediaByType, getMediaByType } from "../../utils/companyMapper";
import { REF_MODULE } from "../../services/mediaService";
import { useTranslation } from "react-i18next";
import { timeAgo } from "../../utils/time";
import { XMarkIcon, PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from 'framer-motion';
import CreateMediaForm from "../../components/profile/createMediaForm";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';

const ProfileMedia = ({ 
    attachments, 
    applicantId, 
    url, 
    handleUploadMedia, 
    handlePostMediaForApplicantProfile,
    handleDeleteMediaById, 
    refreshProfile, 
    refreshAvatar }) => {

    const [currentAvatar, setCurrentAvatar] = useState(url);
    const [currentCV, setCurrentCV] = useState([])
    const [coverLetter, setCoverLetter] = useState([])
    const [certificate, setCertificate] = useState([])
    const { t } = useTranslation();
    
    // State lưu object ảnh tạm thời sau khi upload
    const [tempAvatar, setTempAvatar] = useState(null);
    const fileInputRef = useRef(null);
    const [open, setOpen] = useState(null);
    const [createMedia, setCreateMedia] = useState(false);
    const [mediaType, setMediaType] = useState('AVATAR');

    // Ảnh gốc từ DB
    useEffect(() => {
        // Kiểm tra xem attachments có dữ liệu chưa mới xử lý
        if (attachments && attachments.length > 0) {
            const latest = getLatestMediaByType(attachments, 'AVATAR');
            if (latest?.url) { // Dùng dấu ?. để không bao giờ bị crash
                setCurrentAvatar(latest.url);
            }
            const cv = getMediaByType(attachments, 'CURRICULUM_VITAE')
            const leter = getMediaByType(attachments, 'COVER_LETTER')
            const cert= getMediaByType(attachments, 'IMAGE')

            setCurrentCV(cv)
            setCoverLetter(leter)
            setCertificate(cert)
        }
    }, [attachments]);

    // Logic hiển thị:
    // 1. Nếu có tempAvatar (vừa upload xong) -> dùng link của nó
    const displayUrl = tempAvatar?.fileUrl || currentAvatar;

    // Xử lý chọn file
    const onFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            // TRUYỀN ĐÚNG 1 THAM SỐ file VÀO handleUploadMedia
            const uploadedObject = await handleUploadMedia(file); 
            

            setTempAvatar(uploadedObject.data);
            console.log("Upload successful", uploadedObject);
            console.log("tempAvatar: ", tempAvatar);
        } catch (error) {
            console.error("Upload failed", error);
        }
        
        event.target.value = null;
    };

    // Apply: Tạo payload đầy đủ và gọi hàm Post
    const handleApply = async () => {
        if (tempAvatar) {
            // Chuẩn bị dữ liệu theo yêu cầu
            const payload = {
                title: "Profile Picture",
                description: "Profile Picture",
                attachmentType: "AVATAR",
                url: tempAvatar.fileUrl
            };

            try {
                // Gọi hàm post với applicantId và payload vừa tạo
                await handlePostMediaForApplicantProfile(applicantId, payload);
                
                // NEW: Cập nhật ngay lập tức ảnh vừa lưu vào state chính thức
                setCurrentAvatar(tempAvatar.fileUrl); 
                
                // Reset temp để thoát chế độ Preview
                setTempAvatar(null);

                // Fetch ngầm bên dưới để đồng bộ data (không ảnh hưởng UI nữa)
                await refreshAvatar(REF_MODULE.APPLICANT, applicantId);
                await refreshProfile(applicantId);
                toast.success("Avatar is updated!")
            } catch (error) {
                toast.error("Post media failed: ", error.message);
            }
        }
    };

    // Cancel: Bỏ ảnh tạm, quay về ảnh cũ
    const handleCancel = () => {
        setTempAvatar(null);
    };

    const handleDelete = async (title, id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete "${title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9496FF', // Cậu có thể chỉnh màu theo primary của cậu
            cancelButtonColor: '#9EA1A5',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        // Nếu người dùng xác nhận (nhấn nút Confirm)
        if (result.isConfirmed) {
            try {
                await handleDeleteMediaById(id);
                await refreshAvatar(REF_MODULE.APPLICANT, applicantId);
                
                // Thông báo thành công
                Swal.fire(
                    'Deleted!',
                    `${title} has been deleted.`,
                    'success'
                );
            } catch (error) {
                toast.error(`Delete failed: ${error.message}`);
            }
        }
    };

    return (
        <>  
            {createMedia && (
                <CreateMediaForm
                    handlePostMediaForApplicantProfile={handlePostMediaForApplicantProfile}
                    handleUploadMedia={handleUploadMedia}
                    mediaType={mediaType}
                    setCreateMedia={setCreateMedia}
                    applicantId={applicantId}
                    refreshAvatar={refreshAvatar}
                />
            )}
            {open && (
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10" 
                            onClick={() => setOpen(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                // SỬA TẠI ĐÂY: Thêm overflow-auto để scroll
                                className="relative bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-full overflow-auto custom-scrollbar"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Nút đóng cố định (Sticky) để cuộn tới đâu vẫn thấy nút xóa */}
                                <div className="sticky top-0 right-0 z-50 flex justify-end p-2 bg-white/50 backdrop-blur-md">
                                    <button
                                        onClick={() => setOpen(null)}
                                        className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm"
                                    >
                                        <XMarkIcon className="h-6 w-6 text-gray-800" />
                                    </button>
                                </div>

                                {/* SỬA TẠI ĐÂY: Bỏ object-contain, để h-auto để ảnh dàn trải theo chiều dài thật */}
                                <div className="p-4 flex justify-center">
                                    <img
                                        src={open}
                                        alt="Full preview"
                                        className="w-full h-auto rounded-b-md" 
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
            <div className="flex flex-col items-start justify-start">
                <span className="text-gray-400 text-sm font-semibold mb-1 block uppercase text-left">profile avatar</span>
                <div className="bg-white shadow-md rounded-md p-6 w-full flex flex-col">
                    <span className="font-bold text-2xl ml-4 mb-2">Avatar</span>
                    <div className="flex relative border border-dashed border-gray-400 rounded-md p-2 justify-center items-center flex-col gap-4">
                        
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={onFileSelect} 
                            className="hidden" 
                            accept="image/*"
                        />

                        <img
                            src={displayUrl}
                            alt="Profile Avatar"
                            className="w-64 h-64 rounded-full object-cover border-4 border-primary-light/50 shadow-md"
                            
                        />
                        
                        <div className="absolute bottom-2 right-2 flex gap-2">
                            {!tempAvatar ? (
                                <button 
                                    className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition-colors"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    Change Avatar
                                </button>
                            ) : (
                                <>
                                    <button 
                                        onClick={handleCancel}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleApply}
                                        className="bg-primary-dark text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
                                    >
                                        Apply
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* THẺ UPDATE CV*/}
                <span className="text-gray-400 text-sm font-semibold mb-1 mt-10 block uppercase text-left">curriculum vitae</span>
                <div className="bg-white shadow-md rounded-md p-6 w-full flex flex-col">
                    <div className="flex justify-between items-center mx-4 mb-2">
                        <span className="font-bold text-2xl">Curriculum vitae (CV)</span>
                        <button 
                            onClick={() => (setMediaType('CURRICULUM_VITAE'), setCreateMedia(true))}
                            className="flex items-center text-primary hover:text-primary-dark">
                            <span className="mr-0.5">Add</span>
                            <PencilIcon className="w-4 h-4 "/>
                        </button>
                    </div>
                    <div className="flex relative border border-dashed border-gray-400 rounded-md p-2 justify-center items-center flex-col gap-4 min-h-32 space-y-2 pl-10">
                        {currentCV.length > 0 ? currentCV.map((cv, index) => (
                            <div key={index} className="flex w-full justify-start items-end">
                                <a href="#"
                                onClick={(e) => {
                                    e.preventDefault(); // Quan trọng: Chặn trình duyệt nhảy trang
                                    setOpen(cv.url);    // Chạy useState của cậu ở đây
                                }} 
                                className="underline text-blue-600 hover:text-primary-dark visited:text-primary">{(index + 1) + ". " + (cv.description || cv.title || "Default curriculum vitae")}</a>
                                <span className="text-gray-600 italic text-sm ml-6">{timeAgo(cv.createdAt, t)}</span>
                                <button className="ml-3" onClick={() => handleDelete(cv.title, cv.id)}>
                                    <TrashIcon className="h-4 w-4 text-red-500 hover:text-red-700"/>
                                </button>
                            </div>
                        )) : (
                            <span>There is no curriculum vitae, please update.</span>
                        )}
                    </div>
                </div>

                {/* THẺ UPDATE CERTIFICATE*/}
                <span className="text-gray-400 text-sm font-semibold mb-1 mt-10 block uppercase text-left">certificate</span>
                <div className="bg-white shadow-md rounded-md p-6 w-full flex flex-col">
                    <div className="flex justify-between items-center mx-4 mb-2">
                        <span className="font-bold text-2xl">Certificate</span>
                        <button 
                            onClick={() => (setMediaType('IMAGE'), setCreateMedia(true))}
                            className="flex items-center text-primary hover:text-primary-dark">
                            <span className="mr-0.5">Add</span>
                            <PencilIcon className="w-4 h-4 "/>
                        </button>
                    </div>
                    <div className="flex relative border border-dashed border-gray-400 rounded-md p-2 justify-center items-center flex-col gap-4 min-h-32 space-y-2 pl-10">
                        {certificate.length > 0 ? certificate.map((c, index) => (
                            <div key={index} className="flex w-full justify-start items-end">
                                <a href="#"
                                onClick={(e) => {
                                    e.preventDefault(); // Quan trọng: Chặn trình duyệt nhảy trang
                                    setOpen(c.url);    // Chạy useState của cậu ở đây
                                }}
                                className="underline text-blue-600 hover:text-primary-dark visited:text-primary">{(index + 1) + ". " + (c.description || c.title || "Default certificate")}</a>
                                <span className="text-gray-600 italic text-sm ml-6">{timeAgo(c.createdAt, t)}</span>
                                <button className="ml-3" onClick={() => handleDelete(c.title, c.id)}>
                                    <TrashIcon className="h-4 w-4 text-red-500 hover:text-red-700"/>
                                </button>
                            </div>
                        )) : (
                            <span>There is no certificate, please update.</span>
                        )}
                    </div>
                </div>

                {/* THẺ UPDATE COVER LETTER*/}
                <span className="text-gray-400 text-sm font-semibold mb-1 mt-10 block uppercase text-left">cover letter</span>
                <div className="bg-white shadow-md rounded-md p-6 w-full flex flex-col">
                    <div className="flex justify-between items-center mx-4 mb-2">
                        <span className="font-bold text-2xl">Cover letter</span>
                        <button
                            onClick={() => (setMediaType('COVER_LETTER'), setCreateMedia(true))} 
                            className="flex items-center text-primary hover:text-primary-dark">
                            <span className="mr-0.5">Add</span>
                            <PencilIcon className="w-4 h-4 "/>
                        </button>
                    </div>
                    <div className="flex relative border border-dashed border-gray-400 rounded-md p-2 justify-center items-center flex-col gap-4 min-h-32 space-y-2 pl-10">
                        {coverLetter.length > 0 ? coverLetter.map((c, index) => (
                            <div key={index} className="flex w-full justify-start items-end">
                                <a href="#" 
                                onClick={(e) => {
                                    e.preventDefault(); // Quan trọng: Chặn trình duyệt nhảy trang
                                    setOpen(c.url);    // Chạy useState của cậu ở đây
                                }}
                                className="underline text-blue-600 hover:text-primary-dark visited:text-primary">{(index + 1) + ". " + (c.description || c.title || "Default cover letter")}</a>
                                <span className="text-gray-600 italic text-sm ml-6">{timeAgo(c.createdAt, t)}</span>
                                <button className="ml-3" onClick={() => handleDelete(c.title, c.id)}>
                                    <TrashIcon className="h-4 w-4 text-red-500 hover:text-red-700"/>
                                </button>
                            </div>
                        )) : (
                            <span>There is no cover letter, please update.</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileMedia
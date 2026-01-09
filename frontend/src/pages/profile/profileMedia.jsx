import { useEffect, useState, useRef } from "react";
import { getLatestMediaByType } from "../../utils/companyMapper";
import { REF_MODULE } from "../../services/mediaService";
import { useTranslation } from "react-i18next";

const ProfileMedia = ({ attachments, applicantId, url, handleUploadMedia, handlePostMediaForApplicantProfile, refreshProfile, refreshAvatar }) => {
    const [currentAvatar, setCurrentAvatar] = useState(url);
    const { t } = useTranslation();
    
    // State lưu object ảnh tạm thời sau khi upload
    const [tempAvatar, setTempAvatar] = useState(null);
    const fileInputRef = useRef(null);

    // Ảnh gốc từ DB
    useEffect(() => {
        // Kiểm tra xem attachments có dữ liệu chưa mới xử lý
        if (attachments && attachments.length > 0) {
            const latest = getLatestMediaByType(attachments, 'AVATAR');
            if (latest?.url) { // Dùng dấu ?. để không bao giờ bị crash
                setCurrentAvatar(latest.url);
            }
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

            } catch (error) {
                console.error("Post media failed", error);
            }
        }
    };

    // Cancel: Bỏ ảnh tạm, quay về ảnh cũ
    const handleCancel = () => {
        setTempAvatar(null);
    };

    return (
        <div className="flex flex-col items-start justify-start">
            <span className="text-gray-400 text-sm font-semibold mb-1 block uppercase text-left">profile avatar</span>
            <div className="bg-white shadow-md rounded-md p-6 w-full">
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
                                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
                                >
                                    Apply
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileMedia
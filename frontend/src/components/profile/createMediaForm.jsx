import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, CloudArrowUpIcon, DocumentIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { REF_MODULE } from '../../services/mediaService';
import toast from 'react-hot-toast';

const CreateMediaForm = ({ 
    handleUploadMedia, 
    handlePostMediaForApplicantProfile, 
    mediaType, 
    setCreateMedia, 
    applicantId,
    refreshAvatar
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: ''
    });
    const [uploading, setUploading] = useState(false);
    const [previewName, setPreviewName] = useState('');

    // Hàm xử lý khi chọn file (Hình ảnh hoặc PDF)
    const onFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreviewName(file.name);
        setUploading(true);
        
        try {
            // Chạy hàm upload trả về link
            const response = await handleUploadMedia(file);
            // Giả sử response trả về object có chứa fileUrl như cậu mô tả
            if (response && response.data && response.data.fileUrl) {
                setFormData(prev => ({ ...prev, url: response.data.fileUrl }));
            }
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Upload failed, please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleCancel = () => {
        // Reset toàn bộ state
        setFormData({ title: '', description: '', url: '' });
        setPreviewName('');
        setCreateMedia(false);
    };

    const handleConfirm = async () => {
        if (!formData.url) {
            toast.warn("Please upload a file first!");
            return;
        }

        const dataSubmit = {
            title: formData.title || "Untitled file",
            description: formData.description || "",
            attachmentType: mediaType, // Lấy từ prop, không cho sửa
            url: formData.url
        };

        try {
            await handlePostMediaForApplicantProfile(applicantId, dataSubmit);
            // Fetch ngầm bên dưới để đồng bộ data (không ảnh hưởng UI nữa)
            await refreshAvatar(REF_MODULE.APPLICANT, applicantId);
            handleCancel(); // Thành công thì đóng form và xóa dữ liệu
            toast.success("The file is updated!")
        } catch (error) {
            toast.error("Post media failed:", error.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-bold text-gray-800 uppercase">Upload {mediaType == 'COVER_LETTER' ? 'COVER LETTER' : mediaType == 'IMAGE' ? 'CERTIFICATE' : 'CV'}</h3>
                    <button onClick={handleCancel} className="p-1 hover:bg-gray-100 rounded-full">
                        <XMarkIcon className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    {/* Input chọn File */}
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors relative">
                        <input 
                            type="file" 
                            accept="image/*,application/pdf"
                            onChange={onFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {uploading ? (
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                                <span className="text-sm text-gray-500">Uploading...</span>
                            </div>
                        ) : formData.url ? (
                            <div className="flex flex-col items-center text-green-600">
                                {previewName.endsWith('.pdf') ? <DocumentIcon className="h-10 w-10" /> : <PhotoIcon className="h-10 w-10" />}
                                <span className="text-xs mt-1 text-center truncate w-40">{previewName}</span>
                                <span className="text-[10px] font-bold mt-1">✓ READY TO CONFIRM</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <CloudArrowUpIcon className="h-10 w-10 text-primary" />
                                <span className="text-sm font-medium text-gray-600">Click to upload Image or PDF</span>
                            </div>
                        )}
                    </div>

                    {/* Input Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                        <input 
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="Enter title..."
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>

                    {/* Input Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <textarea 
                            rows="3"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            placeholder="Enter description..."
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none resize-none"
                        />
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 p-4 bg-gray-50">
                    <button 
                        onClick={handleCancel}
                        className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleConfirm}
                        disabled={!formData.url}
                        className={`px-6 py-2 text-sm font-bold text-white rounded-md shadow-md transition-all ${
                            !formData.url ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark active:scale-95'
                        }`}
                    >
                        Confirm
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateMediaForm;
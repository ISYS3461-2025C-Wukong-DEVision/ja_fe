
import { u } from "framer-motion/client";
import { uploadMedia, postMediaForApplicantProfile, deleteMediaById, getAttachments } from "../../services/mediaService";
import { useEffect, useState } from "react";

export const useMedia = () => {
    const [mediaUploading, setMediaUploading] = useState(false);
    const [media, setMedia] = useState([]);

    const handleUploadMedia = async (file, refModule) => { // Nhận vào refModule
        setMediaUploading(true);
        try {
            const formData = new FormData();
            
            // 1. Trường 'file' 
            formData.append('file', file);
            
            // 2. Trường 'refModule' 
            // Nếu refModule null/undefined thì có thể không cần append, hoặc gửi chuỗi rỗng tùy backend
            if (refModule) {
                formData.append('refModule', refModule);
            }

            // Gọi API
            const uploadResponse = await uploadMedia(formData);
            // QUAN TRỌNG: Phải return kết quả để bên Component nhận được
            return uploadResponse; 

        } catch (error) {
            console.error("Upload error", error);
            return null;
        } finally {
            setMediaUploading(false);
        }
    };

    const handlePostMediaForApplicantProfile = async (applicantId, mediaData) => {
        try {
            const response = await postMediaForApplicantProfile(applicantId, mediaData);
            return response;
        } catch (error) {
            console.error("Post media for applicant profile error", error);
            throw error;
        }
    };

    const handleDeleteMediaById = async (mediaId) => {
        try {
            await deleteMediaById(mediaId);
        } catch (error) {
            console.error("Delete media error", error);
            throw error;
        }
    };

    const fetchAttachments = async (refModule, refId) => {
        setMediaUploading(true);
        try {
            const response = await getAttachments(refModule, refId);
            
            const finalData = response.data?.items || [];
            setMedia(finalData)
            return finalData;
        } catch (error) {
            console.error("Fetch attachments error", error);
            throw error;
        } finally {
            setMediaUploading(false);
        }
    };


    return {
        mediaUploading,
        handleUploadMedia,
        handlePostMediaForApplicantProfile,
        handleDeleteMediaById,
        media,
        fetchAttachments
    };
};

import { useEffect, useState, useMemo } from "react";
import { useApplication } from "../hook/useApplication";
import { useAuth } from "../hook/useAuth";
import { useMedia } from "../hook/useMedia";
import { useNavigate } from "react-router-dom";
import { XMarkIcon, CheckCircleIcon, DocumentTextIcon, PhotoIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const ApplicationCard = ({ job_post_id, onClose }) => {
    const { user, isAuthenticated } = useAuth();
    const { fetchAttachments, media } = useMedia();
    const { createApplied } = useApplication();
    const navigate = useNavigate();
    const [description, setDescription] = useState("");

    // State quản lý các ID media được chọn
    const [selectedIds, setSelectedIds] = useState([]);
    
    // State để hiển thị ảnh preview (lưu URL hoặc object media)
    const [previewMedia, setPreviewMedia] = useState(null);

    // Fetch dữ liệu khi mount
    useEffect(() => {
        if (isAuthenticated && user?.id) {
            // "APPLICANT" là role, user.id là chủ sở hữu
            fetchAttachments("APPLICANT", user.id);
        }
    }, [isAuthenticated, user?.id]);

    // 1. Lọc dữ liệu ra 2 mảng riêng biệt
    // Sử dụng useMemo để tránh lọc lại không cần thiết khi re-render
    const cvList = useMemo(() => 
        media?.filter(item => item.attachmentType === "CURRICULUM_VITAE") || [], 
    [media]);

    const coverLetterList = useMemo(() => 
        media?.filter(item => item.attachmentType === "COVER_LETTER") || [], 
    [media]);

    // Hàm xử lý chọn/bỏ chọn file
    const toggleSelection = (id) => {
        setSelectedIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id); // Xóa nếu đã có
            } else {
                return [...prev, id]; // Thêm nếu chưa có
            }
        });
    };

    // Hàm xử lý nộp đơn
    const handleSubmit = async () => {
        if (selectedIds.length === 0) {
            toast.error("Please select at least one document!");
            return;
        }

        // Biến đổi danh sách ID đã chọn thành danh sách Object chi tiết
        const selectedMediaObjects = media
            .filter(item => selectedIds.includes(item.id))
            .map(item => ({
                title: item.title,
                description: item.description || "",
                attachmentType: item.attachmentType,
                url: item.url
            }));
        
        const currentDate = new Date().toISOString();
        const payload = {
            applicantId: user.id,
            jobPostId: job_post_id,
            status: "PENDING", // Luôn là PENDING
            description: description, // Nội dung từ textarea
            mediaList: selectedMediaObjects // Danh sách object chi tiết
        };
        

        const result = await createApplied(payload);
        if (result) {
            toast.success("Applied successfully!");
            if (onClose) onClose();
        }
    };

    // --- RENDER LOGIC ---

    // Trường hợp chưa đăng nhập
    if (!isAuthenticated) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-xl">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Authentication Required</h3>
                    <p className="text-gray-600 mb-6">Please login to reach our feature and apply for this job.</p>
                    <div className="flex gap-3 justify-center">
                        <button 
                            onClick={() => onClose && onClose()}
                            className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => navigate('/login')}
                            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Component hiển thị từng Item (File)
    const RenderMediaItem = ({ item }) => {
        const isSelected = selectedIds.includes(item.id);

        return (
            <div 
                // Click vào khối -> Chọn file
                onClick={() => toggleSelection(item.id)}
                className={`relative flex items-center p-3 rounded-md border-2 cursor-pointer transition-all mb-2
                    ${isSelected ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50 bg-white"}
                `}
            >
                {/* Checkbox Icon indicator */}
                <div className={`mr-3 w-5 h-5 rounded-full border flex items-center justify-center
                    ${isSelected ? "bg-primary border-primary" : "border-gray-300"}
                `}>
                    {isSelected && <CheckCircleIcon className="w-4 h-4 text-white" />}
                </div>

                <div className="flex-1 min-w-0">
                    {/* Click vào Title -> Xem Preview (stopPropagation để không kích hoạt chọn) */}
                    <p 
                        onClick={(e) => {
                            e.stopPropagation(); 
                            setPreviewMedia(item);
                        }}
                        className="text-sm font-medium text-gray-900 truncate hover:text-primary hover:underline"
                        title="Click to preview"
                    >
                        {item.description || "Untitled Document"}
                    </p>
                    <p className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <div className="ml-2">
                    <PhotoIcon 
                        className="w-5 h-5 text-gray-400 hover:text-primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            setPreviewMedia(item);
                        }}
                    />
                </div>
            </div>
        );
    };

    return (
        // Overlay nền đen mờ
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            
            {/* Main Modal Card */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden">
                
                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">Apply for Job</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition">
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    
                    {/* Section: CV */}
                    <div className="mb-6">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center">
                            <DocumentTextIcon className="w-4 h-4 mr-2" />
                            Curriculum Vitae (CV)
                        </h3>
                        {cvList.length > 0 ? (
                            cvList.map(item => <RenderMediaItem key={item.id} item={item} />)
                        ) : (
                            <div className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded border border-dashed text-center">
                                You haven't uploaded any CV yet. <br/>
                                <span 
                                    onClick={() => navigate('/profile')}
                                    className="text-primary font-medium cursor-pointer hover:underline"
                                >
                                    Go to Profile to upload one.
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Section: Cover Letter */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center">
                            <DocumentTextIcon className="w-4 h-4 mr-2" />
                            Cover Letter
                        </h3>
                        {coverLetterList.length > 0 ? (
                            coverLetterList.map(item => <RenderMediaItem key={item.id} item={item} />)
                        ) : (
                            <div className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded border border-dashed text-center">
                                No Cover Letter found. <br/>
                                <span 
                                    onClick={() => navigate('/profile')}
                                    className="text-primary font-medium cursor-pointer hover:underline"
                                >
                                    Go to Profile to create one.
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="mt-6">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2 flex items-center">
                            Short message for company
                        </h3>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-sm resize-none"
                            rows="3"
                            placeholder="Write a brief introduction or why you're a good fit..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-white transition"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={selectedIds.length === 0}
                        className={`px-5 py-2 rounded-lg text-white font-medium transition shadow-sm
                            ${selectedIds.length === 0 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-primary hover:bg-primary-dark shadow-primary/30"}
                        `}
                    >
                        Submit Application
                    </button>
                </div>

                {/* --- PREVIEW MODAL (Nằm đè lên trên form apply nếu được kích hoạt) --- */}
                {previewMedia && (
                    <div 
                        className="absolute inset-0 z-50 bg-white/95 flex flex-col animate-slideInUp"
                        onClick={(e) => e.stopPropagation()} // Chặn click xuyên thấu
                    >
                        {/* Preview Header */}
                        <div className="flex justify-between items-center p-3 border-b bg-gray-100 shadow-sm">
                            <span className="font-semibold text-gray-700 truncate max-w-[80%]">
                                Preview: {previewMedia.title}
                            </span>
                            <button 
                                onClick={() => setPreviewMedia(null)}
                                className="text-gray-500 hover:text-red-500 px-3 py-1 rounded border border-gray-300 bg-white hover:bg-red-50 text-sm"
                            >
                                Close Preview
                            </button>
                        </div>
                        
                        {/* Preview Content - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-4 flex justify-center bg-gray-200">
                             {/* Giả sử media.url là đường dẫn ảnh */}
                             {/* Nếu ảnh quá dài, thẻ div cha đã có overflow-y-auto để scroll */}
                            <img 
                                src={previewMedia.url || "https://via.placeholder.com/600x800?text=No+Preview+Available"} 
                                alt="Document Preview" 
                                className="max-w-full h-auto shadow-lg object-contain bg-white min-h-[200px]" 
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ApplicationCard;
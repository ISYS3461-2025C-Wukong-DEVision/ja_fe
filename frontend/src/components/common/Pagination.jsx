import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Pagination = ({ filters, setFilters, totalPages, type = 'job' }) => {
    // Xác định key dựa trên type
    const pageKey = type === 'job' ? 'pageNumber' : 'page_no';
    
    // Lấy trang hiện tại từ đúng key
    const currentPage = filters[pageKey] || 1;

    // Hàm thay đổi trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            
            // Cập nhật đúng key tương ứng
            setFilters((prev) => ({ ...prev, [pageKey]: page }));
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // ... Logic getPageNumbers giữ nguyên ...
    const getPageNumbers = () => {
        const pages = [];
        const range = 2; 

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || 
                i === totalPages || 
                (i >= currentPage - range && i <= currentPage + range)
            ) {
                pages.push(i);
            } else if (
                i === currentPage - range - 1 || 
                i === currentPage + range + 1
            ) {
                pages.push('...');
            }
        }
        return pages.filter((item, index) => pages.indexOf(item) === index);
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center space-x-2 my-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center space-x-1">
                {getPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                        disabled={page === '...'}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                            page === currentPage
                                ? 'bg-primary text-white border border-primary shadow-sm'
                                : page === '...'
                                ? 'cursor-default text-gray-400'
                                : 'text-gray-600 border border-gray-300 hover:border-primary hover:text-primary'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>
        </div>
    );
};

export default Pagination;
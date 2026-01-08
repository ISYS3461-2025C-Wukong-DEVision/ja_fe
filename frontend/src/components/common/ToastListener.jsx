// ToastListener.jsx
import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ToastListener = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isToastActive = useRef(false);

    useEffect(() => {
        const handleExpired = () => {
            if (isToastActive.current) return;

        isToastActive.current = true;

        toast((toast2) => (
            <div className='flex flex-col justify-center items-end p-5 space-y-6'>
                <div className='w-full text-left'>
                    {t('validate-label')}
                </div>
                <div className='flex items-center space-x-4'>
                    <button 
                        onClick={() => {
                        toast.dismiss(toast2.id);
                        }}
                        className='py-2 px-4 bg-gray-400 text-white hover:bg-gray-700 rounded-sm'
                    >
                        {t('cancel-label')}
                    </button>
                    <button 
                        onClick={() => {
                        toast.dismiss(toast2.id);
                        navigate('/login'); // Dùng navigate
                        }}
                        className='py-2 px-4 bg-primary text-white hover:bg-primary-dark rounded-sm'
                    >
                        {t('confirm-label')}
                    </button>
                </div>
            </div>
        ), { duration: 15000 });
        };

        window.addEventListener('auth-token-expired', handleExpired);
        return () => window.removeEventListener('auth-token-expired', handleExpired);
    }, [navigate]);

    return null; // Component này không hiển thị gì lên màn hình, chỉ lắng nghe
};

export default ToastListener;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const SuccessApplication = () => {
    const navigate = useNavigate();
    const {t} = useTranslation()

    useEffect(() => {
        // Hiện thông báo thành công
        Swal.fire({
            icon: 'success',
            title: t('Applied_success'),
            text: t('Applied_success2'),
            timer: 2000, // 2 giây
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        }).then(() => {
            // Sau khi hết 2s -> Quay về trang Subscription
            navigate('-1');
        });
    }, [navigate]);

    // Trả về màn hình trống (hoặc loading) trong lúc chờ Swal
    return <div className="w-full h-screen bg-white"></div>;
};

export default SuccessApplication;
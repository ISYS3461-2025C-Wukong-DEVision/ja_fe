import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const PaymentCancel = () => {
    const navigate = useNavigate();
    const {t} = useTranslation()

    useEffect(() => {
        Swal.fire({
            icon: 'error',
            title: t('payment_cancel'),
            text: t('payment_cancel2'),
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(() => {
            // Quay về trang Subscription bình thường
            navigate('/subscription');
        });
    }, [navigate]);

    return <div className="w-full h-screen bg-white"></div>;
};

export default PaymentCancel;

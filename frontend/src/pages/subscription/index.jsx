import React, { useState, useEffect } from 'react';
import SubscriptionCard from '../../components/subscription/SubscriptionCard';
import { useTranslation } from 'react-i18next';
import LoadingAnimation from '../../components/common/loadingAnimation';
import { usePayment } from '../../components/hook/usePayment';
import Swal from 'sweetalert2'; // 
import toast from 'react-hot-toast'; // 
import { useAuth } from '../../components/hook/useAuth';
import { useNavigate } from 'react-router-dom';


const handleCancel = async (onCancel, fetchIsPremium) => {
  const result = await Swal.fire({  
      title: 'Are you sure?',
      text: `Do you want to cancel your Premium plan?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9496FF',
      cancelButtonColor: '#9EA1A5',
      confirmButtonText: 'Yes, Cancel this plan!',
      cancelButtonText: 'No, I change my mind'
  });

  if (result.isConfirmed) {
      try {
          await onCancel(); // Chờ hủy xong
          await fetchIsPremium(); // Fetch lại dữ liệu mới nhất
          
          window.scrollTo({ top: 0, behavior: 'smooth' });
          Swal.fire('Canceled!', `The premium plan has been canceled.`, 'success');
      } catch (error) {
          toast.error(`Cancel failed: ${error.message}`);
      }
  }
};

const initialSubscriptionOptions = [
  {
    name: "Basic Plan",
    descriptions: ["free_des1", "free_des2", "free_des3", "free_des4", "free_des5"],
    cost: 0,
    isApplied: true, // Mặc định, sẽ được cập nhật lại bởi useEffect
  },
  {
    name: "Premium Plan",
    descriptions: ["premium_des1", "premium_des2", "premium_des3", "premium_des4", "premium_des5"],
    cost: 9.99,
    isApplied: false,
  },
  {
    name: "Enterprise Plan",
    descriptions: ["enterprise_des1", "enterprise_des2", "enterprise_des3", "enterprise_des4", "enterprise_des5"],
    cost: 29.99,
    isApplied: false,
  },
];

const Subscription = () => {
    const { postPay, postCancel } = usePayment();
    const { isAuthenticated, isPremium, fetchIsPremium } = useAuth()

    const { t } = useTranslation();
    const [plans, setPlans] = useState(initialSubscriptionOptions);
    const [isPageLoading, setIsPageLoading] = useState(false);
    

    // 2. Fetch trạng thái Premium khi mới vào trang
    useEffect(() => {
      if (!isAuthenticated) return;
      fetchIsPremium();
    }, []);

    // 3. Đồng bộ giao diện (isApplied) mỗi khi biến isPremium thay đổi
    useEffect(() => {
        if (!isAuthenticated) return;
        setPlans((prevPlans) => 
            prevPlans.map((plan) => {
                if (isPremium) {
                    // Nếu đang Premium -> Highlight gói Premium
                    return { ...plan, isApplied: plan.name === "Premium Plan" };
                } else {
                    // Nếu không -> Highlight gói Basic
                    return { ...plan, isApplied: plan.name === "Basic Plan" };
                }
            })
        );
    }, [isPremium]);


    const handleApplyPlan = async (selectedName) => {
        if (!isAuthenticated) {
          handleRequireLogin()
          return;
        }
        // CASE A: Chọn Basic Plan (Hủy gói)
        if (selectedName === "Basic Plan") {
            if (isPremium) {
                // Chỉ hủy nếu đang là Premium
                await handleCancel(postCancel, fetchIsPremium);
            } else {
                // Nếu đang dùng Basic rồi mà nhấn lại thì không làm gì hoặc thông báo
                toast.success("You are currently on the Basic Plan.");
            }
            return;
        }

        // CASE B: Chọn Premium/Enterprise (Thanh toán)
        if (selectedName === "Premium Plan" || selectedName === "Enterprise Plan") {
            if (isPremium && selectedName === "Premium Plan") {
                 toast.success("You are already a Premium member!");
                 return;
            }

            setIsPageLoading(true);
            try {
                // Gọi hàm thanh toán (Hàm này sẽ redirect nên không cần tắt loading ngay)
                await postPay(); 
            } catch (error) {
                console.error(error);
                setIsPageLoading(false); // Chỉ tắt loading nếu lỗi
            }
        }
    };

    const nav = useNavigate();

    const handleRequireLogin = () => {
        Swal.fire({
            title: 'Login Required',
            // Dùng 'html' thay vì 'text' để chỉnh màu
            html: `${t('request1')} <b style="color: #9496FF">Premium Plan</b>${t('request2')}`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#9496FF',
            cancelButtonColor: '#9EA1A5',
            confirmButtonText: t('countinue'),
            cancelButtonText: t('after')
        }).then((result) => {
            if (result.isConfirmed) {
                // Đợi 0.5s sau khi bảng đóng rồi mới chuyển trang
                setTimeout(() => {
                    nav('/login');
                }, 500);
            }
        });
    };


    return (
        <div className="relative">
            {/* ===== LOADING OVERLAY ===== */}
            {isPageLoading && (
            <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
                <LoadingAnimation text={t('loading')} />
            </div>
            )}

            {/* ===== PAGE CONTENT ===== */}
            <div className="flex flex-col items-center justify-center p-6 h-full mb-6">
              <h2 className="text-4xl text-center text-primary-dark font-allerta mb-2">
                {t('choose_your_subscription_plan')}
              </h2>
              <h4 className='text-xl text-center text-primary italic mb-12'>
                {t('subscription_description')}
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-8">
                  {plans.map((option, index) => (
                  <SubscriptionCard
                      key={index}
                      name={option.name}
                      descriptions={option.descriptions.map((key) => t(key))}
                      cost={option.cost}  
                      func={() => handleApplyPlan(option.name)}
                      isApplied={option.isApplied} // State này giờ đã được sync với isPremium
                      isDisabled={option.name === "Enterprise Plan"}
                  />
                  ))}
              </div>
            </div>
        </div>
    );

}

export default Subscription;
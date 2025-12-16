import React, {useState} from 'react'
import SubscriptionCard from '../../components/subscription/SubscriptionCard'
import confetti from "canvas-confetti";
import { useTranslation } from 'react-i18next';
import LoadingAnimation from '../../components/common/loadingAnimation';

const shootConfetti = () => {
  const duration = 1500;
  const end = Date.now() + duration;

  (function frame() {
    // trái
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });

    // phải
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    // giữa
    confetti({
      particleCount: 6,
      spread: 80,
      origin: { x: 0.5, y: 0.7 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};



const initialSubscriptionOptions = [
  {
    name: "Basic Plan",
    descriptions: [
      "free_des1",
      "free_des2",
      "free_des3",
      "free_des4",
      "free_des5",
    ],
    cost: 0,
    isApplied: true,
  },
  {
    name: "Premium Plan",
    descriptions: [
      "premium_des1",
      "premium_des2",
      "premium_des3",
      "premium_des4",
      "premium_des5",
    ],
    cost: 9.99,
    isApplied: false,
  },
  {
    name: "Enterprise Plan",
    descriptions: [
      "enterprise_des1",
      "enterprise_des2",
      "enterprise_des3",
      "enterprise_des4",
      "enterprise_des5",
    ],
    cost: 29.99,
    isApplied: false,
  },
];

const Subscription = () => {
    const {t} = useTranslation();
    const [plans, setPlans] = useState(initialSubscriptionOptions);
    const [isPageLoading, setIsPageLoading] = useState(false);


    const handleApplyPlan = (selectedName) => {
        // bật loading toàn trang
        setIsPageLoading(true);

        setTimeout(() => {
            // apply plan
            setPlans((prevPlans) =>
            prevPlans.map((plan) => ({
                ...plan,
                isApplied: plan.name === selectedName,
            }))
            );

            // confetti
            if (selectedName === "Premium Plan" || selectedName === "Enterprise Plan") {
            shootConfetti();
            }

            // tắt loading
            setIsPageLoading(false);
        }, 1000);
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
                      isApplied={option.isApplied}
                      isDisabled={option.name === "Enterprise Plan"}
                  />
                  ))}
              </div>
            </div>
        </div>
    );

}

export default Subscription
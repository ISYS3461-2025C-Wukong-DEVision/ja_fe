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
    des1: "You can access job postings from 100+ companies and explore thousands of available job opportunities.",
    des2: "You can search for jobs using basic filters such as job title, employment type, location, and salary range.",
    des3: "You can apply for jobs directly through the platform with an optional cover letter.",
    des4: "You can create and manage your personal profile, including education, work experience, and career objectives.",
    des5: "You can view and track all your current and past job applications in one place.",
    cost: 0.00,
    isApplied: true,
  },
  {
    name: "Premium Plan",
    des1: "You receive instant notifications whenever a new job is posted that matches your saved preferences.",
    des2: "You can create and save a personalized search profile based on your skills, desired job titles, employment types, country, and salary range.",
    des3: "You are automatically matched with relevant job opportunities without needing to search manually every time.",
    des4: "You can discover highly relevant jobs that closely align with your technical background and career goals.",
    des5: "Your profile is marked as a premium account, helping you stand out to employers.",
    cost: 9.99,
    isApplied: false,
  },
  {
    name: "Enterprise Plan",
    des1: "You receive priority notifications for high-demand job postings before they are shown to other users.",
    des2: "You can create and manage multiple job search profiles for different roles, locations, or career paths.",
    des3: "You gain access to detailed insights about job market trends and how well your skills match current demand.",
    des4: "Your profile is prioritized in recruiter searches, increasing your chances of being noticed by companies.",
    des5: "You receive dedicated support and advanced customization options tailored to serious job seekers.",
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
                      des1={option.des1}
                      des2={option.des2}
                      des3={option.des3}
                      des4={option.des4}
                      des5={option.des5}
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
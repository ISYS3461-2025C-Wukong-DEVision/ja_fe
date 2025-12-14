import React from 'react';
import { useTranslation } from 'react-i18next';
const SubscriptionCard = ({name, descriptions = [], cost, func, isApplied, isDisabled}) => {
    const {t} = useTranslation();
    const isPremiumOrEnterprise = name === 'Premium Plan' || name === 'Enterprise Plan';
    return (
        <div className="border border-gray-100 shadow-md bg-white min-w-[350px] max-w-[400px] rounded-tl-[50px] rounded-b-[10px] rounded-tr-[10px] hover:shadow-2xl hover:shadow-primary-light transition-shadow duration-300 flex flex-col">

            {/* Plan name and cost */}
            <div className="flex flex-col justify-center bg-primary rounded-tl-[50px] rounded-br-[50px] rounded-bl-[10px] rounded-tr-[10px] p-6 text-center h-32">
                <h3 className="text-base font-light text-white mb-2">{name}</h3>
                <h5 className="text-2xl font-extrabold text-white"> ${cost} / {t('month')} </h5>
            </div>
            <div className='flex flex-col justify-between h-full'>

                {/* Plan benefit description */}
                <ul className="flex-1 my-7 mx-8 text-primary-extraDark text-xs space-y-4 text-justify">
                    {descriptions.map((des, i) => (
                        <li key={i} className="flex items-start gap-2">
                        <span className="mt-0.5">
                            {isPremiumOrEnterprise ? '🎉' : '✓'}
                        </span>
                        <span className="leading-relaxed">
                            {des}
                        </span>
                        </li>
                    ))}
                </ul>

                {/* Handle subscription button */}
                <>
                    <div className=' h-px bg-primary-dark mx-4'/>
                    {isApplied ?
                        (<div className="text-primary py-2 px-4 rounded-md m-4 text-center text-2xl">
                            Subscribed
                        </div>)
                        :
                        (<button 
                            disabled={isDisabled}
                            onClick={func} 
                            className={`text-white py-2 px-4 rounded-md transition m-4 mt-6 ${isDisabled ? "bg-primary-dark/60" : "bg-primary-dark hover:bg-primary"}`}
                        >
                            {isDisabled ? "Coming Soon" : "Subscribe"}
                        </button>)
                    }
                </>
            </div>
        </div>
    );
}

export default SubscriptionCard;
import React, {useState, useEffect} from 'react';
import ProfileCard from "../../components/profile/profileCard";
import authService from "../../services/authService";
import { getApplicantByIdMock } from "../../services/applicantService";
import { PencilIcon } from "@heroicons/react/24/outline";
import LoadingAnimation from '../../components/common/loadingAnimation';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ProfileBigCard from '../../components/profile/profileDetailCard';

const Profile = () => {
    const nav = useNavigate();
    const URL = "https://truongthammylali.com/wp-content/uploads/2025/07/co-gai-anime-cute-voi-mai-toc-hong-va-doi-mat-to-tron-toat-len-ve-dang-yeu.jpg";
    const user = authService.getCurrentUser();
    const isAuth = !authService.isAuthenticated();
    const [applicant, setApplicant] = useState({});
    const name = `${applicant.first_name} ${applicant.last_name}`;
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation();
    const [activeTab, setActiveTab] = useState("profile");
    const percent = 80;
    
    useEffect(() => {
        if (isAuth) {
            setTimeout(() => {
            nav("/login");
            }, 500);
            toast.error(`${t('need_login')}`);
            return;
        }
        if (!user) return;
        getApplicantByIdMock(user.id)
          .then(setApplicant)
          .catch(() => console.log('Applicant not found'))
          .finally(() => setLoading(false));
    }, [user]);

    if (loading) 
        return <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center"><LoadingAnimation text={t('loading')} /></div>;

    return(
        <div className="flex flex-row justify-center items-start pt-6 pr-6 md:pl-6 bg-gray-100 space-x-6 pb-12 min-h-screen">
            <div className='flex-col items-center justify-center max-w-[350px] border border-gray-200 rounded-lg shadow-md bg-white pr-4 hidden xl:block'>
                <ProfileCard 
                    url={URL} 
                    percent={percent} 
                    name={name}
                    objective={applicant.objective}
                    size = {100}
                    isPremium={true}
                />
                {percent < 80 ?(
                    <span className='italic w-full pl-5 -mt-4 pb-3 text-red-500 text-xs'>Improve your CV profile to make a better impression on potential employers.</span>
                ):(
                    <span className='italic w-full pl-5 -mt-4 pb-3 text-green-500 text-xs'>Great job! Your CV profile is strong and ready to attract potential employers.</span>
                )}
                <div className='w-full pl-4'>
                    <div className='w-full h-px bg-primary-extraDark'/>
                </div>
                <div className='flex flex-col w-full py-4 space-y-2 pl-4'>
                    <div className='flex justify-between items-center w-full pl-2'>
                        <div className='text-xl font-semibold'>
                            {`Skill (Tags)`}
                        </div>
                        <button className='flex space-x-1 items-center hover:text-primary-dark text-primary'>
                            <span className='italic'>
                                Edit
                            </span>
                            <PencilIcon className='h-4 w-4'/>
                        </button>
                    </div>
                    <div className='flex flex-col w-full justify-center items-center border border-dashed border-gray-400 rounded-md p-2 space-y-1 min-h-16'>
                        <div className='text-sm font-light '>None</div>
                    </div>
                </div>
                <div className='flex flex-col w-full py-4 space-y-2 pl-4'>
                    <div className='flex justify-between items-center w-full pl-2'>
                        <div className='text-xl font-semibold'>
                            Searching Profile
                        </div>
                        <button className='flex space-x-1 items-center hover:text-primary-dark text-primary'>
                            <span className='italic'>
                                Edit
                            </span>
                            <PencilIcon className='h-4 w-4'/>
                        </button>
                    </div>
                    <div className='flex flex-col w-full justify-between border border-dashed border-gray-400 rounded-md p-2 space-y-1'>
                        <div className='text-sm font-light w-full '>Job title: None</div>
                        <div className='text-sm font-light w-full '>Employment type: None</div>
                        <div className='text-sm font-light w-full '>Country: None</div>
                        <div className='text-sm font-light w-full '>Salary Range: None</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col max-w-4xl w-full max-h-[80hv] items-center justify-center'>
                <div className="flex w-full h-[70px] items-center bg-white p-4 shadow-md rounded-md space-x-16">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`text-primary hover:text-primary-dark
                        ${activeTab === "profile"
                            ? "text-primary-dark font-extrabold border-b-2 border-primary-dark"
                            : "font-semibold"
                        }`}
                    >
                        My Profile CV
                    </button>

                    <button
                        onClick={() => setActiveTab("jobs")}
                        className={`text-primary hover:text-primary-dark
                        ${activeTab === "jobs"
                            ? "text-primary-dark font-extrabold border-b-2 border-primary-dark"
                            : "font-semibold"
                        }`}
                    >
                        Applied Jobs
                    </button>

                    <button
                        onClick={() => setActiveTab("transactions")}
                        className={`text-primary hover:text-primary-dark
                        ${activeTab === "transactions"
                            ? "text-primary-dark font-extrabold border-b-2 border-primary-dark"
                            : "font-semibold"
                        }`}
                    >
                        Transaction History
                    </button>
                </div>
                <span className='text-gray-400 text-sm w-full font-semibold mt-6 mb-1'>GENERAL INFORMATION</span>
                <div className='flex w-full items-start bg-white shadow-md rounded-md'>
                    <ProfileBigCard 
                        url={URL} 
                        percent={percent} 
                        name={name}
                        objective={applicant.objective}
                        size={200}
                        address={applicant.address}
                        phone={applicant.phone}
                        email={applicant.email}
                        isPremium={true}
                    />
                    <button className='flex space-x-1 items-center hover:text-primary-dark text-primary md:pr-4 pr-1 pt-1 md:pt-6'>
                        <PencilIcon className='h-6 w-6'/>
                        <span className='italic font-bold text-lg  whitespace-nowrap lg:block hidden'>
                            Edit Info
                        </span>
                    </button>
                </div>
                <span className='text-gray-400 text-sm w-full font-semibold mt-6 mb-1 hidden max-xl:block'>PROFILE FILTER</span>
                <div className='flex-col w-full items-start bg-white shadow-md rounded-md p-4 hidden max-xl:block'>
                    <div className='flex justify-between items-center w-full pl-2 mb-2'>
                        <div className='text-xl font-semibold'>
                            {`Skill (Tags)`}
                        </div>
                        <button className='flex space-x-1 items-center hover:text-primary-dark text-primary'>
                            <span className='italic'>
                                Edit
                            </span>
                            <PencilIcon className='h-4 w-4'/>
                        </button>
                    </div>
                    <div className='flex flex-col w-full justify-center items-center border border-dashed border-gray-400 rounded-md p-2 space-y-1 min-h-16'>
                        <div className='text-sm font-light '>None</div>
                    </div>
                    <div className='flex justify-between items-center w-full pl-2 mb-2 mt-6'>
                        <div className='text-xl font-semibold'>
                            Searching Profile
                        </div>
                        <button className='flex space-x-1 items-center hover:text-primary-dark text-primary'>
                            <span className='italic'>
                                Edit
                            </span>
                            <PencilIcon className='h-4 w-4'/>
                        </button>
                    </div>
                    <div className='flex flex-col w-full justify-between border border-dashed border-gray-400 rounded-md p-2 space-y-1'>
                        <div className='text-sm font-light w-full '>Job title: None</div>
                        <div className='text-sm font-light w-full '>Employment type: None</div>
                        <div className='text-sm font-light w-full '>Country: None</div>
                        <div className='text-sm font-light w-full '>Salary Range: None</div>
                    </div>
                </div>
                <span className='text-gray-400 text-sm w-full font-semibold mt-6 mb-1'>EDUCATION & WORK EXPERIENCE</span>
                <div className='flex flex-col w-full items-start bg-white shadow-md rounded-md space-y-4 p-4'>
                    <span className='text-3xl font-bold'>Summary</span>
                    <span className='italic text-gray-400 font-light'>Provide your work experience and education detail information helps us find easily the jobs that fit for you</span>
                    <div className='bg-gray-500 h-0.5 w-full' />
                    <div className='flex w-full justify-between items-end'>
                        <span className='text-2xl font-semibold px-4 pt-6'>Education</span>
                        <button className='flex items-center hover:text-primary-dark text-primary-dark pr-4 pb-1'>
                            <PencilIcon className='h-6 w-6'/>
                        </button>
                    </div>
                    <div className='flex w-full justify-between h-[200px] items-between border border-dashed border-gray-400 rounded-md'>
                        <span className='italic text-gray-400 font-light m-auto'>No education information added yet.</span>
                    </div>
                    <div className='bg-gray-500 h-0.5 w-full' />
                    <div className='flex w-full justify-between items-end'>
                        <span className='text-2xl font-semibold px-4 pt-6'>Experience Work</span>
                        <button className='flex items-center hover:text-primary-dark text-primary-dark pr-4 pb-1'>
                            <PencilIcon className='h-6 w-6'/>
                        </button>
                    </div>
                    <div className='flex w-full justify-between h-[200px] items-between border border-dashed border-gray-400 rounded-md'>
                        <span className='italic text-gray-400 font-light m-auto'>No experience work information added yet.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
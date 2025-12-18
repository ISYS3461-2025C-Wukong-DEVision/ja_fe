import React, {useState, useEffect} from 'react';
import ProfileCard from "../../components/profile/profileCard";
import authService from "../../services/authService";
import { getApplicantByIdMock } from "../../services/applicantService";
import { PencilIcon } from "@heroicons/react/24/outline";
import LoadingAnimation from '../../components/common/loadingAnimation';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const URL = "https://truongthammylali.com/wp-content/uploads/2025/07/co-gai-anime-cute-voi-mai-toc-hong-va-doi-mat-to-tron-toat-len-ve-dang-yeu.jpg";
    const user = authService.getCurrentUser();
    const [applicant, setApplicant] = useState({});
    const name = `${applicant.first_name} ${applicant.last_name}`;
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation();
    const [isProfile, setIsProfile] = useState(true);
    const percent = 80;
    
    useEffect(() => {
        if (!user) return;
    
        getApplicantByIdMock(user.id)
          .then(setApplicant)
          .catch(() => console.log('Applicant not found'))
          .finally(() => setLoading(false));
    }, [user]);

    if (loading) 
        return <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center"><LoadingAnimation text={t('loading')} /></div>;

    return(
        <div className="flex flex-row justify-center items-start p-6 bg-gray-100 space-x-4 pb-12 h-screen">
            <div className='flex flex-col items-center justify-center max-w-[320px] border border-gray-200 rounded-lg shadow-md bg-white pr-4'>
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
                <div className='flex justify-between items-center w-full py-4 pl-6 mt-4'>
                    <div className='text-2xl font-semibold'>
                        Skill
                    </div>
                    <button className='flex space-x-1 items-center hover:text-primary-dark text-primary'>
                        <span className='italic'>
                            Edit
                        </span>
                        <PencilIcon className='h-4 w-4'/>
                    </button>
                </div>
                <div className='flex justify-between items-center w-full py-4 pl-6'>
                    <div className='text-2xl font-semibold'>
                        Job Reference
                    </div>
                    <button className='flex space-x-1 items-center hover:text-primary-dark text-primary'>
                        <span className='italic'>
                            Edit
                        </span>
                        <PencilIcon className='h-4 w-4'/>
                    </button>
                </div>
            </div>
            <div className='flex flex-col max-w-4xl w-full max-h-[80hv] space-y-4 items-center justify-center'>
                <div className='flex flex-row w-full h-[70px] items-center bg-white p-4 shadow-md rounded-md space-x-16'>
                    <button className={`text-primary hover:text-primary-dark ${isProfile ? "text-primary-dark font-extrabold border-b-2 border-primary-dark" : "font-semibold"}`} onClick={() => setIsProfile(!isProfile)}>My Profile CV</button>
                    <button className={`text-primary hover:text-primary-dark ${!isProfile ? "text-primary-dark font-extrabold border-b-2 border-primary-dark" : "font-semibold"}`} onClick={() => setIsProfile(!isProfile)}>Applied Jobs</button>
                </div>
                <div className='flex flex-col w-full h-full items-center bg-white p-4 shadow-md rounded-md space-y-4'>

                </div>
            </div>
        </div>
    )
}

export default Profile;
import React, { useState, useEffect, useId } from 'react';
import ProfileCard from "../../components/profile/profileCard";
import { PencilIcon, TrashIcon, PlusIcon} from "@heroicons/react/24/solid";
import { CheckCircleIcon, FaceFrownIcon } from "@heroicons/react/24/outline";
import LoadingAnimation from '../../components/common/loadingAnimation';
import { useTranslation, Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ProfileBigCard from '../../components/profile/profileDetailCard';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useSalaryFormatter } from '../../utils/formatSalary';
import { calculateProfileCompletion } from '../../utils/profileCompletion';
import { useProfile } from '../../components/hook/useProfile';
import ProfileForm from '../../components/profile/profileForm';
import { useSkill } from '../../components/hook/useSkill';
import SkillForm from '../../components/profile/skillForm';
import { useEducation } from '../../components/hook/useEducation';
import EducationForm from '../../components/profile/educationForm';
import { useWorkExperience } from '../../components/hook/useWorkExperience';
import WorkExperienceForm from '../../components/profile/workExperienceForm';
import { useJobPreference } from '../../components/hook/useJobPreference';
import JobPreferenceForm from '../../components/profile/jobReferenceForm';
import { useMedia } from '../../components/hook/useMedia';
import ProfileMedia from './profileMedia';
import { useAuth } from '../../components/hook/useAuth';
import { usePayment } from '../../components/hook/usePayment';
import ProfileTransaction from './profileTransaction';
import { useApplication } from '../../components/hook/useApplication';
import ProfileJobApplied from './profileJobApplied';
import Swal from 'sweetalert2';


const Profile = () => {
    const {user, isAuthenticated, setUser} = useAuth();
    const { fetchMyApplied , myApplied } = useApplication();
    const { isPremium, fetchIsPremium, fetchMyTransaction, myTransaction } = usePayment();
    const { loading, profile, fetchProfile, handSave, editingProfile, setEditingProfile, isProfileOpen, setIsProfileOpen } = useProfile();
    const { isSkillOpen, setIsSkillOpen, editingSkill, setEditingSkill, skillHandSave, skill, fetchSkill } = useSkill();
    const { editingEducation, setEditingEducation, educationDelete, educationHandSave, isEducationOpen, setIsEducationOpen } = useEducation();
    const { editingWorkExperience, setEditingWorkExperience, workDelete, workHandSave, isWorkOpen, setIsWorkOpen} = useWorkExperience();
    const { editingJobPreference, setEditingJobPreference, jobPreferenceHandSave, isJobPreferenceOpen, setIsJobPreferenceOpen } = useJobPreference();
    const { media, fetchAttachments, handleUploadMedia, handlePostMediaForApplicantProfile, handleDeleteMediaById } = useMedia();
    const normalizedJobPreference = profile?.jobPreference && Object.keys(profile.jobPreference).length > 0 ? profile.jobPreference : null;
    const skills = (profile && profile.skills && Array.isArray(profile.skills)) ? profile.skills.map(skill => skill.id) : [];
    const nav = useNavigate();

    const getLatestAvatarUrl = (mediaList = []) => {
        return mediaList
            .filter(
            item =>
                item.attachmentType === "AVATAR" &&
                item.description === "Profile Picture"
            )
            .sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )[0]?.url || "https://truongthammylali.com/wp-content/uploads/2025/07/co-gai-anime-cute-voi-mai-toc-hong-va-doi-mat-to-tron-toat-len-ve-dang-yeu.jpg";
    };


    const handleDelete = async (title, id, type = "work") => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete "${title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9496FF', // Cậu có thể chỉnh màu theo primary của cậu
            cancelButtonColor: '#9EA1A5',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        // Nếu người dùng xác nhận (nhấn nút Confirm)
        if (result.isConfirmed) {
            try {
                if (type == "education") {
                    await educationDelete(applicantId, id)
                    await fetchProfile(applicantId)
                } else {
                    await workDelete(applicantId, id)
                    await fetchProfile(applicantId)
                }

                window.scrollTo({
                    top: 0, 
                    behavior: 'smooth' // 'smooth' giúp cuộn mượt mà, 'auto' nếu muốn nhảy ngay lập tức
                });
                // Thông báo thành công
                Swal.fire(
                    'Deleted!',
                    `${title} has been deleted.`,
                    'success'
                );
            } catch (error) {
                toast.error(`Delete failed: ${error.message}`);
            }
        }
    };



    const parseEmploymentType = (type) => {
        if (!type || typeof type !== 'string') return "";
        return type
            .toLowerCase()           // full_time
            .split("_")              // ["full", "time"]
            .map((word, i) =>
            i === 0
            ? word.charAt(0).toUpperCase() + word.slice(1) // "Full"
            : word               // giữ "time" thường
            )
            .join("-");              // "Full-time"
    };
    const employmentTypes = profile.jobPreference?.employmentTypes || [];
    const displayString = employmentTypes.map(type => parseEmploymentType(type)).join(", ");

    const URL = getLatestAvatarUrl(profile.mediaList || []);
    const name = `${profile.firstName || "Unknown"} ${profile?.lastName || "User"}`;
    const address = `${profile.address || '123 Street'}, ${profile.city || 'Happy City'}, ${profile.country || 'Wonder Land'}`;
    const applicantId = user?.id || "00000000-0000-0000-0000-000000000002";

    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("profile");
    const { formatByValue } = useSalaryFormatter();
    const percent = calculateProfileCompletion(profile);

    const [isXL, setIsXL] = useState(typeof window !== "undefined" ? window.innerWidth >= 1280 : true);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        if(!isAuthenticated) return;
        fetchProfile(applicantId)
        fetchAttachments("APPLICANT", applicantId);
        fetchIsPremium()
        fetchSkill()
    }, []);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if(!isAuthenticated) return;
        const handleResize = () => setIsXL(window.innerWidth >= 1280);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    // --- LOGIC ANIMATION HAI CHIỀU ---

    // 1. Sidebar: Bay từ dưới lên khi vào, rơi xuống dưới khi ra
    const sidebarVariants = {
        initial: { 
            opacity: 0, 
            scale: 0.5, 
            x: 500, 
            y: 500 
        },
        animate: { 
            opacity: 1, 
            scale: 1, 
            x: 0, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        exit: { 
            opacity: 0, 
            scale: 0.5, 
            x: 500, 
            y: 500, 
            transition: { duration: 0.6, ease: "easeInOut" } 
        }
    };

    // 2. Filter: Bounce nảy ra và thu nhỏ khi mất
    const filterVariants = {
        initial: { opacity: 0, scale: 0 },
        animate: { 
            opacity: 1, 
            scale: 1, 
            transition: { type: "spring", stiffness: 260, damping: 20 } 
        },
        exit: { 
            opacity: 0, 
            scale: 0, 
            transition: { duration: 0.3 } 
        }
    };
    if (!isAuthenticated) {
        return(
            <div className='flex-1 text-center p-16'>
                <div className="text-gray-600">
                    <p className="text-gray-600 text-xl">
                        {t('login_msg_part1')}
                        <span 
                            onClick={() => nav("/login")} 
                            className="underline text-primary hover:text-primary-dark cursor-pointer mx-1"
                        >
                            {t('login_action')}
                        </span>
                        {t('login_msg_part2')}
                    </p>
                </div>
            </div>
        );
    }

    if (loading)
        return <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center"><LoadingAnimation text={t('loading')} /></div>;

    return (
        // Dùng LayoutGroup để đồng bộ hóa việc di chuyển của phần thân
        <LayoutGroup>
            <div className="flex flex-row justify-center items-start pt-6 pr-6 pl-6 bg-gray-100 space-x-6 pb-12 min-h-screen overflow-hidden">
                <AnimatePresence>
                    {isProfileOpen && (
                        <ProfileForm 
                            initialData={editingProfile} 
                            setUser={setUser}
                            user = {user}
                            onSave={() => (handSave, setIsProfileOpen(false))} 
                            onCancel={() => (setIsProfileOpen(false))} 
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {isSkillOpen && (
                        <SkillForm
                            userId={applicantId}
                            allSkills={skill}
                            initialSelectedIds={editingSkill}
                            onSave={(useId, selectedIds) => skillHandSave(useId, selectedIds, () => fetchProfile(applicantId))}
                            onCancel={() => setIsSkillOpen(false)}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {isEducationOpen && (
                        <EducationForm
                            userId={applicantId}
                            initialData={editingEducation}
                            onSave={(userId, formData) => educationHandSave(userId, formData, () => fetchProfile(applicantId))}
                            onCancel={() => (setIsEducationOpen(false), setEditingEducation(null))}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {isWorkOpen && (
                        <WorkExperienceForm
                            userId={applicantId}
                            initialData={editingWorkExperience}
                            onSave={(userId, formData) => workHandSave(userId, formData, () => fetchProfile(applicantId))}
                            onCancel={() => (setIsWorkOpen(false), setEditingWorkExperience(null))}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {isJobPreferenceOpen && (
                        <JobPreferenceForm
                            userId={applicantId}
                            initialData={editingJobPreference}
                            onSave={(userId, formData) => jobPreferenceHandSave(userId, formData, () => fetchProfile(applicantId))}
                            onCancel={() => (setIsJobPreferenceOpen(false), setEditingJobPreference(null))}
                        />
                    )}
                </AnimatePresence>
                
                {/* SIDEBAR BÊN TRÁI - Dùng mode="popLayout" để không chiếm chỗ khi đang exit */}
                <AnimatePresence initial={false} mode="popLayout">
                    {isXL && (
                        <motion.div
                            key="sidebar-card"
                            variants={sidebarVariants}
                            initial={hasMounted ? "initial" : false}
                            animate="animate"
                            exit="exit"
                            layout // Tự động animate kích thước khi tráo đổi
                            className='flex flex-col items-center justify-center max-w-[350px] border border-gray-200 rounded-lg shadow-md bg-white pr-4'
                        >
                            <ProfileCard 
                                url={URL} 
                                percent={percent} 
                                name={name} 
                                objective={profile.objective || "This user is too lazy to add detail to his/her objective"} 
                                size={100} 
                                isPremium={isPremium} 
                            />
                            <span className={`pl-4 -mt-4 text-sm ${percent < 80 ? 'text-red-500' : 'text-green-500'}`}>{percent < 80 ? t("Fill_profile < 80%") : t("Complete_your_profile")}</span>
                            <div className='w-full pl-4'>
                                <div className='w-full h-px bg-primary-extraDark my-4'/>
                            </div>
                            {isPremium ? (
                                <div className='flex flex-col w-full py-2 pl-4 text-left'>
                                    <div className='flex w-full mb-4 items-center justify-between px-4'>
                                        <span className='text-xl font-semibold'>
                                            Skill (Tags)
                                        </span>
                                        <div className='flex items-center space-x-4'>
                                            <button 
                                                className='flex items-center text-primary hover:text-primary-dark'
                                                onClick={() => (setEditingSkill(skills), setIsSkillOpen(true))}
                                                >
                                                <span className='font-semibold text-sm'>Add</span>
                                                <PlusIcon className='h-3 w-3' />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='border border-dashed border-gray-400 rounded-md p-2 text-center text-gray-400'>
                                        {/* map skills name */}
                                        {profile.skills && profile.skills.length > 0 ? (
                                            profile.skills.map((skill, index) => (
                                                <div key={index} className='inline-block border border-primary text-primary-dark rounded-full px-4 py-1 m-2 text-sm font-medium'>
                                                    <span>
                                                        {skill.name}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <div>No skills added yet.</div>
                                        )}
                                    </div>

                                    <div className='flex w-full mb-4 items-center justify-between px-4 mt-12'>
                                        <span className='text-xl font-semibold'>
                                            Job Preference
                                        </span>
                                        <button 
                                            onClick={() => (setEditingJobPreference(normalizedJobPreference), setIsJobPreferenceOpen(true))}
                                            className='flex items-center text-primary hover:text-primary-dark space-x-0.5'>
                                            <span className='font-semibold text-sm'>Edit</span>
                                            <PencilIcon className='h-3 w-3' />
                                        </button>
                                    </div>
                                    <div className='flex flex-col items-start justify-center space-y-1 border border-dashed border-gray-400 rounded-md px-6 py-2 text-gray-700 mb-2'>
                                        {/* job references */}
                                        <span><strong>Country: </strong>{profile.jobPreference?.country || "Not specified"}</span>
                                        <span className={`${profile.jobPreference?.isFresher ? 'flex items-center text-green-500' : 'hidden'}`}>Fresher<CheckCircleIcon className='h-4 w-4 inline-block ml-1' /></span>
                                        <span><strong>Employment Type: </strong>{displayString || "N/A"}</span>
                                        <span><strong>Salary range: </strong>{formatByValue(profile.jobPreference?.salaryMin, profile.jobPreference?.salaryMax)}</span>
                                    </div>
                                </div>
                            ):(
                                <div className='flex flex-col text-left justify-center p-4 space-y-3'>
                                    <span className='text-sm text-gray-600 font-light text-justify'>{t('premium_slogan1')}</span>
                                    <span className='font-light text-sm text-gray-600 text-justify'><strong className='text-primary cursor-pointer font-medium' onClick={() => nav('/subscription')}>DEVisionJA Premium</strong>{t('premium_slogan2')}</span>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* PHẦN THÂN CHÍNH - Thêm prop layout để nó tràn sang trái mượt mà */}
                <motion.div 
                    layout 
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className='flex flex-col max-w-4xl w-full items-center justify-center'
                >
                    {/* TABS MENU */}
                    <motion.div 
                        layout 
                        // Hiệu ứng bay từ trên xuống khi mount
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.6, 
                            ease: "easeOut",
                            layout: { duration: 0.5 } // Tốc độ trượt ngang khi sidebar biến mất
                        }}
                        className="flex w-full h-[70px] items-center bg-white p-4 shadow-md rounded-md space-x-16 mb-6 overflow-hidden"
                    >
                        {[
                            { id: "profile", label: "My Profile CV" },
                            { id: "jobs", label: "Applied Jobs" },
                            { id: "media", label: "Media Management" },
                            { id: "transaction", label: "Transaction History"}
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className="relative h-full flex items-center justify-center outline-none group"
                            >
                                {/* Text giữ nguyên định dạng, không bị méo */}
                                <span className={`transition-all duration-300 whitespace-nowrap ${
                                    activeTab === tab.id 
                                    ? "text-primary-dark font-extrabold" 
                                    : "font-semibold text-gray-600 hover:text-primary"
                                }`}>
                                    {tab.label}
                                </span>

                                {/* Thanh gạch chân chạy mượt mà */}
                                {activeTab === tab.id && (
                                    <motion.div 
                                        layoutId="activeTabUnderline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-dark"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>
                    {/* NỘI DUNG THEO TỪNG TAB */}
                    <div className="w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab} // Key quan trọng để kích hoạt hiệu ứng khi đổi tab
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="w-full"
                            >
                                {activeTab === "profile" && (
                                    <div className="w-full">
                                        {/* GENERAL INFO */}
                                        <span className='text-gray-400 text-sm font-semibold mb-1 block uppercase text-left w-full'>Basic Information</span>
                                        <motion.div 
                                            layout="position" 
                                            className='relative flex w-full items-start bg-white shadow-md rounded-md p-2'
                                        >
                                            <button 
                                                onClick={() => (
                                                    setEditingProfile(profile && Object.keys(profile).length > 0 
                                                                        ? { ...profile, id: applicantId } 
                                                                        : null), 
                                                    setIsProfileOpen(true))} 
                                                className="absolute top-4 right-4 p-2 text-primary hover:text-primary-dark transition-colors z-10"
                                            >
                                                <PencilIcon className="h-6 w-6" />
                                            </button>

                                            <ProfileBigCard 
                                                url={URL} 
                                                percent={percent} 
                                                name={name} 
                                                objective={profile.objective || "This user is too lazy to add detail to his/her objective"} 
                                                size={200} 
                                                address={address} 
                                                phone={profile.phone || "None"} 
                                                email={profile.email || "example123@gmail.com"} 
                                                isPremium={isPremium} />
                                        </motion.div>

                                        {/* PROFILE FILTER Ở GIỮA */}
                                        <AnimatePresence mode="popLayout">
                                            {!isXL & isPremium && (
                                                <motion.div
                                                    key="filter-card"
                                                    layout="position"
                                                    variants={filterVariants}
                                                    initial={hasMounted ? "initial" : false}
                                                    animate="animate"
                                                    exit="exit"
                                                    className="w-full mt-6"
                                                >
                                                    <span className='text-gray-400 text-sm font-semibold mb-1 block uppercase text-left'>Profile Filter</span>
                                                    <div className='bg-white shadow-md rounded-md p-6'>
                                                        <div className='flex w-full mb-4 items-center justify-between px-4'>
                                                            <span className='text-xl font-semibold'>Skill (Tags)</span>
                                                            <div className='flex items-center space-x-4'>
                                                                <button 
                                                                    className='flex items-center text-primary hover:text-primary-dark'
                                                                    onClick={() => (setEditingSkill(skills), setIsSkillOpen(true))}
                                                                >
                                                                    <span className='font-semibold text-sm'>Add</span>
                                                                    <PlusIcon className='h-3 w-3' />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className='border border-dashed border-gray-400 rounded-md p-6 text-center text-gray-400'>
                                                            {profile.skills && profile.skills.length > 0 ? (
                                                                profile.skills.map((skill, index) => (
                                                                    <div key={index} className='inline-block border border-primary text-primary-dark rounded-full px-4 py-1 m-2 text-sm font-medium'>
                                                                        <span>{skill.name}</span>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div>No skills added yet.</div>
                                                            )}
                                                        </div>

                                                        <div className='flex w-full mb-4 items-center justify-between px-4 mt-12'>
                                                            <span className='text-xl font-semibold'>Job Preference</span>
                                                            <button 
                                                                onClick={() => (setEditingJobPreference(normalizedJobPreference), setIsJobPreferenceOpen(true))}
                                                                className='flex items-center text-primary hover:text-primary-dark space-x-0.5'>
                                                                <span className='font-semibold text-sm'>Edit</span>
                                                                <PencilIcon className='h-3 w-3' />
                                                            </button>
                                                        </div>
                                                        <div className='flex flex-col items-start justify-center space-y-1 border border-dashed border-gray-400 rounded-md p-6 text-gray-700'>
                                                            <span><strong>Country: </strong>{profile.jobPreference?.country || "Not specified"}</span>
                                                            <span className={`${profile.jobPreference?.isFresher ? 'flex items-center text-green-500' : 'hidden'}`}>Fresher<CheckCircleIcon className='h-4 w-4 inline-block ml-1' /></span>
                                                            <span><strong>Employment Type: </strong>{displayString || "N/A"}</span>
                                                            <span><strong>Salary range: </strong>{formatByValue(profile.jobPreference?.salaryMin, profile.jobPreference?.salaryMax)}</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* EDUCATION & EXPERIENCE */}
                                        <span className='w-full text-gray-400 text-sm font-semibold mb-1 block uppercase text-left mt-6'>Education & Experience</span>
                                        <motion.div 
                                            layout="position"
                                            className='flex flex-col w-full bg-white shadow-md rounded-md p-6 text-left'
                                        >
                                            <div className='flex items-center justify-between px-4'>
                                                <span className='text-2xl font-bold'>Education</span>
                                                <button 
                                                    onClick={() => (setEditingEducation(null), setIsEducationOpen(true))}
                                                    className='flex items-center text-primary hover:text-primary-dark'
                                                >
                                                    <span className='font-semibold'>Add</span>
                                                    <PlusIcon className='h-5 w-5' />
                                                </button>
                                            </div>
                                            <div className='border border-dashed border-gray-400 rounded-md mt-4 flex flex-col items-start justify-start space-y-6 italic text-gray-400 p-6 overflow-y-auto'>
                                                {profile.educations && profile.educations.length > 0 ? (
                                                    profile.educations.map((edu, index) => (
                                                        <div key={index} className='flex flex-col mb-2'>
                                                            <div className='flex'>
                                                                <span className='font-semibold text-gray-700 mr-4'>
                                                                    { `${index + 1}. Degree: ${edu.degreeType}`}
                                                                </span>
                                                                <button onClick={() => (setEditingEducation(edu), setIsEducationOpen(true))}>
                                                                    <PencilIcon className='h-4 w-4 text-primary hover:text-primary-dark mr-2' />
                                                                </button>
                                                                <button onClick={() => handleDelete(edu.degreeType, edu.id, "education")}>
                                                                    <TrashIcon className='h-4 w-4 text-red-500 hover:text-red-700' />
                                                                </button>
                                                            </div>
                                                            <span className='ml-4'>Institutions: {edu.institution}</span>
                                                            <span className='ml-4'>GPA: {edu.gpa}</span>
                                                            <span className='ml-4'>Start: {new Date(edu.startedAt).getFullYear()}, End: {edu.endedAt ? new Date(edu.endedAt).getFullYear() : "Present"}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>No education records available.</div>
                                                )}
                                            </div>
                                            
                                            <div className='flex items-center justify-between px-4 mt-12'>
                                                <span className='text-2xl font-bold'>Work Experience</span>
                                                <button 
                                                    onClick={() => (setEditingWorkExperience(null), setIsWorkOpen(true))}
                                                    className='flex items-center text-primary hover:text-primary-dark'
                                                >
                                                    <span className='font-semibold'>Add</span>
                                                    <PlusIcon className='h-5 w-5' />
                                                </button>
                                            </div>
                                            <div className='border border-dashed border-gray-400 rounded-md mt-4 flex flex-col items-start justify-start italic text-gray-400 p-6 overflow-y-auto space-y-8'>
                                                {profile.workExperiences && profile.workExperiences.length > 0 ? (
                                                    profile.workExperiences.map((exp, index) => (
                                                        <div key={index} className='flex flex-col'>
                                                            <div className='flex'>
                                                                <span className='font-semibold text-gray-700 mr-4'>
                                                                    {index + 1}. {exp.title}
                                                                </span>
                                                                <button onClick={() => (setEditingWorkExperience(exp), setIsWorkOpen(true))}>
                                                                    <PencilIcon className='h-4 w-4 text-primary hover:text-primary-dark mr-2' />
                                                                </button>
                                                                <button onClick={() => handleDelete(exp.title, exp.id)}>
                                                                    <TrashIcon className='h-4 w-4 text-red-500 hover:text-red-700' />
                                                                </button>
                                                            </div>
                                                            <span className='ml-4'>Description: {exp.description}</span>
                                                            <span className='ml-4'>Start: {new Date(exp.startedAt).toLocaleDateString()}, End: {exp.endedAt ? new Date(exp.endedAt).toLocaleDateString() : "Present"}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>No experience records available.</div>
                                                )}
                                            </div>
                                        </motion.div>
                                    </div>
                                )}

                                {activeTab === "media" && (
                                    <div className='w-full'>
                                        <ProfileMedia
                                            attachments={media}
                                            applicantId={applicantId}
                                            url={URL}
                                            handleUploadMedia={handleUploadMedia}
                                            handlePostMediaForApplicantProfile={handlePostMediaForApplicantProfile}
                                            handleDeleteMediaById={handleDeleteMediaById}
                                            refreshAvatar={fetchAttachments}
                                            refreshProfile={fetchProfile}
                                        />
                                    </div>
                                )}

                                {activeTab === "jobs" && (
                                    <ProfileJobApplied 
                                        fetchMyApplied={fetchMyApplied}
                                        myApplied={myApplied}
                                        applicantId={applicantId}
                                    />
                                )}

                                {activeTab === "transaction" && (
                                    <ProfileTransaction
                                        fetchMyTransaction={fetchMyTransaction}
                                        myTransaction={myTransaction}
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </LayoutGroup>
    );
};

export default Profile;
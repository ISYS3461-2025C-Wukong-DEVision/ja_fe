import CarouselCard from '../components/common/carouselCard';
import CompanyIcon from '../components/company/companyIcon';
import { useTranslation } from 'react-i18next';
import { getCompaniesMock } from '../services/companyService';
import LoadingAnimation from '../components/common/loadingAnimation';
import React, { useState, useEffect} from 'react';
import { getJobsMock } from '../services/jobService';
import authService from '../services/authService';

function Home() {
  const { t } = useTranslation();
  const [companies, setCompanies] = useState([]);
  const [ jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      console.log('Đã đăng nhập');
    } else {
      console.log('Chưa đăng nhập');
    }

    Promise.all([getCompaniesMock(), getJobsMock()])
      .then(([companiesData, jobsData]) => {
        setCompanies(companiesData);
        setJobs(jobsData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);


  if (loading) 
  return <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center"><LoadingAnimation text={t('loading')} /></div>;

  return (
    <div className="relative min-h-[85vh] w-screen overflow-hidden">
      {/* Background image */}
      <div
        className="
          absolute inset-0
          bg-[url('assets/images/Home.png')]
          bg-cover bg-center bg-no-repeat
          opacity-70
        "
      />

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Main content */}
      <div className='flex-col items-center relative z-10'> 
        <div className='flex items-center justify-center w-full h-[72vh] px-4 pt-8 pb-12 lg:px-12 lg:pt-16 lg:pb-24'>
          <div className='flex flex-col items-start space-y-6'>
            <p><strong className='text-white lg:text-9xl md:text-8xl sm:text-7xl text-6xl'>{t('Welcome, there!')}</strong></p>
            <p className='text-white lg:text-3xl sm:text-2xl text-xl italic'>{t('Discover opportunities, ...')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
import CarouselCard from '../components/common/carouselCard';
import CompanyIcon from '../components/company/companyIcon';
import JobCard from '../components/job/JobCard';
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
    <div className="flex-1 bg-white w-screen">
      <div className='flex flex-wrap lg:flex-nowrap w-full justify-start items-start'>

        {/* CarouselCard company */}
        <div className='w-full lg:w-5/12'>
          <CarouselCard />
        </div>

        {/* Feature logo companies */}
        <div className='pt-6 w-full lg:w-7/12 max-lg:px-4'>
          <h1 className='text-2xl font-bold text-primary px-1'>{t('featured_companies')}</h1>
          <div className='grid grid-cols-4 gap-4 mt-4 sm:grid-cols-5 xl:grid-cols-6'>
            {companies.map((company) => (
              <CompanyIcon
                key={company.id}
                name={company.name}
                src={company.logo}
                alt={company.name}
                size={80}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dãi phân cách */}
      <div className='flex w-full h-[65px] bg-gradient-to-t from-primary to-transparent -mt-5'></div>

      {/* Phần Job Popular card */}
      <div className='flex-1 pt-12 px-12 justify-start items-start h-full'>
          <h1 className='text-2xl font-bold text-primary px-1'>{t('latest_jobs')}</h1>
          <div className='grid min-[1500px]:grid-cols-5 gap-4 mt-4 min-[1250px]:grid-cols-4 min-[950px]:grid-cols-3 min-[650px]:grid-cols-2 grid-cols-1'>
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                company={job.company}
                title={job.title}
                logo={job.logo}
                city={job.city}
                employmentType={job.employmentType}
                minSalary={job.minSalary}
                maxSalary={job.maxSalary}
                salary_est_type={job.salary_est_type}
                post_date={job.post_date}
                expired_date={job.expired_date}
                is_fresher={job.is_fresher}
                is_applied={true}
                is_active= {false}
              />
            ))}
          </div>
        </div>
    </div>
  );
}

export default Home;
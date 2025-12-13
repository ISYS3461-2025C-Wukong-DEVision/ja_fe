import parseImploymentType from '../../utils/decodeBitmask';
import { useTranslation } from 'react-i18next';
import { timeAgo } from '../../utils/time';
import { formatSalary } from '../../utils/formatSalary';
import { MapPinIcon, BriefcaseIcon } from '@heroicons/react/24/outline';


const HomeJobCard = ({company, title, logo, city, employmentType, minSalary, maxSalary, salary_est_type, post_date, expired_date, is_fresher}) => {
    const { t } = useTranslation(); 
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300 hover:border-primary-dark min-w-[280px] max-w-[450px]">
        {/* Logo và Tên Công Ty */}
        <div className="flex h-20 items-start justify-start mb-4">
            <div>
                <img src={logo} alt={`${company} logo`} className="w-20 h-20 object-cover rounded mr-4 border border-gray-200" />
            </div>
            <div className='flex flex-col items-start justify-between h-full'>
                <h3 className="text-lg font-bold text-primary line-clamp-2">{title}</h3>
                <h2 className="text-sm font-normal text-gray-600 line-clamp-1">{company}</h2>
            </div>
        </div>

        {/* Địa điểm */}
        <div className="flex items-center text-gray-600 mb-1">
            <MapPinIcon className="h-5 w-5 mr-2 text-gray-600" />
            <span>{city}</span>
        </div>

        {/* Loại hình làm việc */}
        <div className="flex items-center text-gray-600 mb-2">
            <BriefcaseIcon className="h-5 w-5 mr-2 text-gray-600" />
            <span>{parseImploymentType(employmentType)}</span>
        </div>

        {/* Mức Lương */}
        <p className="text-primary-dark font-bold text-lg mb-2">
            {t('salary')}: {formatSalary(salary_est_type, minSalary, maxSalary)}
        </p>

        {/* Cho phép người mới */}
        {is_fresher && (
            <p className="text-green-600 text-sm mb-2">
                {t('new_graduate_friendly')}
            </p>
        )}
        
        {/* Ngày hết hạn */}
        <p className="text-red-500 text-sm mb-4">
            {t('Expires_on')}: {expired_date}
        </p>

        {/* Ngày Đăng */}
        <div className='flex items-center justify-between w-full'>
            <p className="text-gray-500 text-sm">
                {timeAgo(post_date)}
            </p>
            <div>
                <div className="px-2 py-1 bg-primary-dark text-white text-sm rounded-md hover:bg-primary transition cursor-pointer w-max">
                    {t('apply_now')}
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeJobCard
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getCompanies } from "../../services/companyService";
import LoadingAnimation from '../../components/common/loadingAnimation';
import CompanyCard from "../../components/company/CompanyCard";
import { Link } from "react-router-dom";

const Company = () => {
    const { t } = useTranslation();
    const searchPlaceholder = t('search_company');
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setIsLoading(true);
            // Gọi service
            const response = await getCompanies();
            
            // Dựa vào ảnh của bạn: response có dạng { data: [...] }
            // Nên ta set state bằng response.data
            if (response && response.data) {
            setCompanies(response.data);
            }
            console.log("Dữ liệu công ty tải thành công:", response);
        } catch (err) {
            console.error("Lỗi khi tải dữ liệu:", err);
        } finally {
            setIsLoading(false); // Tắt trạng thái loading dù thành công hay thất bại
        }
        };

        fetchData();
    }, []); // [] rỗng nghĩa là chỉ chạy 1 lần khi mount

    if (isLoading) {
        return <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
            <LoadingAnimation text={t('loading')} />
        </div>;
    }

    return (
        <div className="flex flex-col items-start justify-start min-h-[80vh] pt-10 xl:px-32 lg:px-24 md:px-16 sm:px-8 px-4 w-full transition-[padding] duration-300 ease-in-out">
            {/* Header section */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl transform transition-transform duration-300 ease-in-out font-semibold text-primary">Discover Companies</h1>
            <sub className="text-base md:text-lg lg:text-xl transform transition-transform duration-300 ease-in-out font-light italic text-primary">Explore company information and find the best workplace for you.</sub>
            {/* searching bar here */}
            <div className="flex w-full max-w-[900px] mt-10 mb-20
                rounded-lg items-center bg-primary/30 gap-2
                lg:px-5 md:px-4 px-3
                lg:py-6 md:py-5 py-4
                transition-[padding] duration-300 ease-in-out">

                {/* INPUT */}
                <div className="relative flex-1">
                    <MagnifyingGlassIcon
                        className="absolute left-5 top-1/2 -translate-y-1/2 h-8 text-primary"
                    />

                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="w-full border border-primary rounded-lg
                                pl-16 pr-6 lg:py-[31px] md:py-[26px] py-[21px]
                                transition-[padding] duration-300 ease-in-out
                                focus:outline-none focus:ring-1 focus:ring-primary-dark 
                                [&::placeholder]:text-primary/70 [&::placeholder]:italic text-lg"
                    />
                </div>

                {/* BUTTON */}
                <button
                    className="flex-shrink-0 lg:py-[31px] md:py-[26px] py-[21px]
                            transition-[padding] duration-300 ease-in-out
                            px-12 rounded-lg
                            bg-primary/70 hover:bg-primary-dark/50
                            text-lg font-light text-white"
                >
                    Search
                </button>
            </div>
            {/* Company list section */}
            <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-20 mx-2 mt-2">
                {companies.map((company) => (
                    <Link
                        key={company.id}
                        to={`/companies/${company.id}`}
                        className="block"
                    >
                        <CompanyCard
                            name={company.name}
                            email={company.email}
                            phone={company.phone}
                            country={company.country}
                            city={company.city}
                        />
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default Company;
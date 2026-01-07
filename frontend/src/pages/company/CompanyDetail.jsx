import { useParams } from "react-router-dom";
import { getCompanyById } from "../../services/companyService";
import { useEffect, useState } from "react";
import LoadingAnimation from '../../components/common/loadingAnimation';
import { mapCompanyFromApi } from "../../utils/companyMapper";

const CompanyDetail = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const [isAvatar, setIsAvatar] = useState(false);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await getCompanyById(id);
                const mappedCompany = mapCompanyFromApi(response);
                setCompany(mappedCompany);
                setIsAvatar(mappedCompany.avatar != null);
                setIsImage(mappedCompany.latestImage != null);
                console.log("Fetched company details:", mappedCompany);
            } catch (error) {
                console.error("Error fetching company details:", error);
            }
        };

        fetchCompany();
    }, [id]);

    if (!company) {
        return <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
            <LoadingAnimation text="Loading company details..." />
        </div>;
    }

    return (
        <div className="flex p-8">
            <div className="flex flex-col border p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto bg-white">
                <img src={!isImage ? "/assets/icons/LogoName.png" : company.latestImage} alt={company.name} className={`h-52 w-full ${isImage ? "object-cover" : "bg-primary/30 object-contain"}`} />
                <div className="flex items-center justify-start">
                    <img src={!isAvatar ? "/d.png" : company.avatar} alt={`${company.name} Avatar`} className={`h-24 w-24 rounded-full border-4 border-white -mt-12 ml-6 object-cover`} />
                </div>
                
                <h1 className="text-4xl font-bold mb-4 text-primary-extraDark">{company.name}</h1>
                <p className="mb-2 text-gray-500"><strong className="text-primary-extraDark">Email:</strong> {company.email}</p>
                <p className="mb-2 text-gray-500"><strong className="text-primary-extraDark">Phone:</strong> {company.phone}</p>
                <p className="mb-2 text-gray-500"><strong className="text-primary-extraDark">Location:</strong> {company.location.city}, {company.location.country}</p>
                <p className="mb-2 text-gray-500"><strong className="text-primary-extraDark">Address:</strong> {company.location.address}</p>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2 text-primary-extraDark">About</h2>
                    <p>{company.about}</p>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2 text-primary-extraDark">Target</h2>
                    <p>{company.target}</p>
                </div>
            </div>
        </div>  
    );
};
export default CompanyDetail;
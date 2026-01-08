import { getCompanies, getCompanyById } from "../../services/companyService";
import { useState, useEffect } from "react";

export const useCompany = () => {
    const [companies, setCompanies] = useState([])
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [companyLoading, setCompanyLoading] = useState(false)
    
    const fetchCompanies = async () => {
        setCompanyLoading(true);
        try {
            const data = await getCompanies();
            setCompanies(data);
        } catch (error) { 
            console.error("Fetch error", error); 
        } finally {
            setCompanyLoading(false);
        }
    }

    const fetchCompanyById = async (id) => {
        setCompanyLoading(true);
        try {
            const data = await getCompanyById(id);
            setSelectedCompany(data);
        } catch (error) { 
            console.error("Fetch error", error); 
        } finally {
            setCompanyLoading(false);
        }
    }

    useEffect(() => {
        fetchCompanies();
    }, [])

    return {
        companies,
        selectedCompany,
        companyLoading,
        fetchCompanies,
        fetchCompanyById,
        setSelectedCompany
    }
}
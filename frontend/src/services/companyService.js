// src/services/companyService.js
import httpHelper from '../Helper/httpHelper';
import {companies} from '../mocks/company.mock';

const COMPANY_BASE = '/company-profile';

export const getCompanies = () => {
  return httpHelper.get(COMPANY_BASE);
};

export const getCompanyById = (id) => {
  return httpHelper.get(`${COMPANY_BASE}/${id}`);
};

export const createCompany = (data) => {
  return httpHelper.post(COMPANY_BASE, data);
};

export const updateCompany = (id, data) => {
  return httpHelper.put(`${COMPANY_BASE}/${id}`, data);
};

export const patchCompany = (id, data) => {
  return httpHelper.patch(`${COMPANY_BASE}/${id}`, data);
};

export const deleteCompany = (id) => {
  return httpHelper.delete(`${COMPANY_BASE}/${id}`);
};


/* =========================
   MOCK API (chưa có backend)
========================= */
export const getCompaniesMock = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(companies);
    }, 500);
  });
};

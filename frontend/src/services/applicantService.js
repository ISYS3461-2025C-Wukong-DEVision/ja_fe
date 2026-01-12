import { applicants } from "../mocks/applicant.mock";
import httpHelper from "../Helper/httpHelper";
const APPLICANT_BASE = import.meta.env.VITE_APPLICANT_BASE

export const getApplicants = () => {
  return httpHelper.get(APPLICANT_BASE);
};

export const getApplicantById = (id) => {
  return httpHelper.get(`${APPLICANT_BASE}/${id}`);
};

export const createApplicant = (data) => {
  return httpHelper.post(APPLICANT_BASE, data);
};

export const updateApplicant = (id, data) => {
  return httpHelper.put(`${APPLICANT_BASE}/${id}`, data);
};

export const patchApplicant = (id, data) => {
  return httpHelper.patch(`${APPLICANT_BASE}/${id}`, data);
};

export const deleteApplicant = (id) => {
  return httpHelper.delete(`${APPLICANT_BASE}/${id}`);
};

/* =========================
   MOCK API (chưa có backend)
========================= */
export const getApplicantsMock = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(applicants);
    }, 500);
  });
};

export const getApplicantByIdMock = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const applicant = applicants.find(
        (item) => item.id === id
      );

      if (!applicant) {
        reject(new Error('Applicant not found'));
      } else {
        resolve(applicant);
      }
    }, 500);
  });
};

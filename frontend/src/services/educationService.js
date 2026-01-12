import httpHelper from "../Helper/httpHelper";
const APPLICANT_BASE = import.meta.env.VITE_APPLICANT_BASE;


export const createEducation = (id, data) => {
  return httpHelper.post(`${APPLICANT_BASE}/${id}/education`, data);
};

export const updateEducation = (userId, id, data) => {
  return httpHelper.put(`${APPLICANT_BASE}/${userId}/education/${id}`, data);
};

export const deleteEducation = (userId, id) => {
  return httpHelper.delete(`${APPLICANT_BASE}/${userId}/education/${id}`);
};
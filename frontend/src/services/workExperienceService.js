import httpHelper from "../Helper/httpHelper";
const APPLICANT_BASE = import.meta.env.VITE_APPLICANT_BASE;


export const createWorkExperience = (id, data) => {
  return httpHelper.post(`${APPLICANT_BASE}/${id}/work-experience`, data);
};

export const updateWorkExperience = (userId, id, data) => {
  return httpHelper.put(`${APPLICANT_BASE}/${userId}/work-experience/${id}`, data);
};

export const deleteWorkExperience = (userId, id) => {
  return httpHelper.delete(`${APPLICANT_BASE}/${userId}/work-experience/${id}`);
};
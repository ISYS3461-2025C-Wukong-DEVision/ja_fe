import httpHelper from "../Helper/httpHelper";
const APPLICANT_BASE = '/applicant-profile/profile';


export const createEducation = (id, data) => {
  return httpHelper.post(`${APPLICANT_BASE}/${id}/education`, data);
};

export const updateEducation = (userId, id, data) => {
  return httpHelper.put(`${APPLICANT_BASE}/${userId}/education/${id}`, data);
};

export const deleteEducation = (id) => {
  return httpHelper.delete(`${APPLICANT_BASE}/${id}`);
};
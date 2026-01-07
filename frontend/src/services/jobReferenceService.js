import httpHelper from "../Helper/httpHelper";
const APPLICANT_BASE = '/applicant-profile/profile';


export const createJobPreference = (id, data) => {
  return httpHelper.post(`${APPLICANT_BASE}/${id}/job-preference`, data);
};

export const updateJobPreference = (userId, id, data) => {
  return httpHelper.put(`${APPLICANT_BASE}/${userId}/job-preference/${id}`, data);
};

export const deleteJobPreference = (id) => {
  return httpHelper.delete(`${APPLICANT_BASE}/${id}`);
};
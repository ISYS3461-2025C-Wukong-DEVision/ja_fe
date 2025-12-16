import httpHelper from "../Helper/httpHelper";
const APPLICATION_BASE = '/applications';

export const getApplications = () => {
  return httpHelper.get(APPLICATION_BASE);
};

export const getApplicationById = (id) => {
  return httpHelper.get(`${APPLICATION_BASE}/${id}`);
};

export const createApplication = (data) => {
  return httpHelper.post(APPLICATION_BASE, data);
};

export const updateApplication = (id, data) => {
  return httpHelper.put(`${APPLICATION_BASE}/${id}`, data);
};

export const patchApplication = (id, data) => {
  return httpHelper.patch(`${APPLICATION_BASE}/${id}`, data);
};

export const deleteApplication = (id) => {
  return httpHelper.delete(`${APPLICATION_BASE}/${id}`);
};
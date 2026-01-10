import httpHelper from "../Helper/httpHelper";
const APPLICATION_BASE = '/job-application/';

export const getApplications = (query) => {
  return httpHelper.get(APPLICATION_BASE, query);
};

export const createApplication = (data) => {
  return httpHelper.post(APPLICATION_BASE, data);
};

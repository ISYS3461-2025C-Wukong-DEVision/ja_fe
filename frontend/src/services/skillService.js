import httpHelper from "../Helper/httpHelper";
const APPLICANT_BASE = '/applicant-profile/profile';
const TAG_BASE = '/tag';


export const updateSkill = (id, data) => {
  return httpHelper.put(`${APPLICANT_BASE}/${id}/skills`, data);
};

export const getAllSkill = () => {
    return httpHelper.get(TAG_BASE);
}
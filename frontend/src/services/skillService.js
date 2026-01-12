import httpHelper from "../Helper/httpHelper";
const APPLICANT_BASE = import.meta.env.VITE_APPLICANT_BASE;
const TAG_BASE = import.meta.env.VITE_TAG_BASE;


export const updateSkill = (id, data) => {
  return httpHelper.put(`${APPLICANT_BASE}/${id}/skills`, data);
};

export const getAllSkill = () => {
    return httpHelper.get(TAG_BASE);
}
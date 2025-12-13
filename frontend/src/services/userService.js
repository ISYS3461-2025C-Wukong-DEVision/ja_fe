// src/services/userService.js
import httpHelper from "../Helper/httpHelper";

const USER_BASE = '/users';

export const getUsers = () => {
  return httpHelper.get(USER_BASE);
};

export const getUserById = (id) => {
  return httpHelper.get(`${USER_BASE}/${id}`);
};

export const createUser = (data) => {
  return httpHelper.post(USER_BASE, data);
};

export const updateUser = (id, data) => {
  return httpHelper.put(`${USER_BASE}/${id}`, data);
};

export const deleteUser = (id) => {
  return httpHelper.delete(`${USER_BASE}/${id}`);
};

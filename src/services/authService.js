import axios from "axios";
import { BASE_API_URL } from "../common/constants";

const USER_API_URL = `${BASE_API_URL}/api/users/`;

export const register = (firstName, lastName, email, password) => {
  return axios.post(USER_API_URL + "register", {
    firstName,
    lastName,
    email,
    password,
  });
};

export const login = (email, password) => {
  return axios.post(USER_API_URL + "login", {
      email,
      password,
    })
};

export const forgotPassword = (email) => {
  return axios.put(USER_API_URL + "forgotpassword", {
      email,
    })
};

export const resetPassword = (password, token) => {
  const config = {
    newPassword : password,
    resetLink : token
  }
return axios.put(USER_API_URL + "resetpassword", config)
};

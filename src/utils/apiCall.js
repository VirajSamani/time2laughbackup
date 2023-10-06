import { message } from "antd";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiCall = async (url, type, data, headers = {}) => {
  try {
    const response = await instance({
      method: type,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    if (error?.response?.data?.message) {
      message.error(error.response.data.message);
    } else {
      message.error(error.message);
    }
  }
};

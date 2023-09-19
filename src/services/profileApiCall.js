import { apiCall } from "../utils/apiCall";

export const getProfile = () => {
  apiCall("comedian").then(console.log);
};

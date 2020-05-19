import Axios from "axios";
const BASE_URL = "http://localhost:8000";

export const authApi = Axios.create({
  baseURL: `${BASE_URL}/api/v1/auth`,
});

export const privateApi = (token) =>
  Axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    headers: {
      Authorization: token,
    },
  });

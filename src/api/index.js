import Axios from "axios";

export const authApi = Axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1/auth`,
});

export const publicApi = () => {
  return Axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1`,
  });
};

export const privateApi = (token) =>
  Axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1`,
    headers: {
      Authorization: token,
    },
  });

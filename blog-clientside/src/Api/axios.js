import axios from "axios";

const URL = "http://localhost:5000/api";

const Instance = axios.create({
  baseURL: URL,
});

export const axiosProtect = (token) => {
  const axiosInstence = axios.create({
    baseURL: URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return axiosInstence;
};

export default Instance;

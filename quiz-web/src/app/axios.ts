import axios from "axios";
import { MOCK_JWT } from "./constants";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${MOCK_JWT}`,
  },
});

export default axiosInstance;


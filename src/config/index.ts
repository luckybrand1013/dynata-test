import axios, { AxiosError } from "axios";

import { reportError } from "../helpers/reportError";

const API_KEY = "e5f4a150216b427f8ed2b2f86a";
const PUBLIC_API_URL = "https://api.checkwx.com";

// Set config defaults when creating the instance
export const network = axios.create({ baseURL: `${PUBLIC_API_URL}` });

// Add a request interceptor
network.interceptors.request.use(
  (config) => {
    config.headers.set("X-API-Key", API_KEY);
    return config;
  },
  (error: AxiosError) => {
    reportError(error?.response?.data as Error);
    return Promise.reject(error?.response?.data as Error);
  }
);

// Add a response interceptor
network.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    reportError(error?.response?.data as Error);
    return Promise.reject(error?.response?.data as Error);
  }
);

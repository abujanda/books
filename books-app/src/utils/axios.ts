import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { apiConfig } from "../config";

const axiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: 30000,
});

//const router = useRouter();

axiosInstance.interceptors.response.use(undefined, (error) => {
  if (error.code === "ERR_NETWORK" || !error.response) {
    toast.error("Network Error: Make sure API is running!");
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    window.location.replace("/404");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    window.location.replace("/400");
  }
  // if (status === 401) {
  //   browserHistory.push("/401");
  // }
  if (status === 500) {
    window.location.replace("/500");
  }

  throw error.response;
});

export default axiosInstance;

const sleep =
  (ms: number = 1000) =>
  (response: AxiosResponse) =>
    new Promise<AxiosResponse>((resolve) =>
      setTimeout(() => resolve(response), ms)
    );

const sleepTimeout = 2000;

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
  del: (url: string) =>
    axiosInstance.delete(url).then(sleep(sleepTimeout)).then(responseBody),
  get: (url: string) =>
    axiosInstance.get(url).then(sleep(sleepTimeout)).then(responseBody),
  post: (
    url: string,
    body: {},
    isFormData: boolean = false,
    withCookies: boolean = false
  ) =>
    axiosInstance
      .post(
        url,
        body,
        isFormData || withCookies
          ? {
              ...(isFormData && {
                headers: { "Content-Type": "multipart/form-data" },
              }),
              ...(withCookies && { withCredentials: true }),
            }
          : undefined
      )
      .then(sleep(sleepTimeout))
      .then(responseBody),
  put: (url: string, body: {}, isFormData: boolean = false) =>
    axiosInstance
      .put(
        url,
        body,
        isFormData
          ? { headers: { "Content-Type": "multipart/form-data" } }
          : undefined
      )
      .then(sleep(sleepTimeout))
      .then(responseBody),
  query: (url: string, query: {}) =>
    axiosInstance
      .get(url, { params: query })
      .then(sleep(sleepTimeout))
      .then(responseBody),
};
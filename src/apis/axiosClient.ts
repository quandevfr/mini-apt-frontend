// Libs
import axios, { type AxiosInstance } from 'axios';
import { toast } from 'sonner';

// Others
import { ERROR_MESSAGE_MAP } from '@/utils/errors/errorMessages';
import { PATH } from '@/utils/paths';

const timeout = 1000 * 60 * 10;

const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: timeout,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const accessToken = '';

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const status = error.response?.status;
    const data = error.response?.data;

    if (status !== 410) {
      toast.error(data?.message || error?.message);
    }

    if (status === 401) {
      // refresh token / logout
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    const AUTH_EXCLUDE_PATHS = [
      PATH.AUTH.SIGNIN,
      PATH.AUTH.SIGNUP,
      PATH.AUTH.FORGOT_PASSWORD,
      PATH.AUTH.REFRESH,
      PATH.AUTH.RESET_PASSWORD,
      PATH.AUTH.RESET_SUCCESS,
      PATH.AUTH.VERIFY_OTP,
    ];

    const isAuthExcluded = AUTH_EXCLUDE_PATHS.some((path) => originalRequest.url?.includes(path));

    // Những API không cần check
    if (isAuthExcluded) {
      return Promise.reject(error);
    }

    originalRequest._retryCount = originalRequest._retryCount || 0;

    if (error.response?.status === 401 && originalRequest._retryCount < 2) {
      originalRequest._retryCount += 1;

      console.log('refresh', originalRequest._retryCount);

      try {
        const res = await axiosClient.post('/auth/refresh', { withCredentials: true });
        const newAccessToken = res.data.accessToken;

        // todo: set lại accessToken mới vào store

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        // todo: clear store
        return Promise.reject(refreshError);
      }
    }

    if (data?.code && ERROR_MESSAGE_MAP[data.code]) {
      toast.error(ERROR_MESSAGE_MAP[data.code]);
    } else if (data?.message) {
      toast.error(data?.message);
    } else {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

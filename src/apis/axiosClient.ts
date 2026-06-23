// Libs
import axios, { type AxiosInstance } from 'axios';
import { toast } from 'sonner';

// Others
// import { ERROR_MESSAGE_MAP } from '@/utils/errors/errorMessages';
import { PATHS } from '@/utils/constants/paths';
import { tokenManager } from '@/libs/tokenManager';
import { getErrorMessage } from '@/utils/constants/errorMessages';
import { SUCCESS_MESSAGE } from '@/utils/constants/successMessage';

const timeout = 1000 * 60 * 10;

const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: timeout,
  withCredentials: true,
});

type QueueItem = {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = tokenManager.get();

    if (accessToken && config.headers) {
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
    const { method } = response.config;
    const successCode = response.data?.code;
    const isSkip = response.config.headers?.['Skip-Show_Toast'] === 'true';

    if (
      response.data?.success &&
      response.data?.message &&
      successCode &&
      method !== 'get' &&
      !isSkip
    ) {
      const successMessage =
        SUCCESS_MESSAGE[successCode] || response.data?.message || 'Thao tác thành công 🎉';
      toast.success(successMessage);
    }

    return response.data;
  },
  async function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (!error.response) {
      toast.error(getErrorMessage('NETWORK_ERROR'));
      return Promise.reject(error);
    }

    const errorCode = error.response?.data?.code;
    const originalRequest = error.config;
    const status = error.response?.status;
    // const data = error.response?.data;

    const AUTH_EXCLUDE_PATHS = [
      PATHS.AUTH.SIGN_IN,
      PATHS.AUTH.FORGOT_PASSWORD,
      PATHS.AUTH.REFRESH,
      PATHS.AUTH.RESET_PASSWORD,
      PATHS.AUTH.RESET_PASSWORD_SUCCESS,
      PATHS.AUTH.VERIFY,
    ];

    const isAuthExcluded = AUTH_EXCLUDE_PATHS.some((path) => originalRequest.url?.includes(path));

    if (status === 403 && !isAuthExcluded) {
      originalRequest._retryCount = originalRequest._retryCount || 0;

      if (originalRequest._retryCount < 4) {
        originalRequest._retryCount += 1;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosClient(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          const { accessToken: newAccessToken } = (await axiosClient.post('/auth/refresh')) as {
            accessToken: string;
          };

          tokenManager.set(newAccessToken);

          processQueue(null, newAccessToken);
          isRefreshing = false;

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosClient(originalRequest);
        } catch (error) {
          processQueue(error, null);
          isRefreshing = false;
          tokenManager.clear();

          window.location.href = PATHS.AUTH.SIGN_IN;
          toast.error('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại!');
          return Promise.reject(error);
        }
      }
    }

    if (isAuthExcluded || status === 401 || status === 403) {
      return Promise.reject(error);
    }

    const errorMessage = getErrorMessage(errorCode);
    toast.error(errorMessage);

    // if (data?.code && ERROR_MESSAGE_MAP[data.code]) {
    //   toast.error(ERROR_MESSAGE_MAP[data.code]);
    // } else if (data?.message) {
    //   toast.error(data?.message);
    // } else {
    //   toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    // }

    return Promise.reject(error);
  }
);

export default axiosClient;

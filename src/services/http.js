import axios from 'axios';
import { login } from '@services/auth';

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.error(error);
  }

  // if (expectedError && error.response.status === 404) {
  //   if (error.response.data && error.response.data.error) {
  //     const { error: errorInfo } = error.response.data;
  //     if (errorInfo.reason && errorInfo.reason === 'NO_ACTIVE_DEVICE')
  //       // Ignore NO_ACTIVE_DEVICE
  //       return null;
  //   }
  // }

  if (expectedError && error.response.status === 401) {
    login();
  }

  return Promise.reject(error);
});

const setToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setToken,
};

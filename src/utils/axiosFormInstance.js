import {  baseApi } from '@/constants';
import axios from 'axios';

const axiosFormInstance = axios.create({
  baseURL: baseApi,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default axiosFormInstance;

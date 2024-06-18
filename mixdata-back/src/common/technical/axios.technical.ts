import axios from 'axios';
import { configs } from '../../data/constants/configs';

export type RequestOptions = {
  body?: object | string;
  params?: object;
  customUrl?: string;
  fullUrl?: string;
  customHeader?: any;
};

export const useRequest = (url, method) => async (options: RequestOptions) => {
  const { body, params, customUrl, customHeader = {}, fullUrl } = options;

  console.log(' ************ useRequest ************');
  try {
    // TODO activate
    // const result = await axios({
    //   params,
    //   method,
    //   headers: {
    //     ...customHeader,
    //   },
    //   url: fullUrl || `${customUrl || url}`,
    //   data: body,
    //   timeout: 300000,
    // });
    // const { data } = result;
    const data = null;
    return data;
  } catch (error) {
    console.log(' ************ error ************', error);
    return Promise.reject(error?.response?.data);
  }
};

export const usePost = (url) => useRequest(url, 'POST');

export const usePut = (url) => useRequest(url, 'PUT');

export const useGet = (url) => useRequest(url, 'GET');

export const useDelete = (url) => useRequest(url, 'DELETE');

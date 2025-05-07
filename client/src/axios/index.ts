import axios from 'axios';

import { ErrorCodeEnum, ErrorSwapOKXCode } from '~/enum/error-code.enum';


let isLogin = false;

export interface ResponseData {
  code: number;
  msg: string;
  data: any;
}

export function tansParams(params: any) {
  let result = '';
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = encodeURIComponent(propName) + '=';
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            let params = propName + '[' + key + ']';
            const subPart = encodeURIComponent(params) + '=';
            result += subPart + encodeURIComponent(value[key]) + '&';
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&';
      }
    }
  }
  return result;
}

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
const request = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_ENV === 'development' ? '' : '',
  timeout: 60000,
});
const generateTimestamp = () => {
  return Date.now().toString();
};
request.interceptors.request.use(
  (config: any) => {
    if (config.method === 'get') {
      if (config.params) {
        let url = config.url + '?' + tansParams(config.params);
        url = url.slice(0, -1);
        url += `&timestamp=${generateTimestamp()}`;
        config.params = {};
        config.url = url;
      } else {
        let url = config.url;
        url += `?timestamp=${generateTimestamp()}`;
        config.params = {};
        config.url = url;
      }
    }
    // console.log('config.url', config.url);
    if (process.env.NODE_ENV !== 'development') {
      // config.url = 'https://www1.test.tearline.io' + config.url.replace('/okx/api','/api'); // import.meta.env.VITE_APP_BASE_API + config.url;
      config.url = 'https://tlib.test.tearline.io' + config.url.replace('/okx/api','/tapi'); // import.meta.env.VITE_APP_BASE_API + config.url;
    }
    // const localAuth: AuthInfo | undefined = getLocalAuthState();
    // if (
    //   localAuth &&
    //   localAuth.auth_id &&
    //   import.meta.env.VITE_APP_BASE_ENV === 'development'
    // ) {
    //   config.headers['Authorization'] = localAuth.auth_id;
    // }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  res => {
    const code = Number(res.data.code);
    if (
      res.request.responseType === 'blob' ||
      res.request.responseType === 'arraybuffer'
    ) {
      return res.data;
    }

    if (
      ![
        ErrorCodeEnum.SUCCESS,
        ErrorCodeEnum.NoNeedLoginAgain,
        ErrorCodeEnum.CoinPriceExpired,
        51000,
        50014,
        2040,
        ErrorCodeEnum.NotApi,
        ...Object.keys(ErrorSwapOKXCode).map(d => Number(d)),
      ].some(i => i === code)
    ) {
      // message.warning(t(`ErrorCode.${code}`));
    }
    return res.data;
  },
  error => {
    console.log(
      'err:err->' + error,
      error.toString(),
      error.toString().includes('Request failed with status code 401'),
    );
    if (
      error.toString().indexOf('Request failed with status code 401') !== -1 ||
      error.toString() === 'AxiosError: Network Error'
    ) {
      // store.dispatch(userSlice.actions.logout());
      if (import.meta.env.VITE_APP_BASE_ENV === 'production') {
        // store.dispatch(userSlice.actions.logout());
        // Cookies.set('auth_id', '', {
        //   expires: 7,
        // });
        // window.location.href = '/ChatLogin'; // Replace '/ChatLogin' with your actual ChatLogin URL
        if (isLogin) return;
        isLogin = true;
      }
    }

    return Promise.reject(error);
  },
);

export default request;

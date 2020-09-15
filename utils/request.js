/* 对axios根据业务需求再次封装 */
import axios from 'axios';
import getConfig from 'next/config';
// const codeWhiteList = [
//     2001,
//     2003,
//     3001,
//     4011,
//     4007,
//     5004,
//     4012,
//     4013,
//     4014,
//     4015,
//     4016,
//     4017,
// ] // 不需要弹窗的code错误码白名单
// 创建axios实例 
const { serverApiUrl} = getConfig().publicRuntimeConfig;
const service = axios.create({
  baseURL: serverApiUrl,
  timeout: 10000,
});
 
// 请求拦截器
service.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      config.url +=
                config.url.indexOf('?') === -1
                  ? `?timeNow=${new Date().getTime()}`
                  : `&timeNow=${new Date().getTime()}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 拦截文件流
    const headers = response.headers;
    if (headers['content-type'] === 'application/octet-stream') {
      return response.data;
    }

    const res = response.data;
    if (res.code === 0) {
      // 响应成功
      return res.data;
    } 
    return Promise.reject(res);
        
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;

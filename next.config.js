const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const path = require('path');

const isDevMode = process.env.NODE_ENV === 'development';
const serverBaseUrl = isDevMode ? 'http://localhost:8080/myserver' : 'http://192.168.100.123:8080/myserver';
const serverApiUrl = isDevMode ? 'http://127.0.0.1:7001/default' : 'http://192.168.100.123:8080/myserver/api';

module.exports = withSass(
  withCss({
    webpack: config => {
      config.resolve.alias['@'] = path.resolve(__dirname);
      return config;
    },
    publicRuntimeConfig: {// 这里的配置既可以服务端获取到，也可以在浏览器端获取到
      serverBaseUrl,
      serverApiUrl,
    }
  })
); 
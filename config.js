/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la


var local = {

  api: {
    default: 'http://we-class.local'
  },  

  defaultUrl: `http://we-class.local`,
  studentUrl: `http://student.we-class.local/`,
  webViewUrl: `http://we-class.local/sign-wxa`,
  storageUrl: `http://storage.sandbox.yike.fm`
};

var sandbox = {
  api: {
    default: 'https://sandbox.yike.fm'
  },

  defaultUrl: 'https://sandbox.yike.fm',
  studentUrl: 'https://student.sandbox.yike.fm'
}

var production = {
  api: {
    default: 'https://yike.fm'
  },

  defaultUrl: 'https://yike.fm',
  webviewUrl: 'https://yike.fm',
  studentUrl: 'https://student.yike.fm/',
  storageUrl: 'https://storage.yike.fm'
}

module.exports = sandbox

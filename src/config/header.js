import Vue from 'vue'
import axios from 'axios'
import GLOBAL_CONFIG from './config'

// 设置默认的配置项
const  CONFIG = GLOBAL_CONFIG['GLOBAL_CONFIG'];

axios.defaults.baseURL = CONFIG['API_HOST'];

//添加请求拦截器
axios.interceptors.request.use(function(config){
  // 获取token
  let TOKEN = localStorage.token;
  // 设置token
  if(TOKEN){
    config.headers['X-ODAPI-Authorization'] = TOKEN;
  }
  // 返回配置项
  return config;

},function(error){
  //请求错误时做些事
  return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function(response){
  // console.log(JSON.stringify(response));
  if(response['status'] == 200){
    if(response['data']['error_code'] == 0){
      return response['data']['data'];
    }else{
      if(response['error_code'] == 10001 || response['error_code'] == 10002 || response['error_code'] == 10003 || response['error_code'] == 10004 || response['error_code'] == 10005){
        return mui.toast(response['msg']);
      }else{
        return mui.toast(response['data']['error_desc']);
      }
      
    }
  }else{
    mui.toast('网络错误！');
  }

},function(error){
  //请求错误时做些事
  return Promise.reject(error);
})

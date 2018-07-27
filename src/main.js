
import Vue from 'vue'
import Vuex from 'vuex'
import store from './vuex/store'
import App from './App'
import router from './router'
import ProtoTypeAPI from './network/apiServer'
import axios from 'axios'
import Header from './config/header'
import $ from 'jquery'
import Bluetooth from './common/Bluetooth/Search'
import AutoUpdateApp from './common/AutoUpdateApp/AutoUpdateApp'

// 通过插件的形式挂载
Vue.use(Vuex)
Vue.use(Bluetooth)
Vue.use(AutoUpdateApp)
Vue.prototype.localStorage = localStorage;
Vue.prototype.sessionStorage = sessionStorage;
Vue.config.productionTip = false;

window.Vue = new Vue({
  el: '#app',
  router,
  store,
  axios,
  template: '<App/>',
  components: { App },
  methods: {
    setSessionStorage:function(data) { 
      for(let key in data){
        sessionStorage[key] = data[key];
      }
    },
    removeSessionStorage: function (data) {
      for(let i = 0; i < data.length; i++){
        sessionStorage.removeItem(data[i]);
      }
    },
    setLocalStorage: function(data) {
      for(let key in data){
        localStorage[key] = data[key];
      }
    },
    removeLocalStorage: function (data) {
      for(let i = 0; i < data.length; i++){
        localStorage.removeItem(data[i]);
      }
    },
    getQueryString: function (name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i');
      let result = window.location.search.substr(1).match(reg);
      if (result != null) {
        return decodeURIComponent(result[2]);
      } else {
        return null;
      }
    },
    timestampToTime: function () {
      // 获取当前时分或日期
      let date = new Date();
      let reduce = '-';
      let colon = ':';
      let space = ' ';

      let year = date.getFullYear() + reduce + this.addZero(date.getMonth() + 1) + reduce + this.addZero(date.getDate());
      let currentdate = this.addZero(date.getHours()) + colon + this.addZero(date.getMinutes());

      return year + space + currentdate;   
    },
    addZero: function (time) {
      if (time <= 9) {
          time = "0" + time;
      }
      return time;
    },
    isNumber: function (that,obj,value,key) {
      if(value < 0 || isNaN(value)){
        that[obj][key] = '';
      }
    },
    changeTwoDecimal_f: function (x) {
      var f_x = parseFloat(x);
      var f_x = Math.round(x * 100) / 100;
      var s_x = f_x.toString();
      var pos_decimal = s_x.indexOf('.');
      if (pos_decimal < 0) {
          pos_decimal = s_x.length;
          s_x += '.';
      }
      while (s_x.length <= pos_decimal + 2) {
          s_x += '0';
      }
      return s_x;
    },
    returnNumber: function (number) {
        if(isNaN(number)){
            return 0;
        }else{
            return parseFloat(number);
        }
    }
  }
})

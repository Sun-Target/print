import Vue from 'vue'
import axios from 'axios'

export default {
  //自动更新App
  autoupdateapp: function (data) {
    return axios.post('/point-api-autoupdateapp',data);
  }
}

import Vue from 'vue'
import Vuex from 'vuex'
import GLOBAL_CONFIG from '../config/config'
import axios from 'axios'
import router from '../router'
import Bluetooth from '../common/Bluetooth/Search'
import PrintTemp from '../common/PrintLib/PrintTemp'
import SocketPrint from '../common/PrintLib/SocketPrint'

Vue.use(Vuex)
Vue.use(Bluetooth)

export default new Vuex.Store({
    state: {
        mastloadding: false,
        mastprinttype:false,
        mastprintlen:false,
        printInfo:{
            type:'bluetooth',
            ip:'',
            port:'',
            size:'58mm'
        },
        BlueConnect:null,
        GLOBAL_CONFIG:GLOBAL_CONFIG['GLOBAL_CONFIG']
    },
    mutations: {
        mastdisplay: function (state,name) {
            if(state[name]){
                state[name] = false;
            }else{
                state[name] = true;
            }

        },
        toprint: function (state,params) {
            if(state.printInfo['type'] == 'network'){
                //排队取号参数
                if(state.printInfo['ip'] == '' || state.printInfo['port'] == ''){
                  return mui.toast('请填写必填项');
                }

                SocketPrint.socketconnect(state.printInfo['ip'],parseInt(state.printInfo['port']));
                SocketPrint.print('queuetemp',params.data,params.size);
            }else if(state.printInfo['type'] == 'bluetooth'){
                //测试数据
                let datastr = PrintTemp.queuetemp(params.size,params.data);
                this.commit('toConnectDevice');        
                state.BlueConnect.Print(datastr);
            }
        },
        toConnectDevice: function (state) {
            var bleId = state.printInfo['bleId'];
            //进行连接
            if(!state.BlueConnect || state.BlueConnect.BleId != bleId){
              state.BlueConnect = new window.Vue.ConnectPrinter.BluePrinter(bleId);
              //连接失败
              if(!state.BlueConnect){
                mui.toast('连接失败');
              }           
            }
        },
        initPrintInfo: function (state) {
            if(localStorage.printInfo){
                state.printInfo = JSON.parse(localStorage.printInfo);
            }else{
                state.printInfo = {
                    type:'bluetooth',
                    ip:'',
                    port:'',
                    size:'58mm'
                };
            }           
        }
    },
    components:{

    },
    modules: {
       
    },
    actions: {
        autoupdateapp: function (context) {
            let AutoUpdateApp = new window.Vue.AutoUpdateApp();
            let wgtVer = plus.runtime.version;

            axios.post('/point-api-autoupdateapp',{
                appid:plus.runtime.appid,
                appname:'queue'
            }).then(function(response){    
                let newVer = response;
                //检查更新
                if(wgtVer && newVer && (wgtVer.substring(0,3) < newVer.versionName.substring(0,3))){
                    if(window.confirm('检测到更新,是否更新?')){
                        AutoUpdateApp.downWgt(newVer.apk);  
                    }
                } 
            }, function(response){
                mui.toast('网络错误');
            });
        }
    }

})

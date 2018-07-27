<template>
  <div class="menu-container" ref="menuContainer">
    <Header :title="title" :food="food" :name="name" :flag="flag"></Header>
    <div class="referen-btn" @click="openBlue">刷新</div>
    <!-- 点击打开蓝牙 -->
    <div v-if="isOpen == 1" class="open-bluetooth">
      <div class="open-bluetooth-tooltip">蓝牙未打开，请在系统设置中开启蓝牙</div>
      <span class="open-bluetooth-btn" @click="openBlue">打开蓝牙</span>
    </div>
    <!-- 这个是内容 -->
    <div v-if="isOpen == 2" class="contents">
      <div class="paired-content">
        <div class="un-paired-list paired-list" v-for="(item,index) in Pairedlist">
          <span class="paired-list-name">{{item.bleName}}</span>
          <span class="paired-list-btn" :class="item.is_active ? 'paired-list-btn-active' : 'un-paired-list'" @click="ConnectDevice(index)">{{item.is_active ? '已选择' : '选择'}}</span>
        </div>
      </div>
      <div class="un-paired-content paired-content">
        <div class="un-paired-tooltip">
          请选择要配对的打印机
        </div>
        <div class="un-paired-list paired-list" v-for="(item,index) in Unpairedlist">
          <span class="paired-list-name">{{item.bleName}}</span>
          <span class="paired-list-btn un-paired-list" @click="Bluepairing(index)">配对</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../Mast/Header'

export default {
  name: 'QueueBluetooth',
  data () {
    return {
      title: '设置蓝牙打印机',
      food:true,
      flag:false,
      name:'/',
      msg: '开始搜索',
      isSearch:false,
      Pairedlist:[],
      Unpairedlist:[],
      blue:null, // 当前组件全局蓝牙类
      BlueConnect:null, // 连接对象
      isOpen:0,
      id:''
    }
  },
  methods: {
    topath: function (name) {
      this.$router.push({path:name});
    },
    changeMastDisplay: function (name) {
      this.$store.commit('mastdisplay',name);
    },
    changeInfo : function (type) {      
      this.$parent.selectInfoCom = type; 
    },
    openBlue: function () {
      if(!this.blue.CheckBluetoothState()){ // 判断是否开启蓝牙           
          this.blue.StartBluetooth((enable) => {
            if(enable){
              this.$store.state.mastloadding = true;
              //设置定时器，防止刚开启蓝牙，导致搜索不到
              setTimeout(() => {               
                this.startBlue();
              },2000)
            }else{
              this.$set(this,'isOpen',1);
            }
          });
      }else{
        this.$store.state.mastloadding = true;
        setTimeout(() => {
          this.startBlue();
        },2000)
      }
    },
    // 搜索蓝牙设备
    startBlue: function(){
        this.Pairedlist = [];
        this.Unpairedlist = [];
        this.isSearch = true;
        this.$set(this,'isOpen',2);

        this.blue.StartSeatch((obj) =>{
          if(obj && obj.bleName){
            console.log(obj['bleId']);
            if(obj.isPaired){
              this.filterReapeat(obj,'Pairedlist');             
            }else{
              this.filterReapeat(obj,'Unpairedlist');           
            }
          }
        },() => {
          this.$store.state.mastloadding = false;
          this.isSearch = false;
          this.setDefultActive();
        });
    },
    filterReapeat: function (obj,name) {
      let number = 0;
      for(let i = 0; i < this[name].length; i++){
        if(obj['bleId'] == this[name][i]['bleId']){
          number++;
        }
      }

      if(number === 0){
        this[name].push(obj);
      }
    },
    // 进行配对
    Bluepairing:function(index){
      //配对的蓝牙设备的数据
      let BleDevice = this.Unpairedlist[index].BleDevice;
      let bleId = this.Unpairedlist[index].bleId;

      this.$store.state.mastloadding = true;
      this.blue.Bluepairing(BleDevice,bleId,(msg) => {
        this.$store.state.mastloadding = false;
        //配对提示信息
        mui.toast(msg.errmsg);
        // 已配对设备新增元素，未配对设备删除元素
        this.Pairedlist.push(this.Unpairedlist[index]); 
        this.Unpairedlist.splice(index,1); 
      },(msg) => {
        this.$store.state.mastloadding = false;
        mui.toast(msg.errmsg);
      });
    },
    // 连接设备
    ConnectDevice:function(index){
      //其它的设置为false         
      for(let i = 0; i < this.Pairedlist.length; i++){
        this.$set(this.Pairedlist[i],'is_active',false);
      }
      //连接成功后，设置为true
      this.$set(this.Pairedlist[index],'is_active',true);
      //赋值给设置页面的printInfo对象
      for(let key in this.Pairedlist[index]){
        this.printInfo[key] = this.Pairedlist[index][key];
      }
      console.dir(JSON.stringify(this.printInfo));
      //如果存在连接的打印机，进行提示      
    },
    toConnectDevice: function (index) {
      mui.plusReady(() => {
        var bleId = this.Pairedlist[index].bleId;
        //进行连接
        if(!this.BlueConnect || this.BlueConnect.BleId != bleId){
          this.BlueConnect = new this.ConnectPrinter.BluePrinter(bleId);
          //其它的设置为false         
          for(let i = 0; i < this.Pairedlist.length; i++){
            this.$set(this.Pairedlist[i],'is_active',false);
          }
          //连接成功后，设置为true
          this.$set(this.Pairedlist[index],'is_active',true);                  
        }               
        //连接失败
        if(!this.BlueConnect){
          mui.toast('连接失败');
        }
      });
    },
    setDefultActive: function () {
      if(localStorage.printInfo){
        let printInfo = JSON.parse(localStorage.printInfo);
        for(let i = 0; i < this.Pairedlist.length; i++){
          if(printInfo.hasOwnProperty('bleId') && printInfo['bleId'] == this.Pairedlist[i]['bleId']){
            this.$set(this.Pairedlist[i],'is_active',true);
          }
        }
      }
      console.log('setDefultActive');
    }

  },
  components: {
    Header
  },
  computed: {
    printInfo: function () {
      return this.$store.state.printInfo;
    }
  },
  created:function(){
    // 初始化创建对象
    mui.plusReady(() => {
      this.blue = new this.SearchBluetooth();
      this.openBlue();
    });
  }
}
</script>
<style scoped>
  *{
      margin: 0;
      padding: 0;
      font-size: 14px;
      font-family: "微软雅黑";
      color: #333;
  }
  .menu-container{
    /*overflow: hidden;*/
    background: #eee;
  }
  .contents{
    margin-top: 54px;
    position: relative;
    padding: 0;
    /*overflow: scroll;*/
  }
  .paired-content,.un-paired-content{
    height: auto;
    width: 100%;
    background: #fff;
  }
  .paired-content .paired-list{
    padding: 0px 10px;
    height: 50px;
    line-height: 50px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
  }
  .paired-list .paired-list-name{
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #333;
  }
  .paired-list .paired-list-btn{
    height: 28px;
    /*margin-top: 10px;*/
    border: 1px solid #e7e7e7;
    position: absolute;
    right: 10px;
    top: 11px;
    padding: 0px 15px;
    line-height: 28px;
    color: #ccc;
    border-radius: 3px;
  }
  .un-paired-tooltip{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #eee;
    padding: 0px 10px;
    font-size: 14px;
    color: #999;
  }
  .un-paired-list .paired-list-btn{
    border: 1px solid #ff5534;
    color: #ff5534;
  }
  .un-paired-list .paired-list-btn-active{
    border: none;
    color: #999;
  }
  /*打开蓝牙*/
  .open-bluetooth{
    position: absolute;
    top: 50%;
    width: 100%;
    left: 0;
    height: 60px;
    margin-top: -30px;
    text-align: center;
  }
  .open-bluetooth .open-bluetooth-tooltip{
    width: 100%;
    height: 30px;
    text-align: center;
    color: #999;
  }
  .open-bluetooth .open-bluetooth-btn{
    display: inline-block;
    padding: 0px 15px;
    color: #ff5534;
    border: 1px solid #ff5534;
    height: 30px;
    line-height: 30px;
  }
  .referen-btn{
    position: absolute;
    top: 0;
    right: 0;
    width: 44px;
    height: 44px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    z-index: 10001;
    line-height: 44px;
  }
</style>

<template>
  <div class="menu-container" ref="menuContainer">
    <Header :title="title" :food="food" :name="name"></Header>
    <!-- 这个是内容 -->
    <div class="contents">
      <div class="printer-setupitem">
        <div class="characters-per-line" v-if="false">
          <div class="characters-per-line-title">每行字符数</div>
          <div class="characters-per-line-count" @click="changeMastDisplay('mastprintlen')">
            <span>{{printInfo.size}}</span>
          </div>
        </div>
        <div class="characters-per-line">
          <div class="characters-per-line-title">打印机类型</div>
          <div class="characters-per-line-count" @click="changeMastDisplay('mastprinttype')">
            <span>{{printInfo.type == 'network' ? '网口打印机' : ''}}{{printInfo.type == 'bluetooth' ? '蓝牙打印机' : ''}}</span>
          </div>
        </div>
        <div v-if="printInfo.type == 'bluetooth'" class="characters-per-line">
          <div class="characters-per-line-title">设置蓝牙打印机</div>
          <div class="characters-per-line-count" @click="topath('queuebluetooth')">
            <span>{{printInfo.hasOwnProperty('bleName') ? printInfo.bleName : '请选择'}}</span>
          </div>
        </div>
        <div v-if="printInfo.type == 'network'" class="characters-per-line">
          <div class="characters-per-line-title">打印机IP</div>
          <div class="characters-per-line-count characters-per-line-next">
            <input type="text" placeholder="请输入" v-model="printInfo.ip">
          </div>
        </div>
        <div v-if="printInfo.type == 'network'" class="characters-per-line">
          <div class="characters-per-line-title">端口</div>
          <div class="characters-per-line-count characters-per-line-next">
            <input type="number" placeholder="请输入" v-model="printInfo.port">
          </div>
        </div>
      </div>

      <div class="footer-btn">
        <div class="text-border" @click="toprint">
          <button class="text-btn">测试</button>
        </div>
        <div class="save-border">
          <button class="save-btn" @click="printInfoSave">保存</button>
        </div>
      </div>
    </div>

    <mast v-show="mastprinttype" :class="{'network':mastprinttype}" @touchmove.prevent>
      <div class="mast-content" :class="{'mast-menu-print':mastprinttype}">
        <div class="mast-print-title">选择打印机的类型</div>
        <div class="mast-print-list mast-scrollspecificat">
          <div class="mast-specificat-list" :class="{'mast-specificat-list-height':mastprinttype}">
            <ul class="print-type">
              <li class="print-type-list" @click="selectType({
                name:'type',
                value:'bluetooth'
              }),changeMastDisplay('mastprinttype')">蓝牙打印机</li>
              <li class="print-type-list" @click="selectType({
                name:'type',
                value:'network'
              }),changeMastDisplay('mastprinttype')">网口打印机</li>
            </ul>
          </div>
        </div>
        <div class="mast-product-close" @click.stop="changeMastDisplay('mastprinttype')"></div>
      </div>
      <div class="mast" @click.stop="changeMastDisplay('mastprinttype')" @touchmove.prevent></div>
    </mast>
    <mast v-show="mastprintlen" :class="{'network':mastprintlen}" @touchmove.prevent>
      <div class="mast-content" :class="{'mast-menu-print':mastprintlen}">
        <div class="mast-print-title">选择打印纸张的宽度</div>
        <div class="mast-print-list mast-scrollspecificat">
          <div class="mast-specificat-list" :class="{'mast-specificat-list-height':mastprintlen}">
            <ul class="print-type">
              <li class="print-type-list" @click="selectType({
                name:'size',
                value:'58mm'
              }),changeMastDisplay('mastprintlen')">58mm</li>
              <li class="print-type-list" @click="selectType({
                name:'size',
                value:'80mm' 
              }),changeMastDisplay('mastprintlen')">80mm</li>
            </ul>
          </div>
        </div>
        <div class="mast-queue-slider-close" @click.stop="changeMastDisplay('mastprintlen')"></div>
      </div>
      <div class="mast" @click.stop="changeMastDisplay('mastprintlen')" @touchmove.prevent></div>
    </mast>
  </div>
</template>

<script>
import Mast from '../Mast/Mast'
import Header from '../Mast/Header'
import PrintTemp from '../../common/PrintLib/PrintTemp'
import SocketPrint from '../../common/PrintLib/SocketPrint'

export default {
  name: 'QueuePrintSetting',
  data () {
    return {
      title: '打印机设置',
      food:true,
      name:'queue',
      BlueConnect:null, // 连接对象
    }
  },
  methods: {
    topath: function (name) {
      this.$router.push({path:name});
    },
    changeMastDisplay: function (name) {
      this.$store.commit('mastdisplay',name);
    },
    selectType: function (params) {
      this.printInfo[params['name']] = params['value'];
    },
    toprint: function () {
      this.$store.commit('toprint',{
        size:58,
        data:{"shopname":'富友智慧餐厅',"table":"B01(8-5人桌)","describe":"您之前还有0桌客人在等待","take_time":this.$root.timestampToTime()}
      });
    },
    printInfoSave: function () {
      this.$store.state.mastloadding = true;
      //不能为空的判断
      if(this.printInfo['type'] == 'network' && this.printInfo['ip'] == '' && this.printInfo['port'] == ''){
        return mui.toast('请填写必填项');
      }
      //不能为空的判断
      if(this.printInfo['type'] == 'bluetooth' && !this.printInfo['bleId']){
        return mui.toast('请选择打印机');
      }

      this.$root.setLocalStorage({
        printInfo:JSON.stringify(this.printInfo)
      });

      setTimeout(() => {
        this.$store.state.mastloadding = false;
        mui.toast('保存成功');
      },2000);
      
    }
  },
  components: {
    Header,
    Mast
  },
  computed: {
    mastprinttype: function () {
      return this.$store.state.mastprinttype;
    },
    mastprintlen: function () {
      return this.$store.state.mastprintlen;
    },
    printInfo: function () {
      return this.$store.state.printInfo;
    }
  },
  created: function () {
    this.$store.state.mastloadding = false;
  }
  // ,
  // beforeRouteLeave(to, from, next) {
  //   if (this.printInfo['type'] == 'bluetooth' && !this.printInfo['bleId']) {  
  //     to.meta.keepAlive = false;
  //   }
  //   next(); 
  // }

}
</script>
<style scoped>
  .menu-container{
    overflow: hidden;
    background: #eee;
  }
  .contents{
    margin-top: 44px;
    position: relative;
    padding: 0;
    /*overflow: scroll;*/
  }

  .printer-setupitem{
      background: #fff;
      font-size: 14px;
  }
  .characters-per-line{
      margin: 0 10px;
      border-bottom: 1px solid #ccc;
  }
  .characters-per-line:last-child{
      border-bottom: 0;
  }
  .characters-per-line:after{
      content: '';
      display: block;
      width: 0;
      height: 0;
      clear: both;
      visibility: hidden;
  }
  .characters-per-line-title{
    width: 30%;
  }
  .characters-per-line-count{
    width: 70%;
  }
  .characters-per-line-title,.characters-per-line-count{      
      height: 67px;
      line-height: 67px;
      float: left;
  }
  .characters-per-line-count{
      float: right;
      text-align: right;
      background: url("../../assets/right-arrow.png") no-repeat right center;
      padding-right: 12px;
  }
  .characters-per-line-next{
    background: none;
  }
  .characters-per-line-count span{
      color: #ff5534;
      margin-right: 5px;
  }
  .characters-per-line-count input{
    border: none;
    margin: 0;
    padding: 0;
    text-align: right;
  }
  .characters-per-line-count img{
      vertical-align: middle;
      margin-top: -3px;
  }
  .footer-btn{
      margin: 40px 10px 0 10px;
  }
  .footer-btn:after{
      content: '';
      display: block;
      width: 0;
      height: 0;
      clear: both;
      visibility: hidden;
  }
  .footer-btn .text-border,.footer-btn .save-border{
      width: 50%;
      float: left;
  }
  .footer-btn .save-border{
      float: right;
  }
  .footer-btn .text-btn,.footer-btn .save-btn{
      width: 90%;
      height: 45px;
      border: 0;
      background: #ff5534;
      color: #fff;
      border-radius: 3px;
      outline: 0;
      display: block;
      margin: 0 auto;
  }
</style>

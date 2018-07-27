<template>
  <div class="menu-container" ref="menuContainer">
    <Header :title="title" :food="food" :name="name" :clearZero="clearZero" :queue="queue" :flag="flag"></Header>
    <mast v-show="mastqueueslider" :class="{'network':mastqueueslider}" @touchmove.prevent>
      <div class="mast-content" :class="{'mast-queue-slider':mastqueueslider}">
        <!-- 排队侧边栏 -->
        <div class="queue-slider" v-if="mastqueueslider">
          <div class="queue-slider-list" @click="topath('/queuehistory')">
            <span>历史记录</span>
          </div>
          <div class="queue-slider-list" @click="topath('/queuecensus')">
            <span>排队统计</span>
          </div>
          <div class="queue-slider-list" @click="topath('/tabletypesetting')">
            <span>桌型设置</span>
          </div>
          <div class="queue-slider-list" @click="topath('/queueprintsetting')">
            <span>打印机设置</span>
          </div>
          <!-- <div class="queue-slider-list" @click="topath('/queuesetting')">
            <span>排队设置</span>
          </div> -->
          <div class="queue-slider-list" @click="homeExit">
            <span>退出</span>
          </div>
        </div>        
      </div>
      <div class="mast mast-slider" @click.stop="changeMastDisplay('mastqueueslider')" @touchmove.prevent></div>
    </mast>
    <!-- 这个是内容 -->
    <div class="contents">
      <div class="screen-content">
        <ul>
          <li @click.stop="filterQueueList({
            sign:item.hasOwnProperty('id') ? 'only' : 'all',
            id:item.id,
            index:index
          })" :class="item.is_active ? 'content-details-active' : ''" v-for="(item,index) in selectQueueSetting" class="screen-content-details">{{item.title}}<br><span>({{item.hasOwnProperty('id') ? item.queue_total : oldqueueList.length}})</span></li>
        </ul>
      </div>
      <div class="lineup-scroll" :style="{height: contentHeight + 'px'}"> 
        <div class="lineup-list">
          <div class="lineup-order" v-for="(queue,index) in queueList">
            <div class="order-details">
              <p>
                <span class="mark">{{queue.num}}</span>
                <!-- <span class="num-of-repast">(2人)</span> -->
              </p>
              <p class="lineup-time">
                <span>排队时间：</span>
                <span>{{queue.minute}}分钟</span>
              </p>
            </div>
            <div class="lineup-btn">
              <div class="lineup-callnum-btn" @tap="cryQueueCode(queue)">
                <img :src="require('../../assets/callnum.png')" alt="">
                <p>叫号</p>
              </div>
              <div class="lineup-repast-btn" @tap="changestatus({
                id:queue.id,
                status:2,
                index:index,
                queue_setting_id:queue.queue_setting_id
              })">
                <img :src="require('../../assets/repast.png')" alt="">
                <p>就餐</p>
              </div>
              <div class="lineup-passnum-btn" @tap="changestatus({
                id:queue.id,
                status:3,
                index:index,
                queue_setting_id:queue.queue_setting_id
              })">
                <img :src="require('../../assets/passnum.png')" alt="">
                <p>过号</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-bar" @click.stop="changeMastDisplay('mastqueue')">
        <span class="takenum-btn">取号</span>
      </div>
    </div>

    <mast v-show="mastqueue" :class="{'network':mastqueue}" @touchmove.prevent>
      <div class="mast-content" :class="{'mast-menu-queue':mastqueue}">
        <div class="mast-specificat-title">取号</div>
        <div class="mast-specificat-queue-list mast-scrollspecificat">
          <div class="mast-specificat-list" :class="{'mast-specificat-list-height':mastqueue}">
            <ul class="table-type-list">
              <li v-if="item.id" v-for="(item,index) in queueSetting" @click="selectQueueList({
                index:index,
                name:'queueSetting'
              })">
                <div class="table-type" :class="item.is_active ? 'table-type-active' : ''">
                  <p class="table-type-title">{{item.title}}</p>
                  <p class="table-type-number">{{item.min_num}}-{{item.max_num}}人</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="mast-specificat-footer">
          <!-- <div class="mast-specificat-univalent">单价：￥100.00</div> -->
          <div class="mast-specificat-com" @click.stop="confirmQueueList">确定</div>
        </div>
        <div class="mast-product-close" @click.stop="changeMastDisplay('mastqueue')"></div>
      </div>
      <div class="mast" @click.stop="changeMastDisplay('mastqueue')" @touchmove.prevent></div>
    </mast>
  </div>
</template>

<script>
import Mast from '../Mast/Mast'
import Header from '../Mast/Header'
import BScroll from 'better-scroll'

export default {
  name: 'Queue',
  data () {
    return {
      title: '排号',
      food:true,
      clearZero:true,
      flag:false,
      queue:true,
      name:'home',
      contentHeight: 0,
      queueList:{},
      oldqueueList:{},
      queueSetting:{},
      selectQueueSetting:{},
      tableInfo:{},
      filterInfo:null
    }
  },
  methods: {
    topath: function (name) {
      if(name == '/queueprintsetting'){
        this.initPrintInfo();
      }
      this.$router.push({path:name});
    },
    initPrintInfo: function (){
      this.$store.commit('initPrintInfo');
    },
    homeExit: function () {
      this.$root.removeLocalStorage(['token']);
      this.$router.push({path:'login'});
    },
    changeMastDisplay: function (name) {
      this.$store.commit('mastdisplay',name);
    },
    getHeight: function () {
      let productData = this.$refs.menuContainer.offsetHeight;
      this.contentHeight = productData - 165;
    },
    toprint: function (params) {
      //这个组件需要判断是否存在localStorage.printInfo
      if(!localStorage.printInfo){
        return mui.toast('当前没有设置打印机');
      }

      this.$store.commit('toprint',params);
    },
    changestatus: function (params) {
      console.dir(params);
      this.$store.state.mastloadding = true;
      this.API.changestatus({
        id:params.id,
        status:params.status,
        queue_setting_id:params.queue_setting_id
      }).then((response) => {
        if(response.hasOwnProperty('msg')){
          this.queueList.splice(params.index,1);
          // 同时删除原始的数据
          for(let i = 0; i < this.oldqueueList.length; i++){
            if(params.id == this.oldqueueList[i]['id']){
              this.oldqueueList.splice(i,1);
            }
          }
          // 这时选择的是全部，需要重新赋值
          // this.queueList = Object.assign([],this.oldqueueList);
          // 匹配当前id,删除数量
          for(let i = 0; i < this.selectQueueSetting.length; i++){
            if(params.queue_setting_id == this.selectQueueSetting[i]['id']){
              this.selectQueueSetting[i]['queue_total'] = parseInt(this.selectQueueSetting[i]['queue_total']) - 1;
            }
          }
          // this.getqueuesetting({status:1});
          this.$store.state.mastloadding = false;
          mui.toast(response.msg);
        }
      }, (response) => {
        this.$store.state.mastloadding = false;
        mui.toast('网络错误');
      });
    },
    getqueuesetting: function (params) {
      this.API.getqueuesetting({
        status:params.status
      }).then((response) => {
          let allList = {
            title:'全部',
            is_active:true
          };
          //轮询更新queue_total
          if(params['filter']){
            allList['is_active'] = false;
          }

          let list = JSON.parse(JSON.stringify(response));
          list.unshift(allList);
          //取号遮罩数据
          this.queueSetting = response.filter((item)=>{
            item['is_active'] = false;
            return item;           
          })
          //排队头部导航
          this.selectQueueSetting = list.filter((item)=>{
            //轮询更新queue_total
            if(this.filterInfo && this.filterInfo['id'] == item['id']) {             
              item['is_active'] = true;
            }else if(!item.hasOwnProperty('is_active')){
              item['is_active'] = false;
            }            
            return item;           
          })
              
      }, (response) => {
          mui.toast('网络错误');
      });
    },
    filterQueueList: function (params) {
      console.dir(params);
      console.dir(this.selectQueueSetting);
      for(let i = 0; i < this.selectQueueSetting.length; i++){
        if(i != params.index){
          this.selectQueueSetting[i]['is_active'] = false;
        }else{
          this.selectQueueSetting[i]['is_active'] = true;
        }
      }

      this.queueList = this.oldqueueList.filter((item)=>{
        if(params['sign'] == 'only'){
          //id相等的时候返回当前桌型
          if(params['id'] == item['queue_setting_id']){
            return item;
          }
        }else{
          return this.oldqueueList;
        }
      })
      //保存点击过后的桌型数据
      this.filterInfo = params;
    },
    selectQueueList: function (params) {
      for(let i = 0; i < this[params.name].length; i++){
        if(i != params.index){
          this[params.name][i]['is_active'] = false;
        }        
      }
      this[params.name][params.index]['is_active'] = !this[params.name][params.index]['is_active'];
      //存储当前选择的桌台信息，用于打印
      this.tableInfo = this[params.name][params.index];
    },
    confirmQueueList: function () {
      let index = 0;
      for(let i = 0; i < this.queueSetting.length; i++){
        if(this.queueSetting[i]['is_active']){
          this.changeMastDisplay('mastqueue');
          this.$store.state.mastloadding = true;
          this.API.yakeano({
            id:this.queueSetting[i]['id']
          }).then((response) => {
              console.dir(response);
              this.$store.state.mastloadding = false;
              if(response.hasOwnProperty('num')){
                //生成号牌后进行打印
                this.toprint({
                  size:58,
                  data:{
                    "shopname":localStorage.company_name,
                    "table":response.num+"(" + this.tableInfo['min_num'] +"-"+ this.tableInfo['max_num'] +"人桌)",
                    "describe":"您之前还有"+ response.haspeople +"桌客人在等待",
                    "take_time":response.addtime
                  }
                });
                //重新获取数据
                this.getqueueorder({
                  id:'',
                  sign:'all',
                  status:1,
                  filter:true
                });
                // this.getqueuesetting({status:1});
                // 防止和内层的for循环的i冲突
                let id = this.queueSetting[i]['id'];
                // 添加数量
                for(let i = 0; i < this.selectQueueSetting.length; i++){
                  if(this.selectQueueSetting[i].hasOwnProperty('id')){
                    if(id == this.selectQueueSetting[i]['id']){
                      this.selectQueueSetting[i]['queue_total'] = parseInt(this.selectQueueSetting[i]['queue_total']) + 1;
                    }
                  }                  
                }
                // mui.toast('生成号牌成功');
              }else{
                mui.toast('生成号牌失败');
              }     
          }, (response) => {
              this.$store.state.mastloadding = false;
              mui.toast('网络错误');
          });
          index++;
        }
      }

      if(index === 0){
        mui.toast('请选择需要生成的号牌队列');
      }
    },
    getqueueorder: function (params) {
      if(params['id'] == ''){
        delete params['id'];
      }
      this.$store.state.mastloadding = true;
      this.API.getqueueorder(params).then((response) => {
          console.dir(response);
          this.$store.state.mastloadding = false;
          // 用来判断是否第一次进来，否则需要过滤数据
          if(params['filter']){
            this.oldqueueList = response;
            for(let i = 0; i < this.selectQueueSetting.length; i++){
              if(this.selectQueueSetting[i]['is_active']){
                this.filterQueueList({
                  sign:this.selectQueueSetting[i].hasOwnProperty('id') ? 'only' : 'all',
                  id:this.selectQueueSetting[i].id,
                  index:i
                });
              }
            }
          }else{
            this.queueList = this.oldqueueList = response;
          }
          
          this.getHeight();     
          let tableScroll = new BScroll('.lineup-scroll',{
              scrollY: true,
              tap:"order,cryQueueCode,changestatus"
          });    
      }, (response) => {
        this.$store.state.mastloadding = false;
          mui.toast('网络错误');
      });
    },
    rollQueueList: function () {
      setInterval(() => {
        if(this.filterInfo && this.filterInfo['id']){
          this.funcGather(true);
        }else{
          this.funcGather(false);
        }
      },20000);      
    },
    funcGather: function (bool) {
      this.getqueuesetting({
        status:1,
        filter:bool
      });
      this.getqueueorder({
        id:'',
        sign:'all',
        status:1,
        filter:bool
      });
    },
    cryQueueCode: function (reponse) {
      this.$store.state.mastloadding = true;
      switch ( plus.os.name ) {
          case "Android":
            let main = plus.android.runtimeMainActivity();
            let SpeechUtility = plus.android.importClass('com.iflytek.cloud.SpeechUtility');
            let SpeechConstant = plus.android.importClass('com.iflytek.cloud.SpeechConstant');
            SpeechUtility.createUtility(main,"appid=5af2af41");

            let SynthesizerPlayer = plus.android.importClass('com.iflytek.cloud.SpeechSynthesizer');
            let play = SynthesizerPlayer.createSynthesizer(main, null);
            play.setParameter(SpeechConstant.VOICE_NAME, "xiaojing");//设置发音人
            play.setParameter(SpeechConstant.SPEED, "10");//设置语速
            play.setParameter(SpeechConstant.VOLUME, "90");//设置音量，范围0~100
            // play.setParameter(SpeechConstant.ENGINE_TYPE, SpeechConstant.TYPE_CLOUD); //设置云端
            play.startSpeaking(reponse['num'] + '请用餐' + reponse['num'] + '请用餐',null);
          break;
          case "iOS":
            let AVSpeechSynthesizer = plus.ios.importClass("AVSpeechSynthesizer");
            let AVSpeechUtterance = plus.ios.importClass("AVSpeechUtterance");
            let AVSpeechSynthesisVoice = plus.ios.import("AVSpeechSynthesisVoice");
            let sppech = new AVSpeechSynthesizer();
            let voice = AVSpeechSynthesisVoice.voiceWithLanguage("zh-CN");
            let utterance =  AVSpeechUtterance.speechUtteranceWithString(reponse['num'] + '请用餐' + reponse['num'] + '请用餐');
               // utterance.plusSetAttribute("rate",30.1);
            utterance.setVoice(voice);
            sppech.speakUtterance(utterance);
          break;
          default:
          // 其它平台
          break;
      }
      this.$store.state.mastloadding = false;
    }
  },
  components: {
    Header,
    Mast
  },
  computed: {
    mastqueue: function () {
      return this.$store.state.mastqueue;
    },
    mastqueueslider: function () {
      return this.$store.state.mastqueueslider;
    }
  },
  mounted: function () {
    this.$store.state.mastqueueslider = false;
    this.funcGather(false);
    //轮询
    this.rollQueueList();
  },
  created: function () {    
    // 初始化创建对象
    mui.plusReady(() => {
      this.$store.dispatch('autoupdateapp');
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
    overflow: hidden;
  }
  .contents{
    margin-top: 44px;
    position: relative;
    padding: 0;
    /*overflow: scroll;*/
  }
  .screen-content{
      width: 100%;
      height: 67px;
      background-color: #fff;
      position: fixed;
      top: 49px;
      left: 0;
      z-index: 1000;
  }
  .screen-content:before{
    content:"";
    width: 100%;
    height: 5px;
    display: block;
    background: #eeeeee;
    position: absolute;
    top: -5px;
    left: 0;
  }
  .screen-content .screen-content-details{
      list-style: none;
      float: left;
      width: 16.6%;
      text-align: center;
      padding: 11px 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: bold;
      color: #999;
  }
  .screen-content .screen-content-details span{
      font-weight: normal;
      font-size: 12px;
      color: #999;
  }
  .screen-content ul{
      background-color: #fff;
      /*margin: 5px 0;*/
  }
  .screen-content ul:after{
      content: '';
      display: block;
      width: 0;
      height: 0;
      clear: both;
      visibility: hidden;
  }
  .screen-content .content-details-active{
      padding: 11px 0 11px 0;
      border-bottom: 1px solid #ff5534;
      color: #333;
  }
  .lineup-scroll{
    margin-top: 120px;
    background: #eeeeee;
  }
  .lineup-scroll:before{
    content:"";
    width: 100%;
    height: 5px;
    display: block;
    background: #eeeeee;
    position: absolute;
    top: -5px;
    left: 0;
  }
  .lineup-list{
      width: 100%;
      /*margin-top: 10px;*/
  }
  .lineup-order{
      width: 100%;
      height: 78px;
      background-color: #fff;
      /*margin-bottom: 10px;*/
      padding: 0 10px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -o-box-sizing: border-box;
      box-sizing: border-box;
      position: relative;
      border-bottom: 1px solid #e7e7e7;
  }
  .lineup-order .order-details{
      width: 100%;
      padding: 13px 0;
  }
  .lineup-order .order-details .mark{
      color: #ff5534;
      font-size: 20px;
      font-weight: bold;
  }
  .lineup-order .order-details .num-of-repast{
      color: #333;
      font-size: 12px;
  }
  .lineup-order .order-details .lineup-time{
      height: 26px;
      line-height: 26px;
  }
  .lineup-order .order-details .lineup-time span{
      color: #999;
      font-size: 12px;
  }
  .lineup-order .lineup-btn{
      position: absolute;
      right: 10px;
      top: 50%;
      width: 170px;
      height: 43px;
      margin-top: -21px;
      z-index: 1000;
  }
  .lineup-order .lineup-btn div{
      width: 43px;
      height: 43px;
      float: left;
      margin-left: 20px;
      border-radius: 5px;
  }
  .lineup-order .lineup-btn div img{
      display: block;
      margin: 0 auto;
      padding: 3.5px 0;
  }
  .lineup-order .lineup-btn div p{
      text-align: center;
      font-size: 10px;
  }
  .lineup-order .lineup-btn .lineup-callnum-btn{
      border: 1px solid #0799ff;
      margin-left: 0;
  }
  .lineup-order .lineup-btn .lineup-callnum-btn p{
      color: #0799ff;
  }
  .lineup-order .lineup-btn .lineup-repast-btn{
      border: 1px solid #27ae03;
  }
  .lineup-order .lineup-btn .lineup-repast-btn p{
      color: #27ae03;
  }
  .lineup-order .lineup-btn .lineup-passnum-btn{
      border: 1px solid #ff5534;
  }
  .lineup-order .lineup-btn .lineup-passnum-btn p{
      color: #ff5534;
  }
  .tab-bar{
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 49px;
      background-color: #ff5534;
      z-index: 2;
  }
  .tab-bar .takenum-btn{
      display: block;
      width: 64px;
      height: 49px;
      line-height: 49px;
      margin: 0 auto;
      text-align: right;
      color: #fff;
      background: url("../../assets/get_queue.png") no-repeat left center;
  }

  .takenum-mask{
      display: none;
  }
  .takenum-mask .mask-blackbg{
      position: fixed;
      top: 44px;
      width: 100%;
      height: 100%;
      background: #333;
      opacity: 0.5;
      z-index: 3;
  }
  .takenum-mask .mask-content{
      width: 300px;
      height: 214px;
      border-radius: 4px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -150px;
      margin-top: -107px;
      background: #fff;
      z-index: 4;
  }
  .takenum-mask .mask-content .mask-content-title{
      border-bottom: 1px solid #ccc;
  }
  .takenum-mask .mask-content .mask-content-title:after{
      content: '';
      display: block;
      width: 0;
      height: 0;
      clear: both;
      visibility: hidden;
  }
  .takenum-mask .mask-content .mask-content-title h3{
      font-size: 16px;
      font-weight: normal;
      height: 45px;
      width: 60%;
      text-align: center;
      line-height: 45px;
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -30%;
  }
  .takenum-mask .mask-content .mask-content-title .close-mask-btn{
      display: block;
      width: 45px;
      height: 45px;
      background: url("../../assets/close-btn.png") no-repeat center center;
      float: right;
  }
  .table-type-list{
      margin: 13px;
      height: 50px;
  }
  .table-type-list:after{
      content: '';
      display: block;
      width: 0;
      height: 0;
      clear: both;
      visibility: hidden;
  }
  .table-type-list li{
      list-style: none;
      float: left;
      width: 25%;
      /*height: 50px;*/
  }
  .table-type-list .table-type{
      margin: 10px 5px 10px 5px;
      background: #eee;
      border-radius: 3px;
  }
  .table-type-list .table-type-active{
      background: #ff5534;
  }
  .table-type-list .table-type p{
      text-align: center;
      color: #666;
  }
  .table-type-list .table-type-active p{
      color: #fff;
      /*white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;*/
      overflow: scroll;
  }
  .table-type-list .table-type .table-type-title{
      /*font-weight: bold;*/
      width: 100%;
      height: 21px;
      overflow: scroll;
  }
  .table-type-list .table-type .table-type-number{
      font-size: 12px;
  }
  .mask-footer{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      display: table-cell;
      border-top: 1px solid #ccc;
      text-align: right;
      padding: 10.5px 15px 10.5px 0;
      vertical-align: middle;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -o-box-sizing: border-box;
      box-sizing: border-box;
  }
  .mask-footer .mask-submit-btn{
      width: 90px;
      height: 30px;
      border-radius: 15px;
      border: 0;
      background: #ff5534;
      color: #fff;
      outline: none;
  }
  /*侧边栏*/
  .queue-slider{
    width: 200px;
    height: auto;
    background: #fff;
    position: absolute;
    top: 49px;
    left: 10px;
    z-index: 10002;
    box-shadow: 0px 1px 15px #999;
  }
  .queue-slider::before{
    content: "";
    position: absolute;
    top: -22px;
    left: 5px;
    z-index: 10003;
    height: 0;
    width: 0;
    border-left: 10px solid transparent;
    border-top: 10px solid transparent;
    border-bottom: 12px solid #fff;
    border-right: 10px solid transparent;
  }
  .queue-slider-list{
    height: 44px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    color: #666;
    border-bottom: 1px solid #e7e7e7;
    margin: 0px 10px;
  }
  .queue-slider-list:last-child{
    border-bottom: none;    
  }
  .queue-slider-list:last-child span{
    color: #ff5534;
  }
</style>

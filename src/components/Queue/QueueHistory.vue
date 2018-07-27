<template>
  <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
  <div class="menu-container" ref="menuContainer">
     <Header :title="title" :food="food" :name="name" :clearZero="clearZero"></Header>
    <!-- 这个是内容 -->
    <div class="contents">
      <div class="screen-content">
        <ul>
          <li @click.stop="filterQueueList({
            sign:item.hasOwnProperty('id') ? 'only' : 'all',
            id:item.id,
            index:index
          })" :class="item.is_active ? 'content-details-active' : ''" v-for="(item,index) in selectQueueSetting" class="screen-content-details">{{item.title}}</li>
        </ul>
      </div>
      <div class="lineup-scroll" :style="{height: contentHeight + 'px'}"> 
        <div class="lineup-list">
          <div v-if="queue.status != 1" class="lineup-order" v-for="(queue,index) in queueList">
            <div class="order-details">
              <p>
                <span class="mark">{{queue.num}}</span>
                <!-- <span class="num-of-repast">(2人)</span> -->
                <span class="queue-status" :class="queue.status == 2 ? 'queue-status-active' : ''">{{queue.status == 2 ? '就餐中' : ''}}{{queue.status == 3 ? '过号' : ''}}</span>
              </p>
              <p class="lineup-time">
                <span>取号时间：</span>
                <span>{{queue.addtime}}</span>
              </p>
            </div>
            <div class="lineup-btn">
              <span @tap="changestatus({
                id:queue.id,
                status:1,
                index:index,
                queue_setting_id:queue.queue_setting_id
              })" v-if="queue.status == 2 || queue.status == 3" class="lineup-btn-cancel">撤销</span>
              <span v-if="queue.status == 4" class="lineup-btn-closure"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </v-touch>
</template>

<script>
import Mast from '../Mast/Mast'
import Header from '../Mast/Header'
import BScroll from 'better-scroll'

export default {
  name: 'QueueHistory',
  data () {
    return {
      title: '历史记录',
      food:true,
      clearZero:true,
      name:'queue',
      contentHeight: 0,
      queueList:{},
      oldqueueList:{},
      queueSetting:{},
      selectQueueSetting:{}
    }
  },
  methods: {
    swiperleft: function () {
      this.$router.push({'path':'/queue'});
    },
    swiperright: function () {
      this.$router.push({'path':'/queue'});
    },
    changeMastDisplay: function (name) {
      this.$store.commit('mastdisplay',name);
    },
    getHeight: function () {
      let productData = this.$refs.menuContainer.offsetHeight;
      this.contentHeight = productData - 95;
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
      this.API.getqueuesetting(params).then((response) => {
          let allList = {
            title:'全部',
            is_active:true
          };
          response.unshift(allList);

          this.selectQueueSetting = response.filter((item)=>{
            if(!item.hasOwnProperty('is_active')){
              item['is_active'] = false;
            }            
            return item;           
          })
              
      }, (response) => {
          mui.toast('网络错误');
      });
    },
    filterQueueList: function (params) {
      for(let i = 0; i < this.selectQueueSetting.length; i++){
        if(i != params.index){
          this.selectQueueSetting[i]['is_active'] = false;
        }else{
          this.selectQueueSetting[i]['is_active'] = true;
        }
      }

      this.queueList = this.oldqueueList.filter((item)=>{
        if(params['sign'] == 'only'){
          if(params['id'] == item['queue_setting_id']){
            return item;
          }
        }else{
          return this.oldqueueList;
        }
      })
      
    },
    selectQueueList: function (params) {
      for(let i = 0; i < this[params.name].length; i++){
        if(i != params.index){
          this[params.name][i]['is_active'] = false;
        }   
        if(this[params.name][params.index]['is_active'] == true){
          this[params.name][params.index]['is_active'] = false;
        }else{
          this[params.name][params.index]['is_active'] = true;
        }
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
    }
  },
  components: {
    Header,
    Mast
  },
  computed: {
   mastqueue: function () {
      return this.$store.state.mastqueue;
    }
  },
  mounted: function () {
    this.getqueuesetting({});
    this.getqueueorder({
      id:'',
      sign:'all'
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
    margin-top: -22px;
    position: relative;
    padding: 0;
    /*overflow: scroll;*/
  }
  .screen-content{
      width: 100%;
      height: 44px;
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
  .lineup-order .order-details .queue-status{
      display: inline-block;
      color: #ff5534;
      font-size: 13px;
      margin-left: 8px;
  }
  .lineup-order .order-details .queue-status-active{
      color: green;
  }
  .lineup-order .lineup-btn{
      position: absolute;
      right: 10px;
      top: 17px;
      /*width: 43px;*/
      height: 43px;
  }
  .lineup-btn .lineup-btn-cancel{
      display: block;
      border: 1px solid #38c4ff;
      text-align: center;
      height: 30px;
      padding: 0px 10px;
      line-height: 30px;
      margin-top: 6px;
      color: #38c4ff;
      border-radius: 3px;
  }
  .lineup-btn .lineup-btn-closure{
    display: block;
    width: 40px;
    height: 40px;
    background: url("../../assets/lineup-end-state.png") no-repeat center center;
    margin-top: 2px;
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
      background: url("../../assets/takenum.png") no-repeat left center;
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
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
  }
  .table-type-list .table-type .table-type-title{
      font-weight: bold;
  }
  .table-type-list .table-type .table-type-number{
      font-size: 12px;
  }
</style>

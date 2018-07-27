<template>
  <div class="menu-container">
    <Header :title="title" :name="name" :food="food"></Header>
    <div class="box">
        <div class="timeselectbox">
            <li class="daybefore" @click="getYesterday(startTime.time)">
                前一天
            </li>
            <li class="dateselect">
                <myDatepicker :date="startTime" :option="multiOption" :limit="limit"></myDatepicker>
                <!-- 2018-04-05 -->
            </li>
            <li class="nextday" @click="getTomorrow(startTime.time)">
                后一天
            </li>
        </div>
        <div class="count-statistics">
      <div class="takenum-count-border">
        <p class="takenum-count">3</p>
        <p class="takenum-count-title">总取号量</p>
      </div>
      <div class="repast-count-border">
        <p class="repast-count">2</p>
        <p class="repast-count-title">总就餐量</p>
      </div>
      </div>
      <div class="table-statistics">
        <table>
          <thead>
            <tr>
              <th class="wid-17-5">桌型</th>
              <th class="wid-17-5">取号量</th>
              <th class="wid-17-5">就餐量</th>
              <th class="wid-17-5">就餐率</th>
              <th class="wid-30">平均等位时间</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="wid-17-5">小桌</td>
              <td class="wid-17-5">3</td>
              <td class="wid-17-5">2</td>
              <td class="wid-17-5">60%</td>
              <td class="wid-30">28分钟</td>
            </tr>
            <tr>
              <td class="wid-17-5">中桌</td>
              <td class="wid-17-5">0</td>
              <td class="wid-17-5">0</td>
              <td class="wid-17-5">0%</td>
              <td class="wid-30">0分钟</td>
            </tr>
            <tr>
              <td class="wid-17-5">小桌</td>
              <td class="wid-17-5">0</td>
              <td class="wid-17-5">0</td>
              <td class="wid-17-5">0%</td>
              <td class="wid-30">0分钟</td>
            </tr>
            <tr>
              <td class="wid-17-5">特大桌</td>
              <td class="wid-17-5">0</td>
              <td class="wid-17-5">0</td>
              <td class="wid-17-5">0%</td>
              <td class="wid-30">0分钟</td>
            </tr>
            <tr>
              <td class="wid-17-5">包厢</td>
              <td class="wid-17-5">0</td>
              <td class="wid-17-5">0</td>
              <td class="wid-17-5">0%</td>
              <td class="wid-30">0分钟</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Header from '../Mast/Header'
  import myDatepicker from 'vue-datepicker'

  export default{
    name:'QueueCensus',
    data () {
    return {
        title:'排队统计',
        name:'queue',
        food:true,
        active:{
            koubei:true,
            meituan:false,
            nuomi:false,
        },
        checkCouponList:{
          data:[]
        },
        statistics:{},
        startTime: {
          time: ''
        },
        multiOption: {
          type: 'day',
          week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          format:"YYYY-MM-DD",
          inputStyle: {
            'display': 'inline-block',
            'height':'35px',
            'line-height': '35px',
            'width':'141px',
            'font-size': '16px',
            'border': 'none',
            'color': '#5F5F5F',
            'margin':'0',
            'text-align':'center'
          },
          color: {        // 字体颜色
            header: '#ff5534',  // 头部
            headerText: '#fff', // 头部文案
          },
          buttons: {        // button 文案
            ok: '确定',
            cancel: '取消'
          },
          placeholder: '请选时间',
          dismissible: true
        },
        limit: [{
          type: 'weekday',
          available: [1, 2, 3, 4, 5,6,0]
        },
        {
          type: 'fromto',
          from: '2016-02-01',
          to: '2050-02-20'
        }]
      }
    },
    methods:{
      topath: function (params) {
        if(params['name'] == '/checkCouponInfo'){
          this.$store.commit('couponInfo',params['item']);
        }

        this.$router.push({'path':params['name']});
      },
      getYesterday: function (time) {
        let yesterday = new Date(time);
        yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000);
        let reduce = '-';

        this.startTime.time = yesterday.getFullYear() + reduce + this.addZero(yesterday.getMonth() + 1) + reduce + this.addZero(yesterday.getDate());
      },
      getTomorrow: function (time) {
        let tomorrow = new Date(time);
        let nowDate = this.getNowFormatDate();
        tomorrow.setTime(tomorrow.getTime() + 24 * 60 * 60 * 1000);
        let reduce = '-';
        let year = tomorrow.getFullYear() + reduce + this.addZero(tomorrow.getMonth() + 1) + reduce + this.addZero(tomorrow.getDate());

        let t_timestamp = Math.round(new Date(year) / 1000);
        let n_timestamp = Math.round(new Date(nowDate) / 1000);

        if(t_timestamp > n_timestamp){
          return mui.toast('不能超过今天');
        }else{
          this.startTime.time = year;
        }
      },
      getNowFormatDate: function () {
        let date = new Date();
        let reduce = "-";
        let currentdate = date.getFullYear() + reduce + this.addZero(date.getMonth() + 1) + reduce + this.addZero(date.getDate());

        return currentdate;
      },
      addZero: function (time) {
        if (time >= 1 && time <= 9) {
            time = "0" + time;
        }
        return time;
      },
      countvouchertype: function (params) {
        // 设置选项卡
        for(let key in this.active){
          if(params['active'] == key){
            this.active[key] = true;
          }else{
            this.active[key] = false;
          }
        }
        this.$store.state.mastloadding = true;
        this.API.countvouchertype(params).then((response) => {
            console.dir(response);
            this.checkCouponList = response;
            this.$store.state.mastloadding = false;
        }, (response) => {
            this.$store.state.mastloadding = false;
            mui.toast('网络错误');
        });
      },
      countvoucherinfo: function (params) {
        this.API.countvoucherinfo(params).then((response) => {
            console.dir(response);
            this.statistics = response;
        }, (response) => {
            mui.toast('网络错误');
        });
      }
    },
    components:{
      Header,
      myDatepicker
    },
    mounted(){
      this.startTime.time = this.getNowFormatDate();
    },
    watch: {
      startTime: {
  　　　　handler(newValue, oldValue) {
  　　　　　　console.log(newValue);
              let newTimestamp = Math.round(new Date(newValue .time) / 1000);
              let oldTimestamp = Math.round(new Date(this.getNowFormatDate()) / 1000);
              if(newTimestamp > oldTimestamp){
                this.startTime.time = this.getNowFormatDate();
                mui.toast('不能超过今天');
              }else{
                let active = '';
                for(let key in this.active){
                  if(this.active[key]){
                    active = key
                  }
                }
                this.countvoucherinfo({
                  use_date:this.startTime.time
                });
                this.countvouchertype({
                  use_date:this.startTime.time,
                  ticket_type:1,
                  active:active
                });
              }
              
  　　　　},
          deep:true
  　　}
    }
  }
</script>
<style type="text/css" scoped>
  .menu-container{
    background:#eee;
  }
  .box{
    width:100%;
    margin-top:44px;
    /*background:#fff;*/
  }
  .timeselectbox{
    height:60px;
    background:#edeeef;
  }
  .timeselectbox li{
    list-style: none;
    float:left;
    height:35px;
    line-height:35px;
    margin-top:13px;
    color:black;
  }
  .daybefore{
    width:28%;
    padding-left:23px;
    font-size:13.5px;
    background: url("../../assets/left-arrow.png") no-repeat 10px center;
  }
  .dateselect{
    border-radius: 3px;
    background:#fff;
    width:44%;
    text-align:center;
  }
  .nextday{
    text-align: right;
    width:28%;
    padding-right:23px;
    font-size:13.5px;
    background: url("../../assets/right-arrow.png") no-repeat 87px center;
  }

  .count-statistics{
      background: #ff5534;
  }
  .count-statistics:after{
      content: '';
      display: block;
      width: 0;
      height: 0;
      clear: both;
      visibility: hidden;
  }
  .count-statistics .takenum-count-border,.count-statistics .repast-count-border{
      width: 49.8%;
      height: 45px;
      float: left;
      margin: 20px 0;
  }
  .count-statistics .takenum-count-border{
      border-right: 1px solid #ccc;
  }
  .takenum-count-border .takenum-count,.repast-count-border .repast-count{
      font-size: 18px;
      color: #fff;
      font-weight: bold;
      text-align: center;
      height: 28px;
      line-height: 28px;
  }
  .takenum-count-border .takenum-count-title,.repast-count-border .repast-count-title{
      font-size: 12px;
      color: #fff;
      text-align: center;
      height: 18px;
      line-height: 18px;
  }
  .table-statistics{
      width: 100%;
      margin-top: 10px;
  }
  .table-statistics table{
      width: 100%;
      background: #fff;
      border-collapse: collapse;
  }
  .table-statistics table thead tr{
      height: 44px;
      border-bottom: 1px solid #ccc;
  }
  .table-statistics table tbody tr{
      height: 50px;
      line-height: 50px;
  }
  .table-statistics table tbody tr td{
      font-size: 12px;
      text-align: center;
      color: #666;
  }
  .table-statistics .wid-17-5{
      width: 17.5%;
  }
  .table-statistics .wid-30{
      width: 30%;
  }
</style>


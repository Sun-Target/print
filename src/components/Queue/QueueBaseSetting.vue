<template>
  <div class="menu-container" ref="menuContainer">
    <Header :title="title" :food="food" :name="name" :flag="flag"></Header>
    <!-- 这个是内容 -->
    <div class="contents">
      <div class="setting-list">
        <div class="setting-list-content">
          <h3 class="setting-list-title">离线模式</h3>
          <p class="setting-list-text">在网络不好的情况下，此开关打开时，可切换为离线模式，离线模式不可自助取号</p>
        </div>
        <span class="setting-list-next">
          <div class="set_default">
              <label>
                <input class="mui-switch-btn mui-switch-animbg-btn" type="checkbox">
              </label>
          </div>
        </span>
      </div>
      <div class="setting-list">
        <div class="setting-list-content">
          <h3 class="setting-list-title">设置排队号码长度</h3>
          <p class="setting-list-text">设置排队号码数字编码长度，如排队号码A001，编码长度为3位，默认不补0</p>
        </div>
        <span class="setting-list-next">
          <span>默认</span>
        </span>
      </div>
      <div class="setting-list">
        <div class="setting-list-content">
          <h3 class="setting-list-title">展示排队预测时间</h3>
          <p class="setting-list-text">展示每个排队单预计排队时间</p>
        </div>
        <span class="setting-list-next">
          <div class="set_default">
              <label>
                <input class="mui-switch-btn mui-switch-animbg-btn" type="checkbox">
              </label>
          </div>
        </span>
      </div>
      <div class="setting-list">
        <div class="setting-list-content">
          <h3 class="setting-list-title">排队容量限制</h3>
          <p class="setting-list-text">此开关打开时，可设置排队队列具体容量，超出容量桌数，该类型不可取号</p>
        </div>
        <span class="setting-list-next">
          <div class="set_default">
              <label>
                <input class="mui-switch-btn mui-switch-animbg-btn" type="checkbox">
              </label>
          </div>
        </span>
      </div>
      <div class="table-type">
        <div class="table-type-list">
          <label class="table-type-label" for="">小桌(1-2人)</label>
          <input class="table-type-input" type="text" placeholder="选填">
        </div>
        <div class="table-type-list">
          <label class="table-type-label" for="">小桌(1-2人)</label>
          <input class="table-type-input" type="text" placeholder="选填">
        </div>
        <div class="table-type-list">
          <label class="table-type-label" for="">小桌(1-2人)</label>
          <input class="table-type-input" type="text" placeholder="选填">
        </div>
        <div class="table-type-list">
          <label class="table-type-label" for="">小桌(1-2人)</label>
          <input class="table-type-input" type="text" placeholder="选填">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../Mast/Header'

export default {
  name: 'QueueBaseSetting',
  data () {
    return {
      title: '排号基础设置',
      food:true,
      flag:false,
      name:'queue',
    }
  },
  methods: {
    topath: function (name) {
      this.$router.push({path:name});
    }
  },
  components: {
    Header
  },
  computed: {

  },
  mounted: function () {

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
  .setting-list{
    height: auto;
    padding: 10px 10px;
    background: #fff;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
  }
  .setting-list .setting-list-content{
    padding: 0px 70px 0px 0px;
  }
  .setting-list-content .setting-list-title{
    height: 25px;
    line-height: 25px;
    color: #333;
  }
  .setting-list-content .setting-list-text{
    font-size: 12px;
    color: #999;
  }
  .setting-list .setting-list-next{
    position: absolute;
    /*background: url("../../assets/right-arrow.png") no-repeat right center;*/
    top: 20px;
    right: 10px;
    width: 70px;
    height: 66px;
  }
  .setting-list:nth-child(2) .setting-list-next{
    text-align: right;
    background: url("../../assets/right-arrow.png") no-repeat right center;
    top: 10px;
  }
  .setting-list:nth-child(2) .setting-list-next span{
    display: inline-block;
    padding-right: 15px;
    height: 66px;
    line-height: 66px;
  }
  .table-type{
    height: auto;
    background: #fff;
  }
  .table-type .table-type-list{
    width: 100%;
    padding: 0px 10px 0px 20px;
    border-bottom: 1px solid #e7e7e7;
    position: relative;
  }
  .table-type .table-type-list:before{
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #ff5436;
    position: absolute;
    top: 23px;
    left: 10px;
  }
  .table-type .table-type-list:after{
    content: "";
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
    clear: both;
  }
  .table-type-list .table-type-label,.table-type-list .table-type-input{
    float: left;
  }
  .table-type-list .table-type-label{
    width: 30%;
    height: 50px;
    line-height: 50px;
    text-align: left;
  }
  .table-type-list .table-type-input{
    width: 70%;
    border: none;
    height: 50px;
    line-height: 50px;
    text-align: right;
    margin: 0px;
    padding: 0px;
  }
</style>
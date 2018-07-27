<template>
  <div class="menu-container" ref="menuContainer">
    <Header :title="title" :food="food" :name="name" :flag="flag"></Header>
    <!-- 这个是内容 -->
    <div class="contents">
      <div class="setting-list">
        <div class="setting-list-content">
          <h3 class="setting-list-title">桌型设置</h3>
          <p class="setting-list-text">设置桌台类型名称和容纳人数</p>
        </div>
        <span class="setting-list-next"></span>
      </div>
      <div class="setting-list">
        <div class="setting-list-content">
          <h3 class="setting-list-title">排队单设置</h3>
          <p class="setting-list-text">选择排队单样式及排队单备注</p>
        </div>
        <span class="setting-list-next"></span>
      </div>
      <div class="setting-list">
        <div class="setting-list-content">
          <h3 class="setting-list-title">打印机设置</h3>
          <p class="setting-list-text">连接打印机设置</p>
        </div>
        <span class="setting-list-next"></span>
      </div>
      <div class="setting-list">
        <div class="setting-list-content">
          <h3 class="setting-list-title">排队基础设置</h3>
          <p class="setting-list-text">设置排队、叫号等基础功能</p>
        </div>
        <span class="setting-list-next"></span>
      </div>
      <div class="setting-list">
        <div class="setting-list-content">
          <h3 class="setting-list-title">自定义语音播报设置</h3>
          <p class="setting-list-text">设置叫号和广播语音</p>
        </div>
        <span class="setting-list-next"></span>
      </div>
      <div class="setting-list">
        <div class="setting-list-content">
          <h3 class="setting-list-title">客显展示设置</h3>
          <p class="setting-list-text">设置叫号和广播语音</p>
        </div>
        <span class="setting-list-next"></span>
      </div>
      <div class="setting-list">
        <div class="setting-list-content">
          <h3 class="setting-list-title">图片广告</h3>
          <p class="setting-list-text">上传/删除图片广告</p>
        </div>
        <span class="setting-list-next"></span>
      </div>
      <div class="setting-list">
        <div class="setting-list-content">
          <h3 class="setting-list-title">文字广告</h3>
          <p class="setting-list-text">设置客显底部滚动文字</p>
        </div>
        <span class="setting-list-next"></span>
      </div>
      <div class="setting-list">
        <div class="setting-list-content">
          <h3 class="setting-list-title">视频广告</h3>
          <p class="setting-list-text">上传/删除视频广告</p>
        </div>
        <span class="setting-list-next"></span>
      </div>
      <div class="setting-list">
        <div class="setting-list-content">
          <h3 class="setting-list-title">排队二维码</h3>
          <p class="setting-list-text">顾客通过扫描二维码自助取号</p>
        </div>
        <span class="setting-list-next"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../Mast/Header'

export default {
  name: 'QueueSetting',
  data () {
    return {
      title: '排号设置',
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
    printInfo: function () {
      return this.$store.state.printInfo;
    }
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
    padding: 0px 25px;
  }
  .setting-list:nth-child(1) .setting-list-content{
    background: url("../../assets/queue_table.png") no-repeat left center;
  }
  .setting-list:nth-child(2) .setting-list-content{
    background: url("../../assets/queue_setting.png") no-repeat left center;
  }
  .setting-list:nth-child(3) .setting-list-content{
    background: url("../../assets/queue_print.png") no-repeat left center;
  }
  .setting-list:nth-child(4) .setting-list-content{
    background: url("../../assets/queue_print.png") no-repeat left center;
  }
  .setting-list:nth-child(5) .setting-list-content{
    background: url("../../assets/queue_voice.png") no-repeat left center;
  }
  .setting-list:nth-child(6) .setting-list-content{
    background: url("../../assets/queue_screen.png") no-repeat left center;
  }
  .setting-list:last-child .setting-list-content{
    background: url("../../assets/queue_code.png") no-repeat left center;
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
    background: url("../../assets/right-arrow.png") no-repeat right center;
    top: 0px;
    right: 10px;
    width: 25px;
    height: 66px;
  }
</style>
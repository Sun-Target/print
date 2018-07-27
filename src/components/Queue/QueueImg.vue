<template>
  <div class="menu-container" ref="menuContainer">
    <Header :title="title" :food="food" :name="name" :flag="flag"></Header>
    <!-- 这个是内容 -->
    <div class="contents">
      <div class="update-tooltip">
        <span>说明：</span>
        <span>1、最佳分辨率：1920*1080</span>
        <span>2、单张图片大小在5M以内</span>
        <span>3、最多可上传15张</span>
      </div>
      <div class="update-content">
        <div class="update-logo" :class="imgdisplay ? 'update-logo-active' : ''">
          <span class="close-logo" v-if="!imgdisplay"></span>
          <div class="update-logo-tooltip" v-if="imgdisplay"></div>
          <img class="logo-img" :src="image" ref="logoImg" alt="" v-if="!imgdisplay">
          <input class="updateImg" ref="inputImg" type="file" name="updateimg" id="updateImg" @change="updateImg($event)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../Mast/Header'

export default {
  name: 'QueueImg',
  data () {
    return {
      title: '图片广告',
      food:true,
      flag:false,
      name:'queue',
      imgdisplay:true,
      image:'',
      formInfo:{
        name:'',
        lst_price:'',
        standard_price:'',
        qty_available:'',
        virtual_available:'',
        barcode:'',
        pos_categ_id: '',
        image_medium:'',
        type: "",
        volume:'',
        weight:''
      }
    }
  },
  methods: {
    topath: function (name) {
      this.$router.push({path:name});
    },
    changeMastDisplay: function (name) {
      this.$store.commit('mastdisplay',name);
    },
    updateImg: function (e){
      this.$root.updateImg(e,this,this.formInfo,this.$refs.logoImg);            
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
  .update-tooltip{
    padding: 15px;
    background: #fff;
  }
  .update-tooltip span{
    display: block;
    width: 100%;
    color: #666;
    font-size: 14px;
    height: 25px;
    line-height: 25px;
  }
  /*图片上传*/
  .update-content{
    position: relative;
    background: #fff;
    height: auto;
    /*padding-bottom: 15px;*/
    padding: 0px 15px 15px 15px;
  }
  .update-logo{
    width: 100%;
    height: 200px;    
    position: relative;
    border-radius: 5px;
  }
  .close-logo{
    position: absolute;
    top: -10px;
    right: -10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: red url("../../assets/queue_close.png") no-repeat center center;
  }
  .update-logo-active{
    border: 1px dashed #e7e7e7;
  }
  .update-logo img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .update-logo .update-logo-tooltip{
    color: #2c3e50;
    font-size: 14px;
    width: 60px;
    height: 40px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -30px;
    margin-top: -20px;
    line-height: 20px;
  }
  .update-logo .update-logo-tooltip{
    background: url("../../assets/queue_addimg.png") no-repeat center center;
  }
  .update-logo .updateImg{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    left: 0;
    top: 0;
  }
</style>
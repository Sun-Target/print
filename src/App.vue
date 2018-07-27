<template>

  <div id="app">
  	<div class="router-parent">
        <transition :name="transitionName" mode="out-in">
          <keep-alive include="QueueBluetooth">
            <router-view class="home-router"></router-view>
          </keep-alive>
        </transition>
    </div>
    <mast v-if="mastloadding">
      <div class="mast-content" :class="{'mast-content-loadding':mastloadding}">

      </div>
      <div class="mast" :class="{'mast-content-loadding-opacity':mastloadding}" ></div>
    </mast>
  </div>

</template>

<script>
import Mast from './components/Mast/Mast'

export default {
  name: 'app',
  data () {
    return {
        transitionName: 'slide-right'
    }
  },
  components:{
    Mast
  },
  computed: {
    mastloadding: function () {
      return this.$store.state.mastloadding;
    },
  }

}
</script>

<style>
body,*{
  margin:0;padding:0;
  cursor:position;
}
html,body,.content,.order-content{
  height:100%;
  width: 100%;
}
body,html{
  background: #fff;
}
input{
  font-size: 14px!important;
}
.clearfix:after { content: "."; display: block; clear: both; visibility: hidden; line-height: 0; height: 0; }
.clearfix { display: inline-block; }
html[xmlns] .clearfix { display: block; }
* html .clearfix { height: 1%; }

/*.content{
  background:url('./assets/pos_background.jpg');
}*/
#app {
  font-family: 'Microsoft YaHei'!important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #666;
  height: 100%;
}
.content{
  border:1px solid #ccc;
  padding:2%;
}
.home-router {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all .2s ease;
}
.router-parent{
  position: relative;
  width: 100%;
  height: 100%;
}
.menu-container,.confirm-content{
    position: relative;
    width: 100%;
    height: 100%;
    /*padding-bottom: 65px;*/
    overflow: scroll;
}
.confirm-content:before{
  content: "";
  display: block;
  width: 100%;
  height: 44px;
  visibility: hidden;
}
.slide-left-enter,
 .slide-right-leave-active {
     opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
     opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
}

 .slide-left1-enter,
 .slide-right1-leave-active {
     opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-left1-leave-active,
.slide-right1-enter {
     opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100% 0);
}


/*滑动按钮 孙日发*/
.address-form {
    position: relative;
    display: block;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #e7e7e7;
    background-color: #ffffff;
}
.address-form .form-item {
    position: relative;
    display: block;
    width: 100%;
    min-height: 44px;
    overflow: hidden;
    box-sizing: border-box;
    /*border-bottom:1px  solid #e7e7e7;*/
}
.address-form .form-item .item-title {
    float: left;
    display: block;
    width: 25%;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: normal;
    text-align: left;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #2c3e50;
    padding-left: 15px;
}
.set_default {
    position: absolute;
    width: 52px;
    right: 3%;
    top: 9px;
}
.mui-switch-btn {
      width: 52px;
      height: 31px;
      position: relative;
      border: 1px solid #dfdfdf;
      background-color: #fdfdfd;
      box-shadow: #dfdfdf 0 0 0 0 inset;
      border-radius: 20px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      background-clip: content-box;
      display: inline-block;
      -webkit-appearance: none;
      user-select: none;
      outline: none;
    }
  .mui-switch-btn:before {
    content: '';
    width: 29px;
    height: 29px;
    position: absolute;
    top: 0px;
    left: 0;
    border-radius: 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .mui-switch-btn:checked {
    border-color: #23ac38;
    box-shadow: #23ac38 0 0 0 16px inset;
    background-color: #23ac38;
  }
  .mui-switch-btn:checked:before {
    left: 21px;
  }
  .mui-switch-btn.mui-switch-animbg-btn {
    transition: background-color ease 0.4s;
  }
  .mui-switch-btn.mui-switch-animbg-btn:before {
    transition: left 0.3s;
  }
  .mui-switch-btn.mui-switch-animbg-btn:checked {
    box-shadow: #dfdfdf 0 0 0 0 inset;
    background-color: #23ac38;
    transition: border-color 0.4s, background-color ease 0.4s;
  }
  .mui-switch-btn.mui-switch-animbg-btn:checked:before {
    transition: left 0.3s;
  }
  .mui-switch.mui-switch-anim {
    transition: border cubic-bezier(0, 0, 0, 1) 0.4s, box-shadow cubic-bezier(0, 0, 0, 1) 0.4s;
  }
  .mui-switch-btn.mui-switch-anim:before {
    transition: left 0.3s;
  }
  .mui-switch-btn.mui-switch-anim:checked {
    box-shadow: #23ac38 0 0 0 16px inset;
    background-color: #23ac38;
    transition: border ease 0.4s, box-shadow ease 0.4s, background-color ease 1.2s;
  }
  .mui-switch-btn.mui-switch-anim:checked:before {
    transition: left 0.3s;
  }
</style>

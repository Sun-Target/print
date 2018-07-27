<template>
	<div class="Passenger-list">
    <a class="home-username" v-if="home">欢迎你！{{localStorage.username}}</a>
		<a class="Passenger-list-return" @click="go(name)" v-if="!flag" :class="queue ? 'Passenger-list-navbar' : ''"></a>

    <div class="find" v-if="print">
      <span>打印</span><img  :src="require('../../assets/print.png')" alt="" />
    </div>

		<h3 class="Passenger-list-title">{{title}}</h3>

		<router-link :to="food ? '/Ordersearch' : '/Search'" class="Passenger-list-search" v-if="xian"></router-link>

    <!-- <router-link  to="/Findsingle" class="find" v-if="titleright"><span>找单</span><img src="../../assets/dingdan.png" alt="" /></router-link> -->

    <router-link  to="/Settings" class="find" v-if="set">
      <span></span><img src="../../assets/set.png" alt="" />
    </router-link>
    <a class="home-exit" v-if="exit" @click="homeExit"></a>
    <router-link  to="/msgcenter" class="home-message" :class="localStorage.isMessage == 1 ? 'home-message-active' : ''" v-if="message"></router-link>
    <a class="home-clear-zero" v-if="clearZero" @click="queuereset">清零</a>
    <router-link class="add-takeout-order" v-if="addTakeout" to="/addtakeoutorder">新增</router-link>
    <a class="add-takeout-order" v-if="courier" @click.stop="changeMastDisplay('mastcourier')">新增</a>
	</div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {

    }
  },
  props:['title','xian','name','food','flag','home','print','set','exit','message','clearZero','addTakeout','courier','navbar','queue'],
  methods: {
  	go : function(name){
      if(this.queue){
        return this.changeMastDisplay('mastqueueslider');
      }
  		if(name == 'back'){
  			window.history.go(-1);
  		}else{
  			this.$router.push({
          path:name,
          query:{
            name:this.$route.query.name
          }
        });
  		}
  	},
    homeExit: function () {
      this.$root.removeLocalStorage(['token']);
      this.$router.push({path:'Login'});
    },
    queuereset: function () {
      this.API.queuereset().then((response) => {
        if(response.hasOwnProperty('msg')){
          mui.toast(response.msg);
        }
      }, (response) => {
        mui.toast('网络错误');
      });
    },
    changeMastDisplay: function (name) {
      this.$store.commit('mastdisplay',name);
    }
  },
  computed: {
    
  }

}
</script>
<style scoped>
*{
	margin: 0;
	padding: 0;
	font-size: 14px;
	font-family: "微软雅黑";
}
body,html{
	width: 100%;
	height: 100%;
}
/*头部*/
.Passenger-list{
	height: 44px;
	width: 100%;
	background: #ff5534;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10000;
}
.col-f534{
    background:#ff5534!important;
}
.Passenger-list-return{
	background: url(../../assets/ricon.png) no-repeat 10px center;
	position:absolute;
	/*left: 10px;*/
	left: 0;
	height: 44px;
	width: 44px;
	display: block;
}
.Passenger-list-navbar{
  background: url(../../assets/navbar.png) no-repeat 10px center;
}
.Passenger-list-title{
	font-size: 16px;
	color: #fff;
	text-align: center;
	line-height:44px;
	font-weight: normal;
}
 .Passenger-list-search{
  background: url(../../assets/seart.png) no-repeat 14px center;
  position:absolute;
  /*right: 10px;*/
  right: 0;
  top: 0;
  height: 44px;
  width: 44px;
  display: block;
}
.find{
    position: absolute;
    right: 10px;
    top: 10px;
    color:#fff;
}

.find img{
    vertical-align: middle;
    margin-left: 5px;
}
/*home*/
.home-username{
  position: absolute;
  left: 0;
  top: 0;
  padding: 0px 0px 0px 8px;
  width: 100px;
  height: 44px;
  line-height: 44px;
  text-decoration: none;
  font-size: 13px;
  color: #fff;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.home-exit{
  width: 44px;
  height: 44px;
  position: absolute;
  right: 0px;
  top: 0px;
  text-align: center;
  line-height: 44px;
  color: #fff;
  font-size: 14px;
  background: url("../../assets/home_return.png") no-repeat center center;
}
.home-message{
  width: 44px;
  height: 44px;
  position: absolute;
  right: 44px;
  top: 0px;
  text-align: center;
  line-height: 44px;
  color: #fff;
  font-size: 14px;
  background: url("../../assets/no_message.png") no-repeat center center;
}
.home-message-active{
  background: url("../../assets/has_message.png") no-repeat center center;
}
.home-clear-zero{
  width: 55px;
  height: 44px;
  position: absolute;
  right: 0px;
  top: 0px;
  text-indent: 16px;
  line-height: 44px;
  color: #fff;
  font-size: 14px;
  background: url("../../assets/reset.png") no-repeat left center;
}
.add-takeout-order{
  width: 55px;
  height: 44px;
  position: absolute;
  right: 0px;
  top: 0px;
  text-indent: 16px;
  line-height: 44px;
  color: #fff;
  font-size: 14px;
  background: url("../../assets/add-takeout.png") no-repeat left center;
}
/*home*/
</style>

<template>
	<div class="menu-container">
		<div class="login-logo">
			<span class="login-logo-content">排队取号</span>
		</div>
		<div class="login-content">
			<div class="login-inp-parent">
				<span></span>
				<input type="text" placeholder="请输入员工账号" v-model="username">
			</div>
			<div class="login-inp-parent">
				<span></span>
				<input type="password" placeholder="请输入密码" v-model="password">
			</div>
		</div>
		<!-- <div class="login-select">
			<div class="login-select-list">
				<span class="save-password"></span>
				<span class="save-password-text" @click="setSavePassword">保存密码</span>
			</div>
			<div class="login-select-list">
				<router-link class="forget-password" :to="{path:'forgetpassword'}">忘记密码</router-link>
			</div>
		</div> -->
		<div class="login-btn" @click="toLogin">登录</div>
	</div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      savePassword:false
    }
  },
  methods: {
  	toLogin: function () {
  		if(this.username === '' || this.password === ''){
  			mui.toast('用户名或密码不能为空');
  			return false;
  		}
  		let params = {
  			username:this.username,
  			password:this.password,
  			db:this.$store.state.GLOBAL_CONFIG.db,
  			useragent:'queueapp'
  		};

  		this.$store.state.mastloadding = true;

  		this.API.tologin(params).then((response) => {
	        // 响应成功回调
	        if(response){
	        	this.$root.setLocalStorage({
	        		token:response['token'],
	        		uid: response['uid'],
	        		time: response['time'],
	        		datetime:response['datetime'],
	        		username:this.username
	        	});
	        	// 获取公司信息
	        	this.getcompanyinfo();
	        }else{
	        	this.$store.state.mastloadding = false;
	        }

	    }, (response) => {
	        // 响应错误回调
	        this.$store.state.mastloadding = false;
	        mui.toast('网络错误');
	    });
  	},
  	getcompanyinfo: function () {
  		this.$store.state.mastloadding = false;
  		this.API.getuserinfo({
  			sign:true
  		}).then((response) => {
  			console.dir(response);
	        this.$root.setLocalStorage({
	    		companyid:response[0]['company_id'][0],
	    		company_name:response[0]['company_id'][1]
	    	});
	    	this.$store.state.userinfo = response[0];
	    	this.$router.push({'path':'/queue'});
	    }, (response) => {
	        mui.toast('网络错误');
	    });
  	}
  },
  created: function () {

  }
}
</script>
<style scoped>
	input:-webkit-autofill {
	    -webkit-box-shadow: 0 0 0px 50px white inset !important;
	}
	.mui-input-group:before{
		top: -1px;
	}
	.menu-container{
		background: #eeeeee!important;
	}
	.login-logo{
		text-align: center;
		width: 100%;
		height: 220px;
		background: #eeeeee;
	}
	.login-logo .login-logo-content{
		width: 120px;
		height: 120px;
		line-height: 180px;
		display: inline-block;
		margin-top: 60px;
		background: url("../../assets/queue_logo.png") no-repeat top center;
		font-size: 18px;
		color: #ff5534;
	}
	.login-content{
		width: 100%;
		height: 120px;
		background: #fff;
	}
	.login-content .login-inp-parent{
		margin: 0px 10px 0px 10px;
		padding: 15px 0px 15px 0px;
		height: 60px;
		position: relative;
	}
	.login-content .login-inp-parent:nth-child(1){
		border-bottom: 1px solid #e7e7e7;
	}
	.login-content .login-inp-parent span{
		position: absolute;
		left: 0;
		top: 0;
		height: 60px;
		width: 40px;

	}
	.login-content .login-inp-parent:nth-child(1) span{
		background: url("../../assets/username.png") no-repeat center center;
	}
	.login-content .login-inp-parent:nth-child(2) span{
		background: url("../../assets/password.png") no-repeat center center;
	}
	.login-content .login-inp-parent input{
		border: none;
		padding: 0;
		margin: 0;
		height: 30px;
		font-size: 15px;
		color: #999;
		padding-left: 40px;
	}
	.login-btn{
		margin: 40px 10px 0px 10px;
		height: 50px;
		line-height: 50px;
		color: #fff;
		font-size: 16px;
		background: #ff5534;
		border-radius: 5px;
		text-align: center;
	}
	.login-select{
		width: 100%;
		height: 50px;
		line-height: 50px;
		padding: 0px 50px;
	}
	.login-select .login-select-list{
		width: 50%;
		height: 50px;
		line-height: 50px;
		float: left;
		font-size: 14px;
	}
	.login-select .login-select-list:nth-child(2){
		text-align: right;
		text-decoration: underline;
	}
	.login-select:after,.login-select .login-select-list:after{
		content: "";
		display: block;
		width: 0;
		height: 0;
		visibility: hidden;
		clear: both;
	}
	.login-select-list .save-password,.login-select-list .save-password-text{
		float: left;
	}
	.login-select-list .save-password{
		border: 1px solid #35acff;
		height: 18px;
		width: 18px;
		margin-top: 15px;
	}
	.login-select-list .save-password-text{
		color: #35acff;
		padding-left: 5px;
	}
	.login-select-list .forget-password{
		color: #35acff;
	}
</style>
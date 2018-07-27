<template>
	<div class="com-mast">
		<slot></slot>
	</div>
</template>

<script>
export default {
  name: 'Mast',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
<style scoped>
	.com-mast{
		/*position: relative;
		left: 0;
		top: 0;*/
		width: 100%;
		/*height: 100%;*/
		/*height: 100%;*/
		/*opacity: 0.3;
		background: rgba(0, 0, 0.3);
		z-index:1002;*/
	}
	.mast{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		opacity: 0.3;
		/*background: rgba(0, 0, 0.3);*/
		background: #000;
		z-index:1002;
	}
	.network{
		/*opacity: 0.3;*/
		/*background: #000;*/
		background: rgba(0, 0, 0, 0.3);
		opacity: 1;
	}
	.mast-content{
		position: absolute;
		width: 70px;
		height: 70px;
		left: 50%;
		margin-left: -35px;
		margin-top: -35px;
		background: url("../../assets/load.gif") no-repeat center;
		background-size: 100%;
		opacity: 0.4;
		z-index: 1003;
	}
	.mast-index{
		z-index: 1004;
	}
	.mast-content-network{
		background: #fff;
		width: 90%;
		height: 256px;
		margin-left: -45%;
		margin-top: -128px;
		border-radius: 5px;
		padding: 0 15px;
		box-shadow: 0 0 10px #666;
		opacity: 1;
		top: 50%;
		z-index: 1005;
	}
	/*正在加载*/
	.mast-content-loadding{
		top: 50%;
	}
	.mast-content-loadding-opacity{
		opacity: 0;
	}
	/*正在加载*/
	/*购物车*/
	.mast-cart{
		background: #fff;
		width: 100%;
		height: 250px;
		transition: height 0.5s;
		-webkit-transition: height 0.5s;
		/*top: 0;*/
		margin-left: 0px;
		margin-top: 0px;
		left: 0;
		bottom: 50px;
		box-shadow: 0 0 10px #666;
		opacity: 1;
	}
	.mast-cart-height{
		background: #fff;
		height: 0px;
		width: 100%;
		margin-left: 0px;
		margin-top: 0px;
		left: 0;
		bottom: 50px;
		transition: height 0.8s ;
		-webkit-transition: height 0.8s ;
		opacity: 1;
		overflow: hidden;
	}
	.mast-cart-bottom{
		bottom: 50px!important;
	}
	.mast-cart-title{
		height: 50px;
		line-height: 50px;
		background: #e7e7e7;
		padding: 0px 15px;
	}
	.mast-cart-title:after{
		content: "";
		display: block;
		width: 0;
		height: 0;
		visibility: hidden;
		clear: both;
	}
	.mast-cart-title .mast-cart-spantitle,.mast-cart-title .mast-cart-delete{
		font-size: 15px;
		width: 50%;
	}
	.mast-cart-title .mast-cart-spantitle{
		float: left;
	}
	.mast-cart-title .mast-cart-delete{
		float: right;
		text-align: right;
		width: 95px;
		background: url("../../assets/cartdelete.png") no-repeat 0px center;
	}
	.mast-cart-content{
		margin: 0 10px;
		overflow: scroll;
		height: 200px;
	}



	.confirm-product-list{
	    height: 50px;
	    width: 100%;
	    position: relative;
	    border-bottom: 1px solid #e7e7e7;
	}
  .confirm-product-list .confirm-product-title{
    padding: 0;
    color: #333;
    font-size: 15px;
    height: 50px;
    line-height: 50px;
    margin: 0;
    font-weight: 600;
    width: 33.3%;
    overflow: hidden;
  }
  .confirm-product-list .confirm-product-price{
    display: block;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: red;
    position: absolute;
    width: 33.3%;
    left: 33.3%;
    top: 0;
    text-align: center;
  }
  .confirm-product-container .confirm-shopping-num{
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-size: 16px;
    color: #666;
  }
  /*内容区*/

  /*按钮*/

.menu-product-handle{
  height: 25px;
  /*width: 100%;*/
  position: absolute;
  right: 0;
  top: 12px;
  border-radius: 50%;
  background: #fff;
}
.menu-product-handle .menu-product-btn-container{
  height: 25px;
}
.menu-product-btn-container .menu-product-reduce,.menu-product-btn-container .menu-product-add{
  float: right;
  width: 22px;
  height: 22px;
  margin-top: 1px;
  background-size: 100%!important;
  color: #ff5534;
  font-size: 18px;
  /*border-radius: 50%;*/
  /*background-size: cover;*/
}
.menu-product-pruductnum{
  float: right;
  padding: 0px 10px;
  height: 25px;
  line-height: 25px;
}
/*.menu-product-btn-container .menu-product-reduce{
  background: url("../../assets/typebtn1a.png") no-repeat center center;
}
.menu-product-btn-container .menu-product-add-active{
  background: url("../../assets/typebtn3a.png") no-repeat center center;
}
.menu-product-btn-container .menu-product-add{
  background: url("../../assets/typebtn2a.png") no-repeat center center;
  background: url("../../assets/typebtn3a.png") no-repeat center center;
}*/
.menu-product-handle .menu-product-out{
  color: #f34b3f !important;
  font-size: 16px;
}
.menu-product-handle .menu-product-specifications{
  width: 60px;
  height: 25px;
  line-height: 25px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  border-radius: 3px;
  background: #FF6600;
}
  /*按钮*/
	/*购物车*/
	/*会员*/
	.vip-title{
		height: 60px;
		line-height: 60px;
		text-align: center;
		font-size: 16px;
		color: #333;
		font-weight: bold;
	}
	.order-invoice-header{
	  height: 50px;
	}
	.order-invoice-textarea{
	  background: #eee;
	  color: #999;
	  font-size: 14px;
	  height: 50px;
	  border: none;
	  margin: 0;
	  line-height: 50px;
	  padding: 0 0 0 10px;
	  overflow: scroll;
	}
	.vip-confirm{
		background: #ff0000;
		text-align: center;
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		color: #fff;
		margin-top: 20px;
		border-radius: 5px;
	}
	.vip-notice{
		text-align: center;
		height: 50px;
		line-height: 50px;
		font-size: 15px;
		color: #333;
		margin-top: 5px;
	}
	/*会员*/
	/*选择就餐人数*/
	.mannumber-title{
		height: 40px;
		line-height: 50px;
		text-align: center;
		font-size: 14px;
		color: #333;
		font-weight: bold;
	}
	.confirm-btn-parent{
		background: #FF6600;
		border-radius: 3px;
		margin-top: 18px;
	}
	.confirm-btn-parent .confirm-btn{
		text-align: right;
		width: 80px;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		color: #fff;
		margin: 0 auto;
		background: url("../../assets/scancode_diancan.png") no-repeat left center;
		background-size: 23%;
	}
	.select-mannumber{
		height: auto;
	}
	.select-mannumber:after{
		content: "";
		display: block;
		width: 0;
		height: 0;
		visibility: hidden;
		clear: both;
	}
	.scancode-mastinput-parent{
		float: left;
		margin-top: 10px;
		width: 22%;
		margin-left: 4%;
	}
	.scancode-mastinput-parent-left{
		margin-left: 0;
	}
	.scancode-mastinput-parent .scancode-mastinput{
		width: 100%;
		height: 25px;
		border: 1px solid #e7e7e7;
		line-height: 25px;
		text-align: center;
		padding: 0;
		margin: 0;
		font-size: 14px;
		border-radius: 3px;
		color: #333;
	}
	.scancode-mastinput-parent .scancode-mastinput-active{
		background: #FF6600;
		color: #fff;
		border: none;
	}
	/*选择就餐人数*/
	/*商品详情*/
	.mast-menu-productinfo{
		background: #fff;
		/*width: 90%;*/
		width: 300px;
		height: 310px;
		margin-left: -150px;
		margin-top: -155px;
		border-radius: 5px;
		box-shadow: 0 0 10px #666;
		opacity: 1;
		top: 50%;
	}
	.mast-pruduct-img{
		width: 300px;
		height: 200px;
	}
	.mast-pruduct-img img{
		width: 100%;
		height: 100%;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
	.mast-product-info{
		padding: 0px 10px;
	}
	.mast-product-info .mast-product-title{
		margin: 0;
		height: 30px;
		line-height: 30px;
		font-weight: 600;
		font-size: 18px;
		color: #333;
		/*padding-top: 5px;*/
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.mast-product-amount{
		height: 25px;
		position: relative;
	}
	.mast-product-amount .mast-product-saleamount,.mast-product-amount .mast-product-vipamount{
		float: left;
		color: #FF4400;
	}
	.mast-product-amount .mast-product-saleamount{
		font-size: 18px;
	}
	.mast-product-amount .mast-product-vipamount{
		font-size: 12px;
		margin-left: 15px;
	}
	.mast-product-info .mast-product-desc{
		margin: 0;
		padding-bottom: 5px;
		font-weight: bold;
		color: #555;
		height: 50px;
		overflow: scroll;
	}
	.mast-product-close{
		width: 27px;
		height: 27px;
		position: absolute;
		top: 9px;
		right: 5px;
		font-size: 18px;
		background: url("../../assets/x-icon.png") no-repeat center center;
		/*background-size: 100%;*/
	}
	/*商品详情*/
	/*规格*/
	.mast-menu-specificat{
		background: #fff;
		/*width: 90%;*/
		width: 300px;
		height: 240px;
		margin-left: -150px;
		margin-top: -120px;
		border-radius: 5px;
		box-shadow: 0 0 10px #666;
		opacity: 1;
		top: 50%;
	}
	.mast-menu-specificat-height{
		background: #fff;
		/*width: 90%;*/
		width: 300px;
		height: 240px;
		margin-left: -150px;
		margin-top: -120px;
		border-radius: 5px;
		box-shadow: 0 0 10px #666;
		opacity: 1;
		top: 50%;
	}
	.mast-specificat-title{
		padding: 0px 10px;
		height: 45px;
		line-height: 45px;
		border-bottom: 1px solid #e7e7e7;
		font-size: 16px;
		text-align: center;
		overflow: hidden;
		color: #666;
		/*font-weight: 600;*/
		background: #eee;
	}
	.mast-specificat-list-scroll{
		height: 150px;
		overflow: hidden;
	}
	.mast-specificat-list{
		/*height: 210px;*/
		/*overflow: auto;*/
		-webkit-overflow-scrolling:touch;
	}
	.mast-specificat-list-height{
		/*height: 150px;*/
		/*overflow: auto;*/
		-webkit-overflow-scrolling:touch;
	}
	.mast-specificat-list .mast-specificat-product:nth-child(1){
		margin-top: 15px;
	}
	.mast-specificat-product{
		height: 40px;
		padding: 0px 10px;
		position: relative;
	}
	.mast-specificat-product:after,.mast-specificat-list:after{
		content: "";
		width: 0;
		height: 0;
		display: block;
		visibility: hidden;
		clear: both;
	}
	.mast-specificat-product .mast-specificat-btn{
		float: left;
		padding: 0px 5px;
		height: 30px;
		line-height: 30px;
		/*border: 1px solid #ff6600;*/
		/*color: #ff6600;*/
		/*border-radius: 3px;*/
		margin-top: 5px;
		font-size: 16px;
	}
	.mast-specificat-product .mast-specificat-btn:after{
		content: "";
		display: block;
		width: 0;
		height: 0;
		visibility: hidden;
		clear: both;
	}
	.mast-specificat-product .mast-specificat-taste,.mast-specificat-product .mast-specificat-price{
		float: left;
	}
	.mast-specificat-product .mast-specificat-taste{
		color: #999;
		margin-left: 5px;
	}
	.mast-specificat-product .mast-specificat-price{
		color: #000;
	}
	.mast-specificat-product .mast-specificat-price span{
		color: #ff5534;
	}
	.mast-specificat-product .menu-product-handle{
		position: absolute;
		right: 10px;
		top: 7px;
	}
	.mast-product-amount .menu-product-bigimg{
		top: 0px;
	}
	.mast-specificat-footer{
		height:45px;
		border-top: 1px solid #e7e7e7;
		line-height: 45px;
		position: relative;
	}
	.mast-specificat-footer .mast-specificat-univalent{
		width: 70%;
    	background: #666;
        float: left;
    	height: 45px;
    	color: #fff;
    	font-size: 16px;
    	padding-left: 10px;
    	border-bottom-left-radius: 5px;
	}
	.mast-specificat-footer .mast-specificat-com{
		/*width: 30%;*/
		height: 30px;
		width: 90px;
	    text-align: center;
	    font-size: 14px;
	    /*font-weight: 600;*/
	    color: #fff;
	    background: #ff5534;
	    /*float: left;*/
	    border-radius: 25px;
	    position: absolute;
	    right: 10px;
	    top: 7px;
	    line-height: 30px;
	}
	.mast-specificat-list .menu-product-flavouring{
		padding: 0px 15px 10px 15px;
		height: auto;
	}
	.menu-product-flavouring .menu-product-flavouring-title{
		height: 30px;
		line-height: 35px;
		font-size: 16px;
		font-weight: 500;
		color: #666;
	}
	.menu-product-flavouring .menu-product-flavouring-btn{
		width: 100%;
		height: auto;
	}
	.menu-product-flavouring .menu-product-flavouring-btn:after{
		content: "";
		display: block;
		width: 0;
		height: 0;
		visibility: hidden;
		clear: both;
	}
	.menu-product-flavouring-btn span{
		width: 22%;
		float: left;
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: #666;
		font-size: 14px;
		background: #eeeeee;
		border-radius: 5px;
		margin-left: 4%;
		margin-top: 10px;
		overflow: hidden;
	}
	.menu-product-flavouring-btn span.flavouring-btn-margin{
		margin-left: 0;
	}
	.menu-product-flavouring-btn span.flavouring-btn-active{
		background: #FF6600;
		color: #fff;
	}
	/*规格*/
	/*去结算*/
	.mast-menu-topay{
		background: #000;
		/*width: 90%;*/
		width: 250px;
		height: 150px;
		margin-left: -125px;
		margin-top: -75px;
		border-radius: 5px;
		box-shadow: 0 0 10px #666;
		opacity: 1;
		top: 50%;
	}
	.mast-topay-tooltip{
		height: 40px;
		line-height: 40px;
		color: #fff;
		font-size: 16px;
		text-align: center;
		margin-top: 20px;
	}
	.mast-topay-btn{
		margin: 20px 20px 0 20px;
		height: 40px;
	}
	.mast-topay-btn span{
		width: 90px;
		height: 35px;
		line-height: 35px;
		background: #FF6600;
		text-align: center;
		border-radius: 3px;
		font-size: 16px;
		color: #fff;
	}
	.mast-topay-btn .mast-topay-confirm{
		float: left;
	}
	.mast-topay-btn .mast-topay-cancel{
		float: right;
	}
	/*去结算*/
	/*更多的遮罩*/
  .mast-more{
  	background: #000;
	width: 100%;
	height: 90px;
	opacity: 1;
	left: 0;
	bottom: 0;
	margin-left: 0px;
	margin-top: 0px;
  }
  .lightbox-1{
    width:100%;
    z-index:101;
    height:100%;
    background-color:#000;
    filter:alpha(Opacity=20);
    -moz-opacity:0.2;
    opacity: 0.2;
    position:absolute;
    bottom:0px; 
    left:0px;
  }
  .white-background-1{
    width:100%;
    height:90px;
    background-color:#FFF;
    position:absolute;
    z-index:105;
    bottom: 0px;
  }
  .clear-table{
  	bottom: 90px;
  	border-bottom: 1px solid #e7e7e7;
  }
  .outer-layer{
    height: 90px;
    width: 94%;
    margin-left: 3%;
  }
  .outer-layer:after{
  	content: "";
  	display: block;
  	width: 0;
  	height: 0;
  	visibility: hidden;
  	clear: both;
  }
  .change-orders{
    height: 90px;
    width: 25%;
    background: url("../../assets/modify_order.png") no-repeat center 15px;
    text-align: center;
    line-height: 135px;
    color: #333;
    font-size: 15px;
    float: left;
  }
  .clear-table .change-orders:nth-child(1){
	background: url("../../assets/clear_table.png") no-repeat center 15px;
  }
  .change-orders:nth-child(1){
	background: url("../../assets/exit_order.png") no-repeat center 15px;
  }
  .change-orders:nth-child(2){
  	background: url("../../assets/speed_order.png") no-repeat center 15px;
  }
  .change-orders:nth-child(3){
  	background: url("../../assets/modify_order.png") no-repeat center 15px;
  }
  .change-orders:nth-child(4){
  	background: url("../../assets/notice_dish.png") no-repeat center 15px;
  }

  .change-orders:nth-child(5){
  	background: url("../../assets/cancel_order.png") no-repeat center 15px;
  }
  /*外卖*/
  .takeout-status .change-orders:nth-child(1){
	background: url("../../assets/distribution.png") no-repeat center 15px;
  }
  .takeout-status .change-orders:nth-child(2){
	background: url("../../assets/takeout_finish.png") no-repeat center 15px;
  }
  .takeout-status .change-orders:nth-child(3){
	background: url("../../assets/change_order1.png") no-repeat center 15px;
  }
  .takeout-status .change-orders:nth-child(4){
	background: url("../../assets/revoke.png") no-repeat center 15px;
  }
  /*外卖*/
  .concurrent-table{
    height: 90px;
    width: 25%;
    background: url("../../assets/merge.png") no-repeat center 15px;
    text-align: center;
    line-height: 135px;
    color: #333;
    font-size: 15px;
    float: left;
  }
  /*退货的遮罩层*/
  .mast-returndish-scroll{
  	width: 100%;
  	height: 150px;
  	overflow: hidden;
  }
  .mast-menu-returndish{
	background: #fff;
	/*width: 90%;*/
	width: 300px;
	height: 240px;
	margin-left: -150px;
	margin-top: -120px;
	border-radius: 5px;
	box-shadow: 0 0 10px #666;
	opacity: 1;
	top: 50%;
  }
  .mast-returndish-content{
  	/*height: 210px;*/
  	width: 100%;
  	text-align: left;
  	padding: 0px 10px 10px 10px;
  }
  .mast-returndish-content .mast-returndish-list{
  	width: 100%;
  	height: auto;
  }
  .mast-returndish-content .mast-returndish-title{
	height: 40px;
	line-height: 40px;
	color: #666;
	font-size: 14px;
	font-weight: 500;
  }
  .mast-returndish-list:nth-child(2) .mast-returndish-title{
  	height: 30px;
  	line-height: 40px;
  }
  .mast-returndish-btn input{
  	margin: 0;
  	padding: 0;
  	padding-left: 10px;
  }
  .mast-returndish-list .mast-returndish-btn{
  	width: 100%;
  	height: auto;
  }
  .mast-returndish-btn:after{
  	content: "";
  	display: block;
  	width: 0;
  	height: 0;
  	visibility: hidden;
  	clear: both;
  }
  .mast-returndish-btn span{
  	width: 22%;
	float: left;
	height: 30px;
	line-height: 30px;
	text-align: center;
	color: #666;
	font-size: 14px;
	background: #eeeeee;
	border-radius: 5px;
	margin-left: 4%;
	margin-top: 10px;
	overflow: hidden;
  }
  .mast-returndish-btn span.returndish-btn-margin{
  	margin-left: 0;
  }
  .mast-returndish-btn span.returndish-btn-active{
  	background: #ff5534;
  	color: #fff;
  }
  /*取号*/
  .mast-menu-queue{
		background: #fff;
		width: 92%;
		left: 4%;
		margin-left: 0px;
		/*width: 300px;*/
		height: 240px;
		margin-top: -120px;
		border-radius: 5px;
		box-shadow: 0 0 10px #666;
		opacity: 1;
		top: 50%;
	}
	.mast-specificat-queue-list{
		height: 150px;
		overflow: hidden;
	}
  /*取号*/
  /*添加快递员*/
    .mast-menu-courier{
		background: #fff;
		width: 92%;
		left: 4%;
		margin-left: 0px;
		/*width: 300px;*/
		height: 240px;
		margin-top: -120px;
		border-radius: 5px;
		box-shadow: 0 0 10px #666;
		opacity: 1;
		top: 50%;
	}
	.mast-specificat-courier-list{
		height: 150px;
		overflow: hidden;
	}
	.mask-content-info{
	  margin: 0 10px;
	}
	.mask-content-info div{
	  border-bottom: 1px solid #ccc;
	}
	.mask-content-info div:last-child{
	  border-bottom: 0;
	}
	.mask-content-info div:after{
	  content: '';
	  display: block;
	  width: 0;
	  height: 0;
	  clear: both;
	  visibility: hidden;
	}
	.mask-content-info label{
	  display: block;
	  width: 30%;
	  height: 50px;
	  float: left;
	  line-height: 50px;
	  font-size: 14px;
	}
	.mask-content-info input{
	  width: 70%;
	  height: 50px;
	  float: right;
	  border: 0;
	  margin-bottom: 0;
	  font-size: 14px;
	  text-align: right;
	  padding: 0;
	  overflow: hidden;
	}
	.mask-content-info .select-input{
	  /*background: url(image/icon4.png) no-repeat right center;*/
	  padding-right: 14px;
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
  /*添加快递员*/
  /*外卖取消原因*/
  .mast-menu-takeout-cancel{
		background: #fff;
		width: 92%;
		left: 4%;
		margin-left: 0px;
		/*width: 300px;*/
		height: 240px;
		margin-top: -120px;
		border-radius: 5px;
		box-shadow: 0 0 10px #666;
		opacity: 1;
		top: 50%;
	}
	.mast-takeout-cancel-list{
		height: 150px;
		overflow: hidden;
	}
	.takeout-cancel-list{
		padding: 0px 10px 10px 10px;
	}
	.takeout-cancel-list span.takeout-cancel-btn{
		float: left;
		width: 45%;
		height: 35px;
		line-height: 35px;
		color: #666;
		background: #eee;
		text-align: center;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		margin-top: 10px;
		border-radius: 3px;
	}
	.takeout-cancel-list:after{
		content:"";
		display: block;
		width: 0;
		height: 0;
		visibility: hidden;
		clear: both;
	}
	.takeout-cancel-list span.takeout-cancel-btn:nth-child(2n){
		margin-left: 10%;
	}
	.takeout-cancel-list span.takeout-cancel-btn-active{
		background: #ff5534;
		color: #fff;
	}
  /*外卖取消原因*/
  /*打印设置*/
	.mast-print-title{
		padding: 0px 10px;
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #e7e7e7;
		font-size: 16px;
		text-align: center;
		overflow: hidden;
		color: #000;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		/*font-weight: 600;*/
		background: #fff;
	}
	.mast-menu-print{
		background: #fff;
		width: 92%;
		left: 4%;
		margin-left: 0px;
		/*width: 300px;*/
		height: 150px;
		margin-top: -75px;
		border-radius: 5px;
		box-shadow: 0 0 10px #666;
		opacity: 1;
		top: 50%;
	}
	.mast-print-list{
		height: 100px;
		overflow: hidden;
	}
	.print-type{
		width: 100%;
		list-style: none;
		padding: 0px 10px;
	}
	.print-type .print-type-list{
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #e7e7e7;
		text-align: center;
	}
	.print-type .print-type-list:last-child{
		border-bottom: none;
	}
  /*打印设置*/
  /*排队更多*/
  .mast-queue-slider{
  	width: 200px;
  	top: 0;
  	left: 0px;
  	opacity: 1;
  	margin: 0;
  	z-index: 10001;
  	background: none;
  }
  .mast-slider{
  	background: #fff;
  }
</style>
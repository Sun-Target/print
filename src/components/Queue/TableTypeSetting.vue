<template>
  <div class="menu-container" ref="menuContainer">
     <Header :title="title" :food="food" :name="name"></Header>
    <!-- 这个是内容 -->
    <div class="contents">
      <div class="add-tabtype">
        <div class="add-tabtype-btn" @click="clickHandleButton({
          sign:'add'
        })"><span>添加桌型</span></div>
      </div>
      <div class="tabtype-scroll" :style="{height: contentHeight + 'px'}"> 
        <div class="tabtype-list">
          <div class="tabtype" v-for="(item,index) in queueSetting">
            <div class="tabtype-title">
              <p class="tabtype-title-name">{{item.title}}（{{item.min_num}}~{{item.max_num}}）</p>
              <p class="tabtype-title-number">排号前缀<span>{{item.prefix}}</span></p>
            </div>
            <div class="tabtype-btn">
              <div class="mod-btn" @tap="clickHandleButton({
                sign:'edit',
                item:item
              })">修改</div>
              <div class="del-btn" @tap="queuedelete({
                id:item.id
              })">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <mast v-show="mastqueuetable" :class="{'network':mastqueuetable}" @touchmove.prevent>
      <div class="mast-content" :class="{'mast-menu-queue':mastqueuetable}">
        <div class="mast-specificat-title">添加桌型</div>
        <div class="mast-specificat-queue-list mast-scrollspecificat">
          <div class="mast-specificat-list" :class="{'mast-specificat-list-height':mastqueuetable}">
            <div class="add-tabtype-list">
              <div class="tabtype-name">
                <label for="">桌型名称</label>
                <input type="text" v-model="tableInfo.title" placeholder="请输入桌型名称">
              </div>
              <div class="tabtype-name">
                <label for="">容纳人数</label>
                <div class="galleryful">
                  <input type="number" v-model="tableInfo.min_num" maxlength="2" class="galleryful-content">至<input type="number" v-model="tableInfo.max_num" maxlength="2" class="galleryful-content">人
                </div>
              </div>
              <div class="tabtype-name">
                <label for="">桌型名称</label>
                <input type="text" v-model="tableInfo.prefix" placeholder="请输入牌号前缀，例如A">
              </div>
            </div>
          </div>
        </div>
        <div class="mast-specificat-footer">
          <div class="mast-specificat-com" @click="addoreditqueuesetting">确定</div>
        </div>
        <div class="mast-product-close" @click.stop="changeMastDisplay('mastqueuetable')"></div>
      </div>
      <div class="mast" @click.stop="changeMastDisplay('mastqueuetable')" @touchmove.prevent></div>
    </mast>
  </div>
</template>

<script>
import Mast from '../Mast/Mast'
import Header from '../Mast/Header'
import BScroll from 'better-scroll'

export default {
  name: 'TableTypeSetting',
  data () {
    return {
      title: '桌型设置',
      food:true,
      name:'queue',
      contentHeight: 0,
      queueSetting:{},
      tableInfo:{
        title:'',
        min_num:'',
        max_num:'',
        prefix:'',
        sign:'add'
        // sid:1
      }
    }
  },
  methods: {
    changeMastDisplay: function (name) {
      this.$store.commit('mastdisplay',name);
    },
    getHeight: function () {
      let productData = this.$refs.menuContainer.offsetHeight;
      this.contentHeight = productData - 105;
    },
    addoreditqueuesetting: function () {
      this.changeMastDisplay('mastqueuetable');
      this.API.addoreditqueuesetting(this.tableInfo).then((response) => {
        if(response > 0){
          mui.toast('操作成功');
          this.getqueuesetting();
        }else{
          mui.toast('操作失败');
        }             
      }, (response) => {
          mui.toast('网络错误');
      });
    },
    clickHandleButton: function (params) {
      if(params['sign'] == 'add'){
        this.tableInfo = {
            title:'',
            min_num:'',
            max_num:'',
            prefix:'',
            sign:params['sign']
        }
      }else if(params['sign'] == 'edit'){
        let arg = Object.assign(params,{});
        this.tableInfo = arg;
        this.tableInfo['sid'] = params['item']['id'];
        this.tableInfo['sign'] = params['sign'];
      }
      this.changeMastDisplay('mastqueuetable');
    },
    getqueuesetting: function () {
      this.API.getqueuesetting().then((response) => {
          this.queueSetting = response.filter((item)=>{
            item['is_active'] = false;
            return item;           
          })

          this.getHeight();     
          let queueSetting = new BScroll('.tabtype-scroll',{
              scrollY: true,
              tap:"changeMastDisplay,queuedelete"
          });
              
      }, (response) => {
          mui.toast('网络错误');
      });
    },
    queuedelete: function (params) {
      this.API.queuedelete(params).then((response) => {
          if(response['success'] == true){
            mui.toast('删除成功');
            this.getqueuesetting();
          }else{
            mui.toast('删除失败');
          }       
      }, (response) => {
          mui.toast('网络错误');
      });
    }
  },
  components: {
    Header,
    Mast
  },
  computed: {
    mastqueuetable: function () {
      return this.$store.state.mastqueuetable;
    }
  },
  created: function () {
    this.getqueuesetting();
  }

}
</script>
<style scoped>
  .menu-container{
    overflow: hidden;
    background: #eee;
  }
  .contents{
    margin-top: 54px;
    position: relative;
    padding: 0;
    font-size: 14px;
    /*overflow: scroll;*/
  }
  .add-tabtype{
      margin: 0px 15px;
  }
  .add-tabtype-btn{
      width: 100%;
      height: 46px;
      background: #fff;
      border-radius: 3px;
      margin: 10px 0;
  }
  .add-tabtype-btn span{
      display: block;
      width: 80px;
      height: 46px;
      line-height: 46px;
      color: #666;
      margin: 0 auto;
      text-align: right;
      background: url("../../assets/queue_add_table.png") no-repeat left center;
  }
  .tabtype-list{
      background: #fff;
  }
  .tabtype{
      height: 76px;
      margin-left: 15px;
      border-bottom: 1px solid #ccc;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -o-box-sizing: border-box;
      box-sizing: border-box;
  }
  .tabtype:last-child{
      border-bottom: 0;
  }
  .tabtype-title{
      width: 56%;
      height: 50px;
      padding: 13px 0;
      float: left;
  }
  .tabtype-title-name{
      font-size: 15px;
      height: 24px;
      line-height: 24px;
      color:#333;
  }
  .tabtype-title-number,.tabtype-title-number span{
      font-size: 12px;
      color: #666;
      height: 20px;
      line-height: 20px;
  }
  .tabtype-btn{
      width: 134px;
      float: right;
      padding: 24px 0;
  }
  .tabtype-btn:after{
      content: '';
      display: block;
      width: 0;
      height: 0;
      clear: both;
      visibility: hidden;
  }
  .tabtype-btn .mod-btn,.tabtype-btn .del-btn{
      width: 50%;
      height: 28px;
      float: left;
      text-align: center;
      line-height: 28px;
      text-indent: 12px;
  }
  .tabtype-btn .mod-btn{
      background: url("../../assets/queue_modify.png") no-repeat 10px center;
      color: #ff5534;
  }
  .tabtype-btn .del-btn{
      background: url("../../assets/queue_delete.png") no-repeat 10px center;
      color: #999;
  }

  /*添加桌型遮罩*/
  .add-tabtype-list .tabtype-name{
      margin: 0 10px;
      border-bottom: 1px solid #ccc;
      height: 51px;
  }
  .add-tabtype-list .tabtype-name:after{
      content: '';
      display: block;
      width: 0;
      height: 0;
      clear: both;
      visibility: hidden;
  }
  .add-tabtype-list .tabtype-name label{
      display: inline-block;
      width: 30%;
      height: 50px;
      float: left;
      line-height: 50px;
  }
  .add-tabtype-list .tabtype-name input{
      width: 70%;
      height: 50px;
      float: right;
      text-align: right;
      border: 0;
      outline: 0;
      margin: 0;
      padding: 0;
  }
  .add-tabtype-list .tabtype-name .galleryful{
      width: 70%;
      float: right;
      text-align: right;
      border: 0;
      outline: 0;
      margin: 12.5px 0;
  }
  .add-tabtype-list .tabtype-name .galleryful .galleryful-content{
      width: 40px;
      height: 23px;
      border: 1px solid #ccc;
      float: none;
      margin: 0 5px;
      border-radius: 3px;
      text-align: center;
  }
  /*添加桌型遮罩*/
</style>

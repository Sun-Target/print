<template>
  <div class="menu-container" ref="menuContainer">
    <Header :title="title" :food="food" :name="name" :flag="flag"></Header>
    <!-- 这个是内容 -->
    <div class="contents">

    </div>
  </div>
</template>

<script>
import Mast from '../Mast/Mast'
import Header from '../Mast/Header'
import BScroll from 'better-scroll'

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
    },
    changeMastDisplay: function (name) {
      this.$store.commit('mastdisplay',name);
    },
    getHeight: function () {
      let productData = this.$refs.menuContainer.offsetHeight;
      this.contentHeight = productData - 165;
    }
  },
  components: {
    Header,
    Mast
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
</style>

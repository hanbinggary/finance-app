<template>
  <div id="app">
    <div class="nav">
      <router-link to="/quotation" tag="span">
        <div class="icon-hangqing nav-icon"></div>
        <p>行情</p>
      </router-link>
      <router-link to="/news" tag="span">
        <div class="icon-news nav-icon"></div>
        <p>资讯</p>
      </router-link>
      <router-link to="/shares" tag="span">
        <div class="icon-share nav-icon"></div>
        <p>股票</p>
      </router-link>
      <router-link to="/optional" tag="span" @click.native="ifLogin()">
        <div class="icon-zixuan nav-icon"></div>
        <p>自选</p>
      </router-link>
      <router-link to="/" tag="span">
        <div class="icon-mine nav-icon"></div>
        <p>我的</p>
      </router-link>
    </div>
    
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
      })
    },
    methods:{
      ifLogin(){
        if(!this.isLogin){
          alert("请先登录！");
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import url("assets/icomoon/style.css");
  #app {
    .nav {
      height: 60px;
      width: 100vw;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 100;
      background-color: #333;
      color: #fff;
      border-top: 1px solid #666;
      display: flex;
      span {
        flex: 1;
        line-height: 60px;
        text-align: center;
        .nav-icon {
          height: 20px;
          font-size: 20px;
          margin-top: 10px;
        }
        p {
          margin: 0;
          margin-top: -15px;
          font-size: 12px;
        }
      }
    }
  }
  
  .router-link-exact-active {
    color: blue;
  }
</style>
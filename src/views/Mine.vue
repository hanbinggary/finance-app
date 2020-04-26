<template>
  <div class="mine-page">
    <div class="logo">
      <img src="../assets/logo-black.png"/>
    </div>
    <div v-show="isLogin">

      <div class="weui-cells__title">用户信息</div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>用户名</p>
          </div>
          <div class="weui-cell__ft">张无忌</div>
        </div>
      </div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>生日</p>
          </div>
          <div class="weui-cell__ft">2002-02-02</div>
        </div>
      </div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>账户余额</p>
          </div>
          <div class="weui-cell__ft">88 000 000</div>
        </div>
      </div>
      <a href="javascript:;" @click="changeLoginState(false)" class="log-out weui-btn weui-btn_primary">注销</a>

    </div>
    <div class="login" v-show="!isLogin">

      <div class="weui-cells__title">请登录</div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">账号</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="username" type="number" pattern="^[0-9]*" placeholder="请输入账号" />
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="pwd" type="password" placeholder="请输入密码" />
          </div>
        </div>
      </div>
      <a href="javascript:;" @click="changeLoginState(true)" class="weui-btn weui-btn_primary" v-if="username&&pwd">登录</a>
      <a href="javascript:;" class="weui-btn weui-btn_disabled weui-btn_primary" v-if="!username||!pwd">登录</a>
      <router-link to="/mine" class="go-register">没有账号？去注册</router-link>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { CHANGE_LOGIN_STATE } from '../store/mutation-types'
  export default {
    data() {
      return {
        username: '',
        pwd: ''
      }
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin
      })
    },
    methods: {
      changeLoginState(loginState) {
        this.$store.commit(CHANGE_LOGIN_STATE, loginState)
      }
    }
  }
</script>

<style lang="scss" scoped>
.logo{
  width: 100vw;
  text-align: center;
  img{
    width: 50%;
    margin-top: 30px;
  }
}
  .log-out {
    margin-top: 30px;
  }
  
  .login {
    margin-top: 90px;
    .weui-btn {
      margin-top: 30px;
    }
    .go-register {
      width: 100%;
      display: inline-block;
      font-size: 12px;
      margin-top: 3px;
      text-align: center;
    }
  }
</style>
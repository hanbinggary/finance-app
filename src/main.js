import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import weui from 'weui.js'
import 'weui'



Vue.config.productionTip = false

Vue.use(VueAxios, axios,)

Vue.prototype.$weui = weui

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if((to.name == 'Optional') && !store.state.isLogin) { //判断当前页面是否导航到必须要登录的路由
    next({
      name: 'Mine',
      params: {
        to
      }
    }) //重定向到我的页面进行登录操作并把本应该访问的路由作为参数传入登录页面
  } else {
    next()
  }
})
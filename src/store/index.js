import Vue from 'vue'
import Vuex from 'vuex'
import {
  CHANGE_LOGIN_STATE,
  ADD_OPT,
  DEL_OPT
} from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    mineOpt:[],
    radio:['为保证劳动节后交易的正常进行，上交所定于2020年5月5日(星期二)9时15分-12时进行交易系统连通性测试。',
    '李克强：激发内生活力 增强发展动力 坚决稳住中国经济基本盘',
    '中国银行：对客户投资原油宝产品遭受损失深感不安'
    ]
  },
  getters:{
  },
  mutations: {
    [CHANGE_LOGIN_STATE](state,loginState){
      state.isLogin = loginState
    },
    [ADD_OPT](state,code){
      state.mineOpt.push(code)
    },
    [DEL_OPT](state,code){
      state.mineOpt = state.mineOpt.filter(item => item != code)
    }
  },
  actions: {},
  modules: {}
})
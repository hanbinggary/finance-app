import Vue from 'vue'
import VueRouter from 'vue-router'
import Quotation from '../views/Quotation.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/quotation',
    name: 'Quotation',
    component: Quotation
  },
  {
    path: '/shares',
    name: 'Shares',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ '../views/Shares.vue')
  },
  {
    path: '/sharedetails',
    name: 'ShareDetails',
    props:true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ '../components/ShareDetails.vue')
  },
  {
    path: '/optional',
    name: 'Optional',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ '../views/Optional.vue')
  },
  {
    path: '/',
    name: 'Mine',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ '../views/Mine.vue')
  },
  {
    path: '/news',
    name: 'News',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ '../views/News.vue'),
    meta:{
      keepAlive:true //缓存页面信息
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
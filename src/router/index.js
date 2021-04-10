import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Register from '@/pages/home/components/Register'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/register',
    name: 'Register',
    component: Register
  }],
  // 每次做路由切换的时候，让页面显示在最顶部
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

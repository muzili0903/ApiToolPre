import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/pages/home/components/Register'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/Home'),
    meta: {
      title: '首页',
      needLogin: true
    }
  }, {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '注册页'
    }
  }, {
    path: '/signin',
    name: 'Signin',
    component: () => import('@/pages/home/components/Signin'),
    meta: {
      title: '登录页'
    }
  }],
  // 每次做路由切换的时候，让页面显示在最顶部
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login'
import Register from '@/page/register'
import index from '@/page/index'
import courseList from '@/page/courseList'
import myCourse from '@/page/myCourse'
import userInfo from '@/page/userInfo'
import learnPage from '@/page/learnPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/userInfo/login',
      name:'login',
      component:Login
    },
    {
      path:'/userInfo/register',
      name:'register',
      component:Register
    },
    {
      path:'/index',
      name:'index',
      component:index
    },
    {
      path:'/courseList',
      name:'courseList',
      component:courseList
    },
    {
      path:'/myCourse',
      name:'myCourse',
      component:myCourse
    },
    {
      path:'/userInfo',
      name:'userInfo',
      component:userInfo
    },
    {
      path:'/courseList/learnPage/:id',
      name:'learnPage',
      component:learnPage
    }
  ]
})

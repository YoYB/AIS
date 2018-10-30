// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入axios插件，确认已下载axios插件
//npm install axios --save
import axios from 'axios'
//设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

//使用axios，将axios赋值给Vue的原型
Vue.prototype.$axios = axios;
//原理：new Vue({
//    //store:store  注入
      //$axios:axios
// })
//访问axios  this.axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

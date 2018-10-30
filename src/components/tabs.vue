<template>
    <footer class="oh" v-show="isShow">
      <div class="tabs-item">
        <router-link to="/index">
          <i class="iconfont icon-shouye" :class="{iconfont:true}"></i>
          <span>首页</span>
        </router-link>
      </div>
      <div class="tabs-item">
        <router-link to="/courseList">
          <i class="iconfont icon-liebiao"></i>
          <span>课程列表</span>
        </router-link>
      </div>
      <div class="tabs-item">
        <router-link to="/myCourse">
          <i class="iconfont icon-shuben"></i>
          <span>我的课程</span>
        </router-link>
      </div>
      <div class="tabs-item">
        <router-link to="/userInfo" :class="{'router-link-exact-active':isAction}">
          <i class="iconfont icon-gerenzhongxin"></i>
          <span>个人中心</span>
        </router-link>
      </div>
    </footer>
</template>

<script>
require('../assets/css/iconfont/iconfont.css');

  export default{
    data(){
      return {

      }
    },
    mounted(){
      console.log(this.$route.path);
    },
    computed:{
      isAction(){
        console.log(this.$route.path);
        return this.$route.path == '/userInfo/login'?true:false;
      },
      isShow(){
        var arr = this.$route.path.split('/');
        return arr.length < 3?true:false;
      }
    }
  }
</script>


<style>
  footer{
    padding: 0.5rem 0 0.7rem;
    background-color: #fff;
    box-shadow: 0 -0.05rem 0.12rem rgba(0,0,0,.1);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
  }
.tabs-item{
  width: 25%;
  text-align: center;
  float: left;
}
  .tabs-item i{
    display: block;
    font-size: 0.8rem;
    color: #4d555d;
  }
  .tabs-item span{
    display: block;
    font-size: 0.6rem;
    color: #4d555d;
  }
  footer .tabs-item a.router-link-exact-active i{
    color: #387ef5;
  }
</style>

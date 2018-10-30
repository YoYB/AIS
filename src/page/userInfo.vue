<template>
  <div>
    <div class="user_wrap">
      <div class="user-img">
        <img src="../assets/imgs/info-tt.png" alt="">
      </div>
    </div>
    <div class="user-info">
      <div class="info usn oh">
        <i class="iconfont icon-huabankaobei"></i>
        <span>{{userName}}</span>
      </div>
      <div class="info email oh">
        <i class="iconfont icon-youxiang"></i>
        <span>{{email}}</span>
      </div>
      <div class="info phone oh">
        <i class="iconfont icon-dianhua"></i>
        <span>{{phone}}</span>
      </div>
    </div>
    <div class="user-logout">
      <button @click="quit()">退出</button>
    </div>
  </div>
</template>

<script>
  require('../assets/css/iconfont/iconfont.css');
//引入utils工具函数，获取保存的用户信息
  import utils from '@/utils'

  export default{
    data(){
      return {
        userName:"",
        email:"",
        phone:""
      }
    },
    created(){  //创建之后
      var userInfo = utils.storage.getUserInfo();  //获取到用户数据
      //查看是否获取到正确的用户数据
      console.log(window.sessionStorage.getItem("userInfo"));
      //判断用户是否存在
      if(userInfo){  //存在，则显示用户信息
        this.userName = userInfo.userName;
        this.email = userInfo.email;
        this.phone = userInfo.phone;
      }else{  //不存在，则返回登录界面
        this.$router.push('/userInfo/login');
      }
    },
    methods:{
      quit(){
        console.log(this.$axios);
        this.$axios({
          method:"get",
          url:"/Handler/UserHandler?action=quit"
        }).then((res) => {
          if(res.data.success){
            this.$router.push('/userInfo/login');
            utils.storage.clearUserInfo();  //退出登录后，清空临时会话的用户信息
          }else{
            alert(res.data.err);
          }
        }).catch(function(err){
          alert(err);
          console.log(err);
        })
      }
    }
  }
</script>

<style>
  .user_wrap{
    width: 100%;
    background: url(../assets/imgs/info_bg.png) no-repeat center;
    background-size: 100%;
    padding: 3.5rem 0;
  }
  .user-img{
    width: 4.8rem;
    height: 4.8rem;
    margin: 0 auto;
    border: 0.01rem solid #fff;
    border-radius: 50%;
    overflow: hidden;
  }
  .info{
    padding: 0.9rem 0.5rem;
    text-align: right;
    font-size: 0.9rem;
    border-bottom: 0.05rem solid #ddd;
  }
  .info i{
    display: block;
    float: left;
    font-size: 1rem;
  }
  .info span{
    display: block;
    float: right;
  }
  .user-logout{
    width: 11.25rem;
    margin: 1.85rem auto 0;
  }
  .user-logout button{
    width: 100%;
    padding: 0.7rem 0;
    display: block;
    background-color: #387ef5;
    color: #fff;
    font-size: 0.7rem;
    border-radius: 0.2rem;
    cursor: pointer;
  }

</style>

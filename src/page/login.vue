<template>
  <div id="login_wrap">
    <div class="head-img">
      <img src="../assets/imgs/login_logo.png" alt="">
    </div>
    <div class="head-ipt">
      <input type="text" placeholder="用户名" v-model="userName">
      <input type="password" placeholder="密码" v-model="password">
      <input @click="login()" type="button" value="登录">
    </div>
    <div class="head-other oh">
      <div class="regist">
        <router-link to="/userInfo/register">注册</router-link>
      </div>
      <div class="forget">
        <router-link to="/forgetPsw">忘了密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
//引入封装好的sessionStorage临时保存数据的工具函数
import utils from '@/utils'

  export default{
    data(){
      return {
        //双向数据绑定
        userName:"",
        password:""
      }
    },
    methods:{
      login(){
        //1.获取用户名和密码
        //2.验证
        //3.发送请求
        if(this.userName != "" && this.password != ""){  //不能为空
            this.$axios({
              method:"post",
              url:"/Handler/UserHandler?action=login",
              data:{
                userName:this.userName,
                password:this.password
              }
            }).then((res) => {
              if(res.data.success){
                this.$router.push("/userInfo");
                //通过sectionStorge保存用户信息，并将数据赋给个人中心页面
                console.log(res.data);
                utils.storage.setUserInfo({
                  userName:res.data.data.userName,
                  phone:res.data.data.phone,
                  email:res.data.data.email
                })
              }else{
                alert(res.data.err);
              }
            }).catch(function(err){
              alert(err);
            })
        }else{
          alert("信息填写不完整，请填写完整重新登录！")
        }
      }
    }
  }
</script>

<style>
#login_wrap{
  background: url(../assets/imgs/login_bg.png) no-repeat top center;
  background-size: 100%;
  padding-top: 4rem;
}
  .head-img{
    width: 4.6rem;
    height: 4.6rem;
    margin: 0 auto;
  }
  .head-ipt{
    width: 14rem;
    margin: 3rem auto 0;
  }
  .head-ipt input{
    display: block;
    width: 100%;
    height: 2.2rem;
    font-size: 0.3rem;
    color: #000;
    background-color: #fff;
    padding-left: 0.5rem;
    border:0.05rem solid #ddd;
    box-sizing: border-box;
  }
  .head-ipt input[type="button"]{
    margin-top: 3rem;
    text-align: center;
    font-size: 0.75rem;
    color: #fff;
    background-color: #387ef5;
    border: 0;
    border-radius: 0.2rem;
  }
  .head-other{
    width: 13.1rem;
    margin: 1.9rem auto 0;
    font-size: 0.55rem;
  }
  .head-other .regist{
    float: left;
  }
  .regist a{
    color: #00e;
  }
  .head-other .forget{
    float: right;
  }
  .forget a{
    color: #551a8b;
  }
</style>

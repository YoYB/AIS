<template>
  <div id="register_wrap">
    <div class="header">
      <page-Head :title="title"></page-Head>

    </div>
    <div class="regist-info oh">
      <input type="text" placeholder="用户名" v-model="info.userName">
      <input type="email" placeholder="邮箱" v-model="info.email">
      <input type="text" placeholder="手机号" v-model="info.phone">
      <input type="password" placeholder="密码" v-model="info.password">
      <input type="password" placeholder="确认密码" v-model="info.enter_password">
      <input type="button" value="注册" @click="register()">
    </div>
  </div>
</template>

<script>
import pageHead from '@/components/pageHead'

  export default{
    components:{pageHead},
    data(){
      return {
        title:"注册",
        //双向绑定form表单
        info:{
          userName:"",
          email:"",
          phone:"",
          password:"",
          enter_password:""
        }
      }
    },
    methods:{
      register(){  //注册
        if(this.info.userName != "" && this.info.email != "" && this.info.phone != "" && this.info.password != "" && this.info.enter_password != ""){//表单是否填写完整
          if(this.info.password == this.info.enter_password){  //两次密码是否一致
            //通过axios发送请求
            this.$axios({
              method:"post",  //请求方式
              url:"/Handler/UserHandler?action=add",   //请求地址
              data:{  //发送的数据:获取的数据
                userName:this.info.userName,
                email:this.info.email,
                phone:this.info.phone,
                password:this.info.password
              }
            }).then((res) => {  //发送成功后的回调
              //用箭头函数，可避免this指向问题
              console.log(res);
              if(res.data.success){  //发送成功，转到登录页面
                alert("注册成功");
                this.$router.push("/userInfo/login");
              }else{  //发送失败，弹出错误
                alert(res.data.err);
              }
            }).catch(function(err){  //发送失败后的回调
              alert(err);
            })
          }else{
            alert("两次密码不一致，请重新确认密码！")
          }
        }else{
          alert("填写的信息不完整，请填写完整重新提交！")
        }
      }
    }
  }
</script>

<style>
#register_wrap{
  background: url(../assets/imgs/register_bg.jpg) no-repeat top center;
  background-size: 100%;
  padding-bottom: 8rem;
}
  .regist-info{
    width: 14rem;
    margin: 5.6rem auto 0;
  }
  .regist-info input{
    display: block;
    width: 100%;
    font-size: 0.55rem;
    background-color: rgba(255,255,255,.4);
    padding: 0.8rem 0 0.8rem 0.5rem;
    border: 0.04rem solid rgba(0,0,0,.1);
    box-sizing: border-box;
  }
  .regist-info input[type="button"]{
    border: 0;
    margin-top: 2.8rem;
    font-size: 0.7rem;
    color: #fff;
    background-color: #387ef5;
    border-radius: 0.2rem;
    padding: 0.7rem 0;
  }
</style>

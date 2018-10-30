//工具函数  用来获取信息并临时保存，令其他页面获取
export default{
    storage:{
      //设置  保存用户信息
      setUserInfo:function(userInfo){
        //setItem(key,data) data需要能转化为字符串 用JSON.stringify()
        window.sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
      },
      //获取用户信息
      getUserInfo:function(){
        //获取来的信息是字符串，通过JSON.parse将字符串转为json
        return JSON.parse(window.sessionStorage.getItem("userInfo"));
      },
      //清除用户信息
      clearUserInfo:function(){
        window.sessionStorage.clear();
      }
    }
}

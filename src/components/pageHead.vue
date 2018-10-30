<template>
  <div>
    <header>
      <button @click="goBack()" class="back" v-show="isShowGoBack">返回</button>
      {{title}}
    </header>
    <div class="header"></div>
  </div>
</template>

<script>
export default{
  props:['title'],
  data(){
    return {

    }
  },
  computed:{
    isShowGoBack(){   //是否显示返回  用split切割字符串返回数组，通过长度判断是否为多级子页面
      return this.$route.path.split('/').length > 2? true:false;
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style>
header{
  color: #000;
  font-size: 1rem;
  background-color: #fff;
  text-align: center;
  border: 0.05rem solid #ddd;
  padding: 0.5rem 0;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
}
.header{
  height: 2.4rem;
}
.back{
  font-size: 1rem;
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  cursor: pointer;
}
.close{
  font-size: 1rem;
  color: #fff;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  cursor: pointer;
}
</style>

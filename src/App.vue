<template>
  <div id="app">
    <!--核心内容-->
    <router-view/>

    <!--底部导航-->
    <tabs></tabs>
  </div>
</template>

<script>
  require('./assets/js/refont.js');
  import tabs from '@/components/tabs'

export default {
  name: 'App',
  components:{tabs}
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
  li{
    list-style: none;
  }
  a{
    text-decoration: none;
  }
  input,button{
    outline: none;
    border:0;
    background-color: transparent;
  }
  img{
    display: block;
    width: 100%;
  }
  .oh{
    overflow: hidden;
  }
  #app{
    padding-bottom: 2rem;
  }
</style>

<template>
  <div>
    <div class="newcourse-item" v-for="item in newList" :key="item.ID" @click="goStudy(item.ID)">
      <div class="newcourse-img">
        <img :src="item.Cpic" alt="">
      </div>
      <div class="newcourse-info">
        <div class="newcourse-title">{{item.Cname}}</div>
        <p class="newcourse-des">{{item.Cdescribe}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props:['newList'],
    data(){
      return {

      }
    },
    mounted(){
      //console.log(this.newList);
    },
    methods:{
      goStudy(id){
        this.$router.push('/courseList/learnPage/'+id);
      }
    }
  }
</script>

<style>
.newcourse-item{
  width: 7.7rem;
  float: left;
  margin: 0 0.3rem 0.3rem;
}
.newcourse-img{
  height: 4.5rem;
  overflow: hidden;
}
  .newcourse-title{
    font-size: 0.6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .newcourse-des{
    font-size: 0.4rem;
    margin-top: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
  }
</style>

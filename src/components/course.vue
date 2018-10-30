<template>
  <div>
    <div class="course-item oh" v-for="item in courseData" :key="item.ID" @click="goStudy(item.ID)">
      <div class="course-img">
        <img :src="item.Cpic" alt="">
      </div>
      <div class="course-info">
        <div class="course-title">{{item.Cname}}</div>
        <p class="course-des">{{item.Cdescribe}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props:['courseData'],
    data(){
      return {

      }
    },
    mounted(){
      console.log(this.courseData);
    },
    methods:{
      goStudy(id){
        this.$router.push('/courseList/learnPage/'+id);
      }
    }
  }
</script>

<style>
.course-item{
  padding: 0.5rem;
  border-bottom: 0.04rem solid #ccc;
}
  .course-img{
    width: 8.4rem;
    height: 4.9rem;
    overflow: hidden;
    float: left;
  }
  .course-info{
    width:8rem;
    margin-left: 0.5rem;
    float: left;
  }
  .course-title{
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .course-des{
    font-size: 0.7rem;
  }
</style>

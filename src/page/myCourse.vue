<template>
  <div>
    <page-head :title="title"></page-head>
      <div class="mycourse_wrap">
        <div class="mycourse-list">
          <course :courseData="courseData"></course>
        </div>
      </div>
    <shade :isShow="isShade"></shade>
  </div>
</template>

<script>
  import pageHead from '@/components/pageHead'
  import course from '@/components/course'
  import utils from '@/utils'
  import shade from '@/components/shade'

  export default{
    components:{
      pageHead,
      course,
      utils,
      shade
    },
    data(){
      return {
        title:"我的课程",
        userName:"",
        courseData:[],
        isShade:true
      }
    },
    created(){
      var userInfo = utils.storage.getUserInfo();
      if(userInfo){
        this.userName = userInfo.userName;
        this.isShade = false;
        this.$axios({
          method:"get",
          url:"/Handler/CourseHandler?action=mycourse",
          params:{
            userName:this.userName
          }
        }).then((res) => {
          console.log(res.data);
          if(res.data.success){
            this.courseData = res.data.data;
          }else{
            alert(res.data.err);
          }
        }).catch((err) => {
          alert(err);
        })
      }else{
        this.isShade = true;
      }
    }
  }
</script>

<style>
.mycourse_wrap{
  padding: 0 0.25rem;
  margin-top: 0.75rem;
}
  .mycourse-list{
    border: 0.04rem solid #ccc;
    border-bottom: 0;
  }

</style>

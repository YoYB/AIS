<template>
  <div>
    <page-head :title="title"></page-head>

    <div class="search_wrap">
      <div class="search">
        <i class="iconfont icon-sousuo" @click="getCourseName()"></i>
        <input type="text" placeholder="搜索课程" v-model="courseName">
      </div>
      <div class="search-key oh">
        <div class="key" v-for="item in categoryList" @click="getCourseSysid(item.sysId)">{{item.title}}</div>
        <div class="key" @click="getCourseData()">全部</div>
      </div>
    </div>
    <div class="course_wrap">
      <div class="course-list">
        <course :courseData="courseData"></course>
      </div>
    </div>

  </div>
</template>

<script>
import pageHead from '@/components/pageHead'
import course from '@/components/course'


  export default{
    components:{
      pageHead,
      course
    },
    data(){
      return {
        title:"课程列表",
        courseData:[],  //课程数据
        categoryList:[],  //课程类别
        courseName:""  //字段查询
      }
    },
    created(){
      //初始加载列表
      this.getCourseData()
      //获取课程类别
      this.$axios({
        method:"get",
        url:"/Handler/CourseHandler?action=getcategory"
      }).then((res) => {
        if(res.data.success){
        console.log(res.data.data)
          this.categoryList = res.data.data;
      }else{
        alert(res.data.err);
      }
      }).catch((err) => {
        alert(err);
      })
    },
    methods:{
      //封装查询方法
      //1.请求全部课程
      //2.字段搜索
      //3.分类查询
      getCourseData(obj){
        //如果有搜索课程或类别，通过课程名或课程ID进行查询
        if(obj){  //若搜索内容存在，则获取该课程的名称与ID
          var data={ //此data将为后台发送查询数据
            courseName:obj.courseName,
            sysId:obj.sysId
          }
          console.log(data);
        }else{ //如果搜索内容不存在，则返回数据为空
          var data=""
        }

        //异步获取课程列表的信息
        this.$axios({
          method:"get",
          url:"/Handler/CourseHandler?action=courseshow",
          params:data
        }).then((res) => {
          if(res.data.success){
          console.log(res.data.data.list)
            this.courseData = res.data.data.list
        }else{
          alert(res.data.err);
        }
        }).catch((err) => {
          alert(err);
        })
      },
      //字段查询
      getCourseName(){
        this.getCourseData({
          courseName:this.courseName
        });
        //显示完对应的课程，清空课程名缓存
        this.courseName="";
      },
      //id查询
      getCourseSysid(sysId){
        this.getCourseData({
          sysId:sysId
        })
      }
    }
  }
</script>

<style>
  .search_wrap{
    padding: 0.25rem 0.6rem;
  }
  .search{
    display: flex;
  }
  .search i{
    font-size: 0.7rem;
    color: #000;
    line-height: 1.7rem;
  }
  .search input{
    flex:1;
    font-size: 0.55rem;
    color: #757575;
    padding: 0.575rem 0.25rem;
    margin-left: 0.575rem;
    border: 0.05rem solid #a9a9a9;
  }
  .search-key{
    margin-top: 0.7rem;
  }
  .key{
    float: left;
    margin: 0 0.85rem;
    font-size: 0.55rem;
    color: #000;
    padding: 0.45rem 0.4rem;
    border: 0.05rem solid #ccc;
    cursor: pointer;
  }
  .key:hover{
    background: #0c06ee;
    color: #fff;
  }
  .key:first-child{
    margin-left: 0;
  }
  .key:last-child{
    margin-right: 0;
  }
  .course_wrap{
    padding: 0 0.25rem 1rem;
  }
  .course-list{
    border:0.04rem solid #ccc;
    border-bottom: 0;
  }
</style>

<template>
  <div>
    <page-head :title="title"></page-head>
      <div class="container">
        <div class="banner">
          <swiper :options="swiperOption" ref="mySwiper">
            <!--slide-->
            <swiper-slide v-for="item in bannerList" v-if="bannerList.length > 1" :key="item.ID">
              <img :src="item.Cpic" alt="" @click="goStudy(item.ID)">
            </swiper-slide>
            <!--Optional controls-->
            <!--分页器-->
            <div class="swiper-pagination" slot="pagination"></div>
            <!--左右箭头-->
            <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
            <!--<div class="swiper-button-next" slot="button-next"></div>-->
            <!--进度条-->
            <!--<div class="swiper-scrollbar" slot="scrollbar"></div>-->
          </swiper>
        </div>
        <div class="new-course">
          <div class="title">最新课程</div>
          <div class="newcourse-list oh">
            <new-course :newList="newList"></new-course>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import pageHead from '@/components/pageHead'
  import newCourse from '@/components/newCourse'
  //引入vue swiper轮播图的插件
  import 'swiper/dist/css/swiper.css'
  import {swiper,swiperSlide} from 'vue-awesome-swiper'

export default{
  components:{
    pageHead,
    newCourse,
    swiper,
    swiperSlide
  },
  data(){
    return {
      title:"首页",
      bannerList:[], //轮播图图片
      newList:[],  //最新视频信息
      swiperOption:{
        pagination:{
          el:".swiper-pagination"
        },
        autoplay:true,
        loop:true
      },
      swiperSlides:[1,2,3,4,5]
    }
  },
  methods:{
    goStudy(id){  //点击前往相对应的学习页面
      this.$router.push('courseList/learnPage/'+id)
    }
  },
  created(){
    this.$axios({
      method:"get",
      url:"/Handler/CourseHandler?action=indexshow",
    }).then((res) => {
      if(res.data.success){
        //console.log(res.data.data.bannerList)
        console.log(res.data.data.newList)
        this.bannerList = res.data.data.bannerList;
        this.newList = res.data.data.newList;
        //console.log(this.newList);
      }else{
        alert(res.data.err);
      }
    }).catch((err) => {
      alert(err);
    })
  }
}
</script>

<style>
.banner{
  width: 100%;
}
  .title{
    padding: 0.8rem;
    font-size: 1rem;
    border: 0.04rem solid #ddd;
  }
  .newcourse-list{
    padding: 1.05rem;
  }
.swiper-container{
  height: 8.7rem;
}
</style>

<template>
  <div>
    <page-head :title="title"></page-head>
    <div class="learn_wrap">
      <!--视频-->
      <div class="video_wrap">
        <video :src="videoUrl" controls loop style="width:100%;height:100%"></video>
      </div>

      <!--选项卡-->
      <div class="select_wrap">
        <div class="select oh">
          <span class="video" :class="{color:isOptions}" @click="showVideo()">视频</span>
          <span class="comments" :class="{color:!isOptions}" @click="showComment()">
            评论
          </span>
        </div>
      </div>
      <!--视频信息-->
        <div class="item-content" v-show="isOptions">
          <div class="select-title">课程详情</div>
          <div class="courses-info">
            <div class="course-name">课程名称：{{courseInfo.Cname}}</div>
            <div class="course-des">课程描述：{{courseInfo.Cdescribe}}</div>
            <div class="course-price">课程价格：{{courseInfo.Cprice}}</div>
          </div>
          <div class="video-title">视频列表</div>
          <ul class="video-list">
            <li class="video-item" v-for="item in videoList" @click="selectVideo(item.Vurl)">
              <span class="dd"></span>
              <div class="name-time" :class="{color:videoUrl==item.Vurl}">
                <p>{{item.Vname}}</p>
                <p>{{item.Vtime}}</p>
              </div>
            </li>
          </ul>
        </div>
      <!-- 评价-->
      <div class="item-content" v-show="!isOptions">
        <div class="list-title">评价</div>
        <ul class="evaluate-list">
          <li class="evaluate-item" v-for="comment in commentList">
            <div class="img-warp">
              <img src="../assets/imgs/info-tt.png" alt="" />
            </div>
            <div class="text-warp">
              <p>{{comment.userName}}</p>
              <p>{{comment.evaluate}}</p>
            </div>
            <div class="time-warp">
              <!-- 使用 -->
              {{comment.createAt}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--底部-->
    <div class="learn-footer oh">
      <div class="learn-item" @click="openComment">
        <i class="iconfont icon-qianbi"></i>
        <span>评价</span>
      </div>
      <div class="learn-item" @click="buyCourse()">
        <i class="iconfont icon-gouwuche" :class="{buyVideo:isBuy}"></i>
        <span>购买课程</span>
      </div>
    </div>

    <!--评论-->
    <comment :isShow="isShow" @closeComment="closeComment" @submitComment="submitComment"></comment>
    <!--遮罩-->
    <shade :isShow="isShade"></shade>
  </div>
</template>

<script>
  import pageHead from '@/components/pageHead'
  import comment from '@/components/comments'
import utils from '@/utils'
  import shade from '@/components/shade'

  export default{
    components:{pageHead,comment,shade},
    data(){
      return {
        title:"课程详情",
        isOptions:true,  //tab显示的条件
        isShow:false,  //评论窗口是否显示
        //发送数据
        courseId:"",   //课程的id
        userName:"",  //用户名
        //课程信息
        courseInfo:{},
        //获取视频列表
        videoList:[],
        videoUrl:"", //视频地址
        //评论列表
        commentList:[],
        //是否购买
        isBuy:false,
        //是否遮罩
        isShade:true
      }
    },
    created(){
      //从url处获取课程id
      this.courseId = this.$route.params.id;
      //从session获取用户名
      var userInfo = utils.storage.getUserInfo();
      if(userInfo){
        this.userName = userInfo.userName;
        this.isShade = false;
      }else{
        this.isShade = true;
      }
      //console.log(this.courseId);
      this.$axios({
        method:"get",
        url:"/Handler/CourseHandler?action=learn",
        params:{
          courseId:this.courseId,
          userName:this.userName
        }
      }).then((res) => {
        if(res.data.success){
          console.log(res.data.data);
          var initData = res.data.data;
          this.courseInfo = initData; //获取课程信息
          this.videoList = initData.Vlist;  //获取视频列表
          this.commentList = initData.evaluate;
          this.isBuy = initData.isBuy;
          this.selectVideo(this.videoList[0].Vurl);  //加载第一个视频
      }else{
        alert(res.data.err);
      }
      }).catch((err) => {
        alert(err);
      })
    },
    methods:{
      showVideo(){
        this.isOptions = true;
      },
      showComment(){
        this.isOptions = false;
      },
      //打开评论弹窗
      openComment(){
        this.isShow = true;
      },
      //关闭评论弹窗
      closeComment(){
        this.isShow = false;
      },
      //获取评论内容
      submitComment(commentData){
        if(commentData){ //如果评论有内容
          this.$axios({
            method:"post",
            url:"/Handler/CourseHandler?action=addcoursecomments",
            data:{
              courseId:this.courseId,
              evaluate:commentData,
              userName:this.userName
            }
          }).then((res) => {
            console.log(res.data);
            if(res.data.success){
              //添加评论
              var myDate = new Date();
              this.commentList.push({
                userName:this.userName,
                createAt:myDate.toLocaleString(),
                evaluate:commentData
              });
              alert("评论已提交");
              console.log(this.commentList)
              //提交评论后，关闭弹窗
              this.isShow = false;
          }else{
            alert(res.data.err);
          }
          }).catch((err) => {
            alert(err);
          })
        }
      },
      //选择对应的视频
      selectVideo(url){
        this.videoUrl = url;
      },
      //购买课程的方法
      buyCourse(){
        if(this.isBuy){
          alert("该课程已购买");
        }else{
          this.$axios({
            method:"post",
            url:"/Handler/CourseHandler?action=buycourse",
            data:{
              userName:this.userName,
              courseId:this.courseId
            }
          }).then((res) => {
            console.log(res.data);
            if(res.data.success){
              alert("购买成功");
              this.isBuy = true;
          }else{
            alert(res.data.err);
          }
          }).catch((err) => {
            alert(err);
          })
        }
      }
    }
  }
</script>

<style>
.video_wrap{
  height: 10.6rem;
}
  .select_wrap{
    margin-top: 0.25rem;
  }
  .select span{
    float: left;
    display: block;
    width: 50%;
    text-align: center;
    font-size: 0.6rem;
    padding: 0.7rem 0;
    border: 0.05rem solid #ddd;
    box-sizing: border-box;
  }
  .select-title,.video-title,.list-title{
    font-size: 0.6rem;
    padding: 0.6rem;
    border: 0.05rem solid #ddd;
    color: #444;
  }
  .courses-info{
    padding: 0.6rem;
  }
  .courses-info>div{
    margin: 0.35rem 0;
    font-size: 0.6rem;
  }
  .learn_wrap{
    padding-bottom: 2rem;
  }
  .learn-footer{
    padding: 0.5rem 0 0.7rem;
    background-color: #fff;
    box-shadow: 0 -0.05rem 0.12rem rgba(0,0,0,.1);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
  }
  .learn-item{
    width: 50%;
    text-align: center;
    float: left;
  }
.learn-item i{
  display: block;
  font-size: 0.8rem;
  color: #4d555d;
}
.learn-item span{
  display: block;
  font-size: 0.6rem;
  color: #4d555d;
}
/* 视频*/
.video-list {
  padding-left: 1.8rem;
}
.video-list .video-item {
  padding-left: 0.6rem;
  border-left: 2px dashed #ccc;
  position: relative;
  line-height: 1.5rem;
  height: 1.5rem
}

.video-list .video-item .dd {
  width: 0.3rem;
  height: 0.3rem;
  border: 2px solid #ccc;
  border-radius: 0.3rem;
  position: absolute;
  top: 0.5rem;
  left: -0.3rem;
}

.video-list .video-item .name-time {
  display: flex;
  justify-content: space-between;
  padding: 0 1.8rem 0 0;
  font-size: 14px;
}

.video-list .video-item .name-time.color {
  color: #4cd964;
}

/* 评价  */

.evaluate-list {
  padding: 0 0.1rem;
}

.evaluate-list .evaluate-item {
  min-height: 2rem;
  border: 1px solid #DDDDDD;
  display: flex;
  padding: 0.2rem 0 0 0.4rem;
}

.evaluate-list .evaluate-item .img-warp {
  height: 1.5rem;
  width: 1.5rem;
}

.evaluate-list .evaluate-item .img-warp img {
  height: 100%;
  width: 100%;
}

.evaluate-list .evaluate-item .text-warp {
  font-size: 14px;
  margin-left: 0.2rem;
  flex-grow: 2;
}

.evaluate-list .evaluate-item .text-warp p:first-child {
  margin-top: 0.4rem;
}

.evaluate-list .evaluate-item .text-warp p:last-child {
  margin-top: 0.2rem;
}

.evaluate-list .evaluate-item .time-warp {
  margin: 0.5rem 0.5rem 0 0;
  font-size: 14px;
}

.color {
  /*color: #0a9ec7;*/
  color: red;
}
  .learn-item .buyVideo{
    color: #0a9ec7 !important;
  }
</style>

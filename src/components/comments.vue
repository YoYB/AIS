<template>
  <div v-show="isShow" class="comments_wrap">
    <header class="page-title">
      写评论
      <span @click="closeComment">关闭</span>
    </header>
    <div class="comments_write">
      <textarea maxlength="300" placeholder="吐槽、表扬、鼓励......想说啥就说啥！" v-model="commentData"></textarea>
      <!--<span>300</span>-->
      <button @click="submitComment">提交</button>
    </div>
  </div>
</template>

<script>
  export default{
    props:['isShow'],
    data(){
      return {
        commentData:""
      }
    },
    methods:{
      closeComment(){
        this.$emit('closeComment');
      },
      submitComment(){
        this.$emit('submitComment',this.commentData);
        this.commentData = '';
      }
    }
  }
</script>

<style scoped="scoped">
  .comments_wrap{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 999;
    background: #FFFFFF;
  }
  .page-title {
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: 1rem;
    text-align: center;
    border: 1px solid #0c60ee;
    z-index: 2;
    background-color: #387ef5;
    color: #FFFFFF;
    position: relative;
  }

  .page-title span {
    position: absolute;
    right: 1rem;
  }
  .comments_write{
    margin-top: 2rem;
  }
  .comments_write textarea{
    display: block;
    width: 17.1rem;
    height: 12.2rem;
    border: 0.05rem solid #ccc;
    margin: 0 auto;
    resize: none;
    font-size: 0.7rem;
    color: #757575;
    padding: 0.6rem 0.5rem;
    box-sizing: border-box;
  }
  .comments_write span{
    width: 17.1rem;
    margin: 1rem auto 0;
    display: block;
    text-align: right;
    font-size: 0.45rem;
    color: #ccc;
  }
  .comments_write button{
    display: block;
    width: 14.5rem;
    margin: 1.95rem auto 0;
    padding: 0.7rem 0;
    background-color: #387ef5;
    border-radius: 0.2rem;
    font-size: 0.75rem;
    color: #fff;
    text-align: center;
  }
</style>

<template>
  <div class="article">
    <el-row>
      <el-col class="hidden-sm-and-down" style="margin-top: 100px;background-color: rgba(255,217,242,0)"></el-col>
      <el-col :lg="{span: 12, offset: 7}" :md="{span: 18, offset: 5}">
        <div class="article-image">
          <img src="@/assets/img/article-img.png">
          <h1 class="article-title">文章列表页</h1>
        </div>
        <div class="article-item" v-for="item of articles" :key="item.id">
          <div class="article-image">
            <img :src="item.image">
            <div class="article-title">{{item.title}}</div>
          </div>
          <div class="article-content">
            <div style="padding-top: 20px; padding-left: 16px; color: #757575!important; display: flex;justify-content: left">
              <div style="width: 80%"><p class="line-limit-length">{{item.content}}</p></div>
              <router-link :to="/content/+item.id">阅读全文</router-link>
            </div>
            <hr style="margin: 16px">
            <div class="editor-info">
              <img :src="item.user.image" class="user-img" style="float: left" :alt="item.name"/>
              <div style="margin-left: 10px; float: left; font-size: 12px;">
                <p style="margin: 2px">{{item.user.nick_name}}</p>
                <p>{{timeFormat(item.update_time)}}</p>
              </div>
              <div style="margin-right:16px;margin-top: 30px;float: right; font-size: small">
                <a href="#">评论数: {{item.comment_nums}} </a>&nbsp;<a href="#">点赞数: {{item.fav_nums}} </a>&nbsp;<a href="#">阅读数: {{item.view_nums}} </a>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col style="margin-top: 20px; margin-bottom: 100px; background-color: rgba(222,146,181,0)"
              :lg="{span: 12, offset: 7}" :md="{span: 18, offset: 5}">
        <router-link tag="div" to="/article" >
          <div class="article-item article-back" style="float: left">
            <el-button icon="el-icon-arrow-left" circle></el-button>
            <span> Article</span>
          </div>
        </router-link>
        <router-link tag="div" to="/message" >
          <div class="article-item article-next" style="float: right">
            <span>Message </span>
            <el-button icon="el-icon-arrow-right" circle></el-button>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable no-console */
import {getNewArticle} from "../../../api/index"
import moment from 'moment'

export default {
  name: 'Article',
  data () {
    return {
      articles: [],
    }
  },
  methods: {
    timeFormat (time) {
      return moment(time).format('YYYY-MM-DD')
    },
    getAllArticle () {
      getNewArticle ()
        .then((response)=> {
          console.log(response)
          this.articles = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
  created(){
    this.getAllArticle();
  }
}
</script>

<style lang="stylus" scoped>
  .article-image
    width 100%
    overflow hidden
    img
      width 100%
    .article-title
      color white
      text-align left
      font-size 30px
      line-height 50px
      margin-left 6px
      margin-top -50px
      margin-bottom 0
      top 100%
  .carousel-title
    display flex
    position absolute
    left 0
    bottom 0
    color white
    font-size 25px
    margin-left 20px
    margin-bottom 20px
    background-color rgba(41,41,41,0.6)
  .el-col
    background-color rgba(255,255,255,0.5)
    .article-item
      margin-top 40px
      .article-image
        position relative
        background-color white
        width 100%
        overflow hidden
        img
          width 100%
        .article-title
          display flex
          position absolute
          left 0
          bottom 0
          color white
          font-size 25px
          margin-left 0
          margin-bottom 4px
          background-color rgba(41,41,41,0.6)
      .article-content
        text-align left
        width 100%
        height 130px
        background-color rgba(255,255,255,1)
        .user-img
          width 44px
          height 44px
          border-radius 30px
          margin-left 16px
</style>

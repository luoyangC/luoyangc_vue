<template>
  <div class="article">
    <el-row>
      <el-col :lg="{span: 12, offset: 7}" :md="{span: 18, offset: 5}">
        <div class="article-item" style="margin-top: 0">
          <el-row>
            <el-col :lg="16" :md="18" style="margin-top: 0">
              <div style="height: 350px; background-color: #f4a7b9">
                <el-carousel height="350px">
                  <el-carousel-item>
                    <div class="carousel-title">Django 项目笔记</div>
                    <img style="height: 450px" src="@/assets/img/r1.png"/>
                  </el-carousel-item>
                  <el-carousel-item>
                    <div class="carousel-title">Django 项目笔记</div>
                    <img style="height: 450px" src="@/assets/img/r2.png"/>
                  </el-carousel-item>
                  <el-carousel-item>
                    <div class="carousel-title">Django 项目笔记</div>
                    <img style="height: 450px" src="@/assets/img/r3.png"/>
                  </el-carousel-item>
                  <el-carousel-item>
                    <div class="carousel-title">Django 项目笔记</div>
                    <img style="height: 450px" src="@/assets/img/r4.png"/>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </el-col>
            <el-col :lg="7" :offset="1" style="margin-top: 0">
              <div style="height: 350px;background-color: white; text-align: left; overflow: hidden">
                <img style="margin-top: 20px" width="250px" height="250px" src="@/assets/img/hj.gif">
                <div style="background-color: #f1f1f1; position: relative; margin-top: 20px; line-height: 60px; font-size: 20px">
                  <span style="margin-left: 16px">luoyangc</span>
                  <i style="float: right; margin-right: 16px" class="iconfont">&#xe72e;</i>
                  <i style="float: right; margin-right: 16px" class="iconfont">&#xe696;</i>
                </div>
              </div>
            </el-col>
          </el-row>
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
                <p>9 月 26 日</p>
              </div>
              <div style="margin-right:20px;margin-top: 20px;float: right">
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
        <router-link tag="div" to="/cross" >
          <div class="article-item article-next" style="float: right">
            <span>Cross </span>
            <el-button icon="el-icon-arrow-right" circle></el-button>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable no-console */
import {getNewArticle} from "../../../../../api"

export default {
  name: 'Article',
  data () {
    return {
      articles: [],
    }
  },
  methods: {
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
    margin-top 100px
    background-color rgba(255,255,255,0.5)
    .article-item
      margin-top 40px
      .article-image
        position relative
        width 100%
        height 300px
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
          margin-left 20px
          margin-bottom 20px
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

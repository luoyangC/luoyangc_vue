<template>
  <div class="article">
    <el-row>
      <el-col class="hidden-sm-and-down" style="margin-top: 100px;background-color: rgba(255,217,242,0)"></el-col>
      <el-col :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div class="article-image">
          <img src="@/assets/img/article-img.png">
          <h1 class="article-title">文章列表页</h1>
        </div>
        <div class="article-item" v-for="item of articles" :key="item.id">
          <div class="article-image">
            <img :src="item.image || item.image_url">
            <div class="article-title">{{item.title}}</div>
          </div>
          <div class="article-content">
            <div style="padding-top: 20px; padding-left: 16px; color: #757575!important; display: flex;justify-content: left">
              <div style="width: 80%"><p class="line-limit-length">{{item.profile}}</p></div>
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
      <el-col style="margin-top: 20px; background-color: rgba(222,146,181,0)" :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div v-if="prevPage" class="article-item article-back" style="float: left;background-color: rgba(255,255,255,0);box-shadow: 0 0 0 0">
          <el-button icon="el-icon-arrow-left" circle @click="toPrev"></el-button>
          <span> Prev</span>
        </div>
        <div v-if="nextPage" class="article-item article-next" style="float: right;background-color: rgba(255,255,255,0);box-shadow: 0 0 0 0">
          <span>Next </span>
          <el-button icon="el-icon-arrow-right" circle @click="toNext"></el-button>
        </div>
      </el-col>
    </el-row>
    <div class="hidden-md-and-down" style="width: 100%;height: 100px;background-color: rgba(97,97,97,0)">&nbsp;</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import {getArticle} from "../../../api/index"
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'Article',
  data () {
    return {
      articles: [],
      nextPage: '',
      prevPage: '',
    }
  },
  computed: {
    articleType() {
      return this.$store.state.articleType
    }
  },
  methods: {
    toPrev () {
      axios.get(this.prevPage)
        .then((response) => {
          console.log(response)
          this.articles = response.data.results
          this.nextPage = response.data.next
          this.prevPage = response.data.previous
        }).catch((error) => {
        console.log(error)
      })
    },
    toNext () {
      axios.get(this.nextPage)
        .then((response) => {
          console.log(response)
          this.articles = response.data.results
          this.nextPage = response.data.next
          this.prevPage = response.data.previous
        }).catch((error) => {
          console.log(error)
      })
    },
    timeFormat (time) {
      return moment(time).format('YYYY-MM-DD')
    },
    getAllArticle () {
      getArticle ()
        .then((response)=> {
          console.log(response)
          this.articles = response.data.results
          this.nextPage = response.data.next
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
  watch: {
    articleType: function () {
      let articleType=this.$store.state.articleType
      getArticle(articleType)
        .then((response) => {
          console.log(response)
          this.articles = response.data.results
          this.nextPage = response.data.next
        }).catch((error) => {
          console.log(error)
      })
    }
  },
  updated () {
    window.scroll(0,0)
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
    background-color rgba(255,255,255,0)
    .article-item
      margin-top 40px
      border-radius: 0;
      border: 0 solid;
      background: #0D395F
      box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.75);
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

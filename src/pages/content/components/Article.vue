<template>
  <div class="article">
    <el-row>
      <el-col class="hidden-sm-and-down" style="margin-top: 100px;background-color: rgba(255,217,242,0)"></el-col>
      <el-col :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div class="articles-image">
          <img src="@/assets/img/article-img.png">
          <div class="articles-title">
            <div style="width: 100%;">
              <h1 style="margin: 0;padding-left:6px; display: inline-block;float: left">文章列表页</h1>
              <div style="float: right;font-size: 14px;color: #00a1d6; margin-top: 12px; padding-right: 6px">
                <span style="color: #de92b5"><b>排序方式：</b></span>
                <span v-if="orderLike"><a @click="getChangeArticle('like_nums')">热门<i class="el-icon-caret-bottom"></i></a></span>
                <span v-else><a @click="getChangeArticle('-like_nums')">热门<i class="el-icon-caret-top"></i></a></span>
                <span>&nbsp;</span>
                <span v-if="orderTime"><a @click="getChangeArticle('update_time')">日期<i class="el-icon-caret-bottom"></i></a></span>
                <span v-else><a @click="getChangeArticle('-update_time')">日期<i class="el-icon-caret-top"></i></a></span>
              </div>
            </div>
          </div>
        </div>
        <div class="article-item" v-for="item of articles" :key="item.id">
          <div class="article-image">
            <router-link :to="/content/+item.id"><img :src="item.image || item.image_url"></router-link>
            <router-link :to="/content/+item.id"><div class="article-title">{{item.title}}</div></router-link>
          </div>
          <div class="article-content">
            <div style="padding-top: 20px; padding-left: 16px; padding-right: 16px; color: #757575!important; display: flex;justify-content: left">
              <div><p class="mui-ellipsis-2">{{item.profile}}</p></div>
            </div>
            <hr style="margin: 16px">
            <div class="editor-info">
              <div style="display: flex">
                <div><img :src="item.user.image" class="user-img" :alt="item.name"/></div>
                <div style="margin-left: 10px; font-size: 12px;">
                  <p style="margin: 2px">{{item.user.nick_name}}</p>
                  <p>{{timeFormat(item.update_time)}}</p>
                </div>
              </div>
              <div style="margin-right:16px;margin-top: 28px; font-size: small">
                <a href="#">评论数: {{item.comment_nums}} </a>&nbsp;<a href="#">点赞数: {{item.fav_nums}} </a>&nbsp;<a href="#">阅读数: {{item.view_nums}} </a>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col style="margin-top: 20px; background-color: rgba(222,146,181,0)" :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div v-if="prevPage" class="article-item article-back" style="float: left;background-color: rgba(255,255,255,0);box-shadow: 0 0 0 0">
          <el-button class="pageBtn" icon="el-icon-arrow-left" circle @click="toPrev"></el-button>
          <span> Prev</span>
        </div>
        <div v-if="nextPage" class="article-item article-next" style="float: right;background-color: rgba(255,255,255,0);box-shadow: 0 0 0 0">
          <span>Next </span>
          <el-button class="pageBtn" icon="el-icon-arrow-right" circle @click="toNext"></el-button>
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
      orderLike: false,
      orderTime: true,
      articles: [],
      nextPage: '',
      prevPage: '',
      beforeScrollTop: 0,
    }
  },
  computed: {
    articleType() {
      return this.$store.state.articleType
    }
  },
  methods: {
    getChangeArticle (addChange) {
      if (addChange == 'like_nums') {
        this.orderLike = false
      }
      if (addChange == '-like_nums') {
        this.orderLike = true
      }
      if (addChange == 'update_time') {
        this.orderTime = false
      }
      if (addChange == '-update_time') {
        this.orderTime = true
      }
      let articleType=this.$store.state.articleType
      articleType.ordering = addChange
      getArticle(articleType)
        .then((response) => {
          console.log(response)
          this.articles = response.data.results
          this.nextPage = response.data.next
        }).catch((error) => {
          console.log(error)
      })
    },
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
      let articleType=this.$store.state.articleType
      getArticle (articleType)
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
  },
  activated () {
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      let scroll = scrollTop - this.beforeScrollTop;
      this.beforeScrollTop = scrollTop;
      if (scroll > 0) {
        this.$store.commit('SET_STOP', {top:scrollTop, dir:'down'})
      }
      if (scroll < 0) {
        this.$store.commit('SET_STOP', {top:scrollTop, dir:'up'})
      }
    }, true)
  },
  deactivated () {
    this.orderLike=false
    this.orderTime=true
    this.articles=[]
    this.nextPage=''
    this.prevPage=''
    window.removeEventListener('scroll', () => {
      this.$store.commit('SET_STOP', 0)
    })
  }
}
</script>

<style lang="stylus" scoped>
  .pageBtn
    border: 0 solid;
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.75);
  .articles-image
    position relative
    width 100%
    overflow hidden
    img
      width 100%
    .articles-title
      display flex
      align-content space-between
      position absolute
      width 100%
      left 0
      bottom 0
      color white
      font-size 25px
      margin-bottom 10px
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
          margin-left 10px
          margin-bottom 10px
          background-color rgba(41,41,41,0.5)
      .article-content
        text-align left
        width 100%
        background-color rgba(255,255,255,1)
        .editor-info
          display flex
          justify-content space-between
          .user-img
            width 44px
            height 44px
            border-radius 30px
            margin-left 16px
</style>

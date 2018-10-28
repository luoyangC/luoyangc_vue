<template>
  <div class="index">
    <el-row>
      <el-col class="hidden-sm-and-down" style="margin-top: 100px;background-color: rgba(255,217,242,0)"></el-col>
      <el-col :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div class="index-info">
          <div class="article-banner">
            <el-carousel :interval="4000" height="300px" indicator-position="none">
              <el-carousel-item v-for="item of bannerArticles" :key="item.id">
                <div class="article-item">
                  <div class="article-image">
                    <router-link :to="/content/+item.id"><img :src="item.image || item.image_url"></router-link>
                    <div class="article-title"><router-link style="color: white" :to="/content/+item.id">{{item.title}}</router-link></div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div style="margin-top: 40px">
            <el-row>
              <el-col :xs="24" :sm="24" :md="14" :lg="16">
                <div class="index-menu">
                  <el-card class="index-info" style="border-bottom: 0">
                    <p style="text-align: center; font-size: 20px">欢迎来到这个网站</p>
                    <img src="@/assets/img/index-img.png"/>
                    <div class="user-info">
                      <div style="margin-top: 10px;flex: none">Amor</div>
                      <div style="flex: auto; margin: 0 10px">
                        <el-input placeholder="请输入搜索内容" v-model="searchInput" class="input-with-select"
                                  @keyup.enter.native="changeArticleType('search', searchInput)">
                          <el-button slot="append" icon="el-icon-search" @click="changeArticleType('search', searchInput)"></el-button>
                        </el-input>
                      </div>
                      <div style="margin-top: 10px;flex: none">
                        <el-dropdown  trigger="click" style="margin-right: 10px">
                          <span class="el-dropdown-link"><i class="el-icon-menu"></i></span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="item of categorys" :key="item.id">
                              <a @click="changeArticleType('category', item.id)">{{item.title}}</a>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown  trigger="click" style="margin-right: 10px">
                          <span class="el-dropdown-link"><i class="iconfont icon-daliebiao"></i></span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                              <router-link tag="span" to="/message">留言板</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <router-link tag="span" to="/cross">时间轴</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <router-link tag="span" to="/archives">记录</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <router-link tag="span" to="/about">关于</router-link>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </div>
                  </el-card>
                  <el-card class="index-new">
                    <p style="text-align: left; font-size: 16px;"><b>最近发表&nbsp;</b><i class="iconfont icon-new3"></i>&nbsp;</p>
                    <div v-for="item of newArticle" :key="item.id">
                      <hr>
                      <router-link :to="/content/+item.id"><h3 style="text-align: left">{{item.title}}</h3></router-link>
                      <div style="margin-right:16px;margin-top: 0; font-size: small">
                        <a>评论数: {{item.comment_nums}}</a>&nbsp;
                        <a>点赞数: {{item.like_nums}} </a>&nbsp;
                        <a>阅读数: {{item.view_nums}} </a>
                      </div>
                      <p style="text-align: left" class="mui-ellipsis-3">{{item.profile}}</p>
                    </div>
                    <hr>
                    <a href="#" @click="changeArticleType('')">更多文章...</a>
                  </el-card>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="{span:9,offset:1}" :lg="{span:7,offset:1}">
                <div class="index-tags">
                  <div class="hidden-md-and-up" style="height: 40px;width: 100%">&nbsp;</div>
                  <el-card>
                    <p style="text-align: left; font-size: 16px;"><i class="iconfont icon-tag2"></i>&nbsp;Tag云</p>
                    <el-tag v-for="(item,index) in tags" :key="index" :type="tagColors[index%5]" size="small">
                      <a @click="changeArticleType('tag', item.tag)">{{item.tag}}</a>
                    </el-tag>
                  </el-card>
                  <el-card style="margin-top:40px">
                    <p style="text-align: left; font-size: 16px;"><i class="iconfont icon-survey"></i>&nbsp;最近留言</p>
                    <div v-for="item of messageAreas" :key="item.id">
                      <div style="flex: none">
                        <hr>
                        <p style="margin: 2px;font-size: 16px; line-height: 16px;display: flex;justify-content: space-between">
                          <span>{{item.author.username}} :</span>
                          <span style="font-size: 12px">{{timeFormat(item.update_time)}}</span>
                        </p>
                      </div>
                      <div>
                        <p class="mui-ellipsis-5" style="margin: 2px">{{item.content}}</p>
                      </div>
                    </div>
                  </el-card>
                  <el-card style="margin-top:40px">
                    <h1 style="text-align: center">┏ (゜ω゜)=☞ 广告位</h1>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-col style="margin-top: 40px; background-color: rgba(222,146,181,0)"
            :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
      <router-link tag="div" to="/message" >
        <div class="message-item message-next" style="float: right">
          <span>Message </span>
          <el-button class="pageBtn" icon="el-icon-arrow-right" circle></el-button>
        </div>
      </router-link>
    </el-col>
    <div class="hidden-md-and-down" style="width: 100%;height: 100px;background-color: rgba(97,97,97,0)">&nbsp;</div>
  </div>
</template>

<script>
/* eslint-disable no-console,no-undef */

import {getArticle, getCategory, getMessage, getTags} from "../../../api"
import * as moment from "moment"

export default {
  name: 'Index',
  data () {
    return {
      tagColors: ['','success','info','warning','danger'],
      bannerArticles: [],
      newArticle: [],
      tags: [],
      searchInput: '',
      messageAreas: [],
      categorys: [],
      i: 0,
    }
  },
  methods: {
    getCategory () {
      getCategory ()
        .then((response)=> {
          console.log(response)
          this.categorys = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    timeFormat (time) {
      return moment(time).format('YYYY-MM-DD')
    },
    getNewMessage() {
      getMessage()
        .then((response) => {
          console.log(response)
          this.messageAreas = response.data.slice(0,5)
        }).catch((error) => {
        console.log(error)
      })
    },
    changeArticleType (t,n) {
      if (t=='category') {
        if (n==1) {
          this.$store.commit('SET_TYPE', {})
        }
        else {
          this.$store.commit('SET_TYPE', {category: n})
        }
      }
      if (t=='tag') {
        this.$store.commit('SET_TYPE', {tag: n})
      }
      if (t=='search') {
        this.$store.commit('SET_TYPE', {search: n})
        this.searchInput = ''
      }
      if (t=='') {
        this.$store.commit('SET_TYPE', {})
      }
      this.$router.push('/article')
    },
    getTags () {
      getTags ()
        .then((response) => {
          console.log(response)
          this.tags = response.data
        }).catch((error) => {
          console.log(error)
      })
    },
    getNewArticle () {
      getArticle({ordering:'-update_time'})
        .then((response) => {
          this.newArticle = response.data.results
        }).catch((error) => {
          console.log(error)
      })
    },
    getBannerArticle () {
      getArticle ({is_banner:2})
        .then((response) => {
          this.bannerArticles = response.data.results
        }).catch((error) => {
          console.log(error)
      })
    }
  },
  created () {
    this.getNewArticle()
    this.getBannerArticle()
    this.getTags()
    this.getNewMessage()
    this.getCategory()
  },
  activated () {
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      let scroll = scrollTop - this.i;
      console.log(this.i, scrollTop, scroll)
      this.i = scrollTop;
      if (scroll > 0) {
        this.$store.commit('SET_STOP', {top:scrollTop, dir:'down'})
      }
      if (scroll < 0) {
        this.$store.commit('SET_STOP', {top:scrollTop, dir:'up'})
      }
    }, true)
  },
  deactivated () {
    window.removeEventListener('scroll', () => {
      this.$store.commit('SET_STOP', 0)
    })
  }
}
</script>

<style lang="stylus" scoped>
  .index
    margin: auto
    width: 100%
    .el-col
      background-color rgba(255,255,255,0)
      .index-info
        .index-menu
          img
            width 55%
          .user-info
            display flex
            margin-top 20px
            flex-direction row
            justify-content space-around
          .index-new
            margin-top 40px
            text-align left
        .index-tags
          text-align left
          .el-tag
            margin 3px
        .article-item
          border-radius: 0;
          border: 0 solid;
          background: #0D395F
          box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.75);
          .article-image
            background-color white
            width 100%
            overflow hidden
            img
              width 952px
              height 300px
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
        .el-carousel__item:nth-child(2n)
          background-color: #99a9bf
        .el-carousel__item:nth-child(2n+1)
          background-color: #d3dce6
</style>

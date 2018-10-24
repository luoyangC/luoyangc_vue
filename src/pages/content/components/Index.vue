<template>
  <div class="index">
    <el-row>
      <el-col class="hidden-sm-and-down" style="margin-top: 100px;background-color: rgba(255,217,242,0)"></el-col>
      <el-col :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div class="index-info">
          <div class="article-banner">
            <el-carousel :interval="4000" height="300px" indicator-position="none">
              <el-carousel-item v-for="item of articles" :key="item.id">
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
              <el-col :xs="24" :sm="24" :md="12" :lg="14">
                <div class="index-menu">
                  <el-card class="index-info" style="border-bottom: 0">
                    <p style="text-align: center; font-size: 20px">欢迎来到这个网站</p>
                    <img src="@/assets/img/index-img.png"/>
                    <div class="user-info">
                      <div style="margin-top: 10px;flex: none">Amor</div>
                      <div style="flex: auto; margin: 0 10px">
                        <el-input placeholder="请输入内容" prefix-icon="el-icon-search"
                                  v-model="searchInput"
                                  @keyup.enter.native="changeArticleType('search', searchInput)">
                        </el-input>
                      </div>
                      <div style="margin-top: 10px;flex: none">
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
                        <router-link tag="span" to="/article"><i content="全部" class="el-icon-menu"></i></router-link>
                      </div>
                    </div>
                  </el-card>
                  <!--<el-card class="index-new">-->
                    <!--<p style="text-align: center; font-size: 20px;">最近发表</p>-->
                  <!--</el-card>-->
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="{span:10,offset:2}" :lg="{span:8,offset:2}">
                <div class="index-tags">
                  <div class="hidden-md-and-up" style="height: 40px;width: 100%">&nbsp;</div>
                  <el-card>
                    <p style="text-align: center; font-size: 20px;">Tag云</p>
                    <el-tag v-for="(item,index) in tags" :key="index" :type="tagColors[index%5]" size="small">
                      <a @click="changeArticleType('tag', item.tag)">{{item.tag}}</a>
                    </el-tag>
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
          <el-button icon="el-icon-arrow-right" circle></el-button>
        </div>
      </router-link>
    </el-col>
    <div class="hidden-md-and-down" style="width: 100%;height: 100px;background-color: rgba(97,97,97,0)">&nbsp;</div>
  </div>
</template>

<script>
/* eslint-disable no-console,no-undef */

import {getArticle, getTags} from "../../../api"

export default {
  name: 'Index',
  data () {
    return {
      tagColors: ['','success','info','warning','danger'],
      articles: [],
      tags: [],
      searchInput: '',
      i: 0,
    }
  },
  methods: {
    changeArticleType (t,n) {
      if (t=='tag') {
        this.$store.commit('SET_TYPE', {tag: n})
      }
      if (t=='search') {
        this.$store.commit('SET_TYPE', {search: n})
        this.searchInput = ''
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
    getArticle () {
      getArticle ({is_banner:2})
        .then((response) => {
          this.articles = response.data.results
        }).catch((error) => {
          console.log(error)
      })
    }
  },
  created () {
    this.getArticle()
    this.getTags()
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

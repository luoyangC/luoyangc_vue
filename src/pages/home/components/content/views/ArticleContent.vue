<template>
  <div class="content">
    <el-row>
      <el-col :lg="{span: 12, offset: 7}" :md="{span: 18, offset: 5}">
        <div class="content-image">
          <h1 class="content-title">{{content.title}}</h1>
          <img :src=content.image>
        </div>
        <div class="editor-info">
          <img src="@/assets/img.jpeg" class="user-img" style="float: left"/>
          <div style="margin-left: 10px; float: left; font-size: 12px;">
            <p style="margin: 2px">{{username}}</p>
            <p>9 月 26 日</p>
          </div>
          <div style="margin-right:20px;margin-top: 20px;float: right">
            <a href="#">评论数: {{content.comment_nums}}</a>&nbsp;<a href="#">点赞数: {{content.like_nums}} </a>&nbsp;<a href="#">阅读数: {{content.view_nums}} </a>
          </div>
        </div>
        <div class="content-info">
          <vue-markdown v-highlight :source=content.content></vue-markdown><hr>
        </div>
        <div class="content-operation">
          <el-button style="color: red" round icon="iconfont icon-like">喜欢 | 100</el-button>
          <el-button style="float: right" round>更多分享</el-button>
          <el-tooltip style="float: right"  effect="dark" content="分享到微博" placement="top-start">
            <el-button style="color: rgb(234, 93, 92)" icon="iconfont icon-weibo1" circle></el-button>
          </el-tooltip>
          <el-tooltip style="float: right"  effect="dark" content="分享到微信" placement="top-start">
            <el-button style="color: rgb(80, 182, 116)" icon="iconfont icon-weixin1" circle></el-button>
          </el-tooltip>
        </div>
        <div class="content-input">
          <div v-if="isLogin">
            <h3>在此添加评论:</h3>
            <el-input placeholder="请输入内容">
              <i slot="prefix" class="el-input__icon el-icon-edit"></i>
            </el-input>
          </div>
          <div v-else>
            <el-card style="text-align: center;margin: 19px">
              <el-button style="color: red" round >登录</el-button>&nbsp;后发表评论
            </el-card>
          </div>
        </div>
        <div class="comment-list" v-for="item of commentList" :key="item.id">
          <el-card>
            <div class="commenter-info">
              <div style="float: left">
                <img :src="item.user.image" class="user-img"/>
              </div>
              <div style="float: left; margin-left: 20px">
                <span>{{item.user.username}} </span><span>2018-10-1,10:25:31</span>
                <p style="margin: 0">{{item.content}}</p>
              </div>
            </div>
            <div style="text-align: left; margin-left: 75px">
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item :name="item.id">
                  <div slot="title">
                    <i class="iconfont">&#xe6a7; {{item.replys.length}}</i>&nbsp;&nbsp;
                    <i v-if="like" class="iconfont" @click.stop="likeChange">&#xe71a; {{item.like_nums}}</i>
                    <i v-else class="iconfont" @click.stop="likeChange">&#xe71b; {{item.like_nums}}</i>
                    <span style="float: right">查看全部回复</span>
                  </div>
                  <div v-for="reply of item.replys" :key="reply.id">
                    <div class="commenter-info">
                    <div style="float: left">
                      <img :src="reply.from_user.image" class="user-img"/>
                    </div>
                    <div style="float: left; margin-left: 20px">
                      <span>{{reply.from_user.username}} </span>
                      <span>回复 </span>
                      <span><a href="#">{{reply.to_user.username}} </a></span>
                      <span>2018-10-1,10:25:31</span>
                      <p style="margin: 0">{{reply.content}}</p>
                    </div>
                  </div>
                    <br>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col style="margin-top: 40px; margin-bottom: 100px; background-color: rgba(222,146,181,0)"
              :lg="{span: 12, offset: 7}" :md="{span: 18, offset: 5}">
        <router-link tag="div" to="/article" >
          <div class="content-item content-back" style="float: left">
            <el-button icon="el-icon-arrow-left" circle></el-button>
            <span> Article</span>
          </div>
        </router-link>
        <router-link tag="div" to="/cross" >
          <div class="content-item content-next" style="float: right">
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
import VueMarkdown from 'vue-markdown'
import {getArticleContent, getCommentList} from "../../../../../api"
export default {
  name: 'ArticleContent',
  components: {
    VueMarkdown
  },
  data () {
    return {
      isLogin: false,
      like: true,
      activeName: '1',
      commentList: [],
      content: '',
      username: ''
    }
  },
  methods: {
    likeChange() {
      this.like = !this.like
    },
    getArticle () {
      getArticleContent(this.$route.params.id)
        .then((response)=> {
          this.content = response.data
          this.username = response.data.user.username
          console.log(response)

        }).catch(function (error) {
        console.log(error);
      });
    },
    getComment () {
      getCommentList({'article':this.$route.params.id})
        .then((response)=> {
          this.commentList = response.data
          console.log(response)

        }).catch(function (error) {
        console.log(error);
      });
    }
  },
  created () {
    this.getArticle()
    this.getComment()
  }
}
</script>

<style lang="stylus" scoped>
  .el-col
    margin-top 100px
    background-color rgba(255,255,255,1)
    .content-image
      width 100%
      height 300px
      overflow hidden
      img
        width 100%
      .content-title
        position absolute
        color white
        font-size 40px
        margin-left 20px
        top 280px
    .editor-info
      padding-top 20px
      width 100%
      height 50px
      background-color white
      .user-img
        width 44px
        height 44px
        border-radius 30px
        margin-left 16px
    .content-info
      padding 20px
      background-color white
      text-align left
      font-size 20px
    .content-operation
      padding 0 20px
      height 60px
      text-align left
    .content-input
      padding 0 20px
      margin-bottom 20px
      height 80px
      text-align left
      background-color white
    .commenter-info
      text-align left
      width 100%
      height 50px
      background-color rgba(247,247,247,1)
      line-height 25px
      .user-img
        width 50px
        height 50px
        border-radius 30px
</style>

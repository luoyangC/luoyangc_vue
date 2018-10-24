<template>
  <div class="content">
    <el-row>
      <el-col class="hidden-sm-and-down" style="margin-top: 100px;background-color: rgba(255,217,242,0)"></el-col>
      <el-col :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div class="content-image">
          <img :src="articleInfo.image || articleInfo.image_url">
        </div>
        <div class="editor-info">
          <img :src=userInfo.image class="user-img" style="float: left;margin-top: 6px" @click="toUserInfo(userInfo.id)"/>
          <div style="margin-left: 10px;margin-top: 6px; float: left; font-size: 12px;">
            <p style="margin: 2px" @click="toUserInfo(userInfo.id)">{{userInfo.username}}</p>
            <p style="margin-bottom: 0">{{timeFormat(articleInfo.update_time)}}</p>
          </div>
          <div style="margin-right:16px;margin-top: 0;float: right;font-size: smaller">
            <p v-if="articleInfo.is_author" style="margin: 8px 0; text-align: right"><router-link :to="/editor/+articleInfo.id">编辑</router-link></p>
            <p v-else style="margin: 8px 0; text-align: right"><a>&nbsp;</a></p>
            <a href="#" >评论数: {{articleInfo.comment_nums}}</a>&nbsp;<a href="#">点赞数: {{articleInfo.like_nums}} </a>&nbsp;<a href="#">阅读数: {{articleInfo.view_nums}} </a>
          </div>
        </div>
        <div class="article-tags">
          <el-tag v-for="tag in articleTags" :key="tag">
            <a @click="changeArticleType('tag', tag)">{{tag}}</a>
          </el-tag>
        </div>
        <div class="content-info">
          <mavon-editor
            :toolbars="toolbars"
            :subfield=false
            :editable=false
            :boxShadow=true
            defaultOpen="preview"
            v-model="content"
            style="z-index: 101">
          </mavon-editor>
        </div>
        <div class="content-operation">
          <el-button v-if="articleInfo.is_fav" @click="deleteFav" style="color: red;padding: 12px" round icon="iconfont icon-like_fill">取消 | {{articleInfo.fav_nums}}</el-button>
          <el-button v-else @click="addFav" style="color: red;padding: 12px" round icon="iconfont icon-like">收藏 | {{articleInfo.fav_nums}}</el-button>
          <el-button v-if="articleInfo.is_like" @click="deleteLike(like_type='article',id=articleInfo.is_like)" style="color: red" circle icon="iconfont icon-praise_fill"></el-button>
          <el-button v-else @click="addLike(like_type='article',like_id=articleInfo)" style="color: red" circle icon="iconfont icon-praise"></el-button>
          <el-button style="float: right;padding: 12px" round>更多分享</el-button>
          <el-tooltip style="float: right"  effect="dark" content="分享到微信" placement="top-start">
            <el-button style="color: rgb(80, 182, 116)" icon="iconfont icon-weixin1" circle></el-button>
          </el-tooltip>
        </div>
        <div class="content-input">
          <div v-if="isLogin">
            <h3>在此添加评论:</h3>
            <el-input placeholder="请输入评论内容" v-model="commentInfo" @keyup.enter.native="addComment">
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
                <img :src="item.user.image" class="user-img" @click="toUserInfo(item.user.id)"/>
              </div>
              <div style="float: left; margin-left: 20px">
                <p class="line-limit-length" @click="toUserInfo(item.user.id)">{{item.user.username}} </p>
                <p class="line-limit-length">{{timeFormat(item.create_time)}}</p>
              </div>
              <div style="float: right;">
                <a v-if="item.is_like"><i class="iconfont" @click="deleteLike(like_type='comment',id=item.is_like)">&#xe71a; {{item.like_nums}}</i></a>
                <a v-else><i class="iconfont" @click="addLike(like_type='comment',like_id=item)">&#xe71b; {{item.like_nums}}</i></a>
              </div>
              <div v-show="item.user.username===isLogin" style="float: right;margin-right: 20px">
                <a @click="deleteComment(item)">删除该评论</a>
              </div>
            </div>
            <div class="comment-info" style="margin-left: 70px">
              <p style="text-align: left">{{item.content}}</p>
            </div>
            <div style="text-align: left; margin-left: 75px">
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item :name="item.id">
                  <div @click="clickReply(item.user.id)" class="comment-operation" slot="title">
                    <a><i class="iconfont">&#xe6a7; {{item.replys.length}}&nbsp;&nbsp;查看全部回复</i></a>
                  </div>
                  <div class="reply-list" v-for="reply of item.replys" :key="reply.id">
                    <div class="commenter-info">
                      <div style="float: left"><img :src="reply.from_user.image" class="user-img" @click="toUserInfo(reply.from_user.id)"/></div>
                      <div style="float: left; margin-left: 20px">
                        <p class="line-limit-length">
                          <a @click="toUserInfo(reply.from_user.id)">{{reply.from_user.username}}</a>&nbsp;回复&nbsp;
                          <a href="#" @click="toUserInfo(reply.to_user.id)">{{reply.to_user.username}} </a>
                        </p>
                        <p class="line-limit-length">{{timeFormat(reply.create_time)}}</p>
                      </div>
                      <div style="float: right;">
                        <a v-if="reply.is_like"><i class="iconfont" @click="deleteLike(like_type='reply',id=reply.is_like)">&#xe71a; {{reply.like_nums}}</i></a>
                        <a v-else><i class="iconfont" @click="addLike(like_type='reply',like_id=reply)">&#xe71b; {{reply.like_nums}}</i></a>
                        <div style="margin-right: 10px" v-if="reply.from_user.username===isLogin">
                          <a><i class="iconfont" @click="deleteReply(reply.id)">删除</i></a>
                        </div>
                        <div style="margin-right: 10px" v-else>
                          <a><i class="iconfont" @click="clickReply(reply.from_user.id)">回复</i></a>
                        </div>
                      </div>
                    </div>
                    <div class="reply-info">
                      <p>{{reply.content}}</p>
                    </div>
                    <hr>
                  </div>
                  <div>
                    <el-input v-if="isLogin" v-model="replyInfo" placeholder="回复内容" @keyup.enter.native="addReply(item.id)">
                      <!--<el-upload-->
                        <!--slot="prepend"-->
                        <!--class="upload-demo iconfont icon-tupian"-->
                        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                        <!--:on-preview="handlePreview"-->
                        <!--:on-remove="handleRemove"-->
                        <!--:before-remove="beforeRemove"-->
                        <!--multiple-->
                        <!--:limit="3"-->
                        <!--:on-exceed="handleExceed"-->
                        <!--:file-list="fileList">-->
                        <!--<el-button size="small" type="primary"></el-button>-->
                      <!--</el-upload>-->
                    </el-input>
                    <div v-else>
                      <p style="margin-bottom: 0; margin-top: 20px">请先点击右上角登录，才能回复哦</p>
                      <p style="margin-bottom: 0;">如果还没有账号，欢迎 <router-link to="/registe">注册</router-link></p>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col style="margin-top: 40px; background-color: rgba(222,146,181,0)"
              :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div class="content-item content-back" style="float: left">
          <el-button icon="el-icon-arrow-left" circle @click="toBack"></el-button>
          <span> Back</span>
        </div>
        <router-link tag="div" to="/index" >
          <div class="content-item content-next" style="float: right">
            <span>Index </span>
            <el-button icon="el-icon-arrow-right" circle></el-button>
          </div>
        </router-link>
      </el-col>
    </el-row>
    <div class="hidden-md-and-down" style="width: 100%;height: 100px;background-color: rgba(97,97,97,0)">&nbsp;</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import VueMarkdown from 'vue-markdown'
import {addComment, addReply, getArticleContent, getCommentList, deleteReply, deleteComment} from "../../../api/index"
import {addFavArticle, deleteFavArticle, addLike, deleteLike} from "../../../api/index"
import moment from 'moment'
export default {
  name: 'ArticleContent',
  components: {
    VueMarkdown
  },
  data () {
    return {
      articleTags: [],
      isLogin: this.$store.state.userInfo.name,
      activeName: '1',
      commentList: [],
      articleInfo: '',
      content: '',
      userInfo: '',
      commentInfo: '',
      replyInfo: '',
      to_user_id: 0,
      toolbars:{readmodel: true, navigation: true},
      beforeScrollTop: 0,
    }
  },
  methods: {
    changeArticleType (t,n) {
      this.$store.commit('SET_TYPE', {tag: n})
      this.$router.push('/article')
    },
    toBack () {
      this.$router.go(-1)
    },
    toUserInfo (id) {
      this.$router.push('/userInfo/'+id)
    },
    timeFormat (time) {
      return moment(time).format('YYYY-MM-DD')
    },
    deleteLike (like_type,id) {
      deleteLike(id)
        .then((response) => {
          console.log(response)
          // 判断类型
          if (like_type == 'article') {
            this.articleInfo.is_like = false
            this.articleInfo.like_nums --
          }
          if (like_type == 'comment') {
            this.commentList.forEach((item)=>{
              if (item.is_like == id) {
                item.is_like = false
                item.like_nums --
              }
            })
          }
          if (like_type == 'reply') {
            this.commentList.forEach((item)=>{
              item.replys.forEach((reply)=>{
                if (reply.is_like == id) {
                  reply.is_like = false
                  reply.like_nums --
                }
              })
            })
          }
        }).catch((error) => {
          console.log(error)
      })
    },
    addLike (like_type,like) {
      addLike({like_type:like_type,like_id:like.id})
        .then((response) => {
          console.log(response)
          // 判断类型
          if (like_type == 'article') {
            this.articleInfo.is_like = response.data.id
            this.articleInfo.like_nums ++
          }
          if (like_type == 'comment') {
            this.commentList.forEach((item)=>{
              if (item.id == like.id) {
                item.is_like = response.data.id
                item.like_nums ++
              }
            })
          }
          if (like_type == 'reply') {
            this.commentList.forEach((item)=>{
              item.replys.forEach((reply)=>{
                if (reply.id == like.id) {
                  reply.is_like = response.data.id
                  reply.like_nums ++
                }
              })
            })
          }
        }).catch((error) => {
          console.log((error))
      })
    },
    deleteFav () {
      deleteFavArticle (this.articleInfo.is_fav)
        .then((response) => {
          console.log(response)
          this.articleInfo.is_fav = 0
          this.articleInfo.fav_nums --
        }).catch((error) => {
          console.log(error)
      })
    },
    addFav () {
      addFavArticle ({article:this.articleInfo.id})
        .then((response) => {
          console.log(response)
          this.articleInfo.is_fav = response.data.id
          this.articleInfo.fav_nums ++
        }).catch((error) => {
          console.log(error)
      })
    },
    deleteComment (comment) {
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteComment (comment.id)
          .then((response) => {
            console.log(response)
            this.articleInfo.comment_nums --
            for (let i = 0; i <comment.replys.length; i++) {
              this.articleInfo.comment_nums --
            }
            this.getComment()
          }).catch((error) => {
            console.log(error)
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteReply (reply_id) {
      this.$confirm('此操作将永久删除该回复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteReply ((reply_id))
          .then((response) => {
            console.log(response)
            this.articleInfo.comment_nums --
            this.getComment()
          }).catch((error) => {
            console.log(error)
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    clickReply (user_id) {
      this.to_user_id = user_id
    },
    getArticle () {
      getArticleContent(this.$route.params.id)
        .then((response)=> {
          this.articleInfo = response.data
          this.content = response.data.content
          this.userInfo = response.data.user
          this.articleTags = response.data.tags.split(',')
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
    },
    addComment () {
      addComment ({article:this.articleInfo.id,content:this.commentInfo})
        .then((response)=> {
          console.log(response)
          this.articleInfo.comment_nums ++
          this.getComment()
          this.commentInfo = ''
        }).catch((error) => {
          console.log(error)
      })
    },
    addReply (comment) {
      if (this.to_user_id == 0){
        alert('请选择回复用户')
      }else {
        addReply({comment: comment, content: this.replyInfo, to_user_id: this.to_user_id})
          .then((response) => {
            console.log(response)
            this.articleInfo.comment_nums ++
            this.getComment()
            this.replyInfo = ''
            this.to_user_id = 0
          }).catch((error) => {
          console.log(error)
        })
      }
    },
  },
  activated () {
    this.getArticle()
    this.getComment()
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
    this.articleTags = []
    window.removeEventListener('scroll', () => {
      this.$store.commit('SET_STOP', 0)
    })
  },
}
</script>

<style lang="stylus" scoped>
  .el-col
    background-color rgba(255,255,255,1)
    .content-image
      width 100%
      overflow hidden
      img
        width 100%
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
    .article-tags
      display flex
      justify-content flex-start
      text-align left
      .el-tag
        margin-top 20px
        margin-left 16px
    .content-info
      padding 20px 0
      background-color white
      text-align left
      font-size 20px
    .content-operation
      padding 0 16px
      height 60px
      text-align left
    .content-input
      padding 0 16px
      margin-bottom 20px
      height 80px
      text-align left
      background-color white
    .commenter-info
      text-align left
      width 100%
      height 50px
      line-height 25px
      .user-img
        width 50px
        height 50px
        border-radius 30px
</style>

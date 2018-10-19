<template>
  <div>
    <el-row>
      <el-col class="hidden-sm-and-down" style="margin-top: 100px;background-color: rgba(255,217,242,0)"></el-col>
      <el-col :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div class="message-image">
          <img src="@/assets/img/message-img.png">
          <h1 class="message-title">留言板</h1>
        </div>
        <div class="message-item message-update-time">
          <el-card>
            <p>本页最后更新时间为 2018 年 9 月 26 日 10 时 14 分 40 秒</p>
          </el-card>
        </div>

        <div class="message-item">
          <el-card>
            <h2>『关于本页』</h2>
            <p>对本站有什么建议或者想对开发者说的话都可以写在留言中</p>
            <p>留言可以采取匿名的方式发表，想写什么都可以哦~(￣▽￣)~*</p>
            <div v-if="isLogin">
              <h3>在此添加评论:</h3>
              <el-input type="textarea"
                        :autosize="{ minRows: 4, maxRows: 4}"
                        placeholder="请输入内容"
                        @keyup.enter.native="addMessage(true)"
                        v-model="messageContent">
              </el-input>
              <div style="margin-top: 20px">
                <el-button type="danger" plain @click="addMessage(false)">直接发表</el-button>
                <el-button type="info" plain @click="addMessage(true)">匿名发表</el-button>
              </div>
            </div>
            <div v-else>
              <el-card style="text-align: center;margin: 19px">
                <el-button style="color: red" round >登录</el-button>&nbsp;后发表评论
              </el-card>
            </div>
          </el-card>
        </div>
        <div class="message-item">
          <el-card class="message-item" v-for="item of messageAreas" :key="item.id">
            <div class="editor-info">
              <img style="flex: none" :src="item.author.image" class="user-img" :alt="item.name"/>
              <div style="flex: none">
                <p style="margin: 2px">{{item.author.username}} :</p>
                <p style="margin: 2px;font-size: 12px; line-height: 14px">{{timeFormat(item.update_time)}}</p>
              </div>
              <div style="margin-left: 10px;">
                <p style="margin: 2px">{{item.content}}</p>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col style="margin-top: 20px; background-color: rgba(222,146,181,0)"
              :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <router-link tag="div" to="/index" >
          <div class="message-item message-back" style="float: left">
            <el-button icon="el-icon-arrow-left" circle></el-button>
            <span> Index</span>
          </div>
        </router-link>
        <router-link tag="div" to="/cross" >
          <div class="message-item message-next" style="float: right;background-color: rgba(255,255,255,0)">
            <span>Cross </span>
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

  import {addMessage, getMessage} from "../../../api"
  import moment from 'moment'

export default {
  name: 'Message',
  data () {
    return {
      messageAreas: [],
      messageContent: '',
      isLogin: this.$store.state.userInfo.name,
    }
  },
  methods: {
    timeFormat (time) {
      return moment(time).format('YYYY-MM-DD')
    },
    getMessage() {
      getMessage()
        .then((response) => {
          console.log(response)
          this.messageAreas = response.data
        }).catch((error) => {
          console.log(error)
      })
    },
    addMessage(anonymous) {
      addMessage({content:this.messageContent,anonymous:anonymous})
        .then((response) => {
          console.log(response)
          this.messageContent = ''
          this.getMessage()
        }).catch((error) => {
          console.log(error)
      })
    }
  },
  created () {
    this.getMessage()
  },
  activated () {
    window.addEventListener('scroll', () => {
      this.$store.commit('SET_STOP', document.documentElement.scrollTop)
    })
  },
  deactivated () {
    window.removeEventListener('scroll', () => {
      this.$store.commit('SET_STOP', 0)
    })
  }
}
</script>

<style lang="stylus" scoped>
  .el-col
    background-color rgba(255,255,255,0.5)
    .message-image
      width 100%
      overflow hidden
      img
        width 100%
      .message-title
        color white
        text-align left
        font-size 30px
        line-height 50px
        margin-left 6px
        margin-top -50px
        margin-bottom 0
        top 100%
    .message-item
      margin-top 40px
      text-align left
      line-height 25px
      background-color rgba(255,255,255,0.8)
      .editor-info
        display flex
        justify-content start
        align-items flex-start
        .user-img
          width 44px
          height 44px
          border-radius 30px
          margin-right 5px
    .message-back
      background-color rgba(255,255,255,0)
      el-button
        background-color rgba(255,255,255,1)
    .message-item
      margin-top 20px

</style>

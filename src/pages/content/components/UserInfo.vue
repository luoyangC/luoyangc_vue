<template>
  <div class="info">
    <el-row>
      <el-col class="hidden-sm-and-down" style="margin-top: 100px;background-color: rgba(255,217,242,0)"></el-col>
      <el-col :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div class="user-image">
          <img src="@/assets/img/info-img.png">
          <h1 class="user-title">用户详情</h1>
        </div>
        <div class="user-info">
          <el-card class="hidden-sm-and-down" style="width: 50%;justify-content: center">
            <ul class="info-ul">
              <li style="text-align: center; margin-bottom: 50px">
                <img :src="user.image" class="user-img"/>
                <p>
                  <span>{{user.nick_name || user.username}}</span>
                  <i v-if="user.gender=='male'" class="iconfont icon-nan"></i>
                  <i v-if="user.gender=='female'" class="iconfont icon-nv"></i>
                  <i v-if="user.gender=='unknown'" class="iconfont icon-male8"></i>
                </p>
              </li>
              <li>
                <i class="iconfont icon-yonghu">&nbsp;&nbsp;账户名称</i>
                <p>{{user.username}}</p><hr>
              </li>
              <li>
                <i class="iconfont icon-mail">&nbsp;&nbsp;注册邮箱</i>
                <p>{{user.email}}</p><hr>
              </li>
              <li>
                <i class="iconfont icon-calendar">&nbsp;&nbsp;用户生日</i>
                <p>{{user.birthday || '未设置'}}</p><hr>
              </li>
              <li>
                <i class="iconfont icon-wangzhan">&nbsp;&nbsp;个人网站</i>
                <p>{{user.github || '未设置'}}</p><hr>
              </li>
              <li>
                <i class="iconfont icon-imagetext">&nbsp;&nbsp;个人简介</i>
                <p>{{user.profile || '该用户什么也没留下'}}</p><hr>
              </li>
            </ul>
          </el-card>
          <el-card class="hidden-md-and-up" style="width: 90%;justify-content: center">
            <ul class="info-ul">
              <li style="text-align: center; margin-bottom: 50px">
                <img :src="user.image" class="user-img"/>
                <p>
                  <span>{{user.nick_name || user.username}}</span>
                  <i v-if="user.gender=='male'" class="iconfont icon-nan"></i>
                  <i v-if="user.gender=='female'" class="iconfont icon-nv"></i>
                  <i v-if="user.gender=='unknown'" class="iconfont icon-male8"></i>
                </p>
              </li>
              <li>
                <i class="iconfont icon-yonghu">&nbsp;&nbsp;账户名称</i>
                <p>{{user.username}}</p><hr>
              </li>
              <li>
                <i class="iconfont icon-mail">&nbsp;&nbsp;注册邮箱</i>
                <p>{{user.email}}</p><hr>
              </li>
              <li>
                <i class="iconfont icon-calendar">&nbsp;&nbsp;用户生日</i>
                <p>{{user.birthday || '未设置'}}</p><hr>
              </li>
              <li>
                <i class="iconfont icon-wangzhan">&nbsp;&nbsp;个人网站</i>
                <p>{{user.github || '未设置'}}</p><hr>
              </li>
              <li>
                <i class="iconfont icon-imagetext">&nbsp;&nbsp;个人简介</i>
                <p>{{user.profile || '该用户什么也没留下'}}</p><hr>
              </li>
            </ul>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-col style="margin-top: 40px; background-color: rgba(222,146,181,0)"
            :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
      <div class="user-item user-back" style="float: left">
        <el-button @click="goBack" icon="el-icon-arrow-left" circle></el-button>
        <span> Back</span>
      </div>
      <router-link tag="div" to="/article" >
        <div class="user-item user-back" style="float: right">
          <span>Article </span>
          <el-button icon="el-icon-arrow-right" circle></el-button>
        </div>
      </router-link>
    </el-col>
    <div class="hidden-md-and-down" style="width: 100%;height: 100px;background-color: rgba(97,97,97,0)">&nbsp;</div>
  </div>
</template>

<script>
  /* eslint-disable no-console */

  import {getUserInfoById} from "../../../api"

export default {
  name: 'UserInfo',
  data () {
    return {
      user: '',
      beforeScrollTop: 0,
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getUserInfoById () {
      getUserInfoById (this.$route.params.id)
        .then((response) => {
          console.log(response)
          this.user = response.data
        }).catch((error) => {
          console.log(error)
      })
    }
  },
  activated () {
    this.getUserInfoById()
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
    window.removeEventListener('scroll', () => {
      this.$store.commit('SET_STOP', 0)
    })
  }
}
</script>

<style lang="stylus" scoped>
  .info
    margin: auto
    width: 100%
    .el-col
      background-color rgba(255,255,255,0.5)
      .user-image
        width 100%
        overflow hidden
        background-color white
        img
          width 100%
        .user-title
          color white
          text-align left
          font-size 30px
          line-height 50px
          margin-left 6px
          margin-top -50px
          margin-bottom 0
          top 100%
    .user-info
      width 100%
      padding-top 20px
      padding-bottom 20px
      display flex
      justify-content center
      align-items center
      background-color white
      .info-ul
        list-style-type none
        text-align left
        li
          margin 20px
        .user-img
          border-radius: 30px;
          width 60px
          height 60px
</style>

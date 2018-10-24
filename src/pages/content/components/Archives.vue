<template>
  <div>
    <el-row>
      <el-col class="hidden-sm-and-down" style="margin-top: 100px;background-color: rgba(255,217,242,0)"></el-col>
      <el-col :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div class="archives-image">
          <img src="@/assets/img/archives-img.png">
          <h1 class="archives-title">记录</h1>
        </div>
        <div class="archives-item archives-update-time">
          <el-card>
            <p>本页最后更新时间为 2018 年 9 月 26 日 10 时 14 分 40 秒</p>
          </el-card>
        </div>

        <div class="archives-item">
          <el-card>
            <h2>『关于本页』</h2>
            <p>这个页面是用来记录一些个人的日常动态的</p>
          </el-card>
        </div>
        <div class="archives-item">
          <el-card class="archives-item" v-for="item of archives" :key="item.id">
            <p>{{timeFormat(item.create_time)}}</p>
            <vue-markdown style="overflow: hidden;height: 100%">{{item.content}}</vue-markdown>
          </el-card>
        </div>
      </el-col>
      <el-col style="margin-top: 20px; background-color: rgba(222,146,181,0)"
              :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <router-link tag="div" to="/cross" >
        <div class="archives-item archives-back" style="float: left">
          <el-button icon="el-icon-arrow-left" circle></el-button>
          <span> Cross</span>
        </div>
        </router-link>
        <router-link tag="div" to="/about" >
        <div class="archives-item archives-next" style="float: right">
          <span>About </span>
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

  import moment from 'moment'
  import VueMarkdown from 'vue-markdown'
  import {getDynamics} from "../../../api"
export default {
  name: 'Archives',
  components: {
    VueMarkdown
  },
  data () {
    return {
      archives: [1,2,3,4,5,6,7,8,9],
      beforeScrollTop: 0,
    }
  },
  methods: {
    timeFormat (time) {
      return moment(time).format('YYYY年MM月DD日')
    },
    getDynamics () {
      getDynamics()
        .then((response) => {
          console.log(response)
          this.archives = response.data
        }).catch((error) => {
          console.log(error)
      })
    }
  },
  created () {
    this.getDynamics()
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
    window.removeEventListener('scroll', () => {
      this.$store.commit('SET_STOP', 0)
    })
  }
}
</script>

<style lang="stylus" scoped>
  .el-col
    background-color rgba(255,255,255,0.5)
    .archives-image
      width 100%
      overflow hidden
      img
        width 100%
      .archives-title
        color white
        text-align left
        font-size 30px
        line-height 50px
        margin-left 6px
        margin-top -50px
        margin-bottom 0
        top 100%
    .archives-item
      margin-top 40px
      text-align left
      line-height 25px
      .el-card
        background-color rgba(255,255,255,0.8)
    .archives-back
      background-color rgba(255,255,255,0)
      el-button
        background-color rgba(255,255,255,1)
    .archives-item
      margin-top 20px
</style>

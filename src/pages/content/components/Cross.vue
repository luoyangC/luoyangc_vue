<template>
  <div class="cross">
    <el-row>
      <el-col :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div :style="{height:corssHeight}">
          <el-steps direction="vertical" :active="corss.length">
            <el-step v-for="(item,index) of articles" :key="item.id">
              <div slot="icon">
                <span>{{timeFormat(item.update_time)}}</span>
              </div>
              <div shadow="always" slot="description" :style="isLeft(index)" class="corss-item">
                <el-card>
                  <router-link :to="/content/+item.id"><h2 class="mui-ellipsis-2">{{item.title}}</h2></router-link>
                  <p class="hidden-sm-and-down" style="text-align: right">tags：
                    <a style="margin-left: 5px;color: #00a1d6"
                       v-for="(tag,index) in item.tags.split(',')" :key="index"
                       @click="changeArticleType('tag', tag)">{{tag}}</a>
                  </p>
                  <p class="hidden-sm-and-up" style="text-align: left">tags：
                    <a style="margin-left: 5px;color: #00a1d6" @click="changeArticleType('tag', tag)">{{item.tags.split(',')[0]}}</a>
                  </p>
                  <p class="mui-ellipsis-5">{{item.profile}}</p>
                </el-card>
                <div class="nav" :style="isLeftNav(index)"></div>
              </div>
            </el-step>
          </el-steps>
        </div>
      </el-col>
      <el-col style="margin-top: 20px; background-color: rgba(222,146,181,0)"
              :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <router-link tag="div" to="/message" >
          <div class="archives-item archives-back" style="float: left">
            <el-button class="pageBtn" icon="el-icon-arrow-left" circle></el-button>
            <span> Message</span>
          </div>
        </router-link>
        <router-link tag="div" to="/archives" >
          <div class="archives-item archives-next" style="float: right">
            <span>Archives </span>
            <el-button class="pageBtn" icon="el-icon-arrow-right" circle></el-button>
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
  import {getArticleProfile} from "../../../api"
  import moment from 'moment'

export default {
  name: 'Cross',
  components: {VueMarkdown},
  data () {
    return {
      corss: [1,2,3,4,5,6,7,8,9,10,11,12,13],
      articles: [],
      beforeScrollTop: 0,
    }
  },
  computed: {
    corssHeight () {
      return this.articles.length * 240 + 'px'
    },
  },
  methods: {
    changeArticleType (t,n) {
      this.$store.commit('SET_TYPE', {tag: n})
      this.$router.push('/article')
    },
    isLeft (i) {
      if (i % 2 === 0) {
        return {justifyContent: 'flex-end'}
      } else {
        return {justifyContent: 'flex-start'}
      }
    },
    isLeftNav (i) {
      if (i % 2 === 0) {
        return {'border-bottom':'1px solid #a8aa94','border-left':'1px solid #a8aa94',order:0}
      } else {
        return {'border-top':'1px solid #a8aa94','border-right':'1px solid #a8aa94',order:2}
      }
    },
    getAllArticle () {
      getArticleProfile ()
        .then((response)=> {
          console.log(response)
          this.articles = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    timeFormat (time) {
      return moment(time).format('MMM DD YYYY')
    }
  },
  created () {
    this.getAllArticle()
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

<style lang="stylus">
  .el-step.is-vertical
    display: flex;
    flex-flow: column;
    justify-content: center
    align-items center
    .el-step__head
      order 0
      width: 100px !important
      flex-grow: 0 !important
      color: white
      border-color: white
      .el-step__line
        width: 2px
        height 300px
        top: 0
        bottom: 0
        left: 50% !important
        background-color white
      .el-step__icon
        width 60px !important
        height 60px !important
        border-radius: 0;
        border: 0 solid;
        background: #0D395F
        box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.75);
    .el-step__main
      order 1
      width 100% !important
      padding-left 0 !important
      .el-step__title
        padding-bottom 0 !important
      .el-step__description
        display flex
        width 100%
        margin 0
        padding 0
        .corss-item
          display flex
          width: 100%
          height: 200px
          margin-top -60px
          .el-card
            order 1
            width 38% !important
            height: 200px
            overflow: hidden;
            background-color rgba(255,255,255,1)
            box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.75);
            .el-card__body
              height 90%
              padding 10px
          .nav {
            position   :static;
            overflow   :hidden;
            width    :13px;
            height   :13px;
            margin-top 30px
            margin-left -6px
            margin-right -6px
            background-color: #fff;
            color: #303133;
            -webkit-transition: .3s;
            transition: .3s;
            -webkit-transform :rotate(45deg);
            -moz-transform :rotate(45deg);
            -o-transform  :rotate(45deg);
            transform   :rotate(45deg);
          }
</style>
<style lang="stylus" scoped>
  .el-col
    margin-top 100px
    text-align center
    background-color rgba(255,255,255,0)
</style>

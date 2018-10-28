<template>
  <div class="home">
    <el-container>
      <el-header :style="opacityStyle">
        <home-header @change="handleClick" v-show="showAbs"></home-header>
      </el-header>
      <el-container>
        <el-aside width="200px" class="hidden-sm-and-down">
          <home-aside :style="{display}" @change="handleClick"></home-aside>
        </el-aside>
        <el-container>
          <el-main>
            <home-content></home-content>
            <el-button  class="pageBtn hidden-sm-and-down" :style="opacityStyleBtn" @click="toTop" circle icon="el-icon-arrow-up"></el-button>
          </el-main>
          <el-footer>
            <home-footer></home-footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  /* eslint-disable no-console */

  import HomeHeader from '../header/Header'
import HomeAside from '../aside/Aside'
import HomeContent from '../content/Content'
import HomeFooter from '../footer/Footer'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeAside,
    HomeContent,
    HomeFooter
  },
  data () {
    return {
      opacityStyleBtn: {
        opacity: 0,
      },
      opacityStyle: {
        opacity: 1,
        display: 'inline',
      },
      showAbs: true,
      display: 'none',
      beforeScrollTop: null,
    }
  },
  methods: {
    toTop () {
      this.timer = setInterval (() => {
        let top = this.$store.state.scrollTop.top
        document.documentElement.scrollTop = top - 60
        if (top <= 0) {
          clearInterval(this.timer)
        }
      }, 20)
    },
    handleClick () {
      if (this.display == 'none') {
        this.display = 'flex'
        this.$store.commit('SET_OFFS', 7)
      }
      else {
        this.display = 'none'
        this.$store.commit('SET_OFFS', 6)
      }
    }
  },
  computed: {
    scrollTop() {
      return this.$store.state.scrollTop
    },
  },
  watch: {
    scrollTop: function () {
      let dir = this.$store.state.scrollTop.dir
      let top = this.$store.state.scrollTop.top
      console.log(this.$store.state.scrollTop)
      if (dir == 'down') {
        this.beforeScrollTop = null
        if (top > 200 && top < 400) {
          let opacity = (400 - top) / 200
          this.opacityStyle.opacity = opacity
          this.opacityStyleBtn.opacity = 1 - opacity
          console.log(opacity)
        }
        if (top >= 400) {
          this.opacityStyle.display = 'none'
          this.opacityStyle.opacity = 0
          this.opacityStyleBtn.opacity = 1
        }
      }
      if (dir == 'up') {
        if (this.beforeScrollTop == null) {
          this.beforeScrollTop = top
        }
        else {
          let opacity = (this.beforeScrollTop - top) / 200
          this.opacityStyle.opacity = opacity
          this.opacityStyle.display = 'inline'
        }
      }
      if (top <= 200) {
        this.opacityStyle.opacity = 1
        this.opacityStyleBtn.opacity = 0
        this.opacityStyle.display = 'inline'
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  .el-header
    z-index 110
    position fixed
    width 100%
    padding 0
  .el-aside
    z-index 100
    position fixed
    width 100px
    top 0
  .el-main
    margin-top 60px
    text-align center
    padding 0
    .el-button
      position: fixed;
      background-color: rgb(215, 185, 142);
      color: white;
      right: 50px;
      bottom: 62px;
  .el-footer
    padding 0
</style>

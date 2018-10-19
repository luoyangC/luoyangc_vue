<template>
  <div class="home">
    <el-container>
      <el-header>
        <home-header @change="handleClick" v-show="showAbs" :style="opacityStyle"></home-header>
      </el-header>
      <el-container>
        <el-aside width="200px" class="hidden-sm-and-down">
          <home-aside :style="{display}"></home-aside>
        </el-aside>
        <el-container>
          <el-main>
            <home-content></home-content>
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
      opacityStyle: {
        opacity: 1
      },
      showAbs: true,
      display: 'none',
    }
  },
  methods: {
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
    top 60px
  .el-main
    margin-top 60px
    text-align center
    padding 0
  .el-footer
    padding 0
</style>

<template>
  <div class="home">
    <el-container>
      <el-header><home-header @change="handleClick"></home-header></el-header>
      <el-container>
        <el-aside width="200px"><home-aside :style="{display}"></home-aside></el-aside>
        <el-container>
          <el-main><home-content></home-content></el-main>
          <el-footer><home-footer></home-footer></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from './components/header/Header'
import HomeAside from './components/aside/Aside'
import HomeContent from './components/content/Content'
import HomeFooter from './components/footer/Footer'
import Container from "../demo/components/Container"
export default {
  name: 'Home',
  components: {
    Container,
    HomeHeader,
    HomeAside,
    HomeContent,
    HomeFooter
  },
  data () {
    return {
      display: 'flex'
    }
  },
  methods: {
    handleClick () {
      if (this.display == 'none') {
        this.display = 'flex'
      }
      else {
        this.display = 'none'
      }
    }
  }
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
    margin-left 200px
    margin-top 60px
    text-align center
    padding 0
  .el-footer
    padding 0
</style>

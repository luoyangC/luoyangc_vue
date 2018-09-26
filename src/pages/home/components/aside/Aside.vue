<template>
  <div class="aside">
    <el-row>
      <el-col :lg="8" :offset="8">
        <img src="@/assets/img.jpeg" class="img-full"/>
      </el-col>
      <el-col>
        <el-menu default-active="2" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont">&#xe67b; </i>
              <span>归档</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"><router-link tag="span" to="/article" >March 2018</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont">&#xe69e; </i>
              <span>分类</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1"><router-link tag="span" to="/article" >Vue</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3">
            <i class="iconfont">&#xe665; </i>
            <router-link tag="span" slot="title" to="/message">留言板</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="iconfont">&#xe6bf; </i>
            <router-link tag="span" to="/cross" slot="title">时间轴</router-link>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="iconfont">&#xe74e; </i>
            <router-link tag="span" to="/archives" slot="title">记录</router-link>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="iconfont">&#xe753; </i>
            <router-link tag="span" to="/about" slot="title">关于</router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen () {

    },
    handleClose () {
    }
  }
}
</script>

<style lang="stylus" scoped>
  .img-full
    border-radius: 30px;
    width 60px
    height 60px
    margin-top 20px
    margin-bottom 20px

  .aside
    height 1000px
    background-color rgba(255,255,255,0.41)
  .el-menu
    background-color rgba(255,255,255,0.41)
    width 200px
    border 0
</style>

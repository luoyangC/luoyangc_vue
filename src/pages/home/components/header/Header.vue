<template>
  <div class="header">
    <el-row :gutter="10">
      <el-col :sm="3" :xs="3" class="hidden-md-and-up">
        <i class="el-icon-more"></i>
      </el-col>
      <el-col :lg="3" :md="5" :sm="18" :xs="18">
        <i class="iconfont" style="color: white">&#xe6ca;</i>
        <span style="color: white">骆杨的个人博客</span>
      </el-col>
      <el-col :lg="1" :md="1" :sm="1" class="hidden-sm-and-down">
        <i class="el-icon-menu" @click="headerClick"></i>
      </el-col>
      <el-col :lg="1" :md="1" :sm="1" class="hidden-sm-and-down">
        <i class="iconfont" @click="userCenter">&#xe716;</i>
      </el-col>
      <el-col :lg="5" :md="5" :sm="5" class="hidden-sm-and-down">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchInput"></el-input>
      </el-col>
      <el-col :lg="11" :md="9" :sm="8" class="hidden-sm-and-down">
        <i class="iconfont" style="color: #24292e">&#xe716;</i>
      </el-col>
      <el-col :lg="1" :md="1" :sm="1" class="hidden-sm-and-down">
        <i class="iconfont" @click="userMessage">&#xe720;</i>
      </el-col>
      <el-col :lg="2" :md="2" :sm="3" class="hidden-sm-and-down">
        <el-popover
          width="300"
          trigger="click">
          <p>用户名</p><el-input type="text" placeholder="user"></el-input>
          <p>密  码</p><el-input type="password" placeholder="password"></el-input>
          <br><br>
          <el-input type="submit"></el-input>
          <span slot="reference">登录 </span>
        </el-popover>
        <i class="el-icon-caret-bottom"></i>
      </el-col>
      <el-col :sm="3" :xs="3" class="hidden-md-and-up">
        <i class="el-icon-setting"></i>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Head',
  data () {
    return {
      searchInput: ''
    }
  },
  methods: {
    headerClick () {
      this.$emit('change')
    },
    userCenter () {
      this.$notify({
        title: '警告',
        message: '请先登录',
        type: 'warning'
      });
    },
    userMessage () {
      this.$notify({
        title: '警告',
        message: '请先登录',
        type: 'warning'
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-col
    color white
    text-align center
  .header
    line-height 60px
    background-color #24292e
  .iconfont
    font-family: "iconfont"
    font-size: 20px
    font-style: normal
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
</style>

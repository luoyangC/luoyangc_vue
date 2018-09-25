<template>
  <div class="header">
    <el-row :gutter="10">
      <el-col :xs="3" class="hidden-sm-and-up">
        <i class="el-icon-more"></i>
      </el-col>
      <el-col :lg="3" :md="5" :sm="5" :xs="18">
        <i class="iconfont" style="color: white">&#xe6ca;</i>
        <span style="color: white">骆杨的个人博客</span>
      </el-col>
      <el-col :lg="1" :md="1" :sm="1" class="hidden-xs-only">
        <i class="el-icon-menu" @click="headerClick"></i>
      </el-col>
      <el-col :lg="1" :md="1" :sm="1" class="hidden-xs-only">
        <i class="iconfont" @click="headerClick">&#xe716;</i>
      </el-col>
      <el-col :lg="5" :md="5" :sm="5" class="hidden-xs-only">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchInput"></el-input>
      </el-col>
      <el-col :lg="11" :md="9" :sm="8" class="hidden-xs-only">
        <i class="iconfont" style="color: #3e4a49">&#xe716;</i>
      </el-col>
      <el-col :lg="1" :md="1" :sm="1" class="hidden-xs-only">
        <i class="iconfont" @click="headerClick">&#xe720;</i>
      </el-col>
      <el-col :lg="2" :md="2" :sm="3" class="hidden-xs-only">
        <span>登录 </span>
        <i class="el-icon-caret-bottom"></i>
      </el-col>
      <el-col :xs="3" class="hidden-sm-and-up">
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
    background-color #3e4a49
  .iconfont
    font-family: "iconfont"
    font-size: 20px
    font-style: normal
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
</style>

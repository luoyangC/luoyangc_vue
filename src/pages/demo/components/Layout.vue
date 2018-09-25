<template>
  <div>
    <h2>栅栏布局</h2>
    <el-row :gutter="0">
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="9"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    <h2>位置偏移</h2>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <h2>Flex布局</h2>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <h2>响应式布局</h2>
    <el-row :gutter="20" class="hidden-sm-and-down">
      <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="10" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="10" :xl="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="stylus" scoped>
  .el-row
    margin-bottom: 20px

  .el-col
    border-radius: 4px

  .bg-purple-dark
    background: #99a9bf

  .bg-purple
    background: #d3dce6

  .bg-purple-light
    background: #e5e9f2

  .grid-content
    border-radius: 4px
    min-height: 40px

  .row-bg
    padding: 10px 0
    background-color: #f9fafc
</style>

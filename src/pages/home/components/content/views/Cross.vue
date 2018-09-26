<template>
  <div class="cross">
    <el-row v-for="item of corss" :key="item">
      <el-col style="background-color: #f4a7b9" :lg="{span: 5, offset: 7}" :md="{span: 18, offset: 5}"></el-col>
      <el-col :lg="2">
        <div class="center-box"></div>
      </el-col>
      <el-col style="background-color: aqua" :lg="{span: 5}" :md="{span: 18}"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Cross',
  data () {
    return {
      corss: [1,2,3,4,5,6,7,8,9,10]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-col
    margin-top 20px
    margin-bottom 20px
    height 200px
    background-color rgba(255,255,255,0.8)
    .center-box
      position relative
      width: 60px;
      height: 60px;
      top 35%
      left: 30%
      background: #0D395F;
</style>

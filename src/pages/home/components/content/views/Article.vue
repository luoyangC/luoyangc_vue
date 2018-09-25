<template>
  <div class="article">
    <el-row class="article-item" v-for="item of article" :key="item">
      <el-col>Article{{ item }}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      article: [1,2,3,4,5,6,7,8,9,10]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .article
    background-color white
  .article-item
    margin-top 20px
    line-height 100px
    text-align center
    background-color #E4E4E4
</style>

<template>
  <div>
    <el-row>
      <el-col v-for="item of archives" :key="item">
        <li class="item">{{item}}</li>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Archives',
  data () {
    return {
      archives: [1,2,3,4,5,6,7,8,9,10]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .item
    line-height 100px
    margin-top 20px
</style>

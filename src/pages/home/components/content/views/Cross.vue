<template>
  <div class="cross">
    <el-row v-for="item of corss" :key="item">
      <el-col :lg="10" :offset="5">
        <el-card class="box-card">{{item}}</el-card>
      </el-col>
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
  .box-card
    margin-top 20px
    margin-bottom 20px
    width: 480px
</style>

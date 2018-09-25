<template>
  <div>
    <el-row>
      <el-col :lg="10" :offset="6" v-for="item of messages" :key="item">
        <el-input type="textarea" :rows="2"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      messages: [1,2,3,4,5,6,7,8,9,10]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-col
    margin-top 20px
    margin-bottom 20px

</style>

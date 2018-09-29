<template>
  <div class="cross">
    <el-row>
      <el-col :lg="{span: 12, offset: 7}" :md="{span: 18, offset: 5}">
        <div :style="{height:corssHeight}">
          <el-steps direction="vertical" :active="corss.length">
            <el-step v-for="item of corss" :key="item" icon="el-icon-loading">
              <div slot="description" class="corss-item" :style="isLeft(item)">Test</div>
            </el-step>
            <!--<el-step title="" icon="el-icon-loading" description=""></el-step>-->
          </el-steps>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Cross',
  data () {
    return {
      corss: [1,2,3,4,5,6,7,8,9,10,11,12,13]
    }
  },
  computed: {
    corssHeight () {
      return this.corss.length * 200 + 'px'
    },
  },
  methods: {
    isLeft (i) {
      if (i % 2 === 0) {
        return {float: 'right'}
      } else {
        return {float: 'left'}
      }
    }
  }
}
</script>

<style lang="stylus">
  .el-step.is-vertical
    .el-step__head
      width: 100% !important
      flex-grow: 1 !important
      .el-step__line
        width: 2px
        top: 0
        bottom: 0
        left: 50% !important
      .el-step__icon
        width 50px !important
        height 50px !important
        background-color #f4a7b9
    .el-step__main
      position absolute
      width 100% !important
      height 50px !important
      padding-left 0 !important
      .el-step__title
        padding-bottom 0px !important
      .el-step__description
        width 100%
        position flex
        margin 0
        padding 0
        .corss-item
          width: 250px
          height: 100px
          text-align center
          margin-left 50px
          margin-right 50px
          background-color rgba(255,255,255,1)
</style>
<style lang="stylus" scoped>
  .el-col
    margin-top 100px
    margin-bottom 100px
    text-align center
    background-color rgba(255,255,255,0)
</style>

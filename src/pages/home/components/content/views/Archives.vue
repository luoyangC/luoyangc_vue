<template>
  <div>
    <el-row>
      <el-col :lg="{span: 12, offset: 7}" :md="{span: 18, offset: 5}">
        <div class="archives-image">
          <h1 class="archives-title">记录</h1>
          <img src="@/assets/img/archives-img.png">
        </div>
        <div class="archives-item archives-update-time">
          <el-card>
            <p>本页最后更新时间为 2018 年 9 月 26 日 10 时 14 分 40 秒</p>
          </el-card>
        </div>

        <div class="archives-item">
          <el-card>
            <h2>『关于本页』</h2>
            <p>这个页面是用来记录一些个人的日常生活的</p>
          </el-card>
        </div>
        <div class="archives-item">
          <el-card class="archives-item">
            <p>2018年10月1日：</p>
            <p>本站上线</p>
          </el-card>
          <el-card class="archives-item" v-for="item of archives" :key="item">
            <p>2018年10月{{item}}日：</p>
            <p>archives</p>
          </el-card>
        </div>
      </el-col>
      <el-col style="margin-top: 20px; margin-bottom: 100px; background-color: rgba(222,146,181,0)"
              :lg="{span: 12, offset: 7}" :md="{span: 18, offset: 5}">
        <router-link tag="div" to="/cross" >
        <div class="archives-item archives-back" style="float: left">
          <el-button icon="el-icon-arrow-left" circle></el-button>
          <span> Cross</span>
        </div>
        </router-link>
        <router-link tag="div" to="/about" >
        <div class="archives-item archives-next" style="float: right">
          <span>About </span>
          <el-button icon="el-icon-arrow-right" circle></el-button>
        </div>
        </router-link>
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
  .el-col
    margin-top 100px
    background-color rgba(255,255,255,0.5)
    .archives-image
      width 100%
      height 300px
      overflow hidden
      img
        width 100%
      .archives-title
        position absolute
        color white
        font-size 40px
        margin-left 20px
        top 280px
    .archives-item
      margin-top 40px
      text-align left
      line-height 25px
      .el-card
        background-color rgba(255,255,255,0.8)
    .archives-back
      background-color rgba(255,255,255,0)
      el-button
        background-color rgba(255,255,255,1)
    .archives-item
      margin-top 20px
</style>

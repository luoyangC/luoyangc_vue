<template>
  <div>
    <el-row>
      <el-col :lg="{span: 12, offset: 7}" :md="{span: 18, offset: 5}">
        <div class="message-image">
          <h1 class="message-title">留言板</h1>
          <img src="@/assets/img/message-img.png">
        </div>
        <div class="message-item message-update-time">
          <el-card>
            <p>本页最后更新时间为 2018 年 9 月 26 日 10 时 14 分 40 秒</p>
          </el-card>
        </div>

        <div class="message-item">
          <el-card>
            <h2>『关于本页』</h2>
            <p>你可以在本页写下你对本站的建议</p>
            <p>当然写了我也不一定改~(￣▽￣)~*</p>
            <div>
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入内容"></el-input>
            </div>
          </el-card>
        </div>
        <div class="message-item">
          <el-card class="message-item" v-for="item of messageAreas" :key="item">
            <p>2018年10月{{item}}日：</p>
            <p>Test{{item}}</p>
          </el-card>
        </div>
      </el-col>
      <el-col style="margin-top: 20px; margin-bottom: 100px; background-color: rgba(222,146,181,0)"
              :lg="{span: 12, offset: 7}" :md="{span: 18, offset: 5}">
        <router-link tag="div" to="/article" >
          <div class="message-item message-back" style="float: left">
            <el-button icon="el-icon-arrow-left" circle></el-button>
            <span> Article</span>
          </div>
        </router-link>
        <router-link tag="div" to="/cross" >
          <div class="message-item message-next" style="float: right">
            <span>Cross </span>
            <el-button icon="el-icon-arrow-right" circle></el-button>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      messageAreas: [1,2,3,4,5,6,7,8,9,10]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-col
    margin-top 100px
    background-color rgba(255,255,255,0.5)
    .message-image
      width 100%
      height 300px
      overflow hidden
      img
        width 100%
      .message-title
        position absolute
        color white
        font-size 40px
        margin-left 20px
        top 280px
    .message-item
      margin-top 40px
      text-align left
      line-height 25px
      .el-card
        background-color rgba(255,255,255,0.8)
    .message-back
      background-color rgba(255,255,255,0)
      el-button
        background-color rgba(255,255,255,1)
    .message-item
      margin-top 20px

</style>

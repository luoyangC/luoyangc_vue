<template>
  <div style="display: flex;flex-direction: column;">
  <div style="position: absolute;align-self: flex-end; right: 50px" class="hidden-sm-and-down">
    <el-button style="background-color: #D7B98E;color: white" @click="toTop" circle icon="el-icon-arrow-up"></el-button>
  </div>
  <div class="footer">
    <div class="footer-left">
      <div class="icon-item">
        <a href="https://space.bilibili.com/15518166/#/"><i class="iconfont icon-bilibilidonghua"></i></a>
      </div>
      <div class="icon-item">
        <a href="https://weibo.com/u/1900364031?is_all=1"><i class="iconfont icon-weibo2"></i></a>
      </div>
      <div class="icon-item">
        <a href="https://www.zhihu.com/people/li-xiao-yu-72-12-27/activities"><i class="iconfont icon-zhihu"></i></a>
      </div>
      <div class="icon-item">
        <a href="https://github.com/luoyangC"><i class="iconfont icon-github"></i></a>
      </div>
      <div class="icon-item">
        <a href="https://gitee.com/luoyang_C/events"><i class="iconfont icon-gitee"></i></a>
      </div>
      <div class="icon-item">
        <a href="https://www.linkedin.com/in/%E6%9D%A8-%E9%AA%86-310303173/"><i class="iconfont icon-linkedin"></i></a>
      </div>
    </div>
    <div class="footer-center">
      <span>© 2018 luoyangc 本站于2018年10月20日上线</span>
    </div>
    <div>
      <span>Powered by <a style="color: black" href="https://www.aliyun.com/">阿里云</a></span>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      timer: null,
    }
  },
  methods: {
    toTop () {
      this.timer = setInterval (() => {
        let top = this.$store.state.scrollTop
        document.documentElement.scrollTop = top - 100
        if (top <= 0) {
          clearInterval(this.timer)
        }
      }, 40)
    }
  },
}
</script>

<style lang="stylus" scoped>
  .footer
    display flex
    justify-content space-around
    flex-wrap wrap
    margin-top 20px
    line-height 80px
    color #9e9e9e
    background-color white
    .footer-left
      display flex
      justify-content flex-start
      .icon-item
        margin 0 20px
        a
          color #9e9e9e
        .iconfont
          font-size 24px
</style>

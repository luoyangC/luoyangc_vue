<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    open() {
      this.$message({
        showClose: true,
        message:'多图预警，手机端请在无线环境下浏览，要是流量够用，可以忽略此消息=￣ω￣=',
        type: 'warning',
        duration: 9000
      });
    },
  },
  created () {
    this.open()
  }
}
</script>

<style lang="stylus">
  body
    display: block;
    margin: 0;
    padding: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url(assets/img/bg.jpg)
    background-size: auto,100%;
    background-attachment: fixed
    background-repeat :no-repeat
    width: 100%;
    min-height: 100%;
  a
    text-decoration:none
  a:link
    text-decoration:none ;
    cursor:pointer;
    color #00a1d6
  a:visited
    text-decoration:none;
    cursor:pointer
    color #00a1d6
  a:active
    text-decoration:none;
    cursor:pointer
    color #00a1d6
  a:hover
    text-decoration:none;
    cursor:pointer
    color #00a1d6
  .line-limit-length
    overflow: hidden
    margin 0
    text-overflow: ellipsis
    white-space: nowrap
</style>

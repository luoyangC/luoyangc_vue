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
  .mui-ellipsis-2
    display: -webkit-box;
    overflow: hidden;
    margin 0
    white-space: normal!important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  .mui-ellipsis-3
    display: -webkit-box;
    overflow: hidden;
    white-space: normal!important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    font-size 14px
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  .mui-ellipsis-5
    display: -webkit-box;
    overflow: hidden;
    white-space: normal!important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    font-size 14px
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  .pageBtn
    border: 0 solid;
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.75);
</style>

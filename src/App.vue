<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
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
    background-image: url(assets/img/bg.png)
    background-size: cover;
    background-attachment: fixed
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

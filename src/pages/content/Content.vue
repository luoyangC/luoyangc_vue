<template>
  <div class="content">
    <transition :name="transitionName">
      <keep-alive exclude="Detail">
        <router-view  class="child-view"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  /* eslint-disable no-console */

  export default {
  name: 'Content',
  data () {
    return {
      transitionName:''
    }
  },
  watch: {
    $route(to, from) {
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  .child-view
    width: 100%;
    height: 100%;
    transition: all .5s cubic-bezier(.55,0,.1,1);
  .slide-left-enter, .slide-right-leave-active
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  .slide-left-leave-active, .slide-right-enter
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  .content
    min-height 800px
</style>

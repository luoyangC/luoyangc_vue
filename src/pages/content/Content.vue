<template>
  <div class="content">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<style lang="stylus" scoped>

</style>

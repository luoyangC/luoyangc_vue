<template>
  <div>
    <router-link to="/layout"><el-button>Layout</el-button></router-link>
    <router-link to="/container"><el-button>Layout</el-button></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Demo',
}
</script>

<style lang="stylus" scoped>

</style>

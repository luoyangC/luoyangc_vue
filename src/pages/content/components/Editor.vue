<template>
  <div class="editor">
    <el-row>
      <el-col :lg="{span: 12, offset: 7}" :md="{span: 18, offset: 5}">
        <div class="editor-image">
          <h1 class="editor-title">编辑</h1>
          <img src="@/assets/img/about-img.png">
        </div>
        <mavon-editor style="min-height: 850px;max-height: 850px; z-index: auto"></mavon-editor>
      </el-col>
    </el-row>
    <el-col style="margin-top: 40px; margin-bottom: 100px; background-color: rgba(222,146,181,0)"
            :lg="{span: 12, offset: 7}" :md="{span: 18, offset: 5}">
      <router-link tag="div" to="/article" >
        <div class="editor-item editor-back" style="float: left">
          <el-button icon="el-icon-arrow-left" circle></el-button>
          <span> Article</span>
        </div>
      </router-link>
      <router-link tag="div" to="/cross" >
        <div class="editor-item editor-next" style="float: right">
          <span>Cross </span>
          <el-button icon="el-icon-arrow-right" circle></el-button>
        </div>
      </router-link>
    </el-col>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'editor',
  components: {
    mavonEditor
  }
}
</script>

<style lang="stylus" scoped>
  .el-col
    margin-top 100px
    background-color rgba(255,255,255,0.5)
    .editor-image
      width 100%
      height 300px
      overflow hidden
      img
        width 100%
      .editor-title
        position absolute
        color white
        font-size 40px
        margin-left 20px
        top 280px
  .editor
    margin: auto
    width: 100%
    height: 1000px
</style>

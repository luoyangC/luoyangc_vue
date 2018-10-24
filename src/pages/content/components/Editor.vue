<template>
  <div class="editor">
    <el-row>
      <el-col class="hidden-sm-and-down" style="margin-top: 100px;background-color: rgba(255,217,242,0)"></el-col>
      <el-col :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div class="editor-image">
          <img v-if="articleInfo.image_url" :src="articleInfo.image || articleInfo.image_url">
          <img v-else src="@/assets/img/info-img.png">
          <h1 class="editor-title">编辑</h1>
        </div>
        <div class="editor-info">
          <div class="editor-form">
            <div class="editor-item">
              <h3 style="margin-top: 0;padding-top: 16px">文章标题</h3>
              <div>
                <input type="text"
                       style="height: 38px ; border: none; padding: 0 16px; font-size: 24px; outline: medium"
                       v-model="articleInfo.title"/></div>
            </div>
            <div class="editor-item">
              <h3 style="margin-top: 0;padding-top: 16px">文章简介</h3>
              <el-input type="textarea" :rows="3" v-model="articleInfo.profile"></el-input>
            </div>
            <div class="editor-item" style="display: flex; justify-content: start">h
              <div>
                <h3>文章封面</h3>
                <el-upload class="avatar-uploader"
                           action="http://47.98.207.4:8000/api/upload/"
                           :show-file-list="false"
                           :headers=header
                           :data="{upload_type:'article_img'}"
                           :on-success="handleAvatarSuccess">
                  <el-button>点击上传</el-button>
                </el-upload>
              </div>
              <div style="margin-left: 20px">
                <h3>文章类型</h3>
                <el-select v-model="articleInfo.category">
                  <el-option
                    v-for="item in categorys"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="editor-item">
              <h3>Tag</h3>
              <el-tag :key="tag" v-for="tag in dynamicTags" closable
                      @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </div>
          </div>
          <mavon-editor
            ref="md"
            v-model="content"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
            @save="saveArticle"
            style="height: 1000px;">
          </mavon-editor>
        </div>
      </el-col>
    </el-row>
    <el-col style="margin-top: 40px; background-color: rgba(222,146,181,0)"
            :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
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
    <div class="hidden-md-and-down" style="width: 100%;height: 100px;background-color: rgba(97,97,97,0)">&nbsp;</div>
  </div>
</template>

<script>
/* eslint-disable no-console,no-undef */

import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import {editorArticle, getArticleContent, getCategory, uploadFile} from "../../../api"
import store from "../../../store/store"

export default {
  name: 'editor',
  components: {
    mavonEditor
  },
  data () {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      articleInfo: '',
      categorys: '',
      content: '',
      header: {'Authorization': `JWT ${store.state.userInfo.token}`},
      beforeScrollTop: 0,
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick( () => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    saveArticle () {
      let strTags = this.dynamicTags.join(',')
      let content = this.content
      let articleInfo = this.articleInfo
      articleInfo.tags = strTags
      articleInfo.content = content
      editorArticle (this.articleInfo.id,articleInfo)
        .then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
      })
    },
    getCategory () {
      getCategory ()
        .then((response)=> {
          console.log(response)
          this.categorys = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getArticle () {
      getArticleContent (this.$route.params.id)
        .then((response) => {
          console.log(response)
          this.articleInfo = response.data
          this.content = response.data.content
          this.dynamicTags = response.data.tags.split(',')
        }).catch((error) => {
          console.log(error)
      })
    },
    handleAvatarSuccess (res, file) {
      console.log(res, file)
      this.articleInfo.image_url = res.url
    },
    $imgAdd (pos, $file) {
      console.log(pos, $file)
      let formdata = new FormData()
      formdata.append('upload_type', 'editor_img')
      formdata.append('file', $file)
      uploadFile (formdata)
        .then((response) => {
          console.log(response)
          this.$refs.md.$img2Url(pos, response.data.url)
        }).catch((error) => {
          console.log(error)
      })
    },
    $imgDel () {}
  },
  activated () {
    this.getArticle()
    this.getCategory()
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      let scroll = scrollTop - this.beforeScrollTop;
      this.beforeScrollTop = scrollTop;
      if (scroll > 0) {
        this.$store.commit('SET_STOP', {top:scrollTop, dir:'down'})
      }
      if (scroll < 0) {
        this.$store.commit('SET_STOP', {top:scrollTop, dir:'up'})
      }
    }, true)
  },
  deactivated () {
    this.dynamicTags = []
    window.removeEventListener('scroll', () => {
      this.$store.commit('SET_STOP', 0)
    })
  }
}
</script>

<style lang="stylus" scoped>
  .editor
    margin: auto
    width: 100%
    .el-col
      background-color rgba(255,255,255,0.5)
      .editor-image
        width 100%
        overflow hidden
        background-color white
        img
          width 100%
        .editor-title
          color white
          text-align left
          font-size 30px
          line-height 50px
          margin-left 6px
          margin-top -50px
          margin-bottom 0
          top 100%
      .editor-info
        text-align left
        background-color white
        .editor-form
          margin 0 6px
          margin-bottom 16px
          .el-tag + .el-tag
            margin-left: 10px
          .button-new-tag
            margin-left: 10px
            height: 32px
            line-height: 30px
            padding-top: 0
            padding-bottom: 0
          .input-new-tag
            width: 90px
            margin-left: 10px
            vertical-align: bottom
</style>

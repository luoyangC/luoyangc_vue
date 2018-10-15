<template>
  <div class="aside">
    <el-row>
      <el-col :lg="8" :offset="8">
        <img src="@/assets/img.jpeg" class="img-full"/>
      </el-col>
      <el-col>
        <el-menu :unique-opened=true class="el-menu-vertical" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont">&#xe67b; </i>
              <span>归档</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" v-for="(item,index) of archives" :key="index" @click="changeArticleType('time',item.archive)">
                <router-link to="/article">{{timeFormat(item.archive)}}</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont">&#xe69e; </i>
              <span>分类</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" v-for="item of categorys" :key="item.id" @click="changeArticleType('category', item.id)">
                <router-link to="/article">{{item.title}}</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3" @click="changeArticleType('')">
            <i class="iconfont">&#xe6cb; </i>
            <router-link tag="span" slot="title" to="/">首页</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="iconfont">&#xe665; </i>
            <router-link tag="span" slot="title" to="/message">留言板</router-link>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="iconfont">&#xe6bf; </i>
            <router-link tag="span" to="/cross" slot="title">时间轴</router-link>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="iconfont">&#xe74e; </i>
            <router-link tag="span" to="/archives" slot="title">记录</router-link>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="iconfont">&#xe753; </i>
            <router-link tag="span" to="/about" slot="title">关于</router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable no-console */
import {getArchives, getCategory} from "../../api"
import moment from 'moment'

export default {
  name: 'Aside',
  data () {
    return {
      isCollapse: true,
      categorys: [],
      archives: [],
    }
  },
  methods: {
    timeFormat (time) {
      return moment(time).format('MMM YYYY')
    },
    changeArticleType (t,n) {
      if (t=='category') {
        if (n==1) {
          this.$store.commit('SET_TYPE', {})
        }
        else {
          this.$store.commit('SET_TYPE', {category: n})
        }
      }
      if (t=='time') {
        this.$store.commit('SET_TYPE', {time: moment(n).format('YYYY-MM')})
      }
      if (t=='') {
        this.$store.commit('SET_TYPE', {})
      }
    },
    handleOpen () {
    },
    handleClose () {
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
    getArchives () {
      getArchives()
        .then((response) => {
          console.log(response)
          this.archives = response.data
        }).catch((error) => {
          console.log(error)
      })
    }
  },
  created () {
    this.getCategory()
    this.getArchives()
  }
}
</script>

<style lang="stylus" scoped>
  .img-full
    border-radius: 30px;
    width 60px
    height 60px
    margin-top 20px
    margin-bottom 20px

  .aside
    height 1000px
    background-color rgba(255,255,255,0.41)
  .el-menu
    background-color rgba(255,255,255,0.41)
    width 200px
    border 0
</style>

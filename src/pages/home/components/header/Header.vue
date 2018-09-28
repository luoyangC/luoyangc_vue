<template>
  <div class="header">
    <el-row :gutter="10">
      <el-col :sm="3" :xs="3" class="hidden-md-and-up">
        <i class="el-icon-more"></i>
      </el-col>
      <el-col :lg="3" :md="5" :sm="18" :xs="18">
        <i class="iconfont" style="color: white">&#xe6ca;</i>
        <span style="color: white">骆杨的个人博客</span>
      </el-col>
      <el-col :lg="1" :md="1" :sm="1" class="hidden-sm-and-down">
        <i class="el-icon-menu" @click="headerClick"></i>
      </el-col>
      <el-col :lg="1" :md="1" :sm="1" class="hidden-sm-and-down">
        <i class="iconfont" @click="userCenter">&#xe716;</i>
      </el-col>
      <el-col :lg="5" :md="5" :sm="5" class="hidden-sm-and-down">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchInput"></el-input>
      </el-col>
      <el-col :lg="11" :md="9" :sm="8" class="hidden-sm-and-down">
        <i class="iconfont" style="color: #24292e">&#xe716;</i>
      </el-col>
      <el-col :lg="1" :md="1" :sm="1" class="hidden-sm-and-down">
        <i class="iconfont" @click="userMessage">&#xe720;</i>
      </el-col>
      <el-col :lg="2" :md="2" :sm="3" class="hidden-sm-and-down">
        <span v-if="isLogin" @click="logout">注销 </span>
        <el-popover v-else width="300" trigger="click">
          <p>用户名</p><el-input type="text" placeholder="username" v-model="userName"></el-input>
          <p>密  码</p><el-input type="password" placeholder="password" v-model="passWord"></el-input>
          <br><br>
          <div style="text-align: center">
            <el-button @click="login">立即登录</el-button>
            <p>若无账号请先<router-link to="/registe"> 注册</router-link></p>
          </div>
          <span slot="reference">登录 </span>
        </el-popover>
        <i class="el-icon-caret-bottom"></i>
      </el-col>
      <el-col :sm="3" :xs="3" class="hidden-md-and-up">
        <i class="el-icon-setting"></i>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable no-console*/

import {login} from "../../../../api"
import cookie from "../../../../assets/js/cookie"

export default {
  name: 'Head',
  data () {
    return {
      searchInput: '',
      userName: '',
      passWord: '',
      error: '',
      userNameError: '',
      passWordError: '',
      isLogin: this.$store.state.userInfo.name
    }
  },
  methods: {
    headerClick () {
      this.$emit('change')
    },
    userCenter () {
      if (this.isLogin) {
        console.log(this.$store.state.userInfo)
      }
      else {
        this.$notify({
          title: '警告',
          message: '请先登录',
          type: 'warning'
        });
      }
    },
    userMessage () {
      this.$notify({
        title: '警告',
        message: '请先登录',
        type: 'warning'
      });
    },
    login () {
      console.log(this)
      login({username:this.userName, password:this.passWord})
        .then((response)=> {
          console.log(response);
          //本地存储用户信息
          cookie.setCookie('name',this.userName,7);
          cookie.setCookie('token',response.data.token,7);
          console.log(this)
          //更新Store的数据
          this.$store.dispatch('setInfo');
          this.$router.go(0)
        })
        .catch(function (error) {
          if("non_field_errors" in error){
            this.error = error.non_field_errors[0];
          }
          if("username" in error){
            this.userNameError = error.username[0];
          }
          if("password" in error){
            this.passWordError = error.password[0];
          }
          console.log(error)
        });
    },
    logout (){
      //清空本地数据
      cookie.delCookie('token');
      cookie.delCookie('name');
      //重新触发store
      //更新store数据
      this.$store.dispatch('setInfo');
      this.$router.go(0)
    },
  }
}
</script>

<style lang="stylus" scoped>
  .el-col
    color white
    text-align center
  .header
    line-height 60px
    background-color #24292e
  .iconfont
    font-family: "iconfont"
    font-size: 20px
    font-style: normal
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
</style>

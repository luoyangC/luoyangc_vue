<template>
  <div class="registe">
    <el-row>
      <el-col class="hidden-sm-and-down" style="margin-top: 100px;background-color: rgba(255,217,242,0)"></el-col>
      <el-col :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div class="registe-image">
          <img src="@/assets/img/register-img.png">
          <h1 class="registe-title">注册</h1>
        </div>
        <div class="registe-from">
          <el-card class="hidden-sm-and-down" style="width: 50%;justify-content: center">
            <div>
              <el-input prefix-icon="iconfont icon-yonghu" placeholder="用户名" v-model="username"></el-input>
            </div>
            <div>
              <el-input prefix-icon="iconfont icon-mail" placeholder="邮箱" v-model="email">
                <el-button @click="getRegisteCode" slot="append">获取验证码</el-button>
              </el-input>
            </div>
            <div>
              <el-input prefix-icon="iconfont icon-yanzhengma2" placeholder="邮箱验证码" v-model="code"></el-input>
            </div>
            <div>
              <el-input type="password" prefix-icon="iconfont icon-iconfontmima" placeholder="密码" v-model="password"></el-input>
            </div><br>
            <div>
              <el-button @click="register">注册</el-button>
            </div>
            <div>
              <p>点击 “注册” 即表示您同意并愿意遵守以下协议</p>
              <p><a href="#">用户协议</a> 和 <a href="#">隐私政策</a></p>
            </div>
            <br><hr>
            <div>
              <p>----第三方登录----</p>
              <i style="font-size: 30px; margin: 10px" class="iconfont icon-weixin" @click="openWarning"></i>
              <i style="font-size: 30px; margin: 10px" class="iconfont icon-social-qq" @click="openWarning"></i>
              <i style="font-size: 30px; margin: 10px" class="iconfont icon-weibo" @click="openWarning"></i>
            </div>
          </el-card>
          <el-card class="hidden-md-and-up" style="width: 90%;justify-content: center">
            <div>
              <el-input prefix-icon="iconfont icon-yonghu" placeholder="用户名" v-model="username"></el-input>
            </div>
            <div>
              <el-input prefix-icon="iconfont icon-mail" placeholder="邮箱" v-model="email">
                <el-button @click="getRegisteCode" slot="append">获取验证码</el-button>
              </el-input>
            </div>
            <div>
              <el-input prefix-icon="iconfont icon-yanzhengma2" placeholder="邮箱验证码" v-model="code"></el-input>
            </div>
            <div>
              <el-input type="password" prefix-icon="iconfont icon-iconfontmima" placeholder="密码" v-model="password"></el-input>
            </div><br>
            <div>
              <el-button @click="register">注册</el-button>
            </div>
            <div>
              <p>点击 “注册” 即表示您同意并愿意遵守以下协议</p>
              <p><a href="#">用户协议</a> 和 <a href="#">隐私政策</a></p>
            </div>
            <br><hr>
            <div>
              <p>----第三方登录----</p>
              <i style="font-size: 30px; margin: 10px" class="iconfont icon-weixin" @click="openWarning"></i>
              <i style="font-size: 30px; margin: 10px" class="iconfont icon-social-qq" @click="openWarning"></i>
              <i style="font-size: 30px; margin: 10px" class="iconfont icon-weibo" @click="openWarning"></i>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-col style="margin-top: 40px; background-color: rgba(222,146,181,0)"
            :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
      <router-link tag="div" to="/index" >
        <div class="registe-item registe-back" style="float: left">
          <el-button class="pageBtn" icon="el-icon-arrow-left" circle></el-button>
          <span> Index</span>
        </div>
      </router-link>
      <div class="hidden-md-and-down" style="width: 100%;height: 100px;background-color: rgba(97,97,97,0)">&nbsp;</div>
    </el-col>
    <div class="hidden-md-and-down" style="width: 100%;height: 100px;background-color: rgba(97,97,97,0)">&nbsp;</div>
  </div>
</template>

<script>
/* eslint-disable no-console */

import {getEmailCode, register} from "../../../api/index"

export default {
  name: 'registe',
  data () {
    return {
      username: '',
      email: '',
      code: '',
      password: '',
      beforeScrollTop: 0,
    }
  },
  methods: {
    openWarning () {
      this.$message({
        message: '开发中',
        type: 'warning'
      });
    },
    getRegisteCode () {
      getEmailCode ({email:this.email,send_type:'register'})
        .then((response) => {
          console.log(response)
          this.$message({
            type: 'success',
            message: '邮件发送成功，验证码的过期时间是5分钟，请注意查收，如果在您的收件箱中没有发现验证邮件，请注意查看垃圾邮箱!',
            duration: 9000
          });
        })
        .catch((error) => {
          console.log(error)
        })
    },
    register () {
      register ({username:this.username, email:this.email, code:this.code, password:this.password})
        .then((response) => {
          console.log(response)
          this.$message({
            type: 'success',
            message: '恭喜你注册成功，现在你可以点击右上角进行登录！'
          });
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  activated () {
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
    window.removeEventListener('scroll', () => {
      this.$store.commit('SET_STOP', 0)
    })
  }
}
</script>

<style lang="stylus" scoped>
  .el-col
    background-color rgba(255,255,255,0.5)
    .registe-image
      width 100%
      overflow hidden
      background-color white
      img
        width 100%
      .registe-title
        color white
        text-align left
        font-size 30px
        line-height 50px
        margin-left 6px
        margin-top -50px
        margin-bottom 0
        top 100%
  .registe
    margin: auto
    width: 100%
    .registe-from
      width 100%
      height 600px
      display flex
      justify-content center
      align-items center
      background-color white
      .el-input
        font-size 16px
        margin-top 10px
</style>

<template>
  <div class="registe">
    <el-row>
      <el-col :lg="{span: 12, offset: 7}" :md="{span: 18, offset: 5}">
        <div class="registe-image">
          <h1 class="registe-title">注册</h1>
          <img src="@/assets/img/about-img.png">
        </div>
        <div class="registe-from">
          <el-card style="width: 40%;justify-content: center">
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
            </div>
            <div>
              <el-button @click="register">立即注册</el-button>
            </div>
            <div>
              <p>点击 “注册” 即表示您同意并愿意遵守以下协议</p>
              <p><a href="#">用户协议</a> 和 <a href="#">隐私政策</a></p>
            </div>
            <br><hr>
            <div>
              <p>----第三方登录----</p>
              <i style="font-size: 30px; margin: 10px" class="iconfont icon-weixin"></i>
              <i style="font-size: 30px; margin: 10px" class="iconfont icon-social-qq"></i>
              <i style="font-size: 30px; margin: 10px" class="iconfont icon-weibo"></i>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-col style="margin-top: 40px; margin-bottom: 100px; background-color: rgba(222,146,181,0)"
            :lg="{span: 12, offset: 7}" :md="{span: 18, offset: 5}">
      <router-link tag="div" to="/article" >
        <div class="registe-item registe-back" style="float: left">
          <el-button icon="el-icon-arrow-left" circle></el-button>
          <span> Article</span>
        </div>
      </router-link>
    </el-col>
  </div>
</template>

<script>
  /* eslint-disable no-console */

  import {getEmailCode, register} from "../../../../../api"

export default {
  name: 'registe',
  data () {
    return {
      username: '',
      email: '',
      code: '',
      password: '',
    }
  },
  methods: {
    getRegisteCode () {
      getEmailCode ({email:this.email,send_type:'register'})
        .then((response) => {
          console.log(response)
          alert('邮件发送成功，验证码的过期时间是5分钟，请注意查收')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    register () {
      register ({username:this.username, email:this.email, code:this.code, password:this.password})
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-col
    margin-top 100px
    background-color rgba(255,255,255,0.5)
    .registe-image
      width 100%
      height 300px
      overflow hidden
      img
        width 100%
      .registe-title
        position absolute
        color white
        font-size 40px
        margin-left 20px
        top 280px
  .registe
    margin: auto
    width: 100%
    height: 1000px
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

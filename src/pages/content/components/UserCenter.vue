<template>
  <div class="user">
    <el-row>
      <el-col class="hidden-sm-and-down" style="margin-top: 100px;background-color: rgba(255,217,242,0)"></el-col>
      <el-col :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div class="user-image">
          <img src="@/assets/img/user-img.png">
          <h1 class="user-title">个人中心</h1>
        </div>
        <div class="user-from">
          <el-card class="hidden-sm-and-down" style="width: 50%;justify-content: center">
            <el-form>
              <el-form-item>
                <el-upload class="avatar-uploader"
                           action="http://127.0.0.1:8000/api/upload/"
                           :show-file-list="false"
                           :headers=header
                           :data="{upload_type:'user_img'}"
                           :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>用户名</label>
                </el-col>
                <el-col :span="18">
                <el-input prefix-icon="iconfont icon-yonghu" placeholder="用户名" v-model="username" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>昵称</label>
                </el-col>
                <el-col :span="18">
                <el-input prefix-icon="iconfont icon-yonghu" placeholder="昵称" v-model="nickname"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>邮箱</label>
                </el-col>
                <el-col :span="18">
                <el-input prefix-icon="iconfont icon-mail" placeholder="邮箱" v-model="email" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>手机号码</label>
                </el-col>
                <el-col :span="18">
                  <el-input prefix-icon="iconfont icon-LC_icon_phone_line" placeholder="手机" v-model="mobile"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>个人网站</label>
                </el-col>
                <el-col :span="18">
                  <el-input prefix-icon="iconfont icon-wangzhan" placeholder="个人网站" v-model="userNet"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>生日</label>
                </el-col>
                <el-col :span="16">
                  <div class="block">
                    <el-date-picker
                      v-model="birthday"
                      type="date"
                      value-format="yyyy-MM-dd"
                      align="center"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>性别</label>
                </el-col>
                <el-col :span="16">
                  <el-radio-group v-model="gender">
                    <el-radio label="male">男</el-radio>
                    <el-radio label="female">女</el-radio>
                    <el-radio label="unknown">未知</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>个人简介</label>
                </el-col>
                <el-col :span="18">
                  <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="个人简介" v-model="profile"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即修改</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card class="hidden-md-and-up" style="width: 90%;justify-content: center">
            <el-form>
              <el-form-item>
                <el-upload class="avatar-uploader"
                           action="http://127.0.0.1:8000/api/upload/"
                           :show-file-list="false"
                           :headers=header
                           :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>用户名</label>
                </el-col>
                <el-col :span="18">
                  <el-input prefix-icon="iconfont icon-yonghu" placeholder="用户名" v-model="username" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>昵称</label>
                </el-col>
                <el-col :span="18">
                  <el-input prefix-icon="iconfont icon-yonghu" placeholder="昵称" v-model="nickname"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>邮箱</label>
                </el-col>
                <el-col :span="18">
                  <el-input prefix-icon="iconfont icon-mail" placeholder="邮箱" v-model="email" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>手机号码</label>
                </el-col>
                <el-col :span="18">
                  <el-input prefix-icon="iconfont icon-LC_icon_phone_line" placeholder="手机" v-model="mobile"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>个人网站</label>
                </el-col>
                <el-col :span="18">
                  <el-input prefix-icon="iconfont icon-wangzhan" placeholder="个人网站" v-model="userNet"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>生日</label>
                </el-col>
                <el-col :span="18">
                  <div class="block">
                    <el-date-picker
                      v-model="birthday"
                      type="date"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>性别</label>
                </el-col>
                <el-col :span="18">
                  <el-radio-group v-model="gender">
                    <el-radio label="male">男</el-radio>
                    <el-radio label="female">女</el-radio>
                    <el-radio label="unknown">未知</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="5">
                  <label>个人简介</label>
                </el-col>
                <el-col :span="18">
                  <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="个人简介" v-model="profile"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即修改</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-col style="margin-top: 40px; background-color: rgba(222,146,181,0)"
            :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
      <router-link tag="div" to="/article" >
        <div class="user-item user-back" style="float: left">
          <el-button icon="el-icon-arrow-left" circle></el-button>
          <span> Article</span>
        </div>
      </router-link>
    </el-col>
    <div class="hidden-md-and-down" style="width: 100%;height: 100px;background-color: rgba(97,97,97,0)">&nbsp;</div>
  </div>
</template>

<script>
/* eslint-disable no-console */

import {getUserInfo, updateUserInfo} from "../../../api"
import store from "../../../store/store"

export default {
  name: 'UserCenter',
  data () {
    return {
      userId: '',
      imageUrl: '',
      username: '',
      nickname: '',
      email: '',
      mobile: '',
      userNet: '',
      birthday: '',
      gender: '',
      profile: '',
      header: {'Authorization': `JWT ${store.state.userInfo.token}`}
    }
  },
  methods: {
    beforeAvatarUpload (file) {
      console.log(file)
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      console.log(file)
      this.imageUrl = res.url
    },
    onSubmit () {
      updateUserInfo (this.userId, {nick_name:this.nickname, mobile:this.mobile,
        github:this.userNet, birthday:this.birthday, gender:this.gender,profile:this.profile})
        .then((response) => {
          console.log(response)
          alert('修改成功')
        }).catch((error) => {
          console.log(error)
      })
    },
    getUserInfo () {
      getUserInfo()
        .then((response) => {
          console.log(response)
          this.userId = response.data.id
          this.imageUrl = response.data.image
          this.username = response.data.username
          this.nickname = response.data.nick_name
          this.email = response.data.email
          this.mobile = response.data.mobile
          this.userNet = response.data.github
          this.birthday = response.data.birthday
          this.gender = response.data.gender
          this.profile = response.data.profile
        }).catch((error) => {
          console.log(error)
      })
    }
  },
  created () {
    this.getUserInfo()
  },
  activated () {
    window.addEventListener('scroll', () => {
      this.$store.commit('SET_STOP', document.documentElement.scrollTop)
    })
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
    .user-image
      width 100%
      overflow hidden
      background-color white
      img
        width 100%
      .user-title
        color white
        text-align left
        font-size 30px
        line-height 50px
        margin-left 6px
        margin-top -50px
        margin-bottom 0
        top 100%
  .user
    margin: auto
    width: 100%
    .user-from
      width 100%
      padding-top 20px
      padding-bottom 20px
      display flex
      justify-content center
      align-items center
      background-color white
      .avatar-uploader
        height 75px
        .avatar
          border-radius: 30px;
          width 60px
          height 60px
</style>

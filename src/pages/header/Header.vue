<template>
  <div class="header">
    <div class="my-aside" :class="{active: isActive}">
      <div style="background-color: white">
        <div style="display: flex; justify-content: space-around;align-items: center">
          <img src="@/assets/img.jpeg" class="img-full"/>
          <div><i class="iconfont icon-caidan" @click="closeAside"></i></div>
        </div>
        <hr>
        <el-menu :unique-opened=true class="el-menu-vertical" @open="handleOpen" @close="handleClose" style="width: 240px">
        <el-submenu index="1">
          <template slot="title">
            <i class="iconfont">&#xe67b; </i>
            <span>归档</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" v-for="(item,index) of archives" :key="index"  @click="changeArticleType('time',item.archive)">
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
        <el-menu-item index="3" @click="closeAside">
          <i class="iconfont">&#xe6cb; </i>
          <router-link tag="span" slot="title" to="/">首页</router-link>
        </el-menu-item>
        <el-menu-item index="4" @click="closeAside">
          <i class="iconfont">&#xe665; </i>
          <router-link tag="span" slot="title" to="/message">留言板</router-link>
        </el-menu-item>
        <el-menu-item index="5" @click="closeAside">
          <i class="iconfont">&#xe6bf; </i>
          <router-link tag="span" to="/cross" slot="title">时间轴</router-link>
        </el-menu-item>
        <el-menu-item index="6" @click="closeAside">
          <i class="iconfont">&#xe74e; </i>
          <router-link tag="span" to="/archives" slot="title">记录</router-link>
        </el-menu-item>
        <el-menu-item index="7" @click="closeAside">
          <i class="iconfont">&#xe753; </i>
          <router-link tag="span" to="/about" slot="title">关于</router-link>
        </el-menu-item>
      </el-menu>
      </div>
      <div style="width: 100%;height: 100rem" @click="closeAside">&nbsp;</div>
    </div>
    <el-row :gutter="10">
      <el-col :sm="3" :xs="3" class="hidden-md-and-up">
        <i class="iconfont icon-caidan" @click="showAside"></i>
      </el-col>
      <el-col :lg="3" :md="5" :sm="18" :xs="18">
        <router-link tag="span" to="/">
          <i class="iconfont" style="color: white">&#xe6ca;</i>
          <span style="color: white">骆杨的个人博客</span>
        </router-link>
      </el-col>
      <el-col :lg="1" :md="1" :sm="1" class="hidden-sm-and-down">
        <i class="iconfont icon-caidan1" @click="headerClick"></i>
      </el-col>
      <el-col :lg="1" :md="1" :sm="1" class="hidden-sm-and-down">
        <i class="iconfont" @click="userCenter">&#xe716;</i>
      </el-col>
      <el-col :lg="5" :md="5" :sm="5" class="hidden-sm-and-down">&nbsp;
        <!--<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchInput" @keyup.enter.native="changeArticleType"></el-input>-->
      </el-col>
      <el-col :lg="10" :md="8" :sm="7" class="hidden-sm-and-down">
        <i class="iconfont" style="color: #24292e">&nbsp;</i>
      </el-col>
      <el-col v-if="isLogin" :lg="1" :md="1" :sm="1" class="hidden-sm-and-down">
        <i class="iconfont" @click="userMessage">&#xe720;</i>
      </el-col>
      <el-col v-else :lg="1" :md="1" :sm="1" class="hidden-sm-and-down">
        <i class="iconfont">&nbsp;</i>
      </el-col>
      <el-col v-if="isLogin" :lg="1" :md="1" :sm="1" class="hidden-sm-and-down">
        <el-popover placement="bottom" trigger="hover" v-model="visible">
          <div>
            <el-button type="text" @click="addCategory">添加文章分类</el-button>
            <br>
            <el-button type="text" @click="addArticle">添加新的文章</el-button>
          </div>
          <i slot="reference" class="el-icon-plus" @click="userOperation"></i>
        </el-popover>
      </el-col>
      <el-col v-else :lg="1" :md="1" :sm="1" class="hidden-sm-and-down">
        <i class="iconfont">&nbsp;</i>
      </el-col>
      <el-col :lg="2" :md="2" :sm="3" class="hidden-sm-and-down">
        <span v-if="isLogin" @click="logout">注销 </span>
        <el-popover v-else width="300" trigger="hover">
          <p>用户名</p><el-input type="text" placeholder="username" v-model="userName"></el-input>
          <p>密  码</p><el-input type="password" placeholder="password" v-model="passWord" @keyup.enter.native="login"></el-input>
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
        <el-popover v-if="isLogin" width="50" trigger="hover">
          <p><a @click="userCenter">个人中心</a></p>
          <p><a @click="userMessage">消息</a></p>
          <p><a @click="logout">注销</a></p>
          <i slot="reference" class="iconfont icon-yonghu"></i>
        </el-popover>
        <el-popover v-else width="300" trigger="hover">
          <p>用户名</p><el-input type="text" placeholder="username" v-model="userName"></el-input>
          <p>密  码</p><el-input type="password" placeholder="password" v-model="passWord" @keyup.enter.native="login"></el-input>
          <br><br>
          <div style="text-align: center">
            <el-button @click="login">立即登录</el-button>
            <p>若无账号请先<router-link to="/registe"> 注册</router-link></p>
          </div>
          <i slot="reference" class="iconfont icon-yonghu"></i>
        </el-popover>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable no-console*/
import {addArticle, addCategory, login} from "../../api/index"
import cookie from "../../assets/js/cookie"
import {getArchives, getCategory, getUserInfo} from "../../api"
import moment from "moment"

export default {
  name: 'Head',
  data () {
    return {
      categorys: [],
      archives: [],
      searchInput: '',
      userName: '',
      passWord: '',
      error: '',
      userNameError: '',
      passWordError: '',
      userInfo: '',
      isActive: false,
      visible: false,
      isLogin: this.$store.state.userInfo.name
    }
  },
  methods: {
    handleOpen () {},
    handleClose () {},
    timeFormat (time) {
      return moment(time).format('MMM YYYY')
    },
    closeAside () {
      this.isActive = false
    },
    showAside () {
      this.getArchives()
      this.getCategory()
      this.isActive = true
    },
    getUserInfo () {
      getUserInfo ()
        .then((response) => {
          this.userInfo = response.data
        }).catch((error) => {
          console.log(error)
      })
    },
    userOperation () {
      if (this.userInfo.is_staff) {
        this.visible = ! this.visible
        return this.visible
      }
      else {
        this.$notify({
          title: '警告',
          message: '您没有足够权限，若要发表文章，请联系开发者',
          type: 'warning'
        })
      }
    },
    addCategory () {
      this.visible = false
      this.$prompt('分类名称', '新建分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '别闹，好歹写点啥呀，不能为空',
        inputValidator: (value) => {
          if (value == null) {
            return false
          } else {
            return true
          }
        },
        lockScroll: false,
      }).then(({ value }) => {
        addCategory ({title:value, info:value})
          .then((response) => {
            console.log(response)
            this.$message({
              type: 'success',
              message: '您创建了一个新的类型: ' + value
            });
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    addArticle () {
      this.visible = false
      this.$prompt('文章标题', '新建文章', {
        lockScroll: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '别闹，好歹写点啥呀，不能为空',
        inputValidator: (value) => {
          if (value == null) {
            return false
          } else {
            return true
          }
        },
      }).then(({ value }) => {
        addArticle ({title:value, category:1, user:this.userInfo.id, content:'# '+value})
          .then((response) =>{
            console.log(response)
            this.$message({type: 'success', message: '您创建了一个文章: ' + value})
            this.$router.push('/editor/'+response.data.id)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
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
      this.closeAside()
    },
    headerClick () {
      this.$emit('change')
    },
    userCenter () {
      if (this.isLogin) {
        this.$router.push('/userCenter')
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
        message: '该功能还在开发中',
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
      this.$confirm('确认注销？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        cookie.delCookie('token');
        cookie.delCookie('name');
        this.$message({
          type: 'success',
          message: '已注销!'
        });
        this.$store.dispatch('setInfo');
        this.$router.go(0)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
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
    this.getUserInfo()
  }
}
</script>

<style lang="stylus" scoped>
  .el-col
    color white
    text-align center
  .header
    line-height 60px
    background-color rgba(41,41,41,0.4)
  .iconfont
    font-family: "iconfont"
    font-size: 20px
    font-style: normal
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
  .my-aside
    display none
    width: 100rem
    height: 100rem
    background-color rgba(97,97,97,0.5)
    position: absolute
    z-index: 1000
  .active
    display flex
    justify-content center
  .el-dropdown-link
    color white
  .img-full
    border-radius: 30px;
    width 60px
    height 60px
    margin-top 20px
    margin-bottom 20px
</style>

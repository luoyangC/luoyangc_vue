<template>
  <div class="about">
    <el-row>
      <el-col class="hidden-sm-and-down" style="margin-top: 100px;background-color: rgba(255,217,242,0)"></el-col>
      <el-col :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <div class="about-image">
          <img src="@/assets/img/about-img.png">
          <h1 class="about-title">关于</h1>
        </div>
        <div class="about-item about-update-time">
          <el-card>
            <p>本页最后更新时间为 2018 年 10 月 18 日 10 时 14 分 40 秒</p>
          </el-card>
        </div>
        <div class="about-item about-music">
        </div>
        <div class="about-item about-me">
          <el-card>
            <h2>『关于我』 About me</h2>
            <ul>
              <li>2019年毕业于南京信息工程大学滨江学院计算机系网络工程专业</li>
              <li>虽然所学为网络工程专业，但个人爱好更偏向于编程和Web方向，喜欢专研技术</li>
              <li>使用最熟练的编程语言是Python，熟悉Python Web主流框架，包括Flask、Django</li>
              <li>同时也熟悉使用Python的分布式爬虫框架Scrapy，以及搜索引擎框架ElasticSearch</li>
              <li>对于前端技术也有一定的了解，比如常用的前端框架Vue.js</li>
              <li>对于服务器部署方面也有一定的了解，熟悉Linux常用命令，熟悉Docker、Nginx等服务器软件</li>
              <li>对于新兴技术有着强烈的学习兴趣，如大数据、区块链、机器学习、人工智能等都有广泛关注</li>
              <li>未来发展目标是成为一名全栈工程师</li>
              <li>目前积极寻找实习机会</li>
            </ul>
          </el-card>
        </div>
        <div class="about-item about-lyc">
          <el-card>
            <h2>『关于本站』 About this</h2>
            <ul>
              <li>本站于2018年10月18日上线</li>
              <li>本站域名注册和服务器托管均使用<a href="https://www.aliyun.com/"> 阿里云</a></li>
              <li>本站是一个前后端分离的项目，通过RESTful API进行数据交互</li>
              <li>前端使用Vue.js构建，后端使用Python的Django构建，数据库使用Mysql，缓存使用Redis，服务器使用Nginx</li>
              <li>并且整个项目通过Docker打包上线，所有源代码都以同步到我的 <a href="https://github.com/luoyangC">Github</a></li>
            </ul>
          </el-card>
        </div>
        <div class="about-item about-call">
          <el-card>
            <h2>『联系方式』 Call me</h2>
            <ul>
              <li>QQ: 1769570627</li>
              <li>Phone: 15261829198</li>
              <li>Email: 1769570627@qq.com</li>
              <li>Gitee: <a href="https://gitee.com/luoyang_C">https://gitee.com/luoyang_C</a></li>
              <li>GitHub: <a href="https://github.com/luoyangC">https://github.com/luoyangC</a></li>
              <li>LeetCode: <a href="https://leetcode-cn.com/luoyangc">https://leetcode-cn.com/luoyangc</a></li>
            </ul>
          </el-card>
        </div>
      </el-col>
      <el-col style="margin-top: 0; background-color: rgba(222,146,181,0)"
              :lg="{span: 12, offset: this.$store.state.contentOffset}" :md="{span: 18, offset: this.$store.state.contentOffset-2}">
        <router-link tag="div" to="/archives" >
          <div class="about-item about-back">
            <el-button icon="el-icon-arrow-left" circle></el-button>
            <span> Record</span>
          </div>
        </router-link>
      </el-col>
    </el-row>
    <div class="hidden-md-and-down" style="width: 100%;height: 100px;background-color: rgba(97,97,97,0)">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: 'About',
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
    .about-image
      width 100%
      overflow hidden
      img
        width 100%
      .about-title
        color white
        text-align left
        font-size 30px
        line-height 50px
        margin-left 6px
        margin-top -50px
        margin-bottom 0
        top 100%
    .about-item
      margin-top 40px
      text-align left
      line-height 25px
      .el-card
        background-color rgba(255,255,255,0.8)
    .about-back
      background-color rgba(255,255,255,0)
        el-button
          background-color rgba(255,255,255,1)
</style>

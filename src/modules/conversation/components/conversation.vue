<template>
  <div class="conversation">
    <div class="nav-bar">
      <ul>
        <router-link to="/main/conversation/all" tag="li">
          <i class="el-icon-menu"></i>
          <span>全部</span>
          <i class="el-icon-arrow-right"></i>
        </router-link>
        <router-link to="/main/conversation/new" tag="li">
          <i class="icon-personal iconfont"></i>
          <span>新人</span>
          <i class="el-icon-arrow-right"></i>
        </router-link>
        <router-link to="/main/conversation/talking" tag="li">
          <i class="icon-jishigoutong iconfont"></i>
          <span>沟通中</span>
          <i class="el-icon-arrow-right"></i>
        </router-link>
        <router-link to="/main/conversation/suitable" tag="li">
          <i class="icon-Happy iconfont"></i>
          <span>合适</span>
          <i class="el-icon-arrow-right"></i>
        </router-link>
        <router-link to="/main/conversation/unsuitable" tag="li">
          <i class="icon-sad iconfont"></i>
          <span>不合适</span>
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </ul>
    </div>
    <div class="conversation-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.conversation
  position relative
  height 100%
  .nav-bar
    position absolute
    top 0
    left 0
    height 100%
    width 120px
    background-color rgb(247, 247, 247)
    ul
      li
        position relative
        cursor pointer
        padding-left 50px
        height 40px
        line-height 40px
        font-size 14px
        color rgb(153, 153, 153)
        &.router-link-active
          background-color rgb(238, 238, 238)
          color rgb(231, 95, 21)
          cursor default
          .el-icon-arrow-right
            display block
        i
          position absolute
          text-align center
          left 14px
          top 0
          width 40px
          height 40px
          font-size 16px
          line-height 40px
        .el-icon-arrow-right
          display none
          font-size 14px
          left auto
          text-align right
          right 6px
  .conversation-content
    padding-left 120px
    box-sizing border-box
</style>

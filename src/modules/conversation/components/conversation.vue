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
      <div class="help-button">
        <span @click="helpVisible = true">
          <i class="icon-help iconfont"></i>
          帮助
        </span>
      </div>
    </div>
    <div class="conversation-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <el-dialog
      title="帮助"
      :visible.sync="helpVisible"
      class="help-dialog"
      width="630px">
      <p>反馈给产品经理（邮箱：kylefu@foxmail.com）</p>
      <h4>全部</h4>
      <p class="help-content">正在与沟通所有候选人，与小程序&APP消息列表一致</p>
      <h4>新人</h4>
      <p class="help-content">指投递尚未查看的新人</p>
      <h4>沟通中</h4>
      <p class="help-content">指投递且已回复或点击了待沟通的候选人，以及邀约且对方已回复的候选人</p>
      <h4>合适</h4>
      <p class="help-content">指已经被点击了合适的候选人</p>
      <h4>不合适</h4>
      <p class="help-content">指已经被点击了不合适的候选人</p>
      <h4>其他：</h4>
      <p>
        <span class="help-content-button">投递</span>
        <span>：指主动投递的候选人</span>
        <span class="help-content-button mgl10">邀约</span>
        <span>：指您邀约的候选人</span>
      </p>

    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      helpVisible:false
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
    .help-button
      margin-top 10px
      text-align center
      padding 5px
      span
        cursor pointer
        display inline-block
        width 100%
        padding 10px 0
        border-top 1px solid #eee
        color #ccc
  .conversation-content
    height 100%
    padding-left 120px
    box-sizing border-box
  .help-dialog
    h4
      line-height 50px
      color #000
      font-size 16px
    .help-content
      line-height 46px
      padding 0 20px
      background-color #eee
    .help-content-button
      padding 0 5px
      border 1px solid #ccc
</style>
<style lang="stylus" rel="stylesheet/stylus">
.conversation
  .el-dialog__body
    padding-top: 10px
</style>

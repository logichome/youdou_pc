<template>
  <div class="job-manage">
        <div class="nav-bar">
      <ul>
        <router-link to="/main/job_manage/interview" tag="li">
          <i class="iconfont icon-xingzhuang"></i>
          <span>面试</span>
          <i class="el-icon-arrow-right"></i>
        </router-link>
        <router-link to="/main/job_manage/offer" tag="li">
          <i class="iconfont icon-offer"></i>
          <span>offer</span>
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </ul>
    </div>
    <div class="job-manage-content">
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
.job-manage
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
  .job-manage-content
    height 100%
    padding-left 120px
    box-sizing border-box
</style>

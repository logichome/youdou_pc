<template>
  <div class="main-page">
    <div class="header">
      <h1>
        <span>有豆</span>
        <span class="orange">招聘</span>
        <span>企业版</span>
      </h1>
      <div class="lnk">
        <div class="avatar"></div>
        <div class="user-name"></div>
        <div class="logout"></div>
      </div>
    </div>
    <div class="sidebar">
      <div class="sidebar-content"></div>
    </div>
  </div>
</template>
<script>
import { INIT_USER_INFO } from '../vuex/actions_types'
export default {
  data () {
    return {
    }
  },
  created(){
    this.$store.dispatch(INIT_USER_INFO)
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../assets/styles/common.styl"
.main-page
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  .header
    position absolute
    top 0
    left 0
    z-index 3
    height 50px
    line-height 50px
    width 100%
    background-color #364150
    h1
      font-size 20px
      padding-left 10px
      color #fff
      .orange
        color $baseColor
    .lnk
      float right
  .sidebar
    position absolute
    top 0
    left 0
    bottom 0
    background-color rgb(221, 227, 236);
    width 300px
    height 100%
    .sidebar-content
      padding-top 50px
</style>

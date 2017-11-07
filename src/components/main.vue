<template>
  <div class="main-page">
    <div class="header">
      <h1>
        <span>有豆</span>
        <span class="orange">招聘</span>
        <span>企业版</span>
      </h1>
      <div class="lnk">
        <div class="avatar" :style="'background-image:url('+avatar+')'">
          <i v-show="!avatar" class="iconfont icon-personal"></i>
        </div>
        <div class="user-name">{{userName}}</div>
        <div class="logout" @click="handleLogOut">
          <i class="iconfont icon-logout"></i>
        </div>
      </div>
    </div>
    <div class="sidebar">
        <div class="sidebar-content">
          <ul>
            <router-link to="/main/resume" tag="li">
              <i class="iconfont icon-contactlist"></i>
              <span>人才库</span>
            </router-link>
            <router-link to="/main/job_manage" tag="li">
              <i class="iconfont icon-handle"></i>
              <span>职位管理</span>
            </router-link>
            <router-link to="/main/work_manage" tag="li">
              <i class="iconfont icon-manage"></i>
              <span>工作管理</span>
            </router-link>
            <router-link to="/main/conversation" tag="li">
              <i class="iconfont icon-communicatesolid"></i>
              <span>沟通</span>
            </router-link>
          </ul>
        </div>
    </div>
    <div class="main-body">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { INIT_USER_INFO,LOG_OUT } from '../vuex/actions_types'
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed:{
    ...mapState({
      userName: state => state.login.userInfo.user_person,
      avatar: state => state.login.userInfo.logo,
      loginState: state => state.login.loginState
    })
  },
  methods:{
    handleLogOut(){
      this.$confirm('是否确定退出登陆？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch(LOG_OUT)
        })
    }
  },
  created(){
    if(!this.loginState){
      this.$store.dispatch(INIT_USER_INFO)
    }
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
  min-width 1000px
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
      position absolute
      top 7px
      right 0
      div
        float left
        height 36px
        line-height 36px
        color #fff
        margin-right 10px
      .avatar
        background-size cover
        background-position center
        width 36px
        text-align center
        background-color #666
        border-radius 50%
        overflow hidden
        cursor pointer
        i
          font-size 26px
      .user-name
        font-size 16px
      .logout
        cursor pointer
        width 36px
        text-align center
        i
          font-size 20px
  .sidebar
    position absolute
    top 0
    left 0
    bottom 0
    background-color rgb(221, 227, 236);
    width 180px
    height 100%
    .sidebar-content
      position absolute
      top 0
      box-sizing border-box
      padding-top 50px
      height 100%
      left 0
      width 100%
      ul
        li
          position relative
          cursor pointer
          padding-left 60px
          height 40px
          line-height 40px
          font-size 14px
          color #000
          &.router-link-active
            background-color rgb(195, 206, 221);
            // cursor default
          i
            position absolute
            left 34px
            top 0
            width 40px
            height 40px
            font-size 18px
            color #666
            line-height 40px
  .main-body
    height 100%
    box-sizing border-box
    padding-top 50px
    padding-left 180px
</style>

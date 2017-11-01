<template>
  <div class="login container">
    <div class="title">
      有豆 <span class="orange">招聘</span>
    </div>
    <div class="main">
      <div class="login-box" v-show="step===0">
        <div v-show="!isRegister">
          <login-password v-show="loginType==='password'" class="login-form"></login-password>
          <login-message v-show="loginType==='message'" class="login-form"></login-message>
          <login-qrcode v-show="loginType==='qrcode'" class="login-form"></login-qrcode>
          <div class="other-way">
            <div class="other-way-title">其他方式</div>
            <ul class="other-way-list clearfix">
              <li @click="loginType='message'" v-show="loginType!=='message'" class="other-way-item">
                <i class="iconfont icon-msg"></i>
                <span>短信登陆</span>
              </li>
              <li @click="loginType='password'" v-show="loginType!=='password'" class="other-way-item">
                <i class="iconfont icon-watch"></i>
                <span>密码登陆</span>
              </li>
              <li @click="loginType='qrcode'" v-show="loginType!=='qrcode'" class="other-way-item">
                <i class="iconfont icon-qrcode"></i>
                <span>扫码登陆</span>
              </li>
            </ul>
          </div>
        </div>
        <div v-show="isRegister">
          <login-register></login-register>
        </div>
        <div class="register-button">
          <span>{{isRegister ? '已' : '没'}}有账号？</span>
          <span @click="isRegister= !isRegister">立即{{isRegister ? '登陆' : '注册'}}</span>
        </div>
      </div>
      <base-info v-show="step===1"></base-info>
      <company-info v-show="step === 2"></company-info>
    </div>
  </div>
</template>
<script>
import loginPassword from './login_password'
import loginMessage from './login_message'
import loginQrcode from './login_qrcode'
import loginRegister from './login_register'
import baseInfo from './base_info'
import companyInfo from './company_info'
import '../styles/login.styl'
export default {
  data () {
    return {
      loginType:'password',
      isRegister:false,
      step:2  //0：登陆与注册，1：填写基础信息，2：公司信息
    }
  },
  components:{
    loginPassword,
    loginMessage,
    loginQrcode,
    loginRegister,
    baseInfo,
    companyInfo
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../assets/styles/common.styl"
.login
  background-color $backgroundColor
  .title
    padding 80px
    font-size 32px
    color #fff
    text-align center
    .orange
      color $baseColor
  .main
    position relative
    .login-box
      margin 0 auto
      width 400px
      background-color #fff
      .login-form
        padding 0 30px
      .other-way
        position relative
        border-top 1px solid #ccc
        padding 30px 30px
        font-size 14px
        .other-way-list
          position absolute
          top 30px
          right 30px
        .other-way-item
          margin-left 10px 
          cursor pointer
          float left
      .register-button
        background-color rgb(108, 122, 141)
        height 50px
        line-height 50px
        text-align center
        span
          &:first-of-type
            color rgb(195, 206, 221);
          &:last-of-type
            cursor pointer
            color rgb(231, 95, 21);
    .base-info-box
      margin 0 auto
</style>
<style lang="stylus" rel="stylesheet/stylus">

</style>
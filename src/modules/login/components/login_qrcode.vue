<template>
  <div class="login-qrcode">
    <div class="login-title">登陆</div>
    <div class="login-desc">使用有豆招聘APP扫码登录</div>
    <div class="qrcode">
      <img :src="qrcodeUrl" alt="">
    </div>
  </div>
</template>
<script>
import {GET_QRCODE_URL} from '@/vuex/actions_types'
export default {
  data () {
    return {
    }
  },
  computed:{
    qrcodeUrl(){
      return this.$store.state.login.qrcode_url
    }
  },
  created(){
    this.$store.dispatch(GET_QRCODE_URL)
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.login-title
  padding-bottom 10px
.login-qrcode
  height 302px
  text-align center
.qrcode
  padding 20px
  height 160px
  width 160px
  margin 0 auto
  img
    height 160px
    width 160px
</style>

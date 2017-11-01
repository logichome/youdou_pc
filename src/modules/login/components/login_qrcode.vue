<template>
  <div class="login-qrcode">
    <div class="login-title">登陆</div>
    <div class="login-desc">使用有豆招聘APP扫码登录</div>
    <div class="qrcode">
      <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1062989499,1682648318&fm=58" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods:{
    submit(){
      
    }
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

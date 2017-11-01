<template>
  <div class="login-register">
    <div class="login-title">注册</div>
    <el-form ref="form">
      <el-form-item class="input-box">
        <i class="iconfont input-iconfont icon-phone"></i>
        <el-input placeholder="手机号" v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item class="input-box">
        <i class="iconfont input-iconfont icon-msg"></i>
        <el-input  type="password" placeholder="验证码" v-model="form.code"></el-input>
        <el-button class="getcode-button">获取验证码</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="submit" class="submit-button" type="primary">注册</el-button>
    <div class="agreement">
      <el-checkbox v-model="checked">同意有豆招聘</el-checkbox>
      <span class="agreement-link">用户协议及隐私政策</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form:{
        telephone:'',
        code:''
      },
      checked:false
    }
  },
  methods:{
    submit(){

    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../assets/styles/common.styl"
.login-register
  height 377px
  padding 0 30px
  .agreement-link
    color $baseColor
</style>

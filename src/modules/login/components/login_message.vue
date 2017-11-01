<template>
  <div class="login-message">
    <div class="login-title">登陆</div>
    <el-form ref="form" :model="form">
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
    <el-button @click="submit" class="submit-button" type="primary">登陆</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form:{
        telephone:'',
        code:''
      }
    }
  },
  methods:{
    submit(){
      
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

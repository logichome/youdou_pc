<template>
  <div class="login-message">
    <div class="login-title">登陆</div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item class="input-box" prop="telephone">
        <i class="iconfont input-iconfont icon-phone"></i>
        <el-input placeholder="手机号" v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item class="input-box" prop="checkcode">
        <i class="iconfont input-iconfont icon-msg"></i>
        <el-input  placeholder="验证码" v-model="form.checkcode"></el-input>
        <el-button @click="getCheckCode" :disabled="getCodeCount !== 0" class="getcode-button">{{getCodeText}}</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="submit" class="submit-button" type="primary">登陆</el-button>
  </div>
</template>
<script>
import {INIT_LOGIN } from '@/vuex/actions_types'
export default {
  data () {
    return {
      form:{
        telephone:'',
        checkcode:'',
        logintype:'pc'
      },
      rules: {
        telephone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号位数不正确', trigger: 'blur' }
        ],
        checkcode:[
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码格式不正确', trigger: 'blur' }
        ]
      },
      getCodeCount:0,
      getCodeText:'获取验证码'
    }
  },
  methods:{
    //获取验证码
    getCheckCode(){
      this.$refs['form'].validateField('telephone',err => {
        if(!err){
          this.$api.login.getCheckCode({telephone:this.form.telephone})
          this.getCodeCount = 30
          this.getCodeText = '获取验证码('+this.getCodeCount+')'
          let timer = setInterval(() => {
            this.getCodeCount--
            if(this.getCodeCount <= 0){
              clearInterval(timer)
              this.getCodeText = '获取验证码'
            } else {
              this.getCodeText = '获取验证码('+this.getCodeCount+')'
            }
          },1000)
        }
      })
    },
    // 提交表单
    submit(){
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$api.login.messageLogin(this.form)
            .then(res => {
              if(res.data.error === '0') {
                this.$store.dispatch(INIT_LOGIN,res.data.data)
              }
            })
        } else {
          return false;
        }
      });
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

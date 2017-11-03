<template>
  <div class="login-register">
    <div class="login-title">注册</div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item class="input-box" prop="telephone">
        <i class="iconfont input-iconfont icon-phone"></i>
        <el-input placeholder="手机号" v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item class="input-box" prop="checkcode">
        <i class="iconfont input-iconfont icon-msg"></i>
        <el-input  type="password" placeholder="验证码" v-model="form.checkcode"></el-input>
        <el-button :disabled="getCodeCount !== 0" @click="getCheckCode" class="getcode-button">{{getCodeText}}</el-button>
      </el-form-item>
    </el-form>
    <el-button :disabled="!checked" @click="submit" class="submit-button" type="primary">注册</el-button>
    <div class="agreement">
      <el-checkbox v-model="checked">同意有豆招聘</el-checkbox>
      <span class="agreement-link">用户协议及隐私政策</span>
    </div>
  </div>
</template>
<script>
import { INIT_LOGIN } from '@/vuex/actions_types'
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
      checked:false, //是否同意协议
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
          this.$api.login.submitRegister(this.form)
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
@import "../../../assets/styles/common.styl"
.login-register
  height 377px
  padding 0 30px
  .agreement-link
    color $baseColor
</style>

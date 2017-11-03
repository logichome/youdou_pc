<template>
  <div class="base-info">
    <div class="info-title">
      基础信息
    </div>
    <div class="base-info-content">
      <div class="base-info-form">
        <el-form ref="form" :rules="rules" :model="form">
          <el-form-item class="input-box" prop="user_person">
            <i class="iconfont input-iconfont icon-personal"></i>
            <el-input :maxlength="10" placeholder="联系人" v-model="form.user_person"></el-input>
          </el-form-item>
          <el-form-item class="input-box" prop="user_number">
            <i class="iconfont input-iconfont icon-tel"></i>
            <el-input :maxlength="20" placeholder="联系电话" v-model="form.user_number"></el-input>
          </el-form-item>
          <el-form-item class="input-box" prop="identity">
            <i class="iconfont input-iconfont icon-identity"></i>
                <el-autocomplete v-model="form.identity" :fetch-suggestions="querySearch" placeholder="身份"></el-autocomplete>
          </el-form-item>
        </el-form>
        <el-button @click="submit" class="submit-button" type="primary">下一步</el-button>
      </div>
      <div class="info-youdou-logo">
        <img src="../../../assets/imgs/logo.png" alt="">
        <div class="youdou-title">有豆招聘</div>
        <div class="youdou-desc">让你的简历不再石沉大海</div>
      </div>
    </div>
  </div>
</template>
<script>
import {SET_LOGIN_STEP,SET_TEMP_INFO} from '@/vuex/mutations_types'
export default {
  data () {
    return {
      form:{
        user_person:'',
        user_number:'',
        identity:''
      },        
      rules: {
        user_person: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        user_number: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' }
        ],
        identity: [
          { required: true, message: '请输入联系人身份', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
      },
      identityList: [
        {value:'老板'},
        {value:'总监'},
        {value:'副总监'},
        {value:'总经理'},
        {value:'经理'},
        {value:'人事经理'},
      ]
    }
  },
  methods:{
    //身份输入建议
    querySearch(queryString, cb){
      let identityList = this.identityList;
      let results = queryString ? identityList.filter(this.createFilter(queryString)) : identityList;
        // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 身份输入搜索
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    submit(){
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$store.commit(SET_TEMP_INFO,this.form)
          this.$store.commit(SET_LOGIN_STEP,2)
        } else {
          return false;
        }
      });

    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.base-info
  margin 0 auto
  background-color #fff
  width 750px
  .base-info-content
    position relative
    padding-left 410px
    .base-info-form
      position absolute
      top 0
      left 0
      width 350px
      padding 30px
      border-right 1px solid #eee
      .el-autocomplete
        display block
    .info-youdou-logo
      color #000
      width 100%
      height 340px
      text-align center
      img
        width 80px
        height 80px
        padding-top 40px
      .youdou-title
        padding-top 20px
      .youdou-desc
        padding-top 20px
        font-size 16px
</style>

<template>
<div class="company-info">
  <div class="info-title">
    公司信息
  </div>
  <div class="company-info-content">
    <div class="company-info-form">
      <div class="avatar-box">
        <div class="avatar">
          <input type="file">
          <i class="iconfont icon-photo"></i>
          <img src="logoUrl" alt="">
        </div>
        
      </div>
      <el-form ref="form">
        <el-form-item class="input-box icon-less" prop="user_person">
          <el-input :maxlength="10" placeholder="公司名称" v-model="form.business_name"></el-input>
        </el-form-item>
        <el-form-item class="input-box icon-less" prop="user_person">
          <el-input :maxlength="10" placeholder="公司简称" v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item class="input-box icon-less adress-input" prop="user_number">
          <el-input @focus="chooseAddress" :maxlength="10" placeholder="公司地址" readonly v-model="form.address"></el-input>
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
  <el-dialog width="900px" title="选择公司地址" :visible.sync="mapVisible">
    <div class="map-dialog">
      <choose-address :initAddress="{address:form.address,longitude:form.longitude,latitude:form.latitude}" @addressSubmit="handleAddressSubmit"></choose-address>
    </div>
  </el-dialog>
</div>
</template>
<script>
import chooseAddress from '@/components/form/choose_address'
export default {
  data () {
    return {
      form:{
        business_name:'',
        short_name:'',
        welfare:[],
        scale:'',
        property:'',
        introduction:'',
        address:'',
        longitude:'',
        latitude:'',
        logo:'',
        businfo_img:[]
      },
      mapVisible:false,
      logoUrl:''
    }
  },
  methods:{
    // 选择地址
    chooseAddress(){
      this.mapVisible = true
    },
    //处理地址提交
    handleAddressSubmit(result){
      this.mapVisible = false
      this.form.address = result.address
      this.form.longitude = result.longitude
      this.form.latitude = result.latitude
    },
    // 提交信息
    submit(){

    }
  },
  components:{
    chooseAddress
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.company-info
  margin 0 auto
  background-color #fff
  width 750px
  .company-info-content
    position relative
    padding-left 410px
    .avatar-box
      height 100px
      position relative
      .avatar
        position relative
        margin 0 auto
        height 70px
        width 70px
        border-radius 50%
        overflow hidden
        background-color #dde3ec
        text-align center
        i
          background-color #dde3ec
          position absolute
          line-height 65px
          text-align center
          font-size 35px
        i
        img
          width 100%
          height 100%
        input
          position: absolute;
          z-index 2
          top: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          opacity: 0  
    .company-info-form
      position absolute
      top 0
      left 0
      width 350px
      padding 30px
      border-right 1px solid #eee
    .info-youdou-logo
      color #000
      width 100%
      height 800px
      margin-bottom 100px
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

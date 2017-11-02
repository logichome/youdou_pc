<template>
<div class="company-info">
  <div class="info-title">
    公司信息
  </div>
  <div class="company-info-content">
    <div class="company-info-form">
      <div class="avatar-box">
        <div class="avatar">
          <input type="file" @change="uploadLogo">
          <i v-show="!logoUrl" class="iconfont icon-photo"></i>
          <img :src="logoUrl" alt="">
        </div>
        
      </div>
      <el-form ref="form">
        <el-form-item class="input-box icon-less" prop="business_name">
          <el-input :maxlength="20" placeholder="公司名称" v-model="form.business_name"></el-input>
        </el-form-item>
        <el-form-item class="input-box icon-less" prop="short_name">
          <el-input :maxlength="10" placeholder="公司简称" v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item class="input-box icon-less adress-input" prop="user_number">
          <el-input @focus="chooseAddress" placeholder="公司地址" readonly v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item class="input-box icon-less input-right-icon" prop="industry">
          <el-select v-model="form.industry" :multiple-limit="3" multiple placeholder="请选择行业类型">
            <el-option
              v-for="item in industryOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="input-box icon-less " prop="property">
          <el-select v-model="form.property" placeholder="请选择公司性质">
            <el-option
              v-for="item in propertyOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="input-box icon-less input-right-icon" prop="scale">
          <el-select v-model="form.scale" placeholder="请选择公司性质">
            <el-option
              v-for="item in scaleOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="input-box icon-less" prop="welfare">
          <el-select v-model="form.welfare" multiple filterable allow-create placeholder="请选择公司福利">
            <el-option
              v-for="item in welfareOptions"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-upload
        :action="$API_ROOT+'businessimg/create'"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        class="img-upload"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-button @click="submit" class="submit-button" type="primary">完成</el-button>
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
import { mapState } from 'vuex'
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
  computed:{
    ...mapState({
      welfareOptions: state => state.option.welfare,
      industryOptions: state => state.option.industry,
      scaleOptions: state => state.option.scale,
      propertyOptions: state => state.option.property,
      tempInfo: state => state.login.tempBaseInfo
    })
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
    // 上传logo
    uploadLogo(e){
      let formData = new FormData()
      formData.append('files[0]',e.target.files[0])
      this.$api.login.uploadCompanyImg(formData)
        .then(res => {
          this.form.logl = res.data.data[0].imgId
          this.logoUrl = res.data.data[0].filePath
        })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 提交信息
    submit(){
      let form = {...this.tempInfo,...this.form}
      console.log(form)
    }
  },
  components:{
    chooseAddress
  },
  mounted(){
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
    margin-bottom 100px
    padding-right 340px
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
      top 0
      left 0
      width 350px
      padding 30px
      border-right 1px solid #eee
    .img-upload
      margin-bottom 10px
    .info-youdou-logo
      color #000
      text-align center
      width 340px
      position absolute
      right 0
      top 0
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

<template>
  <div class="invite-offer">
  <h4>
    <span v-show="form.status == 3">面试邀约</span>
    <span v-show="form.status == 4">offer发放</span>
    <span v-show="form.status == 5">面试未通过</span>
  </h4>
  <p class="desc" v-show="formType == 3">面试邀请后请于3天内处理面试状态</p>
    <p class="desc" v-show="formType == 4">面试通过后请于3天内处理OFFER状态</p>
    <el-form ref="form" :rules="normalRules" :model="form">
      <el-form-item v-show="!noPassVisble" class="input-box icon-less" prop="contacts">
        <el-input placeholder="联系人" v-model="form.contacts"></el-input>
      </el-form-item>
      <el-form-item v-show="!noPassVisble" class="input-box icon-less" prop="telephone">
        <el-input :max-length="20" placeholder="联系电话" v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item v-show="!noPassVisble" class="input-box icon-less" prop="interview_time">
        <el-date-picker
          v-model="form.interview_time"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item v-show="!noPassVisble" class="input-box icon-less adress-input" prop="address">
        <el-input @focus="chooseAddress" placeholder="公司地址" readonly v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item v-show="noPassVisble" class="input-box icon-less last-el-form-item" prop="remark">
        <el-input type="textarea" :autosize="{minRows: 3, maxRows: 6}" resize="none" placeholder="面试未通过理由" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <button @click="submit">提交</button>
    <button class="no-pass" v-show="form.status == 4" @click="handleNoPass">面试未通过</button>
  <el-dialog append-to-body width="900px" title="选择地址" :visible.sync="mapVisible">
    <div class="map-dialog">
      <choose-address :initAddress="{address:form.address,longitude:form.longitude,latitude:form.latitude}" @addressSubmit="handleAddressSubmit"></choose-address>
    </div>
  </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import chooseAddress from '@/components/form/choose_address'
export default {
  props:['formType','jobId','userId','userName'],
  data () {
    return {
      mapVisible:false,

      noPassVisble:false,

      form:{
        contacts:'',
        telephone:'',
        address:'',
        longitude:'',
        latitude:'',
        interview_time:'', // 2017-11-09 00:00
        user_name:'',
        status:'',
        job_id:'',
        user_id:'',
        remark:''
      },

      normalRules: {
        contacts: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
        telephone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请选择地址', trigger: 'change' }
        ],
        interview_time: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ]
      },
    }
  },
  computed:{
    ...mapState({
      userInfo: state =>　state.login.userInfo
    })
  },
  methods:{
    init(){
      this.form.job_id = this.jobId
      this.form.user_id = this.userId
      this.form.user_name = this.userName
      this.form.status = this.formType
      this.form.contacts = this.userInfo.user_person
      this.form.telephone = this.userInfo.user_number
      this.form.address = this.userInfo.address
      this.form.longitude = this.userInfo.longitude
      this.form.latitude = this.userInfo.latitude
      this.noPassVisble = false
    },
    // 选择地址
    chooseAddress(){
      this.mapVisible = true
    },
    //提交地址
    handleAddressSubmit(result){
      this.mapVisible = false
      this.form.address = result.address
      this.form.longitude = result.longitude
      this.form.latitude = result.latitude
    },
    //显示面试未通过
    handleNoPass(){
      this.noPassVisble = true
      this.form.status = 5
    },
    //提交表单
    submit(){
      if(!this.noPassVisble){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$api.conversation.inviteOffer(this.form)
          } else {
            return false;
          }
        });
      } else {
        if(!this.form.remark) return this.$message({
          type:'error',
          message:'请填写面试不通过的理由'
        })
        this.$api.conversation.inviteOffer(this.form)
      }

    }
  },
  mounted(){
    this.init()
  },
  components:{
    chooseAddress
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.invite-offer
  margin-top -30px
  h4
    font-size 18px
    line-height 40px
  .desc 
    margin-bottom 20px
  .el-date-editor.el-input
    width 100%
  button
    display block
    cursor pointer
    width 100%
    line-height 40px
    margin-top 10px
    background-color #e75f15
    color #fff
    &.no-pass
      line-height 38px
      background-color #fff
      color #e75f15
      border 1px solid #e75f15
</style>

<template>
  <div class="edit-job">
    <div class="form" v-loading="submitLoading">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="职位名称" prop="job_name">
          <el-input v-model="form.job_name"></el-input>
        </el-form-item>
        <el-form-item label="职位类型" required>
          <el-radio-group v-model="form.job_type">
            <el-radio :label="0">不限</el-radio>
            <el-radio :label="1">全职</el-radio>
            <el-radio :label="2">兼职</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="薪　　资" required>
          <el-radio-group v-model="optionRadio.salaryRadio">
            <el-radio :label="0">面议</el-radio>
            <el-radio :label="1">范围</el-radio>
          </el-radio-group>
          <el-input-number :controls="false" :min="0" size="small" v-show="optionRadio.salaryRadio" class="mgl10 salary" v-model="form.min_salary"></el-input-number>
          <span v-show="optionRadio.salaryRadio">-</span>
          <el-input-number :controls="false" :min="0" size="small" v-show="optionRadio.salaryRadio" class="salary" v-model="form.max_salary"></el-input-number>
        </el-form-item>
        <el-form-item label="职位类别" prop="category">
          <el-cascader
            :options="categoryOption"
            :show-all-levels="false"
            v-model="form.category"
            :props="{label:'name',value:'value',children:'child'}"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="招聘人数" required>
          <el-radio-group v-model="optionRadio.numberRadio">
            <el-radio :label="0">若干</el-radio>
            <el-radio :label="1">指定</el-radio>
          </el-radio-group>
          <el-input-number class="mgl10" v-model="form.number" v-show="optionRadio.numberRadio" size="small" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="学历要求" required>
          <el-select v-model="form.education" placeholder="请选择">
            <el-option
              v-for="item in educationOption"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作经验" required>
          <el-select v-model="form.experience" placeholder="请选择">
            <el-option
              v-for="item in experienceOption"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作地点" prop="address">
          <el-form-item prop="address">
            <el-input ref="address" @focus="chooseAddress" placeholder="请选择工作地址" readonly v-model="form.address"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="职位描述" prop="job_desc">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入职位描述"
            v-model="form.job_desc">
          </el-input>
        </el-form-item>
          <div class="desc-tips">
            注：不能填写电话、QQ、微信、微博等联系方式及特殊符号、性别歧视等内容。
          </div>
      </el-form>
    </div>
    <div class="submit-box">
      <button class="primary-button" :disabled="submitLoading" @click="submit">提交修改</button>
    </div>
    <el-dialog width="900px" title="选择工作地址" :visible.sync="mapVisible">
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
      mapVisible:false,
      submitLoading:false,
      form:{
        business_id:'',
        job_name:'',
        job_desc:'',
        sex:0,
        number:'',
        max_salary:'',
        min_salary:'',
        education:0,
        experience:0,
        job_type:0,
        category:[],
        address:'',
        longitude:'',
        latitude:'',
      },
      rules:{
        job_name:[{ required: true, message: '请输入职位名称', trigger: 'blur' }],
        address:[{ required: true, message: '请选择工作地址' ,trigger:'change'}],
        job_desc:[{ required: true, message: '请输入职位描述', trigger: 'blur'  }],
        category:[{ type: 'array', required: true, message: '请选择职位类别', trigger: 'change' }],
      },
      optionRadio:{
        salaryRadio:0,
        numberRadio:0
      },
      sexOption:[{name:'不限',value:0},{name:'男',value:1},{name:'女',value:2}],
      jobTypeOption:[{name:'不限',value:0},{name:'全职',value:1},{name:'兼职',value:2}]
    }
  },
  computed:{
    ...mapState({
      educationOption: state => state.option.education,
      experienceOption: state => state.option.experience,
      categoryOption(state){
        let arr = JSON.parse(JSON.stringify(state.option.category))
        arr.forEach(item => {
          item.child.forEach(child => {
            child.child = child.sub
            delete child.sub
          })
        })
        return arr
      }
    })
  },
  methods:{
    handleAddressSubmit(result){
      this.mapVisible = false
      this.form.address = result.address
      this.form.longitude = result.longitude
      this.form.latitude = result.latitude
      this.$refs['form'].clearValidate()
    },
    chooseAddress(){
      this.mapVisible = true
    },
    resetForm(){
      Object.assign(this.$data, this.$options.data())
      this.$refs['form'].clearValidate()
    },
    submit(){
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let form = JSON.parse(JSON.stringify(this.form))
          if(!this.optionRadio.numberRadio){
            form.number = ''
          }
          form.category = form.category[form.category.length-1]
          form.business_id = this.$store.state.login.userInfo.business_id
          form.job_id = this.$route.params.id
          if(!form.longitude || !form.latitude){
            delete form.longitude
            delete form.latitude
          }
          this.Convert_BD09_To_GCJ02(form)
          this.submitLoading = true
          this.$api.jobManage.editJobInfo(form)
            .then(res => {
              this.submitLoading = false
              if(res.data.error == 0){
                this.$refs['form'].clearValidate()
                this.$message({
                  message: '职位修改成功',
                  type: 'success'
                })
                this.$router.push('/main/job_manage/on_job')
              }
            })
            .catch(err => {
              this.submitLoading = false
            })
        } else {
          return false;
        }
      })
    },
    jobDataInit(info){
      this.form.job_name = info.job_name
      this.form.job_desc = info.job_desc
      this.form.max_salary = info.max_salary
      this.form.min_salary = info.min_salary
      if(info.max_salary != 0 || info.min_salary != 0){
        this.optionRadio.salaryRadio = 1
      }
      this.form.category = info.category_code
      if(info.number != 0){
        this.optionRadio.numberRadio = 1
        this.form.number = info.number
      }
      this.form.address = info.address
      this.form.sex = this.formatOptionData(info.sex,this.sexOption)
      this.form.job_type = this.formatOptionData(info.job_type,this.jobTypeOption)
      this.form.education = this.formatOptionData(info.education,this.educationOption)
      this.form.experience = this.formatOptionData(info.experience,this.experienceOption)
    },
    formatOptionData(name,option){
      for(let item of option){
        if(item.name == name){
          return item.value
        }
      }
      return 0
    },
    Convert_BD09_To_GCJ02: function (point) {
        console.log(point.longitude)
        let x_pi = 3.14159265358979324 * 3000.0 / 180.0
        let x = point.longitude - 0.0065, y = point.latitude - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        point.longitude = z * Math.cos(theta);
        point.latitude = z * Math.sin(theta);
      }
  },
  components:{
    chooseAddress
  },
  activated(){
    this.$refs['form'].clearValidate()
    this.submitLoading = true
    this.$api.jobManage.getJobInfo({
      job_id:this.$route.params.id
    })
      .then(res => {
        this.submitLoading = false
        if(res.data.error == 0){
          this.jobDataInit(res.data.data)
        }
      })
      .catch(err => {
        this.submitLoading = false
      })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.edit-job
  padding 40px 50px
  .form
    width 600px
    .salary
      width 100px
    .desc-tips
      padding 0px 0 20px 80px
</style>

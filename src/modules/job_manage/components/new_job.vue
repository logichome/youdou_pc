<template>
  <div class="new-job">
    <div class="form">
      <button @click="mapVisible = true">address</button>
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
      mapVisible:false,
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
        category:'',
        address:'',
        longitude:'',
        latitude:'',
      }
    }
  },
  methods:{
    handleAddressSubmit(result){
      this.mapVisible = false
      this.form.address = result.address
      this.form.longitude = result.longitude
      this.form.latitude = result.latitude
    }
  },
  components:{
    chooseAddress
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.new-job
  padding 40px 30px
</style>

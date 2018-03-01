<template>
  <div class="job-list">
    <filter-bar></filter-bar>
    <div class="job-list-content" v-loading="listLoading">
      <ul>
        <router-link tag="li" :to="'edit_job/'+item.job_id" v-for="(item,index) in jobList" :key="index">
          <div class="job-info-first fl">
            <p class="job-name">{{item.job_name}}</p>
            <p>
              <span>{{item.job_type}}</span>
              <span>浏览{{item.job_browse}}次</span>
            </p>
          </div>
          <div class="job-info-second fl">
            <p class="black-font">{{item.address}}</p>
            <p>{{item.category}}</p>
          </div>
          <div class="job-info-third fl">
            <p class="black-font">{{item.deliver}}</p>
            <p>简历投递</p>
          </div>
          <div class="status-control fr">
            <button :disabled="statusLoading" class="primary-button" @click.stop="changeStatus(item)">{{item.status == 1 ? '下架' : '上架'}}</button>
          </div>
        </router-link>
      </ul>
    </div>
    <div class="page-nav">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import filterBar from './filter_bar'
import { GET_JOB_MANAGE_LIST } from '@/vuex/actions_types'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      currentPage:1,
      statusLoading:false
    }
  },
  computed:{
    ...mapState({
      jobList: state => state.jobManage.jobList,
      listLoading: state => state.jobManage.listLoading,
      total: state => state.jobManage.total
    })
  },
  methods:{
    handleCurrentChange(page){
      this.$store.dispatch(GET_JOB_MANAGE_LIST,{page})
    },
    changeStatus(job){
      this.statusLoading = true
      this.$api.jobManage.editJobInfo({
        business_id:this.$store.state.login.userInfo.business_id,
        job_id:job.job_id,
        status:job.status == 1 ? '2' : '1'
      })
        .then(res => {
          this.statusLoading = false
          if(res.data.error == 0) {
            this.$store.dispatch(GET_JOB_MANAGE_LIST,{page:this.currentPage})
          }
        })
        .catch(err => {
          this.statusLoading = false
        })
    }
  },
  created(){
    this.$store.dispatch(GET_JOB_MANAGE_LIST,{page:this.currentPage})
  },
  components:{
    filterBar
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.job-list
  position: relative;
  padding: 40px 20px;
  box-sizing border-box
  height 100%
  .job-list-content
    overflow: auto;
    height: 100%;
    ul
      li
        height 40px
        padding 15px 0
        border-bottom 1px solid #eee
        .job-info-first
        .job-info-second
        .job-info-third
          margin-right 10px
          line-height 20px
          .job-name
            color #409EFF
          .black-font
            color #000
        .job-info-first
          width 120px
        .job-info-second
          width 170px
  .page-nav
    height 40px
    width 100%
    background-color #fff
    text-align center
    position absolute
    left 0
    bottom 0
</style>

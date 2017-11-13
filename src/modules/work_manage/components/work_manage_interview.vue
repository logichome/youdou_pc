<template>
  <div class="interview">
    <filter-bar ref="filterbar" type="interview" @refresh="handleRefresh" @filterChange="handleFilterChange"></filter-bar>
    <div class="count" v-loading="loading">
      <div class="count-item">
        <p class="count-item-key">待面试</p>
        <p class="count-item-value">{{waiting}}</p>
      </div>
      <div class="count-item">
        <p class="count-item-key">已面试</p>
        <p class="count-item-value">{{already}}</p>
      </div>
      <div class="count-item">
        <p class="count-item-key">下一个面试预计在</p>
        <p class="count-item-value">{{estimate}}</p>
      </div>
    </div>
    <div class="interview-list" v-loading="loading">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <div class="avatar pa" :style="'background-image:url('+item.header_url+')'"></div>
          <div class="user-info pa">
            <p class="interview-list-key">{{item.name}}</p>
            <p class="interview-list-value">
              <span>{{item.sex}}/</span>
              <span>{{item.age}}岁/</span>
              <span>{{item.education}}/</span>
              <span>{{item.job_age}}年工作经验</span>
            </p>
          </div>
          <div class="interview-time pa">
            <p class="interview-list-key">面试时间</p>
            <p class="interview-list-value">{{item.interview_time}}</p>
          </div>
          <div class="job-info pa">
            <p class="interview-list-key">面试职位</p>
            <p class="interview-list-value">{{item.job_name}}</p>
          </div>
          <div class="interview-progress">
            <div class="interview-progress-box">
              <div class="interview-progress-value"></div>
            </div>
          </div>
          <div class="interview-operation pa">
            <span @click="handleOperationClick(item)">操作</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentPageChange"
        :current-page.sync="filter.page"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>


    <el-dialog :visible.sync="offerVisible" width="370px">
      <invite-offer @success="handleOfferSuccess" ref="offerForm"  :form-type="4" :job-id="offerInfo.job_id" :user-id="offerInfo.user_id" :user-name="offerInfo.name"></invite-offer>
    </el-dialog>
  </div>
</template>
<script>
import filterBar from './filter_bar'
import inviteOffer from '@/components/form/invite_offer'
export default {
  data () {
    return {
      offerVisible:false,
      offerInfo:{
        job_id:'',
        user_id:'',
        name:''
      },

      loading:false,

      filter:{
        interview:0,
        status:1,
        page:1
      },
      waiting:'',
      already:'',
      estimate:'',
      total:0,
      list:[]
    }
  },
  methods:{
    //处理页数变化
    handleCurrentPageChange(page){
      this.filter.page = page
      this.handleRefresh()
    },
    // 处理刷新
    handleRefresh(){
      this.loading = true
      this.$api.workManage.getWorkManageList(this.filter)
        .then(res => {
          this.loading = false
          if(res.data.error === '0'){
            this.waiting = res.data.data.waiting
            this.already = res.data.data.already
            this.estimate = res.data.data.estimate
            this.total = res.data.data.count
            this.list = res.data.data.list
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    // 筛选条件变化
    handleFilterChange(filter){
      this.filter.interview = filter.interview
      this.handleRefresh()
    },
    // 操作按钮点击
    handleOperationClick({name,job_id,user_id}){
      this.offerInfo = {
        job_id,
        user_id,
        name
      }
      this.offerVisible = true
    },
    // 修改面试状态成功
    handleOfferSuccess(){
      this.offerVisible = false
    },
    // 初始化数据
    init(){
      this.filter = {
        interview:0,
        status:1,
        page:1
      }
      this.$ref && this.$ref.filterbar && this.$ref.filterbar.init()
      this.handleRefresh()
    }
  },
  activated(){
    this.init()
  },
  components:{
    filterBar,
    inviteOffer
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.interview
  position relative
  padding 40px 20px 0
  .count
    height 60px
    background-color rgb(247, 247, 247)
    padding 20px 0
    .count-item
      float left
      width 28%
      border-right 1px solid #ccc
      text-align center
      height 60px
      &:nth-of-type(3)
        border-right none
        width 43%
      .count-item-key
        color rgb(102, 102, 102);
        line-height 20px
      .count-item-value
        color #333
        line-height 40px
        font-size 28px
  .interview-list
    ul
      li
        height 50px
        padding 20px 60px 20px 550px
        position relative
        border-bottom 1px solid #eee
        .avatar
          top 20px
          left 0
          background-size cover
          background-position center
          background-color #bbb
          width 50px
          height 50px
          border-radius 50%
          overflow hidden
        .user-info
          top 20px
          left 60px
          width 200px
          padding 0 10px
        .interview-time
          top 20px
          left 270px
          width 120px
          padding 0 10px
        .job-info
          top 20px
          left 400px
          width 140px
          padding 0 10px
        .interview-list-key
          line-height 24px
          color #333
        .interview-list-value
          line-height 26px
        .interview-progress
          padding 19px 0
          .interview-progress-box
            background-color rgb(247, 247, 247)
            border 1px solid rgb(228, 228, 228)
            height 12px
            width auto
            .interview-progress-value
              background-color rgb(51, 153, 255)
              width 50%
              height 100%
        .interview-operation
          width 50px
          top 20px
          right 0
          text-align center
          line-height 50px
          span
            cursor pointer
  .pagination
    text-align center
    padding 10px 0
</style>

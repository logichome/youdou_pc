<template>
  <div class="offer">
    <filter-bar ref="filterbar" type="offer" @refresh="handleRefresh" @filterChange="handleFilterChange"></filter-bar>
    <div class="offer-list" v-loading="loading">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <div class="avatar pa" :style="'background-image:url('+item.header_url+')'"></div>
          <div class="user-info pa">
            <p class="offer-list-key">{{item.name}}</p>
            <p class="offer-list-value">
              <span>{{item.sex}}/</span>
              <span>{{item.age}}岁/</span>
              <span>{{item.education}}/</span>
              <span>{{item.job_age}}年工作经验</span>
            </p>
          </div>
          <div class="offer-time pa">
            <p class="offer-list-key">入职时间</p>
            <p class="offer-list-value">{{item.interview_time}}</p>
          </div>
          <div class="job-info pa">
            <p class="offer-list-key">职位</p>
            <p class="offer-list-value">{{item.job_name}}</p>
          </div>
          <div class="offer-status pa">
            <span :style="'color:' + item.color">{{item.text}}</span>
            <span v-show="item.reject_remark" @click="showRemark(item.reject_remark)" class="offer-remark">备注</span>
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

    <el-dialog title="拒绝OFFER" :visible.sync="remarkVisible" width="370px">
      <div class="remark-dialog">
        <div class="remark-content">{{remark}}</div>
        <button @click="remarkVisible = false">确认</button>
      </div>
      
    </el-dialog>
  </div>
</template>
<script>
import filterBar from './filter_bar'
export default {
  data () {
    return {
      loading:false,
      remarkVisible:false,
      remark:'',

      filter:{
        offer:0,
        status:2,
        page:1
      },

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
    //显示备注
    showRemark(remark){
      this.remark = remark
      this.remarkVisible = true
    },
    // 处理刷新
    handleRefresh(){
      this.loading = true
      this.$api.workManage.getWorkManageList(this.filter)
        .then(res => {
          this.loading = false
          if(res.data.error === '0'){
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
      this.filter.offer = filter.offer
      this.handleRefresh()
    },
    // 初始化数据
    init(){
      this.filter = {
        offer:0,
        status:2,
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
    filterBar
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.offer 
  position relative
  padding 40px 20px 0
  .offer-list
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
        .offer-time
          top 20px
          left 270px
          width 120px
          padding 0 10px
        .job-info
          top 20px
          left 400px
          width 150px
          padding 0 10px
        .offer-list-key
          line-height 24px
          color #333
        .offer-list-value
          line-height 26px
        .offer-status
          padding 0 10px
          right 0
          top 20px
          line-height 50px
          text-align center
          .offer-remark
            margin-left 10px
            color #409EFF
            cursor pointer
  .pagination
    text-align center
    padding 10px 0
  .remark-dialog
    margin-top -20px
    .remark-content
      color rgb(102, 102, 102)
    button
      width 100%
      height 40px
      line-height 40px
      background-color #e75f15
      color #fff
      font-size 16px
      margin-top 20px
      cursor pointer
</style>

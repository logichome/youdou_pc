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
    <div class="interview-list">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <div class="avatar fl" :style="'background-image:url('+item.header_url+')'"></div>
          <div class="user-info fl">
            <p class="name">{{item.name}}</p>
            <p class="multi-info">
              <span>{{item.sex}}/</span>
              <span>{{item.age}}岁/</span>
              <span>{{item.education}}/</span>
              <span>{{item.job_age}}年工作经验</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import filterBar from './filter_bar'
export default {
  data () {
    return {
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
    handleCurrentPageChange(page){
      this.filter.page = page
    },
    handleRefresh(){
      this.loading = true
      this.$api.jobManage.getJobManageList(this.filter)
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
    handleFilterChange(filter){
      this.filter.interview = filter.interview
      this.handleRefresh()
    },
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
    filterBar
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
        padding 20px 0
        border-bottom 1px solid #eee
        .avatar
          background-size cover
          background-position center
          background-color #bbb
          width 50px
          height 50px
          border-radius 50%
          overflow hidden
        .user-info
          width 200px
          padding 0 10px
          .name
            line-height 24px
            color #333
          .multi-info
            line-height 26px
</style>

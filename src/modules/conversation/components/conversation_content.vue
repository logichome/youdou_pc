<template>
  <div class="conversation-container">
    <filter-bar></filter-bar>
    <div class="data-empty">
      <img src="../../../assets/imgs/data_empty.png" alt="">
      <el-button>去人才库找找~</el-button>
    </div>
    <div class="conversation-list">
      <ul>
        <li class="conversation-item">
          <div class="conversation-item-hd">
            <div class="avatar"></div>
          </div>
          <div class="conversation-item-bd">
            <div class="base-info"></div>
            <div class="last-message"></div>
          </div>
          <div class="conversation-item-ft">
            <div class="is-read"></div>
            <div class="last-time"></div>
            <div class="job-name"></div>
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
    }
  },
  components:{
    filterBar
  },
  activated(){
    console.log(this.$route.fullPath.split('/')[3])
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../styles/conversation'
.conversation-container
  .conversation-list
    padding 0 20px
    .conversation-item
      height 50px
      padding 15px 0
      border-bottom 1px solid #eee
      .avatar
        background-color #eee
        width 50px
        height 50px
        border-radius 50%
</style>

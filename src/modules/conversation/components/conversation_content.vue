<template>
  <div class="conversation-container">
    <filter-bar @operationClick="handleChangeStatus" :operationShowed.sync="operationShowed" :operation-count="selectedList.length"></filter-bar>
    <div class="data-empty" v-show="!conversationList.length">
      <img src="../../../assets/imgs/data_empty.png" alt="">
      <el-button @click="$router.push('/main/resume')">去人才库找找~</el-button>
    </div>
    <div class="conversation-list" v-loading="listLoading">
      <ul>
          <li class="conversation-item" v-for="(item,index) in conversationList" @click="handleConversationClick(item)" :key="index">
            <div class="border-box clearfix">
              <div class="conversation-item-hd fl">
                <label :for="'item'+item.theme_id" class="check-box" v-show="operationShowed">
                  <input v-model="checkboxResult[index]" :id="'item'+item.theme_id" type="checkbox" :data-index="index" @change="handleSelectChange"></input>
                </label>
                <div class="avatar" :style="'background-image:url('+item.header_url+')'">
                  <i v-show="!item.header_url" class="iconfont icon-personal"></i>
                </div>
              </div>
              <div class="conversation-item-bd fl">
                <div class="base-info">
                  <span>{{item.name}}/</span>
                  <span>{{item.sex}}/</span>
                  <span>{{item.age}}/</span>
                  <span>{{item.education}}/</span>
                  <span>{{item.job_age}}年工作经验</span>
                  <span class="tag" v-for="(tag,tagIndex) in item.tag" :key="tagIndex">{{tag.text}}</span>
                </div>
                <div class="last-message">
                  <span>{{item.chat_content}}</span>
                </div>
              </div>
              <div class="conversation-item-ft fr">
                <div class="message-info">
                  <span :class="item.is_read === '1' ? 'is-read-true':'is-read-false'" class="is-read">{{item.is_read === '1' ? '已读' : '未读'}}</span>
                  <span class="last-time">{{item.update_at}}</span>
                </div>
                <div class="job-name">
                  <span>{{item.job_name}}</span>
                </div>
              
              
              </div>
            </div>
          </li> 
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
import { GET_CONVERSATION_LIST } from '@/vuex/actions_types'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      currentPage:1,
      operationShowed:false,
      selectedList:[],
      checkboxResult:[false,false,false,false,false,false,false,false,false,false]
    }
  },
  watch:{
    listLoading(val){
      if(val){
        this.operationShowed = false
        this.selectedList = []
        this.checkboxResult = [false,false,false,false,false,false,false,false,false,false]
      }
    }
  },
  methods:{
    handleSelectChange(e){
      let index = e.target.dataset.index
      let item = this.conversationList[index]
      if(e.target.checked){
        this.selectedList.push({
          theme_id:item.theme_id,
          job_id:item.job_id,
          user_id:item.user_id,
          index
        })
      } else {
        for(let i = 0; i < this.selectedList.length; i++){
          if(this.selectedList[i].index === index){
            this.selectedList.splice(i,1)
            break
          }
        }
      }
    },
    handleChangeStatus(status){
      this.$api.conversation.updateConversationState({
        status,
        list:this.selectedList
      })
        .then(res => {
          if(res.data.error === '0'){
            this.$store.dispatch(GET_CONVERSATION_LIST)
          }
        })
    },
    handleCurrentChange(page){
      this.$store.dispatch(GET_CONVERSATION_LIST,{page})
    },
    handleConversationClick(item){
      if(this.operationShowed) return
      this.$router.push({
        path:'/main/conversation/'+ item.theme_id,
        query:{user_id:item.user_id,job_id:item.job_id,resume_id:item.resume_id}
      })
    }
  },
  computed:{
    ...mapState({
      conversationList: state => state.conversation.conversationList,
      listLoading: state => state.conversation.listLoading,
      total: state => state.conversation.total
    })
  },
  components:{
    filterBar
  },
  created(){
    this.$store.dispatch(GET_CONVERSATION_LIST,{page:this.currentPage})
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../styles/conversation'
.conversation-container
  .conversation-list
    padding 0
    overflow: auto;
    height: 100%;
    padding-top: 40px;
    box-sizing: border-box;
    padding-bottom 40px
    .conversation-item
      padding 0 20px 
      cursor pointer
      &:hover
        background-color #eee
      .border-box
        padding  15px 0
        height 50px
        border-bottom 1px solid #eee
      .conversation-item-hd
        .check-box
          display inline-block
          float left
          padding 16px 10px
          cursor pointer
          input
            cursor pointer
            width 18px
            height 18px
            color red
        .avatar
          display inline-block
          background-color #ccc
          width 50px
          height 50px
          border-radius 50%
          background-size cover
          background-position center
          text-align center
          line-height 50px
          i
            font-size 36px
      .conversation-item-bd
        width 350px
        padding-left 12px
        padding-top 5px
        .base-info
          color #000
          .tag
            color #888
            margin-left 5px
            padding 0 5px
            border-radius 3px
            background-color #eee
        .last-message
          padding-top 14px
          white-space:nowrap 
          overflow:hidden
          text-overflow:ellipsis
      .conversation-item-ft
        text-align right
        .message-info
          padding-top 5px
          .is-read
            padding 0 5px
            border-radius 3px
            &.is-read-true
              background-color #eee
              color #888
            &.is-read-false
              background-color #FA5555
              color #fff
          .last-time
            margin-left 10px
        .job-name
          padding-top 14px
          color #000
  .page-nav
    height 40px
    width 100%
    background-color #fff
    text-align center
    position absolute
    bottom 0
</style>

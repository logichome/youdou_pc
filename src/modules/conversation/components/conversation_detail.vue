<template>
  <div class="conversation-detail">
    <div class="resume" v-loading="resumeLoading">
      <div class="resume-content" v-if="resumeInfo">
        <div class="resume-avatar" :style="'background-image:url('+resumeInfo.resume.header_url+')'"></div>
        <div class="resume-name">{{resumeInfo.resume.name}}</div>
        <div class="resume-normal-item">
          <span class="resume-normal-item-key">性别：</span>
          <span class="resume-normal-item-value">{{resumeInfo.resume.sex}}</span>
        </div>
        <div class="resume-normal-item">
          <span class="resume-normal-item-key">学历：</span>
          <span class="resume-normal-item-value">{{resumeInfo.resume.education}}</span>
        </div>
        <div class="resume-normal-item">
          <span class="resume-normal-item-key">工作经验：</span>
          <span class="resume-normal-item-value">{{resumeInfo.resume.job_age}}年</span>
        </div>
        <div class="resume-normal-item">
          <span class="resume-normal-item-key">职业状态：</span>
          <span class="resume-normal-item-value">{{resumeInfo.resume.job_status || '暂未填写'}}</span>
        </div>
        <div class="resume-normal-item">
          <span class="resume-normal-item-key">期望薪资：</span>
          <span class="resume-normal-item-value">{{resumeInfo.resume.intent_salary || '暂未填写'}}</span>
        </div>
        <div class="resume-normal-item">
          <span class="resume-normal-item-key">意向城市：</span>
          <span class="resume-normal-item-value">{{resumeInfo.resume.intent_address || '暂未填写'}}</span>
        </div>
        <div class="resume-normal-item">
          <span class="resume-normal-item-key">意向岗位：</span>
          <span class="resume-normal-item-value">{{resumeInfo.resume.intent_job || '暂未填写'}}</span>
        </div>
        <div class="resume-multi-item">
          <span class="resume-multi-item-key">意向行业：</span>
          <p class="resume-multi-item-value">
            <span v-show="resumeInfo.resume.intent_industry.length <= 0">暂未填写</span>
            <span v-for="(item,index) in resumeInfo.resume.intent_industry" :key="index">{{item.industry_name}}<br></span>
          </p>
        </div>
        <div class="resume-multi-item">
          <span class="resume-multi-item-key">工作经历：</span>
          <p class="resume-multi-item-value" @click="experienceVisble = true" :class="{'resume-multi-cursor':resumeInfo.experience.length > 0}">
            <span v-for="(item,index) in resumeInfo.experience" :key="index">{{item.company_name}}<br></span>
            <span v-show="resumeInfo.experience.length <= 0">暂未填写</span>
            <i v-show="resumeInfo.experience.length > 0" class="el-icon-arrow-right"></i>
          </p>
        </div>
        <div class="resume-multi-item">
          <span class="resume-multi-item-key">教育经历：</span>
          <p class="resume-multi-item-value" @click="educationVisible = true" :class="{'resume-multi-cursor':resumeInfo.education.length > 0}">
            <span v-for="(item,index) in resumeInfo.education" :key="index">{{item.school_name}}<br></span>
            <span v-show="resumeInfo.education.length <= 0">暂未填写</span>
            <i v-show="resumeInfo.education.length > 0" class="el-icon-arrow-right"></i>
          </p>
        </div>
        <div class="resume-normal-item">
          <span class="resume-normal-item-key">自我介绍：</span>
          <p class="resume-intro">
            {{resumeInfo.resume.self_desc||'这家伙很懒，什么都没有留下。'}}  
          </p>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-content"  v-loading="chatLoading">
        <div class="main-header">
          <div class="header-job-info">
            <i class="iconfont icon-manage"></i>
            <span>求职岗位：</span>
            <span v-if="jobInfo">{{jobInfo.job_name}}</span>
            <div @click="handleRefresh" class="refresh fr">
              <i class="iconfont icon-shuaxin-"></i>
              <span>刷新</span>
            </div>
          </div>
          <div class="header-operation">
            <button class="operation-button" @click="handleOperationClick(1)">
              <i class="iconfont icon-Happy"></i>
              <span>合适</span>
            </button>
            <button class="operation-button" @click="handleOperationClick(2)">
              <i class="iconfont icon-sad"></i>
              <span>不合适</span>
            </button>
            <button class="operation-button" @click="handleOperationClick(3)">
              <i class="el-icon-check"></i>
              <span>已读</span>
            </button>
            <div class="change-status fr">
              <button class="change-status-button" @click="handleStatusChange">面试邀请</button>
              <button class="change-status-button" @click="handleStatusChange">OFFER发放</button>
            </div>
          </div>
        </div>
        <div class="chat-list-box">
          <div class="chat-list">
            <ul>
              <li class="chat-item"  ref="chatList" v-for="(item,index) in chartList" :key="index">
                <div class="chat-avatar" :style="'background-image:url('+item.sender_header_url+')'"></div>
                <div class="chat-message" :class="{'chat-message-self':item.send_role === '2'}">
                  <i class="chat-arrow"></i>
                  <span>{{item.chat_content}}</span>
                  <span class="chat-is-read" :style="'background-color:'+(item.is_read === '1' ? '#67C23A' : '#FA5555')">{{item.is_read === '1' ? '已读' : '未读'}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="chat-input-box"  @keydown.enter="handleMessageSend" >
          <el-input class="chat-input"v-model="inputMessage" placeholder="请输入内容"></el-input>
          <button @click="handleMessageSend" class="send-message">发 送</button>
        </div>
      </div>

    </div>

    <el-dialog title="工作经历"  :visible.sync="experienceVisble" width="700px">
      <el-table v-if="resumeInfo" ref="experienceTable" @row-click="handleDialogRowClick" :data="resumeInfo.experience" :show-header="true">
        <el-table-column type="expand">
          <template slot-scope="props">
            {{props.row.work_content}}
          </template>
        </el-table-column>
        <el-table-column property="company_name" label="公司" width="200"></el-table-column>
        <el-table-column property="job_name" label="职位" width="180"></el-table-column>
        <el-table-column property="start_time" label="开始"></el-table-column>
        <el-table-column property="end_time" label="结束"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="教育经历"  :visible.sync="educationVisible" width="700px">
      <el-table v-if="resumeInfo" ref="educationTable" @row-click="handleDialogRowClick" :data="resumeInfo.education" :show-header="true">
        <el-table-column type="expand">
          <template slot-scope="props">
            {{props.row.schoole_experience}}
          </template>
        </el-table-column>
        <el-table-column property="school_name" label="学校" width="200"></el-table-column>
        <el-table-column property="professional" label="专业" width="180"></el-table-column>
        <el-table-column property="start_time" label="开始"></el-table-column>
        <el-table-column property="end_time" label="结束"></el-table-column>
      </el-table>
    </el-dialog>



  </div>
</template>
<script>
export default {
  data () {
    return {
      resumeLoading:false,
      chatLoading:false,
      experienceVisble:false,
      educationVisible:false,

      inputMessage:'',

      themeId:'',
      businessId:'',
      receiveId:'',

      resumeInfo:null,
      chartList:[],
      jobInfo:null,

      intervalTimer:null,
      canGetNew:true
    }
  },
  methods:{
    //刷新
    handleRefresh(){},
    //点击表格单行展开
    handleDialogRowClick(row, event, column){
      this.$refs[this.experienceVisble ? 'experienceTable' : 'educationTable'].toggleRowExpansion(row)
    },
    // 获取最新二十条消息
    getInitChats(){
      this.$api.conversation.getConversationDetail(this.$route.query)
        .then(res => {
          this.chatLoading = false
          this.canGetNew = true
          if(res.data.error === '0') {
            this.jobInfo = res.data.data.jobInfo
            this.chartList = res.data.data.chats
            this.themeId =  res.data.data.theme_id
            this.businessId = res.data.data.business_id
            this.receiveId = res.data.data.userInfo.user_id
          }
        })
        .catch(err => {
          this.canGetNew = true
          this.chatLoading = false
        })
    },
    //获取简历信息
    getResumeDetail(){
      this.$api.conversation.getConversationResume({resume_id: this.$route.query.resume_id})
        .then(res => {
          this.resumeLoading = false
          if(res.data.error === '0'){
            this.resumeInfo = res.data.data
          }
        })
        .catch(err => {
          this.resumeLoading = false
        })
    },
    // 初始化信息
    init(){
      this.resumeLoading = true
      this.chatLoading = true
      this.getInitChats()
      this.getResumeDetail()
    },
    //操作是否合适
    handleOperationClick(){

    },
    //操作面试offer
    handleStatusChange(){

    },
    //发送消息
    handleMessageSend(){
      this.$api.conversation.sendConversationMessage({
        business_id:this.businessId,
        theme_id:this.themeId,
        type:1,
        content:this.inputMessage,
        receive_id:this.receiveId,
        receive_role:1
      })
      this.inputMessage = ''
    },
    //获取新消息
    setNewMessageInterval(){
      this.timer = setInterval(() => {
        if(this.canGetNew) {
          this.canGetNew = false
          let lastReadChat = ''
          let list = []
          for(let item of this.chartList){
            if(item.is_read === '0'){
              break
            }
            lastReadChat = item.chat_id
            list.push(item)
          }

          if(lastReadChat){
            this.$api.conversation.getConversationDetail({
              pull_way:1,
              chat_id:lastReadChat,
              ...this.$route.query
            })
              .then(res => {
                this.canGetNew = true
                if(res.data.error === '0'){
                  this.chartList = list.concat(res.data.data.chats)
                }
              })
              .catch(err => {
                this.canGetNew = true
              })
          } else {
            this.getInitChats()
          } 
        }
      },3000)
    },
    jumpToChatsBottom(){
      this.$refs.chatList[this.$refs.chatList.length-1].scrollIntoView()
    }
  },
  activated(){
    this.init()
    this.setNewMessageInterval()
  },
  deactivated(){
    clearInterval(this.timer)
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.conversation-detail
  position relative
  height 100%
  .resume
    height 100%
    position absolute
    top 0
    left 0
    background-color rgb(247, 247, 247)
    width 250px
    padding 0 30px
    overflow auto
    .resume-content
      .resume-avatar
        margin 24px auto 0
        width 120px
        height 120px
        border-radius 50%
        background-color #ccc
        background-size cover
        background-position center
      .resume-name
        line-height 60px
        text-align center
        color #333
      .resume-normal-item
      .resume-multi-item
        position relative
        color #333
        line-height 40px
        border-top 1px solid #ddd
        .resume-normal-item-key
        .resume-multi-item-key
          position absolute
          width 70px
          text-align right
        .resume-normal-item-value
        .resume-multi-item-value
          padding-left 80px
          display inline-block
          width 100%
          box-sizing border-box
          i
            position absolute
            right 5px
            font-size 20px
            color #bbb
            top 50%
            margin-top -10px
        .resume-multi-cursor
          cursor pointer
        .resume-intro
          padding-top 40px
          line-height 26px
          color #888
          word-wrap:break-word
    &::-webkit-scrollbar-thumb{
      width: 10px
      height: 20px;
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #364150;
    }
    &::-webkit-scrollbar-track{
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      border-radius: 5px;
      background-color: #364150;
    }
    &::-webkit-scrollbar{
      width: 10px;
      height: 10px;
      background-color: #364150;
    }
  .main
    padding-left 310px
    height 100%
    .main-content
      position relative
      height 100%
      width 100%
      .main-header
        position absolute
        top 0
        left 0
        z-index 2
        width 100%
        .header-job-info
          background-color rgb(247, 247, 247)
          height 44px
          color #333
          line-height 44px
          padding 0 20px
          .refresh 
            cursor pointer
        .header-operation
          background-color #fff
          height 56px
          line-height 56px
          padding 0 10px
          border-bottom 1px solid #ccc
          .operation-button
            cursor pointer
            height 26px
            padding 0 10px
            border-radius 4px
            margin-left 10px
            background-color rgb(247, 247, 247)
            &:hover
              background-color rgb(200,200,200)
          .operation-button:nth-of-type(1)
            i
              color green
              font-weight bold
          .operation-button:nth-of-type(2)
            i
              color red
              font-weight bold
          .operation-button:nth-of-type(3)
            i
              color orange
              font-size 16px
              font-weight bold
          .change-status-button
            cursor pointer
            margin-left 10px
            padding 5px 10px
            border-radius 3px
            background-color: #e75f15
            color: #fff
            &:hover
              background-color #f06020
      .chat-list-box
        position absolute
        width 100%
        height 100%
        box-sizing border-box
        padding-top 100px
        padding-bottom 60px
        .chat-list
          box-sizing border-box
          padding 0 20px
          width 100%
          height 100%
          overflow auto
          &::-webkit-scrollbar-thumb{
            width: 10px
            height: 20px;
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color: #364150;
          }
          &::-webkit-scrollbar-track{
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            border-radius: 5px;
            background-color: #fff;
          }
          &::-webkit-scrollbar{
            width: 10px;
            height: 10px;
            box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color: #fff;
          }
          .chat-item
            position relative
            line-height 80px
            padding 0 60px 0 80px
            .chat-avatar
              position absolute
              top 15px
              left 0
              width 50px
              height 50px
              overflow hidden
              background-size cover
              background-position center
              border-radius 50%
              background-color #ccc
            .chat-message
              position relative
              display inline-block
              border-radius 4px
              padding 10px 15px
              box-sizing border-box
              line-height 30px
              color #fff
              word-wrap:break-word
              background-color #e75f15
              .chat-arrow
                position absolute
                left -10px
                top 15px
                width: 0;
                height: 0;
                border-top: 10px solid transparent;
                border-right: 20px solid #e75f15;
                border-bottom: 10px solid transparent;
              &.chat-message-self
                background-color rgb(247, 247, 247)
                color #000
                .chat-arrow
                  border-right: 20px solid rgb(247, 247, 247)
            .chat-is-read
              position absolute
              top 0
              right -50px
              border-radius 2px
              line-height 20px
              color #fff
              padding 0 5px
      .chat-input-box
        position absolute
        background-color rgb(247, 247, 247)
        width 100%
        box-sizing border-box
        padding 12px 100px 12px 10px
        bottom 0
        left 0
        height 64px
        .chat-input
          background-color #fff
        .send-message
          position absolute
          right 12px
          top 12px
          border-radius 4px
          width 84px
          height 40px
          font-size 16px
          color #fff
          background-color #e75f15
</style>

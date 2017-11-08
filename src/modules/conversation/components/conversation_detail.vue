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
          <div class="chat-list"></div>
        </div>
        <div class="chat-input-box">
          <el-input class="chat-input" v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </div>

    </div>

    <el-dialog title="工作经历"  :visible.sync="experienceVisble" width="700px">
      <el-table v-if="resumeInfo.experience" ref="experienceTable" @row-click="handleDialogRowClick" :data="resumeInfo.experience" :show-header="true">
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
      <el-table v-if="resumeInfo.education" ref="educationTable" @row-click="handleDialogRowClick" :data="resumeInfo.education" :show-header="true">
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

      resumeInfo:null,
      chartList:[],
      jobInfo:null
    }
  },
  methods:{
    //刷新
    handleRefresh(){},
    //点击表格单行展开
    handleDialogRowClick(row, event, column){
      this.$refs[this.experienceVisble ? 'experienceTable' : 'educationTable'].toggleRowExpansion(row)
    },
    // 初始化信息
    init(){
      this.resumeLoading = true
      this.chatLoading = true
      this.$api.conversation.getConversationDetail(this.$route.query)
        .then(res => {
          this.chatLoading = false
          if(res.data.error === '0') {
            this.jobInfo = res.data.data.jobInfo
            this.chartList = res.data.data.chats
          }
        })
        .catch(err => {
          this.chatLoading = false
        })
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
    }
  },
  activated(){
    this.init()
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
          width 100%
          height 100%
          overflow auto
      .chat-input-box
        position absolute
        background-color rgb(247, 247, 247)
        width 100%
        box-sizing border-box
        padding 8px 100px 8px 10px
        bottom 0
        left 0
        height 64px
        .chat-input
          background-color #fff
          padding-left 5px
</style>

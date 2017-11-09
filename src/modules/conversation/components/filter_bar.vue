<template>
  <div class="filter-bar">
    <div class="filter-options fl" @click.stop="filterShowed = !filterShowed">
      <i class="iconfont icon-filter"></i>
      <span>筛选</span>
    </div>
    <div @click="handleOperationOpen" class="operation fl">
      <i class="iconfont icon-operation"></i>
      <span>操作</span>
    </div>
    <div @click="handleRefresh" class="refresh fr">
      <i class="iconfont icon-shuaxin-"></i>
      <span>刷新</span>
    </div>
    <div class="options-box" v-show="filterShowed" @click.stop="()=>{}">
      <div class="options-group">
        <span class="options-group-title">来源：</span>
        <ul class="options-list">
          <li data-option="invitation" :data-value="item.value" v-for="(item,index) in invitationOptions" :key="index" @click="handleFilterChange" :class="{active:filter.invitation == item.value}" class="options-item">{{item.name}}</li>
        </ul>
      </div>
      <div class="options-group">
        <span class="options-group-title">学历：</span>
        <ul class="options-list">
          <li data-option="education" :data-value="item.value" v-for="(item,index) in educationOptions" :key="index" @click="handleFilterChange" :class="{active:filter.education == item.value}" class="options-item">{{item.name}}</li>
        </ul>
      </div>
      <div class="options-group">
        <span class="options-group-title">经验：</span>
        <ul class="options-list">
          <li data-option="experience" :data-value="item.value" v-for="(item,index) in experienceOptions" :key="index" @click="handleFilterChange" :class="{active:filter.experience == item.value}" class="options-item">{{item.name}}</li>
        </ul>
      </div>
      <div class="options-group">
        <span class="options-group-title">薪资：</span>
        <ul class="options-list">
          <li data-option="treatment" :data-value="item.value" v-for="(item,index) in treatmentOptions" :key="index" @click="handleFilterChange" :class="{active:filter.treatment == item.value}" class="options-item">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="operation-box" v-show="operationShowed">
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
      <span class="operation-count">已选 {{operationCount}} 位</span>
      <span class="operation-cancel" @click="handleOperationCancel">取消</span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { GET_CONVERSATION_LIST } from '@/vuex/actions_types'
export default {
  props:['operationCount','operationShowed'],
  data () {
    return {
      invitationOptions:[
        {
          name:'全部',
          value:0
        },
        {
          name:'投递',
          value:1
        },
        {
          name:'邀约',
          value:2
        }
      ],
      filter:{
        invitation:0,
        education:0,
        experience:0,
        treatment:0
      },
      filterShowed:false
    }
  },
  computed:{
    ...mapState({
      educationOptions: state => state.option.education,
      experienceOptions: state => state.option.experience,
      treatmentOptions: state => state.option.treatment
    })
  },
  methods:{
    //刷新列表
    handleRefresh(){
      this.$store.dispatch(GET_CONVERSATION_LIST)
      this.$emit('refresh')
    },
    //过滤变更
    handleFilterChange(e){
      this.filter[e.target.dataset.option] = e.target.dataset.value
      this.$store.dispatch(GET_CONVERSATION_LIST,this.filter)
      this.$emit('filterChange',this.filter)
    },
    // 打开操作
    handleOperationOpen(){
      this.$emit('update:operationShowed', true)
    },
    // 取消操作
    handleOperationCancel(){
      this.$emit('update:operationShowed', false)
    },
    // 点击操作
    handleOperationClick(status){
      if(this.operationCount > 0) {
        this.$emit('operationClick', status)
      }
    }
  },
  created(){
    document.querySelector('body').addEventListener('click' ,e => {
      this.filterShowed = false
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.filter-bar
  box-sizing border-box
  color #333
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  height 40px
  padding-left 10px
  background-color #fff
  z-index 3
  .filter-options
  .operation
  .refresh
    cursor pointer
    line-height 40px
    padding 0 10px
  .options-box
    position absolute
    z-index 99
    top 40px
    left 5px
    width 560px
    height 120px
    padding 15px 0
    border: 1px solid rgb(228, 228, 228)
    background-color #fff
    color rgb(51, 51, 51);
    font-size 12px
    .options-group
      position relative
      height 30px
      line-height 30px
      padding-left 20px
      .options-list
        position absolute
        left 70px
        top 0
        .options-item
          cursor pointer
          float left
          height 20px
          margin 5px 0 5px 10px
          line-height 20px
          border-radius 2px
          padding 0 5px
          &.active
            background-color rgb(231, 95, 21)
            color #fff
  .operation-box
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    line-height 40px
    background-color rgb(26, 158, 220)
    .operation-button
      cursor pointer
      height 26px
      padding 0 10px
      border-radius 4px
      margin-left 10px
      background-color rgba(255,255,255,0.6)
      &:hover
        background-color rgba(255,255,255,1)
      
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
    .operation-count
      color #fff
      margin-left 10px
    .operation-cancel
      float right 
      padding 0 20px
      color #fff
      cursor pointer
</style>

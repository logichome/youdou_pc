<template>
  <div class="filter-bar">
    <div class="filter-options fl" @click.stop="filterShowed = !filterShowed">
      <i class="iconfont icon-filter"></i>
      <span>筛选</span>
    </div>
    <div class="operation fl">
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
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
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
      this.$emit('refresh')
    },
    //过滤变更
    handleFilterChange(e){
      this.filter[e.target.dataset.option] = e.target.dataset.value
      this.$emit('filterChange',this.filter)
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
  position relative
  height 40px
  padding-left 10px
  // background-color #fcffe7
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
</style>

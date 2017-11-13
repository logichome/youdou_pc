<template>
  <div class="filter-bar">
    <div class="filter-options fl" @click.stop="filterShowed = !filterShowed">
      <i class="iconfont icon-filter"></i>
      <span>筛选</span>
    </div>
    <div @click="handleRefresh" class="refresh fr">
      <i class="iconfont icon-shuaxin-"></i>
      <span>刷新</span>
    </div>
    <div class="options-box" v-show="filterShowed" @click.stop="()=>{}">
      <div class="options-group" v-show="type === 'interview'">
        <span class="options-group-title">状态：</span>
        <ul class="options-list">
          <li data-option="interview" :data-value="item.value" v-for="(item,index) in interviewOptions" :key="index" @click="handleFilterChange" :class="{active:filter.interview == item.value}" class="options-item">{{item.name}}</li>
        </ul>
      </div>
      <div class="options-group" v-show="type === 'offer'">
        <span class="options-group-title">状态：</span>
        <ul class="options-list">
          <li data-option="offer" :data-value="item.value" v-for="(item,index) in offerOptions" :key="index" @click="handleFilterChange" :class="{active:filter.offer == item.value}" class="options-item">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['type'],
  data () {
    return {
      interviewOptions:[
        {
          name:'全部',
          value:0
        },
        {
          name:'待面试',
          value:1
        },
        {
          name:'已面试',
          value:2
        }
      ],
      offerOptions:[
        {
          name:'全部',
          value:0
        },
        {
          name:'待offer',
          value:1
        },
        {
          name:'已offer',
          value:2
        }
      ],
      filter:{
        interview:0,
        offer:0
      },
      filterShowed:false
    }
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
    },
    //初始化
    init(){
      this.filter = {
        interview:0,
        offer:0
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
  padding 0 10px
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
    height 30px
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
</style>

<template>
  <div class="filter-bar">

    <div @click="handleRefresh" class="refresh fr">
      <i class="iconfont icon-shuaxin-"></i>
      <span>刷新</span>
    </div>
  </div>
</template>
<script>
import { GET_JOB_MANAGE_LIST } from '@/vuex/actions_types'
export default {
  data () {
    return {}
  },

  methods:{
    //刷新列表
    handleRefresh(){
      this.$store.dispatch(GET_JOB_MANAGE_LIST)
      this.$emit('refresh')
    },
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
  .refresh
    cursor pointer
    line-height 40px
    padding 0 10px
</style>

<template>
  <div class="welcome">
    welcome
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
    this.$router.push('/login')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

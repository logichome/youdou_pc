<template>
  <div class="upload-img">
    <ul class="img-list clearfix">
      <li class="fl" v-for="(item,index) in imgList" :key="index">
        <div class="img-box" :style="'background-image:url('+item.filePath+')'"></div>
      </li>
      <li class="fl">
        <div class="upload-box">
          <i class="el-icon-plus"></i>
          <input type="file" id="uploadinput" multiple @change="uploadImg">
          <label class="input-box" for="uploadinput"></label>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props:['action'],
  data () {
    return {
      imgList:[],
      idList:[]
    }
  },
  methods:{
    uploadImg(e){
    let formData = new FormData()
    for(let i = 0; i < e.target.files.length; i++){
      formData.append('files['+i+']',e.target.files[i])
    }
    formData.append('files[0]',e.target.files[0])
    this.$api.login.uploadCompanyImg(formData,progressEvent => {
      // console.log(progressEvent)
    })
      .then(res => {
        res.data.data.forEach(item => {
          this.imgList.push(item)
          this.idList.push(item.imgId)
        })
        this.$emit('imgSubmit',this.idList)
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.upload-img
  padding 10px 0
  .img-list
    li
      padding 5px
      .img-box
        width 76px
        height 76px
        background-color #eee
        border-radius 4px
        background-size cover
        background-position center
      .upload-box
        position relative
        border-radius 4px
        width 76px
        height 76px
        border 1px dashed #666
        text-align center
        &:hover
          border-color #409EFF
          i
            color #409EFF
        i
          font-size 30px
          color #666
          line-height 76px
        input
          position absolute
          top 0
          left 0
          width 0
          height 0
          opacity: 0  
        .input-box
          cursor pointer
          position: absolute;
          z-index 2
          top: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          opacity: 0  
</style>

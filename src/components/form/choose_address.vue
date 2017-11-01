<template>
  <div class="choose-address">
    <div class="address-form">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item class="address-form-box" label="地址">
          <el-input  :disabled="!canEdit" placeholder="请输入地址" v-model="form.address"></el-input>
          <i @click="changeEdit" class="el-icon-edit edit-button"></i>
        </el-form-item>
      </el-form>
      <el-alert
        v-show="canEdit"
        title="注意"
        type="warning"
        description="填写自定义地址请先在地图中选择位置，否则无法成功提交。">
      </el-alert>
      <el-button :disabled="!form.longitude || !form.address || !form.latitude" @click="submit" class="submit-button" type="primary">提交</el-button>
    </div>
    <div class="address-map" id="container"></div>  
  </div>
</template>
<script>
export default {
  data () {
    return {
      placeSearch:'',
      map:null,
      marker:null,
      geocoder:null,
      canEdit:false,
      form:{
        address:"",
        longitude:'',
        latitude:''
      },
      customAdressPre:''
    }
  },
  props:['initAddress'],
  methods:{
    // 初始化地图
    mapInit(){
      let map = this.map = new AMap.Map('container', {
        resizeEnable: true,
        zoom:16,
        center: [116.397428, 39.90923]        
      });
      //自定义鼠标样式
      map.setDefaultCursor("crosshair");
      // 加载插件
      AMap.plugin(['AMap.ToolBar','AMap.Scale',"AMap.MouseTool","AMap.Geolocation"],function(){
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
        let geolocation = new AMap.Geolocation({
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          buttonPosition:'RB',
          showMarker:false
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
      });

      //加载服务
      AMap.service('AMap.Geocoder', () => {//回调函数
        //实例化Geocoder
        this.geocoder = new AMap.Geocoder();
      })

      //绑定鼠标点击事件
      let clickEventListener = map.on('click', (e) => {
        //移除前一个marker
        if(this.marker)map.remove(this.marker);
        // 添加新的marker
        this.marker = new AMap.Marker({
          position: e.lnglat,
          title: 'hehe',
          map
        })
        // 获取坐标信息
        this.getAddress(e.lnglat)
        // 设置信息体

      });
    },
    //获取地址信息
    getAddress(lnglat){
      this.geocoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          console.log(result.regeocode)
          this.openInfo(lnglat,result)
          //获得了有效的地址信息:
          this.form.address = result.regeocode.formattedAddress
          let addrObj = result.regeocode.addressComponent
          this.customAdressPre = addrObj.province + addrObj.city + addrObj.district + addrObj.township + addrObj.street
          this.form.longitude = lnglat.lng
          this.form.latitude = lnglat.lat
        }else{
          //获取地址失败
          this.$message({
            type:'error',
            message:'获取地址失败,请检查网络并刷新页面重试'
          })
        }
      })
    },
    //构建信息窗体
    openInfo(lnglat,result) {
        let info = [];
        // info.push("<div><div><img style=\"float:left;\" src=\" http://webapi.amap.com/images/autonavi.png \"/></div> ");
        // info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德软件</b>");
        info.push("纬度："+lnglat.lat+"&nbsp;&nbsp;经度："+lnglat.lng);
        info.push("地址："+result.regeocode.formattedAddress);
        let infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>"),  //使用默认信息窗体框样式，显示信息内容
            offset: new AMap.Pixel(0, -30)
        });
        infoWindow.open(this.map, lnglat);
    },
    //编辑地址
    changeEdit(){
      this.canEdit = !this.canEdit
    },
    //提交地址
    submit(){
      this.$emit('addressSubmit',this.form)
    }
  },
  mounted(){
    if(this.initAddress && this.initAddress.address && this.initAddress.longitude){
      this.form = {...this.initAddress}
    }
    this.mapInit()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.choose-address
  .address-form
    .submit-button
      margin-top 10px
      margin-bottom 10px
  .address-map
    width 100%
    height 480px
  .address-form-box
    position relative
    margin-bottom 10px
    .edit-button
      position absolute
      right 0
      top 0
      height 40px
      width 40px
      font-size 26px
      line-height 40px
      text-align center
</style>

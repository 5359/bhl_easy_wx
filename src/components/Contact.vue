<template>
  <div class="wrap" >
    <div class="wap">
    <h1>联系我们</h1>
    <div class="box" >
      <div class="map">
        <baidu-map class="bmView" :scroll-wheel-zoom="true" :center="location" :zoom="zoom" @ready="handler" ak="8s9kdgOVZsG5GC9qu6mN9PI9MnOgu2K5">
          <!--缩放控件-->
          <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
          <!--点-->
          <bm-marker :position="location" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: '/static/img/adress_icon.png', size: {width: 40, height: 50}}" :offset="{width: 0, height: -10}">
          </bm-marker>

        </baidu-map>
      </div>
      <p>
        <span><img src="../assets/adress_icon.png">联系地址</span>
        北京市朝阳区保利国际广场T1
      </p>
      <p>
        <span><img src="../assets/tel_icon.png">客服中心</span>
        <a href="tel:400-818-1555">400-818-1555</a> / <a href="tel:400-818-1566">400-818-1566</a>
      </p>
      <p>
        <span><img src="../assets/mail_icon.png">邮箱</span>
        <a href="mailto:KF_BHL@bhlease.com.cn">KF_BHL@bhlease.com.cn</a>
      </p>
   
    </div>

    <Footer  />
  </div>
  </div>
</template>

<script>
import Footer from '../components/Footer'
import { BaiduMap, BmMarker, BmNavigation } from 'vue-baidu-map/components'
export default {
  name: 'contact',
  data () {
    return {
      location: {
        lng: 116.498498,
        lat: 40.001982
      },
      zoom: 20,
      addressKeyword: ""
    }
  },
  components: {
    Footer,
    BaiduMap, BmMarker , BmNavigation
  },
  mounted(){

  },
  methods:{
    handler ({BMap, map}) {
      console.log(BMap, map)
    }
  }
}
</script>


<style scoped>
.wap{background:url('../assets/bxbg.jpg') no-repeat center 0;background-size:100%;}
.box{margin:.7rem;background:#fff;box-shadow:0 0 .25rem rgba(0,0,0,.3);border-radius:.25rem;padding:.5rem .5rem 1.7rem;position:relative;margin-bottom:4rem;}
.map{height:10rem;}
.bmView{height:10rem;}
.box .t{color:#143269;font-size:.65rem;padding:.55rem 0 .55rem;text-align:center;}
.box .img{width:100%;display:block;}
.box h3{color:#000;font-weight:600;margin:.65rem 0 .2rem;}
.box p{color:#333;margin-top:.6rem;line-height:1rem;font-size:.6rem;position:relative;}
.box span{display:block;position:relative;padding-left:.91rem;color:#143269;}
.box span img{width:.68rem;position:absolute;left:0;top:0.15rem;}

@media screen and (min-width: 750px) {

    .box {
       max-width:1200px;margin-right:auto;margin-left:auto;
       min-height:calc(100% - 533px);
    }
    .box p,.box span{font-size:18px}
    .box .t{font-size:22px;}
}
</style>

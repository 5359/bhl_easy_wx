<template>
  <div class="wrap">

    <div class="swiper-container banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><a href="javascript:;" @click="goemp">了解详情</a><template v-if="imgB"><img src="/static/img/banner.jpg" /></template><template v-else><img src=" /static/img/banner_pc.jpg"></template></div>
        <div class="swiper-slide"><a href="javascript:;" @click="goemp">了解详情</a>
        	<template v-if='imgB'>
        		<img src="/static/img/banner1.jpg" />
        	</template>
        	<template v-else>
        		<img src="/static/img/banner1_pc.jpg" />
        	</template>
        </div>
        <div class="swiper-slide"><a href="javascript:;" @click="goemp">了解详情</a>
          <template v-if='imgB'>
            <img src="/static/img/banner2.jpg" />
          </template>
          <template v-else>
            <img src="/static/img/banner2_pc.jpg" />
          </template>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination pag"></div>
    </div>

    <div class="links">
      <a href="javascript:;" @click="goTab('/Jsq')"><i><img src="../assets/jsq.png" /></i>产品计算器</a>
      <a href="javascript:;" @click="goTab('/dealer')"><i><img src="../assets/icon7.png" /></i>查找经销商</a>
      <a href="https://www.hyundai.com.cn/"  ><i><img src="../assets/icon8.png" /></i>现代进口</a>
    </div>
    <h3 class="title"><span>品牌活动</span></h3>
    <div class="ad">
      <!-- <a href="javascript:;" @click="goemp"><img src="../assets/ad1.jpg" /></a> -->
      <div class="swiper-container brandswiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <template v-if='imgB'>
        		<img src="../assets/ad1.jpg" />
        	</template>
        	<template v-else>
        		<img src="../assets/ad1_pc.jpg" />
        	</template>
            <div class="info">
              <h2>科技与未来感</h2>
              <h3>第十代索纳采用INTERSPACE设计</h3>
              <a href="javascript:;" @click="goemp" class="btn">了解详情</a>
            </div>
          </div>
          <div class="swiper-slide">
            <template v-if='imgB'>
        		<img src="../assets/p.jpg" />
        	</template>
        	<template v-else>
        		<img src="../assets/p_pc.jpg" />
        	</template>
            <div class="info">
              <h2>感性运动 设计理念</h2>
              <h3>比例感、结构感、造型感和技术感进行完美协调</h3>
              <a href="javascript:;" @click="goemp" class="btn">了解详情</a>
            </div>
          </div>
        </div>
          <!-- Add Arrows -->
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
      </div>
    </div>
      <h3 class="title"><span>购车工具</span></h3>
    <div class="">
      <div class="tools">
        <a href="javascript:;" @click="goTab('/dealer')" :class="!imgB?'ts':''" title="查找经销商">
          <template v-if="imgB"><img src="../assets/indexlink1.jpg"></template>
          <template v-else><span>查找经销商</span><i></i></template>
        </a>
        <a href="javascript:;" @click="goTab('/newplay')" :class="!imgB?'ts':''" title="金融产品一览">
          <template v-if="imgB"><img src="../assets/indexlink2.jpg"></template>
          <template v-else><span>金融产品一览</span><i></i></template>
        </a>
        <a href="javascript:;" @click="goTab('/Jsq')" :class="!imgB?'ts':''" title="产品计算器">
          <template v-if="imgB"><img src="../assets/indexlink3.jpg"></template>
          <template v-else><span>产品计算器</span><i></i></template>
        </a>
        <a href="javascript:;" @click="goTab('/About')" :class="!imgB?'ts':''" title="关于北现租赁">
          <template v-if="imgB"><img src="../assets/indexlink4.jpg"></template>
          <template v-else><span>关于北现租赁</span><i></i></template>
        </a>
      </div>
      <h3 class="title"><span>友情链接</span></h3>
      <div class="webLinks">
        <a href="http://about.hyundaicapital.com/main.hc?lang=en">现代金融（Hyundai Capital）</a>
        <a href="https://www.beijing-hyundai.com.cn">北京现代汽车</a>
        <a href="https://www.dyk.com.cn">东风悦达起亚</a>
        <a href="http://www.baicmotor.com">北京汽车</a>
        <a href="https://hyundai-trucknbus.com.cn/">现代商用车</a>
      </div>
    </div>
    <Footer  />
  </div>
</template>

<script>
import Swiper from 'swiper'
import Footer from '../components/Footer'
export default {
  name: 'Home',
  data () {
    return {
      token: '',
      clientWidth:0,
      imgB:true
    }
  },
  components: {
    Footer
  },
  created(){
    this.getThoken();
    this.clientWidth = $(window).width();
    if(this.clientWidth > 1000){
		this.imgB = false;
    }
  },
  mounted() {

    const that = this;
    window.onresize = function temp() {
        that.clientWidth =  document.documentElement.clientWidth ;
        if(that.clientWidth >= 1000){
          that.imgB = false;
        }else{
          that.imgB = true
        }
    };

    var banner = new Swiper ('.banner', {
        loop: true,
        autoHeight:true,
        pagination: {
          el: '.swiper-pagination',clickable :true
        }
      })
    var brand=new Swiper ('.brandswiper', {
        loop: true,
        autoHeight:true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
  },
  methods:{
    getThoken:function () {
      var _this = this;
      $.ajax({
        url:process.env.API_ROOT+"/app/oauth/token?client_secret=secret&grant_type=password&client_id=client2&password=app_wx123&username=APP_WX",
        type:'post',
        success:function(result){
          _this.token = result.access_token
          }
      });
    },
    goTab:function(url){
      this.$router.push({path:url})
    },
    goemp:function(){
      this.$router.push({path:'/'})
    },
    goHyundai(){
      this.$router.push({path:''})
    }
  }
}
</script>

<style scoped>
.swiper-slide{position:relative;}
.pag >>> .swiper-pagination-bullet{background:#fff;}
.pag .swiper-pagination-bullet-active{background:#143269; }
.banner{}
.banner a{position:absolute;left:50%;bottom:4rem;width:6rem;margin-left:-3rem;height:1.5rem;color:#fff;background:#143269;text-align:center;line-height:1.5rem;border-radius:1rem;font-size:.6rem;}
.banner >>> .swiper-pagination{bottom:2.5rem;}
.banner >>> .swiper-pagination-bullet-active{background:#fff;opacity:.55;}
.links{display:flex;-webkit-box-pack: justify;-ms-flex-pack: justify;-webkit-justify-content: center;justify-content: center;max-width:700px;margin:0 auto;-webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;}
.links i{display:block;width:1.8rem;margin:0 auto;}
.links a{display:block;padding:1rem;text-align:center;font-size:.6rem;color:#143269;}
.tools{margin:0 1rem;}
.tools a{border-radius:.5rem;color:#fff;padding: 0 0 .2rem;display:block;font-size:.7rem;text-align:center;}
.tools a img{display:block;}
.tit{text-align:left;font-size:.8rem;}
.webLinks{padding:0 0 1rem;}
.webLinks a{color:#0c2c5c;display:block;font-size:.6rem;text-align:center;padding-bottom:.25rem;}
.title{margin:1rem 1rem .5rem;position:relative;text-align:center;}
.title:after{content:'';height:1px;font-size:0;width:100%;background:#ccc;position:absolute;top:50%;left:0;}
.title span{display:inline-block;background:#fff;padding:0 1rem;position:relative;z-index:1;font-size:.7rem;}

.brandswiper .info{text-align:center;padding-top:1rem;}
.brandswiper .info h2{font-size:.65rem;font-weight:600;}
.brandswiper .info h3{font-size:.6rem;margin-bottom:.6rem;}
.brandswiper .swiper-slide{padding-bottom:1rem;}
.brandswiper .swiper-button-next,.brandswiper .swiper-button-prev{top:33%;background:rgba(0,0,0,.5);}
.brandswiper .swiper-button-next:after,.brandswiper .swiper-button-prev:after{content:"";width:.5rem;height:.5rem;border-bottom:1px solid #fff;border-right:1px solid #fff;display:block;position:absolute;left:50%;top:50%;margin:-.25rem 0 0 -.40rem;transform:rotate(-45deg);}
.brandswiper .swiper-button-prev:after{transform:rotate(135deg);margin-left:-.05rem;}

@media screen and (min-width: 750px) {
    .title {
       max-width:1000px;
       margin:1rem auto;
    }
    .banner a{bottom:2rem;}
    .banner >>> .swiper-pagination{bottom:28px;}
    .pag >>> .swiper-pagination-bullet{width:12px;height:12px;}
    .title span{font-size:22px;}
    .ad ,.tools{max-width:1200px;margin :0 auto;}
    .tools{overflow:hidden;}
    .tools a{width:calc(50% - .25rem);float:left;padding:0 10px ; box-sizing:border-box;display:block;overflow:hidden; border-radius:0;margin-bottom:.5rem;}
    .tools a:nth-child(2n){float:right;}
    .tools a img{display:block;margin-bottom:10px;}
    .tools a{background:no-repeat center;background-size:100%;height:2.85rem;line-height:2.85rem;overflow:hidden;transition:2s;}
    .tools a span{opacity:.8;font-size:20px;font-weight:500;float:left;margin-left:35px;transition:.8s;}
    .tools a i{display:block;width:16px;height:16px;border-right:1px solid #fff;border-bottom:1px solid #fff;float:right;transform:rotate(-45deg);margin:45px 30px 0 0;opacity:.8;}
    .tools a:nth-child(1){background-image:url('../assets/indexlink1_bg.jpg');}
    .tools a:nth-child(2){background-image:url('../assets/indexlink2_bg.jpg');}
    .tools a:nth-child(3){background-image:url('../assets/indexlink3_bg.jpg');}
    .tools a:nth-child(4){background-image:url('../assets/indexlink4_bg.jpg');}
    .tools a:hover span{transform:translateX(10px);}
    .tools a:hover{background-size:110%;}
    .links a{font-size:.4rem;transition:.8s;}
    .links a i{transform:scale(1);}
     .links a:hover{transform:scale(1.1);}
    .brandswiper .info h2{font-size:.7rem;}
    .brandswiper .info h3{font-size:.45rem;}
    .webLinks a{font-size:.5rem;}
    .webLinks a:hover{color:#2871b5;}
}
</style>

<template>
  <div class="wrap" >
    <div class="wrb">
      <h1>版权声明</h1>
      <div class="box" >
        <p>欢迎您浏览北现租赁有限公司网站（以下称"本网站" ），在使用本网站时，请您仔细阅读和理解以下条款。您一旦浏览本网站及相关网页，即视为您已了解并完全同意本服务条款各项内容，以下内容可能会不时修改，请定期查阅。</p>

      <h2>1、版权声明</h2>
      <p>(1) 北现租赁有限公司拥有本网站包括相关网页内所有资料及本网站的结构、网页设计、图像等版权。未经北现租赁有限公司的明确书面许可，对于本网站上的任何内容，任何人不得对其进行复制、转载或在非北现租赁有限公司所属的服务器上做镜像或以其它方式非法使用。</p>

      <p>(2) 对于任何违反国家有关法律法规，不尊重本网站声明，不经本网站同意，擅自使用本网站内容的行为，北现租赁有限公司将保留采取法律措施，追究其责任的权利。</p>

       <h2>2、商标声明</h2>
       <p>本网站出现的商标、服务标志等均属北现租赁有限公司或其关联公司所有，或已取得所有人的正式授权，受法律保护，在未取得北现租赁有限公司或有关第三方的正式书面授权之前，任何人不得修改、复制或以其他方式使用。未经许可使用上述商标的，北现租赁有限公司将保留采取法律措施，追究其责任的权利。</p>


       <h2>3、免责声明</h2>
      <p>(1) 虽然本网站将努力提供准确和及时的信息和内容，但这些信息和内容仅限于其现有状况，对其准确性和及时性，本网站不给予任何明示或默示的保证。</p>

      <p>(2) 本网站不承担因您进入或使用本网站而导致的任何直接的、间接的、意外的、因果性的损害责任。请小心使用您的软件和设备。</p>

      <p>(3) 本网站转载的相关文章、资料中表述或暗示的观点不代表北现租赁有限公司的观点。同时本网站摘录或转载这些内容时，均严格按照我国网络著作权相关法律、法规和司法解释确立的原则进行。任何人浏览本网站时如发现有关文章存在侵权事宜，请立即通知网站管理员，如果属侵权信息，本网站将立即在职责范围内予以清除。</p>

      <p>(4) 凡通过本网站与其它网站的链接而获得的其它网站提供的网上资料及内容，仅供您浏览和参考之用，请您对相关内容自行辨别及判断，北现租赁有限公司不承担任何责任。</p>
      </div>

      <Footer  />
    </div>
  </div>
</template>

<script>
import Footer from '../components/Footer'
export default {
  name: 'newplay',
  data () {
    return {
      sel:1
    }
  },
  components: {
    Footer
  },
  created(){

  },
  mounted() {
  },
  methods:{
    showfn:function(num){
      this.sel = num
    }
  }
}
</script>


<style scoped>
.wrb{background:url('../assets/bxbg.jpg') no-repeat center 0;background-size:100%;}
.box{margin:.7rem .7rem 1.5rem;background:#fff;box-shadow:0 0 .25rem rgba(0,0,0,.3);border-radius:.25rem;padding:.5rem .5rem .7rem;position:relative;padding-top:1rem;}
.box .t{color:#143269;font-size:.65rem;padding:.45rem 0 .65rem;text-align:center;}
.box .img{width:100%;display:block;}
.box h2{color:#000;font-weight:600;margin:.65rem 0 0;font-size:.68rem;}
.box p{color:#333;margin-bottom:.6rem;line-height:1rem;font-size:.6rem;}
@media screen and (min-width: 750px) {
    .box {
       max-width:1200px;margin-right:auto;margin-left:auto;
       min-height:calc(100% - 13.83rem);
    }
    .box .t{font-size:20px;}
    .box .img{max-height:10rem;overflow:hidden;}
    .box p{line-height:26px;}
    .box p,.box span{font-size:14px;margin-bottom:10px;}
}
</style>

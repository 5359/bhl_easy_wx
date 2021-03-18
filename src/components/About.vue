<template>
  <div class="wrap" >
    <div class="wrb">
      <h1>关于北现租赁</h1>
      <div class="box" >
        <h2 class="t">北现租赁有限公司（简称BHL）</h2>
        <div class="img"><img src="../assets/img.jpg"></div>
        <p>由北京汽车股份有限公司、韩国现代金融株式会社、现代汽车（中国）投资有限公司共同投资设立的中外合资融资租赁公司，注册资本人民币3亿元。</p>
        <p>公司旨在利用先进科学的管理技术和程序，为广大经销商合作伙伴、政企事业单位和终端个人用户，提供优质的租赁产品和服务方案。同时，公司也将紧扣时代发展，整合优势资源和客户需求，提供全方位、多元化的融资租赁服务，致力成为中国融资租赁行业的优势服务提供商。</p>
        <span>客服电话：<a href="tel:400-818-1555">400-818-1555</a> / <a href="tel:400-818-1566">400-818-1566</a><br>
            客服邮箱：<a href="mailto:KF_BHL@bhlease.com.cn">KF_BHL@bhlease.com.cn</a></span>     
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
.box{margin:.7rem .7rem 1.5rem;background:#fff;box-shadow:0 0 .25rem rgba(0,0,0,.3);border-radius:.25rem;padding:.5rem .5rem .7rem;position:relative;}
.box .t{color:#143269;font-size:.65rem;padding:.45rem 0 .65rem;text-align:center;}
.box .img{width:100%;display:block;}
.box h3{color:#000;font-weight:600;margin:.65rem 0 .2rem;}
.box p{color:#333;margin-top:.6rem;line-height:1rem;font-size:.6rem;}
.box span{display:block;padding-top:.56rem;font-size:.56rem;}
@media screen and (min-width: 750px) {
    .box {
       max-width:1200px;margin-right:auto;margin-left:auto;
       min-height:calc(100% - 13.83rem);
    }
    .box .t{font-size:20px;}
    .box .img{max-height:10rem;overflow:hidden;}
    .box p{line-height:26px;}
    .box p,.box span{font-size:14px;margin-top:10px;}
    .box span{padding-top:.4rem;}
}
</style>

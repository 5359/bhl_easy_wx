<template>
  <div id="Footer">
    <div class="ft_nav">
      <Nav />
    </div>
    <div class="ft_bot">
      <div class="wrap">
        <div class="box">
          <p><a href="javascript:;" @click="goLink('/statement')">版权声明</a><!-- <a href="javascript:;" @click="goemp">网站地图</a> --><a href="javascript:;" @click="goLink('/privacy')">隐私政策</a><!-- <a href="javascript:;" @click="goemp">用户协议</a> --></p>
          <h2>©北现租赁版权所有</h2>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import Nav from '../components/Nav'
export default {
  name:'Footer',
  data () {
    return {
      roterPath:''
    }
  },
  components: {
    Nav
  },
  methods:{
    goemp:function(){
      this.$router.push({path:'/emp'})
    },
    goLink:function(url){
      this.$router.push({path:url})
    },
  } 
}
</script>

<style scoped>
	.wrap{padding-top:0;}
  #Footer{background:#1a1a1a;text-align:center;overflow:hidden;}
  .ec{border-bottom:1px solid rgba(255,255,255,.2);padding:.2rem 1rem;display:none;}
  .ec a{display:block;padding:.36rem 0;}
  .ec img{width:1.45rem;margin:0 auto;display:block;}
  .logo{width:8.5rem;display:block;margin:1rem auto .5rem;}
  p{padding:.8rem 0 .3rem}
  h2{color:rgba(255,255,255,.7);font-size:.47rem;padding-bottom:1rem;}
  p a{padding:0 .45rem;display:inline-block;color:rgba(255,255,255,.7);font-size:.5rem;position:relative;}
  p a:after{position:absolute;content:'';height:.5rem;width:1px;background:rgba(255,255,255,.7);left:0;top:50%;margin-top:-.25rem;}
  p a:first-child:after{display:none;}
  .Nav{background:#efefef;}
  .Nav >>> .navlist  li{border-bottom:1px solid #ccc !important;position:relative;}
  .Nav >>> .navlist  li a:after{content:'';width:.45rem;height:.45rem;border-bottom:1px solid #c0c0c0;border-right:1px solid #c0c0c0;transform:rotate(-45deg);position:absolute;right:.5rem;top:.7rem;}

  @media screen and (min-width: 750px) {
      .Nav {padding:0;}
      .Nav >>>.navlist li{width:33.3%;float:left;}
      .Nav >>> .navlist li a{padding-left:30px;font-size:.58rem;}
      .ft_nav{display:none;}
      .wrap{width:1200px;margin :0 auto;}
      .ec{width:50%;float:left;border:none;padding-top:35px;}
      p a:last-child{padding-right:0;}
      .box{font-size:18px;}
      p a,h2{font-size:16px;}
  }
</style>

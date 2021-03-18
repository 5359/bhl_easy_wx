<template>
  <div id="Header">
    <div class="w">
      <div class="logo"></div>
        <a href="javascript:;" v-if="!narB" :class="showNav?'navbtn cloasnav':'navbtn'"  v-on:click="navbing"><i></i>
        </a>
        <template v-if="!narB">
            <div :class="showNav?'navbox show':'navbox' "  :style="{height:wh+'px'}"> <Nav  :msg-val="showNav" @child-event='parentEvent' /> </div> 
        </template>
        <template v-else>
            <div class="nar" ><Nav  /></div>
        </template>
    </div> 
  </div>
</template>
<script>
import Nav from '../components/Nav'
export default {
  name:'Header',
  data () {
    return {
      wh:0,
      showNav:false,
      clientWidth:0,
      narB:false
    }
  },
  created(){
    this.wh = $(window).height();
    this.clientWidth = $(window).width();
    if(this.clientWidth > 750){
          this.showNav = false;
          this.narB = true
        }
  },
  components: {
    Nav
  },
  mounted() {
    // 动态设置背景图的高度为浏览器可视区域高度

    // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
    //this.clientHeight.height = `${document.documentElement.clientHeight}px`;
    // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
    const that = this;
    window.onresize = function temp() {
        that.clientWidth =  document.documentElement.clientWidth ;
        if(that.clientWidth >= 750){
          that.showNav = false;
          that.narB = true
        }else{
          that.narB = false
        }
    };
  },
  methods:{
    navbing:function(){
      this.showNav = !this.showNav
    },
    parentEvent:function(val){
      console.log(val)
      this.showNav = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #Header{padding:.5rem 0 0;height:2.1rem;background:#fff;position:fixed;width:100%;box-sizing:border-box; -moz-box-sizing:border-box;z-index:9999;top:0;}
  .w{max-width:1200px;margin:0 auto;}
  .logo{width:8rem;height:1.2rem;background:url('../assets/logo.png') no-repeat center;background-size:100%;float:left;position:relative;z-index:99;margin-left:.5rem;}
  .navbtn{width:1.16rem;height:1rem;position:relative;display:block;float:right;position:relative;z-index:99;margin-right:.5rem;}
  .navbtn:after,.navbtn:before{content:"";height:.13rem;width:100%;background:#2c73b6;display:block;position:absolute;left:0;top:0;border-radius:1rem;transition:.3s;}
  .navbtn:after{top:auto;bottom:0;}
  .navbtn i{display:block;height:0.12rem;width:70%;background:#2c73b6;position:absolute;left:0;top:50%;margin:-.08rem 0 0;border-radius:.2rem;transition:.2s;}
  .navbox{position:absolute;left:0;top:0;background:#fff;width:100%;z-index:98;transform:translateX(100%);transition:.3s;}
  .navbox.show{transform:translate(0);}
  .cloasnav i{opacity:0;transform:translateX(.6rem);}
  .cloasnav:after{transform:rotate(45deg) translate(-.35rem,-.15rem); }
  .cloasnav:before{transform:rotate(-45deg) translate(-.45rem,0.25rem); }
  .Nav{border-top:.2rem solid #2c73b6;margin-top:2.1rem;height:calc(100% - 2.5rem);}
  .Nav >>> .cur a{color:#2c73b6;}
  @media screen and (min-width:750px) {
      .Nav {}
      .nar{float:right;}
      .nar .Nav{border:none;margin:0;padding:0;}
      .nar .Nav >>> li{float:left;display:inline-block;border:none;position:relative;}
      .nar .Nav >>> li a{font-size:18px;padding:0 .25rem .33rem;height:auto;line-height:48px;}
      .nar .Nav >>> li:last-child{padding-right:0;}
      .nar .Nav >>> li a{position:relative}
      .nar .Nav >>> li a:after{content:"";position:absolute;left:50%;right:50%;height:2px;background:#2c73b6;display:block;transition:.3s;}
      .nar .Nav >>> li:hover a:after{left:.25rem;right:0.25rem;}
      
    }
</style>

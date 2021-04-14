<template>
  <div id="app">
    <Header v-if="this.$route.name!=='classHome'&&this.$route.name!=='imgs'"></header>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  data () {
    return {
      wh:0
    }
  },
  components: {
    Header
  },
  created(){
      this.getPath()
      this.wh = $(window).height();
  },
  render:function(){
  },
  beforeRouteEnter(to,from,next){

  },
  methods:{
    getPath:function(){
      //this.roterPath = this.$route.path
      console.log(this.$route.path)
    }
  }
}
</script>

<style>
html{ font-family: "Helvetica Neue", Helvetica, STHeiTi, Arial, sans-serif;font-size:6.2vw;min-height:100%;-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
body { margin: 0; font-size: .6rem; line-height: 1.5; color: #666; background:#fff;overflow-x: hidden; -webkit-overflow-scrolling: touch;}
*{-webkit-overflow-scrolling: touch;}

a { background: transparent; text-decoration: none; -webkit-tap-highlight-color: transparent; color: #000; }
a:active { outline: 0; }
a:active { color: #006699; }
img { border: 0; vertical-align: middle;width:100%; }

button, input, optgroup, select, textarea { color: inherit; font: inherit; margin: 0; }
button { overflow: visible; }
button, select { text-transform: none; }
select:focus {
    outline: none;
}
button, html input[type="button"], input[type="reset"], input[type="submit"] { -webkit-appearance: button; cursor: pointer; }
button[disabled], html input[disabled] { cursor: default; }
button::-moz-focus-inner, input::-moz-focus-inner { border: 0; padding: 0; }
input { line-height: normal; }
input[type="checkbox"], input[type="radio"] { box-sizing: border-box; padding: 0; }


html, button, input, select, textarea { font-family:huawen,"微软雅黑","Helvetica Neue", Helvetica, STHeiTi, Arial, sans-serif; }
h1, h2, h3, h4, h5, h6, p, figure, form, blockquote { margin: 0;font-weight: normal;  }
ul, ol, li, dl, dd { margin: 0; padding: 0; }
ul, ol { list-style: none outside none; }
h1{padding:0.85rem 0 0;font-size:.8rem;text-align:center;color:#143269;}
input,textarea,a{outline: none;}
input::-moz-placeholder, textarea::-moz-placeholder { color: #cccccc; }
input:-ms-input-placeholder, textarea:-ms-input-placeholder { color: #cccccc; }
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { color: #cccccc; }
body{}
#app {
  font-family: huawen,"微软雅黑",'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  margin:0 auto;
  position:relative;
  overflow:auto;
  width:100%;
}
#Header{z-index:9999;}
.p05{padding:.5rem;}
.p10{padding:1rem;}

.display_flex > *{display: block;}
.display_flex{display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;}
.display_inline-flex{display: -webkit-inline-box;display: -ms-inline-flexbox;display: -webkit-inline-flex;display: inline-flex;}
.display_inline-flex > *{display: block;}

.flex-direction_column{-webkit-box-orient: vertical;-ms-flex-direction: column;-webkit-flex-direction: column;flex-direction: column;}

.justify-content_flex-center{-webkit-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;}
.justify-content_flex-end{-webkit-box-pack: end;-ms-flex-pack: end;-webkit-justify-content: flex-end;justify-content: flex-end;}
.justify-content_flex-justify{-webkit-box-pack: justify;-ms-flex-pack: justify;-webkit-justify-content: space-between;justify-content: space-between;}

.align-items_flex-start{-webkit-box-align: start;-ms-flex-align: start;-webkit-align-items: flex-start;align-items: flex-start;}
.align-items_flex-end{-webkit-box-align: end;-ms-flex-align: end;-webkit-align-items: flex-end;align-items: flex-end;}
.align-items_center{-webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;}
.align-items_baseline{-webkit-box-align: baseline;-ms-flex-align: baseline;-webkit-align-items: baseline;align-items: baseline;}

.flex_auto{-webkit-box-flex: 1;-ms-flex: auto;-webkit-flex: auto;flex: auto;}
.flex_1{width: 0;-webkit-box-flex: 1;-ms-flex: 1;-webkit-flex: 1;flex: 1;}

.order_2{-webkit-box-ordinal-group: 2;-ms-flex-order: 2;-webkit-order: 2;order: 2;}
.order_3{-webkit-box-ordinal-group: 3;-ms-flex-order: 3;-webkit-order: 3;order: 3;}
.boxSizing{box-sizing:border-box; -moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.tc{text-align:center;}
.wrap{padding-top:2rem;box-sizing:border-box;}
@media screen and (min-width: 750px) {
    html {
       font-size:40px;
    }
    .btn{font-size:16px !important;}
    h1{font-size:.7rem;}
    .wrap{}
}
.vue-slider-marks{}
.btn{font-size:.6rem;display:inline-block;background:#143269;color:#fff;border-radius:1rem;padding:.25rem 1.2rem;}
.text-tip {
  position:fixed;
  width:100%;height:100%;
  top:0;left:0;
  background:rgba(255,255,255,.01);
    display: none;
    z-index: 9999;
}
.text-tip .los {
    display: block;
    background:rgba(0,0,0,.1);
    color: #fff;
    padding: 10px 10px;
    line-height: 18px;
    position: absolute;
    left: 50%;
    top:50%;
    margin-top:-1.5rem;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
    border-radius: 3px;
    font-size: 12px;
    text-align: center;
}
.text-tip .los:after{content:"";display:block;width:2.2rem;height:2.2rem;background:url('assets/loading.gif');background-size:cover;}

.sk-fading-circle {
  width: 3rem;
  height:3rem;
  position: relative;
  margin: auto;
}
.sk-fading-circle .sk-circle {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.sk-fading-circle .sk-circle:before {
  content: '';
  display: block;
  margin: 0 auto;
  width: 10%;
  height: 10%;
  background-color: #fff;
  border-radius: 100%;
  -webkit-animation: sk-fading-circle-delay 1.2s infinite ease-in-out both;
          animation: sk-fading-circle-delay 1.2s infinite ease-in-out both;
}
.sk-fading-circle .sk-circle-2 {
  -webkit-transform: rotate(30deg);
          transform: rotate(30deg);
}
.sk-fading-circle .sk-circle-3 {
  -webkit-transform: rotate(60deg);
          transform: rotate(60deg);
}
.sk-fading-circle .sk-circle-4 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}
.sk-fading-circle .sk-circle-5 {
  -webkit-transform: rotate(120deg);
          transform: rotate(120deg);
}
.sk-fading-circle .sk-circle-6 {
  -webkit-transform: rotate(150deg);
          transform: rotate(150deg);
}
.sk-fading-circle .sk-circle-7 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}
.sk-fading-circle .sk-circle-8 {
  -webkit-transform: rotate(210deg);
          transform: rotate(210deg);
}
.sk-fading-circle .sk-circle-9 {
  -webkit-transform: rotate(240deg);
          transform: rotate(240deg);
}
.sk-fading-circle .sk-circle-10 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}
.sk-fading-circle .sk-circle-11 {
  -webkit-transform: rotate(300deg);
          transform: rotate(300deg);
}
.sk-fading-circle .sk-circle-12 {
  -webkit-transform: rotate(330deg);
          transform: rotate(330deg);
}
.sk-fading-circle .sk-circle-2:before {
  -webkit-animation-delay: -1.1s;
          animation-delay: -1.1s;
}
.sk-fading-circle .sk-circle-3:before {
  -webkit-animation-delay: -1s;
          animation-delay: -1s;
}
.sk-fading-circle .sk-circle-4:before {
  -webkit-animation-delay: -0.9s;
          animation-delay: -0.9s;
}
.sk-fading-circle .sk-circle-5:before {
  -webkit-animation-delay: -0.8s;
          animation-delay: -0.8s;
}
.sk-fading-circle .sk-circle-6:before {
  -webkit-animation-delay: -0.7s;
          animation-delay: -0.7s;
}
.sk-fading-circle .sk-circle-7:before {
  -webkit-animation-delay: -0.6s;
          animation-delay: -0.6s;
}
.sk-fading-circle .sk-circle-8:before {
  -webkit-animation-delay: -0.5s;
          animation-delay: -0.5s;
}
.sk-fading-circle .sk-circle-9:before {
  -webkit-animation-delay: -0.4s;
          animation-delay: -0.4s;
}
.sk-fading-circle .sk-circle-10:before {
  -webkit-animation-delay: -0.3s;
          animation-delay: -0.3s;
}
.sk-fading-circle .sk-circle-11:before {
  -webkit-animation-delay: -0.2s;
          animation-delay: -0.2s;
}
.sk-fading-circle .sk-circle-12:before {
  -webkit-animation-delay: -0.1s;
          animation-delay: -0.1s;
}

@-webkit-keyframes sk-fading-circle-delay {
  0%, 39%, 100% {
    opacity: 0;
  }
  40% {
    opacity: .5;
  }
}

@keyframes sk-fading-circle-delay {
  0%, 39%, 100% {
    opacity: 0;
  }
  40% {
    opacity: .5;
  }
}

.viewer-toolbar > ul > li{width:1.75rem;height:1.75rem;text-align:center;}

.viewer-toolbar > ul > li::before{display:inline-block;margin-top:.45rem;}
.viewer-toolbar > ul > li + li{margin-left:5px;}
.viewer-flip-horizontal,.viewer-flip-vertical,.viewer-rotate-right,.viewer-rotate-left,.viewer-play{display:none;}
.viewer-title{display:none;}
@media only screen  and (orientation:landscape) {
  .viewer-toolbar > ul > li{width:1.1rem;height:1.1rem;}
  .viewer-toolbar > ul > li::before{margin-top:.35rem;}
}

@media screen and (min-width: 750px) {
  
  h1{font-size:20px;}
  .wrap{width:750px;margin:0 auto;}


  .viewer-toolbar > ul > li{width:48px;height:48px;}
  .viewer-toolbar > ul > li::before{margin-top:13px;}
}
</style>


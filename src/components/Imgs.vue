<template>
  <div class="wrap">
    <h1><span>{{title}}</span></h1>
    <div :class="navShow?'tools hie':'tools'">
      <div class="navbar" @click="back()"><img src="../assets/icon9.png" /></div>
      <!--<div class="navbar" @click="navShow = true"><img src="../assets/icon2.png" /></div>-->
    </div>
    <div class="box"   >
      <h2><span>{{tit}}</span></h2>
      <div class="info" >
        <!-- <template class="newviewer" v-if='imglist[newCode-1].length>0'>
        <viewer :images="imglist[newCode-1]">
          <template v-for="(src,index) in imglist[newCode-1]">
            <i>{{index+1}}</i>
                  <img
                        :src="src"
                        :key="index"
                        :onerror="errorImg"
                      >
            </template>
        </viewer>
        </template> -->
        <template class="newviewer" v-if='imglist.length>0'>
          <viewer :images="imglist[newCode-1]">
            <template v-for="(src,index) in imglist">
              <i>{{index+1}}</i>
              <img
                :src="src"
                :key="index"
                :onerror="errorImg"
              >
            </template>
          </viewer>
        </template>
        <template v-else><div class="emp">暂无相关信息</div></template>
      </div>
    </div>
    <div :class="navShow?'navbox show':'navbox hie'" @click.stop="navShow=false">
      <div class="info">
        <ul>
          <li v-for="(item,i) in list" :class="newCode==item.head_id?'cur':''" @click="showimgs(item.head_id,item.description)">
            <i></i>{{item.description}}</li>
        </ul>
        <i class="btn" @click.stop = "navShow=false"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        token:"",
        navShow:false,
        title:'',
        tit:'',
        code:'',
        newCode:1,
        list:[],
        imglist:[]
      }
    },
    mounted(){
      this.getThoken()
      this.getParams()
      window.addEventListener("resize", this.renderResize, false)

    },
    beforeDestroy () {
      window.removeEventListener("resize", this.renderResize, false)
    },
    methods:{
      showfn:function(num){
        if(this.sel == num){
          this.sel=-1
        }else{
          this.sel = num
        }
      },
      getParams(){
        const routercode = this.$route.query.code
        const routerTitle=this.$route.query.title
        const routerParams = this.$route.query.mallCode
        const routerboxTitle = this.$route.query.boxTitle
        this.newCode = routerParams
        this.tit=routerboxTitle
        this.title=routerTitle
        this.code=routercode
        this.getClassroomAtm(routerParams)
        this.getClassroom();
      },
      showimgs(n,tit){
        this.tit = tit
        this.newCode = n;
        this.getClassroomAtm(n);
      },
      back(){
        this.$router.push({path: '/classHome'})
      },
      renderResize() {
        var _This = this;
        // 判断横竖屏
        let width = document.documentElement.clientWidth
        let height = document.documentElement.clientHeight
        if(width > height) {
          //alert('横屏')
        }else{
          //alert('竖屏')
        }
      },
      getThoken:function () {
        var _this = this;
        $.ajax({
          url:process.env.API_ROOT+"/app/oauth/token?client_secret=secret&grant_type=password&client_id=client2&password=app_wx123&username=APP_WX",
          type:'post',
          async:false,
          success:function(result){
            _this.token = result.access_token
          }
        });

      },
      getClassroom:function(){
        var _this = this;
        $.ajax({
          url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_CLASSROOM",
          type:'post',
          async:false,
          headers:{
            'Content-Type':'application/json;charset=utf8',
            'Authorization':'Bearer ' + _this.token
          },
          data:JSON.stringify({
            "business_class":_this.code
          }),
          success:function(ms){
            if (ms.result == 'S') {
              _this.list=ms.info.lists
            }
          }
        });
      },
      getClassroomAtm:function(atm){
        var _this = this;
        $.ajax({
          url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_CLASSROOM_ATM",
          type:'post',
          async:false,
          headers:{
            'Content-Type':'application/json;charset=utf8',
            'Authorization':'Bearer ' + _this.token
          },
          data:JSON.stringify({
            "head_id":atm
          }),
          success:function(ms){
            if (ms.result == 'S') {
              _this.imglist=[];
              for (var i = 0;i<ms.info.lists.length; i++) {
                var _url = ms.info.lists[i].attachment_url+ '&access_token='+ _this.token
                _this.imglist.push(_url)
              }
            }
          }
        });
      }
    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>
  h1{text-align:center;padding-top:1rem;padding:1.5rem 0 1rem;}
  h1 span{font-size:.85rem;color:#143269;}
  .wrap{width:100%;overflow:auto;}
  .emp{padding:2rem 0;text-align:center;font-size:.6rem;color:#999;}
  .box{margin:.7rem;background:#fff;box-shadow:0 0 .25rem rgba(0,0,0,.3);border-radius:.25rem;padding:.5rem .5rem .7rem;position:relative;margin-bottom:1rem;}
  .box img{width:100%;}
  .box i{display:block;width:1rem;height:1rem;background:#143269;color:#fff;text-align:center;line-height:1rem;border-radius:50%;font-style:normal;margin:.5rem 0 .2rem;}
  .navbox{position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(255,0,0,0);overflow:hidden;z-index:999;}
  .navbox.hie{transition:opacity .3s .3s;}
  .navbox .info{background:#fff;width:8rem;position:absolute;right:0;top:0;height:100%;transition:.3s;box-shadow:-.2rem 0 .5rem rgba(0,0,0,.1);display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;-webkit-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;-webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;-webkit-box-orient: vertical;-ms-flex-direction: column;-webkit-flex-direction: column;flex-direction: column;}
  .navbox.show .info{transform:translateX(0);opacity:.85;}
  .navbox.hie{opacity:0;z-index:-1;}
  .navbox.hie .info{transform:translateX(100%);}
  .navbox .info ul{padding:0;width:100%;}
  .navbox .info ul li{text-align:center;color:#143269;font-size:.6rem;position:relative;padding:.7rem 0;}
  .navbox .info ul li:after{content:'';display:block;position:absolute;left:.95rem;right:.95rem;bottom:0;height:1px ;background:#eee;}
  .navbox .info ul li.cur{color:#fff;background:#143269;}
  .navbox .info ul li.cur:after{background:#143269;}
  .navbox .btn{position:relative;margin:2rem auto;width:1rem;height:1rem;display:block;}
  .navbox .btn:after{content:'';display:block;width:.45rem;height:.45rem;border-bottom:1px solid #ccc;border-right:1px solid #ccc; transform: rotate(-45deg);position:absolute;bottom:.2rem;right:.3rem;}
  .navbox .btn:before{content:'';border:1px solid #ddd;display:block;width:1.2rem;height:1.2rem;border-radius:50%;position:absolute;right:-.2rem;bottom:-.24rem;}

  .tools{width:1.5rem;height:3rem;position:absolute;right:0;top:50%;margin-top:-1.5rem;z-index:99;overflow:hidden;}
  .navbar{width:1.5rem;height:1.5rem;background:rgba(20,50,105,.8);display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;-webkit-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;-webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;transition:.3s;}
  .navbar:nth-child(2){margin-top:2px;}
  .tools.hie .navbar{transform:translateX(100%);}
  .navbar img{width:.8rem;}

  .box h2{color:#143269;font-weight:600;font-size:.7rem;margin-bottom:.45rem;}
  .box h2 span{position:relative;}
  .info  >>> .viewer-toolbar > ul > li{width:30px;height:30px;}
  @media screen and (min-width: 750px) {
    .box{max-width:1200px;margin:0 auto 40px;}
    .box i{width:30px;height:30px;line-height:30px;font-size:16px;}
    .wrap{box-sizing:border-box; -moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:0 40px;}
    h1 span{font-size:26px;}
    h2 span{font-size:20px;}
    .navbox .info{width:200px;}
    .navbox .info ul li{font-size:16px;}
    .tools{width:2.5rem;height:5rem;}
    .navbar{width:2.5rem;height:2.5rem;}
    .navbar img{width:1rem;}
  }
</style>

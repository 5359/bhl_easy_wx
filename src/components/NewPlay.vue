<template>
  <div class="wrap" >
    <h1>金融产品</h1>
    <div class="wp">
    <div v-for="(item,index) in list" :class="sel==index?'box show':'box hie'" @click="showfn(index)" >
      <i></i>
      <h2 class="t"><span>{{item.product_name}}</span></h2>
      <p>{{item.description}}</p>
      <h3>产品特色</h3>
      <p>{{item.product_features}}</p>
      <h3>适用品牌</h3>
      <p>{{item.brand_applicable}}</p>
      <div class="img"><img :src="item.attachment_url" :onerror="defaultImg"></div>
    </div></div>
    <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer'
export default {
  name: 'newplay',
  data () {
    return {
      sel:0,
      token:'',
      list:[],
      defaultImg:'this.src="'+require('../assets/error.jpg')+'"'
    }
  },
  components: {
      Footer
  },
  created(){
    this.getThoken();
  },
  methods:{
    getThoken:function () {
      var _this = this;
      $.ajax({
        url:process.env.API_ROOT+"/app/oauth/token?client_secret=secret&grant_type=password&client_id=client2&password=app_wx123&username=APP_WX",
        type:'post',
        success:function(result){
          _this.token = result.access_token
          _this.getlist(_this.token)
        }
      });
      
    },
    getlist:function(token){
      var _this = this;
      $.ajax({
        url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_PRODUCT_LIST",
        type:'post',
          headers:{
            'Content-Type':'application/json;charset=utf8',
            'Authorization':'Bearer ' + token
          },
          data:JSON.stringify({
            'open_id':(new Date()).getTime()
          }),
        success:function(ms){
          if(ms.result=='S'){
            _this.list = ms.info.lists
            $.each(_this.list,function(index,item){
              item.attachment_url = item.attachment_url+ '&access_token='+ _this.token
            })
            // _this.list[1].description = '最低首付30%，贷款期限24期，每月还款金额相同，到期偿还车价30%~40尾款'
            // _this.list[2].description ='最低首付30%，贷款期限24期，每月还款金额相同，到期偿还车价30%~40尾款'
            // _this.list[0].description = '最低首付30%，贷款期限24期，每月还款金额相同，到期偿还车价30%~40尾款低月供、弹性还款，到期可选择一次性还款'
            // _this.list[0].brand_applicable = '北京现代、东风锐达起亚'
          }else{
            alert(ms.message)
          }
        }
      });
    },
    showfn:function(num){
      if(this.sel == num){
        this.sel=-1
      }else{
        this.sel = num
      }
      
    }
  }
}
</script>


<style scoped>
h1{text-align:center;padding-top:1rem;}
.box{margin:.7rem;background:#fff;box-shadow:0 0 .25rem rgba(0,0,0,.3);border-radius:.25rem;padding:.5rem .5rem .7rem;position:relative;}
.box.hie{height:3rem;overflow:hidden;}
.box:after{content:'';display:block;width:.45rem;height:.45rem;border-bottom:1px solid #ccc;border-right:1px solid #ccc; transform: rotate(-135deg);position:absolute;bottom:.65rem;right:.85rem;}
.box:before{content:'';border:1px solid #ddd;display:block;width:1rem;height:1rem;border-radius:50%;position:absolute;right:.55rem;bottom:.5rem;}
.box.hie:after{top:.5rem;bottom:auto;transform: rotate(45deg);}
.box.hie:before{top:.325rem;bottom:auto;}
.box.hie p{text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;}
.box .t{color:#143269;font-weight:600;font-size:.7rem;margin-bottom:.45rem;}
.box .t span{position:relative;}
.box i{content:"";width:.12rem;height:.7rem;display:block;background:#143269;position:absolute;left:0;top:.68rem;transition:.4s;}
.box .img{width:70%;margin:1rem auto .3rem;}
.box h3{color:#000;font-weight:600;margin:.65rem 0 .2rem;font-size:.6rem;}
.box p{color:#666;}

.hie h2+p{min-height:2rem;}
@media screen and (min-width: 750px) {
    .wp{min-height:calc(100% - 217px);}
    .box {
       max-width:1200px;
       margin-left:auto;
       margin-right:auto;
       box-sizing:border-box;
       transition:.3s;
       height:520px;
       overflow:hidden;
    }
    .hie h2+p{min-height:48px;}
    .box h3{font-size:16px;}
    .box .t{margin-bottom:.15rem;}
   .box .t span{font-size:18px;}
   .box .t span:after{height:.6rem;margin-top:-.25rem;}
   .box p{font-size:16px;}
   .box img{width:auto;height:200px;max-width:90%;display:block;margin:0 auto;}
   .box:before{width:.75rem;height:.75rem;}
   .box:after{width:.25rem;height:.25rem;right:.8rem;}
   .box i{top:.8rem;}
    .box.show:hover i{height:100%;top:0;}
}
</style>

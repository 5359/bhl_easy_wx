<template>
  <div class="wrap">
    <h1><span>微课堂</span></h1>
    <div :class="sel==1?'box box1 show':'box box1 hie'"  >
      <i></i>
      <h2><span>经销商APP</span></h2>
      <div class="info">
        <div style="height:10rem;"></div>
      </div>
      <span class="ie" @click="showfn(1)"></span>
    </div>
    <div :class="sel==2?'box show':'box hie'" >
      <i></i>
      <h2><span>经销商POS</span></h2>
      <div class="info">
        <ul >
           <li v-for="(item,i) in list" @click="goImg(item.head_id,item.description)"><i></i>{{item.description}}</li>
         <!--  <li @click="goImg(1,'浏览器设置')"><i></i>浏览器设置</li>
          <li @click="goImg(2,'模板管理')"><i></i>模板管理</li>
          <li @click="goImg(3,'上传DFC签名')"><i></i>上传DFC签名</li>
          <li @click="goImg(4,'新建申请')"><i></i>新建申请</li>
          <li @click="goImg(5,'待办事项')"><i></i>待办事项</li>
          <li @click="goImg(6,'我的申请')"><i></i>我的申请</li>
          <li @click="goImg(7,'租后信息变更申请')"><i></i>租后信息变更申请</li> -->
        </ul>
      </div>
        <span class="ie" @click="showfn(2)" ></span>
      
    </div>    
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      token:'',
      sel:2,
      lists:[]
    }
  },
  created(){
    this.getThoken();
    this.getClassroom();
  },
  mounted(){
  },
  methods:{
    goImg(n,t){
      this.$router.push({
          path: '/imgs',
          query: {
            mallCode:n,
            boxTitle:t
          }
        })
    },
    showfn:function(num){
      if(this.sel == num){
        this.sel=-1
      }else{
        this.sel = num
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
              "business_class":"POS"
          }),
          success:function(ms){
            if (ms.result == 'S') {
              _this.list=ms.info.lists
            }
          }
        });
    }
  }
}
</script>

<style scoped>
h1{text-align:center;padding-top:1rem;background:#143269;padding:1.5rem 0 3rem;}
h1 span{color:#fff;font-size:.85rem;}
.wrap{ overflow:auto;box-sizing:border-box;}
.box{margin:.7rem;background:#fff;box-shadow:0 0 .25rem rgba(0,0,0,.3);border-radius:.25rem;padding:.5rem .5rem .7rem;position:relative;}
.box1{margin-top:-1rem;}
.box.hie{overflow:hidden;}
.box.hie .info{display:none;}
.ie:after{content:'';display:block;width:.45rem;height:.45rem;border-bottom:1px solid #ccc;border-right:1px solid #ccc; transform: rotate(-135deg);position:absolute;bottom:.65rem;right:.85rem;}
.ie:before{content:'';border:1px solid #ddd;display:block;width:1rem;height:1rem;border-radius:50%;position:absolute;right:.55rem;bottom:.5rem;}
.box.hie .ie:after{top:.5rem;bottom:auto;transform: rotate(45deg);}
.box.hie .ie:before{top:.325rem;bottom:auto;}
.box.hie p{text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;}
.box h2{color:#143269;font-weight:600;font-size:.7rem;margin-bottom:.45rem;}
.box h2 span{position:relative;}
.box > i{content:"";width:.12rem;height:.7rem;display:block;background:#143269;position:absolute;left:0;top:.68rem;transition:.4s;}
ul{padding:.25rem .8rem 1.3rem;}
ul li{border-bottom:1px solid #eee;padding:.5rem 0;position:relative;padding-left:1.4rem;cursor:pointer;}
ul li i{width:1rem;background:url('../assets/icon.png') no-repeat center;background-size:.6rem;display:block;position:absolute;left:0;top:50%;margin-top:-.5rem;height:1rem;}

@media screen and (min-width: 750px) {
  .box.show:hover > i{top:0;height:100%;}
  .box > i{height:1rem;}
    h1 span{font-size:26px;}
    h2 span{font-size:20px;}
    ul {margin-bottom:40px;}
    ul li{padding:20px 0 20px 30px;font-size:18px;}
    ul li:after{content:'';position:absolute;left:0;right:100%;height:1px;display:block;bottom:-1px;background:#bec6d5;transition:.6s;}
    ul li:hover:after{right:0;}
.ie{cursor:pointer;}
}
</style>

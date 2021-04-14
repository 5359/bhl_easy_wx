<template>
  <div class="wrap coment" :style="(cityboxshow||filterboxshow)?'overflow:hidden;height:'+wh+'px':''">
    <h1>查找经销商</h1>
    <div class="box searchbx">
      <h2 class="display_flex justify-content_flex-justify">
        <i><img src="../assets/adress_icon.png"></i>
        <span @click="setCity">{{city.obj.city_name}}</span>
        <a href="javascript:;" @click="getnowcity" v-if="citybar != city.obj.city_name">点击获取当前位置</a>
      </h2>
      <div class="sinp">
        <input type="text" placeholder="经销商名称" name="searchinp"  v-model="inpVal" @change="inpFn(inpVal)">
      </div>
      <p class="display_flex justify-content_flex-justify align-items_center">
        您可以按要求筛选经销商
        <a href="javascript:;" @click="filterboxshow=true">筛选条件</a>
      </p>
    </div>

    <p class="tip">为您找到<span>{{total}}</span>个经销商</p>
    <div class="empt" v-if="!dealerlist.length"><span></span></div>
    <div class="wp">
      <div class="lists">
          <div class="box hi" v-for="(item,index) in dealerlist" v-if="index<showNum">
            <h2 class="t"><span>{{item.dealer_name}}</span></h2>
            <p class="addr">{{item.dealer_address}}</p>
            <p class="tel" v-if="item.dealer_contact!=''"><a :href="'tel:'+item.dealer_contact">{{item.dealer_contact}}</a></p>
          </div>
      </div>
    </div>
    <div class="loading" v-if="dealerlist.length && total>10" ><span>{{loading}}<i v-if="showNum<total"></i></span></div>

    <div class="citybox" :style="cityboxshow?'display:block;':'display:none;'">
      <div class="info">
        <i class="close" @click="cityboxshow=false"></i>
        <h2>选择城市</h2>
        <div class="citylist">
          <ul>
            <li v-for="(item,index) in citylist" >
              <span @click="cityfn(item.province_code,item.show?1:0)">{{item.province_name}}</span>
              <ul v-if='item.show'>
                <li v-for="(ite,i) in item.citys" :class="ite.sel?'cur':''" @click="ccfn(ite)">{{ite.city_name  }}</li>
              </ul>
            </li>
          </ul>
          
        </div>
        <div class="tc"><a href="javascript:;" :class="city.br?'on':''" @click="sub_setcity">确定</a></div>
      </div>
    </div>

    <div class="filterbox" :style="filterboxshow?'display:block;':'display:none;'">
      <div class="info">
        <i class="close" @click="filterClose"></i>
        <h2>筛选条件</h2>
        <div class="tjwrap">
          <div class="filterlist display_flex justify-content_flex-justify">
            <div class="checkboxwrap" v-for="(item,index) in brandSpare">
             <label>
               <input type="checkbox" :checked="item.sel?'checked':''" :name="item.brand_code" @change="item.sel=!item.sel" />
               <i></i>
               {{item.brand_name}}
             </label>
            </div>
          </div>
        </div>
        <div class="tc"><a href="javascript:;" class="btn" @click="brandDefine">确定</a><a href="javascript:;" @click="brandReset">重置</a></div>
      </div>
    </div>
    <Footer class="footer" />
  </div>
</template>

<script> 
import MapLoader from '../plugins/amap.js'
import Footer from '../components/Footer'
export default {
  name: 'newplay',
  data () {
    return {
      filterboxshow:false,
      inpVal:'',
      token:'',
      wh:0,
      showNum:10,
      city:{
        br:false,
        obj:{city_name:'北京',city_code:''}
      },
      citybar:'',
      total:0,
      cityboxshow:false,
      citylist:[],
      cityclist:[],
      dealerlist:[],
      brandlist:[],
      brandSpare:[],
      screenBrand:[],
      mytip:null,
      wrap:null,
      ft:0,
      loadb:false,
      loading:'加载中',
      map:null
    }
  },
  components: {
    Footer
  },
  created(){
    var _this = this;
    this.wh = $(window).height();
    this.getThoken();
  },
  mounted() {
    var _this=this;
    this.wrap=$(document).get(0); //document.querySelector('#app');
    this.ft = $('.footer').offset().top;
    _this.$nextTick(function () {
      _this.wrap.addEventListener('scroll', _this.onScroll)
    })
  },
  methods:{
    textTip: function (str, t, callBack) {
        var _this = this;
        t = t || 200;
        if(t == 'false' && this.mytip == null){
          return false;
        }
        if(t != 'false' && this.mytip == null){
          if($('.text-tip').length) return false;
          var dom = $(`<div class='text-tip'><div class="los"></div></div>`);
          $('body').append(dom);
          _this.mytip = $('.text-tip')
          _this.mytip.title = str;
        }
        if(t == 'show'){
          _this.mytip.show();
          callBack && callBack();
        }else if(t == 'false'){
            
              _this.mytip.hide();
              if (callBack) {callBack();}
            
        }else{
          _this.mytip.show();
          setTimeout(function () {
              _this.mytip.hide();
              if (callBack) {callBack();}
          }, t);
        }
    },
    getnowcity:function(){
      var _this = this;
      if(_this.citybar != _this.city.obj.city_name){
            var ciy = window.localStorage.getItem("address")
            
            var newciy = null
            if (ciy != 1 && ciy ) {
               _this.citybar = ciy
               _this.city.obj.city_name = ciy;
      
               _this.getDealerList()
             }else if(ciy == newciy) {
              MapLoader().then(AMap =>{
                _this.map = AMap.plugin('AMap.CitySearch', function () {

                 var citySearch = new AMap.CitySearch();
                 citySearch.getLocalCity(function (status, result) {
                      
                     if (status === 'complete' && result.info === 'OK') {
                         newciy = result.city
                         if(ciy != newciy){
                             var r=confirm("想使用您当前的位置");
                             if (r==true){
                                window.localStorage.setItem("address", newciy)
                                let province = result.province;
                                let city = result.city;
                                 _this.citybar = city
                                 _this.city.obj.city_name = city;
                                 _this.getDealerList()
                             }
                             else{
                               window.localStorage.setItem("address", "1")
                             }
                          }
                     }else{
                        window.localStorage.removeItem("address")
                     }

                 })
               });

              })
            }else{
              _this.citybar = '北京'
              _this.city.obj.city_name = '北京';
              _this.getDealerList()
            }
            
          }
    },
    setCity:function(){
      this.cityboxshow=true;

      this.getProvinceList();
      const masker = document.querySelector('citybox')
      masker.addEventListener('touchmove',(e) => {
        e.preventDefault()
      },false)
    },
    getThoken:function () {
      var _this = this;
      $.ajax({
        url:process.env.API_ROOT+"/app/oauth/token?client_secret=secret&grant_type=password&client_id=client2&password=app_wx123&username=APP_WX",
        type:'post',
        success:function(result){
          _this.token = result.access_token
          _this.getnowcity();
          if(!_this.brandlist.length){
            _this.getbrandlist(_this.token)
          } 
        }
      });
      
    },
    getbrandlist:function(token){
      let _this = this
      if(!this.brandlist.length){

          this.textTip('正在获取品牌','show')
          $.ajax({
            url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_BRAND_BY_MAKE",          
            type:'post',
            headers:{
              'Content-Type':'application/json;charset=utf8',
              'Authorization':'Bearer ' + token
            },
            data:JSON.stringify({
              'open_id':(new Date()).getTime()
            }),
            success:function(ms){
              if(ms.result == 'S'){

                $.each(ms.info.lists,function(index,item){
                  item.sel=false;
                  _this.brandlist.push(JSON.parse(JSON.stringify(item)))
                  _this.brandSpare.push(JSON.parse(JSON.stringify(item)))
                })
                _this.textTip('正在获取品牌','false');
              }else{
               
                this.textTip('正在获取品牌','false')
                this.textTip(ms.message)

              }
            }
          });
      }
    },
    getProvinceList:function(){
      var _this = this;
      if(!_this.citylist.length){

            _this.textTip('正在获取城市列表...','show',function(){
              console.log('车系城市列表')
            })
            $.ajax({
              url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_PROVINCE",
              type:'post',
                headers:{
                  'Content-Type':'application/json;charset=utf8',
                  'Authorization':'Bearer ' + _this.token
                },
                data:JSON.stringify({
                  'open_id':(new Date()).getTime()
                }),
              success:function(ms){
                if(ms.result=='S'){
                   _this.textTip('正在获取城市列表...','false')
                  $.each(ms.info.lists,function(index,item){
                    item.show=false;
                    item.citys=[]
                    _this.citylist.push(item)
                  })
                }else{
                  _this.textTip('正在获取城市列表...','false')
                  _this.textTip(ms.message)
                }
              }
            });
          }
    },
    cityfn:function(code,flog){

      var _this = this;
      var cyobj = {};
      $.each(_this.citylist,function(index,item){
        if(item.province_code == code){
          cyobj = item;
        }
      })
      cyobj.show = !flog
      if(!cyobj.citys.length){
        _this.textTip('正在获取城市列表...','show')
        $.ajax({
          url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_CITY",
          type:'post',
            headers:{
              'Content-Type':'application/json;charset=utf8',
              'Authorization':'Bearer ' + _this.token
            },
            data:JSON.stringify({
              'open_id':(new Date()).getTime(),
              'province_code':code
            }),
          success:function(ms){
            if(ms.result=='S'){

              _this.textTip('正在获取城市列表...','false')
              $.each(ms.info.lists,function(index,item){
                item.sel=false
              })
              cyobj.citys=ms.info.lists
              console.log(cyobj.citys)
            }else{
              _this.textTip('正在获取城市列表...','false')
              _this.textTip(ms.message)
            }
          }
        });
      }
    },
    ccfn:function(ite){
      $.each(this.citylist,function(index,item){
        $.each(item.citys,function(ind,ites){
          if(ite.city_name == ites.city_name){
            ites.sel=true
          console.log(item.citys)
          }else{
            ites.sel=false;
          }
        })
      })
      if(ite.city_name !=this.city.name){
             this.city.br = true;
             this.city.newc = ite;
      }
    },
    sub_setcity:function(){
      if (this.city.br) {
        this.city.obj = this.city.newc
        this.getDealerList(this.city.newc.city_code)
        this.cityboxshow = false;
      }
    },
    getDealerList:function(){
      var _this = this
      var brandCodes=[];
      $.each(this.screenBrand,function(index,item){
        brandCodes.push(item.brand_code)
      })

      _this.textTip('正在获取经销商列表...','show')
      $.ajax({
          url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_DEALER",
          type:'post',
            headers:{
              'Content-Type':'application/json;charset=utf8',
              'Authorization':'Bearer ' + _this.token
            },
            data:JSON.stringify({
              'openId':(new Date()).getTime(),
              'city_code':_this.city.obj.city_name,
              'brand_code':brandCodes.join(','),
              'search_info':_this.inpVal
            }),
          success:function(ms){
            if(ms.result=='S'){
              _this.textTip('正在获取经销商列表...','false')
              _this.total=ms.info.lists.length
              _this.dealerlist = ms.info.lists
            }else{
              _this.textTip('正在获取经销商列表...','false')
              _this.textTip(ms.message)
            }

          }
        });
    },
    inpFn:function(val){
      console.log(val)
      this.getDealerList()
    },
    brandReset:function(){
      var _this = this;
      $.each(_this.brandSpare,function(index,item){
        item.sel=false;
      })
    },
    brandDefine:function(){
      var _this = this;
      _this.screenBrand = [];
      $.each(_this.brandSpare,function(index,item){
        if(item.sel){
          _this.screenBrand.push(JSON.parse(JSON.stringify(item)))
          _this.brandlist[index] = JSON.parse(JSON.stringify(item));
        }
      })

      this.getDealerList()
      _this.filterboxshow = false;
    },
    filterClose:function(){
      var _this = this;
      this.filterboxshow=false;

      $.each(_this.brandlist,function(index,item){
          _this.brandSpare[index] = JSON.parse(JSON.stringify(item));
      })
    },
    // 获取滚动条当前的位置
    getScrollTop () {
      var scrollTop = 0
      if (this.wrap.scrollTop) {
        scrollTop = this.wrap.scrollTop
      }
      return scrollTop
    },
    // 获取当前可视范围的高度
    getClientHeight () {
      var clientHeight = 0
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
      } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
      }
      return clientHeight
    },

    // 获取文档完整的高度
    getScrollHeight () {
      return Math.max(this.wrap.scrollHeight, document.documentElement.scrollHeight)
    },
    // 滚动事件触发下拉加载
    onScroll () {
      var _this = this
      //if($('.footer').offset().top - this.getClientHeight()<0) {
      if($('.footer').offset().top-$('.footer').outerHeight()-$(document).scrollTop()-this.getClientHeight()<=0){
          if (this.showNum<this.total&&!this.loadb) {
              
                this.loadb=true
                setTimeout(function(){
                  _this.showNum += 10
                },1000)
              
              this.loading='加载中'
          }else if(this.showNum>=this.total){
            this.loading='没有啦'
          }
      }else{
          this.loadb=false
      }
    },
  }
}
</script>


<style scoped>
.empt{text-align: center;
    padding: 2rem 0;
    color: #999;}
.empt span{
  display:block;width:10rem;height:8rem;background:url('../assets/none.png') no-repeat center;background-size:5rem;margin:0 auto;
}
h1{text-align:center;padding-top:1rem;}
.box{margin:.7rem;background:#fff;box-shadow:0 .3rem .45rem rgba(0,0,0,.08);border:1px solid #f3f3f3;border-radius:.25rem;padding:.5rem .5rem .7rem;position:relative;}
.box .t{position:relative;color:#143269;font-weight:500;font-size:.6rem;margin-bottom:.25rem;margin-left:-.5rem;}
.box .t span{margin-left:.5rem; display:block;border-bottom:1px solid #e8e8e8;padding-bottom:.45rem;}
.box .t:after{content:"";width:.12rem;height:.63rem;display:block;background:#143269;position:absolute;left:0;top:.16rem;}
.box .img{width:70%;margin:1rem auto .3rem;}
.box h3{color:#000;font-weight:600;margin:.65rem 0 .2rem;font-size:.63rem;}
.box p{color:#666;font-size:.6rem;padding:.2rem 0 0;padding-left:1rem;font-weight:400;background-repeat:no-repeat;background-size:.97rem;background-position: 0 .18rem;}
.box p.addr{background-image:url("../assets/address.png");}
.box p.tel{background-image:url("../assets/tel.png");margin-top:.23rem;}

.searchbx h2{position:relative;padding-left:.8rem;}
.searchbx i{width:.8rem;position:absolute;left:0;top:50%;margin-top:-.7rem;}
.searchbx h2 span{font-size:.65rem;color:#143269;font-weight:600;padding-right:0.75rem;position:relative;}
.searchbx h2 span:after{content:'';display:block;width:.35rem;height:.35rem;border-bottom:.1rem solid #c9c9c9;border-right:.1rem solid #c9c9c9; transform: rotate(45deg);position:absolute;top:50%;right:0;margin-top:-.3rem;}
.searchbx h2 a{float:right;display:block;font-size:.6rem;}

.sinp{margin:.65rem 0;padding:0 0 0 1.5rem;border:1px solid #ccc;border-radius:.3rem;background:url('../assets/search2.png') no-repeat .23rem center;background-size:.8rem;}
.sinp input{border:none;width:100%;font-size:.6rem;padding:.4rem 0;border-radius:.23rem;background:none;}
.searchbx p{color:#999;}
.searchbx p a{border:1px solid #143269;color:#143269;background:url('../assets/icon5.png') no-repeat .35rem center;background-size:.6rem;padding:.12rem .25rem .12rem 1.2rem;border-radius:.235rem;}
.tip{padding:.25rem .75rem 0;font-size:.6rem;color:#888;}
.tip span{color:#143269;padding:0 .1rem;font-weight:600;}

.citybox,.filterbox{background:rgba(0,0,0,.5);width:100%;height:100%;position:fixed;left:0;top:0;z-index:99;}
.citybox .info,.filterbox .info{width:90%;position:absolute;left:5%;top:50%;height:18rem;margin-top:-9rem;border-radius:.5rem;background:#fff;}

.citybox .info .tc a{color:#fff;background:#ccc;border-radius:.25rem;display:inline-block;padding:.25rem 1.5rem;font-size:.65rem;}
.citybox .info .tc a.on{background:#143269;}
.citybox h2,.filterbox h2{text-align:center;font-size:.8rem;color:#000;padding:.6rem 0 .3rem;}
.citybox .close,.filterbox .close{position:absolute;right:1rem;top:1.16rem;display:block;width:1rem;height:1rem;}
.citybox .close:after,.filterbox .close:after{content:'';width:100%;height:.12rem;background:#ccc;position:absolute;left:0;top:0;transform:rotate(45deg);}
.citybox .close:before,.filterbox .close:before{content:'';width:100%;height:.12rem;background:#ccc;position:absolute;left:0;top:0;transform:rotate(-45deg);}

.citylist{height:calc(100% - 4.85rem);overflow:auto;margin:0 1rem .45rem;}
.citylist li{border-bottom:1px solid #ddd;font-size:.65rem;color:#666;padding:.3rem 0;margin-right:1rem;}
.citylist span{display:block;padding:.25rem 0 .25rem;}
.citylist li:last-child{border:none;}
.citylist ul ul{padding-left:2em;border-top:1px solid #ddd;}

.tjwrap{height:calc(100% - 5rem);overflow:auto;padding:0 .6rem;}
.tjwrap h3{padding-top:1rem;font-weight:600;}
.filterlist{overflow:hidden;flex-wrap:wrap;}
.filterlist label{padding-left:1.14rem;position:relative;width:calc(100% );float:left;margin:.6rem 0 0;}
.filterlist label input{display:none;}
.filterlist label i{display:block;width:.72rem;height:.72rem;background:#eee;border-radius:.1rem;position:absolute;left:0;top:50%;margin-top:-.36rem;}
.filterlist label input:checked+i{background:#143269;overflow:hidden;}

.filterlist label input:checked+i:after{content:'';display:block;width:.4rem;height:.2rem;border-bottom:1px solid #fff;border-left:1px solid #fff;transform:rotate(-45deg);margin:.13rem;}
.filterbox .tc{padding-top:.5rem;}
.filterbox .tc a:nth-child(2){padding-left:1rem;}
.citylist li.cur{color:#143269;}
.loading{display:block;text-align:center;padding:.2rem 0 1rem;font-size:.5rem;color:#ccc;
  }
.loading i {display:block;
  width: 4px;
  height: 4px;
  background-color: #fff;
  border-radius: 50%;
  animation: loader4Animation 1s linear infinite;
  margin-left: calc(50% - 15px);
  margin-top:5px;
}
@keyframes loader4Animation {
  0% {
    background-color: rgba(0, 0, 0, 1);
    box-shadow: 15px 0px 0px 0px rgba(0, 0, 0, 0.67),
      30px 0px 0px 0px rgba(0, 0, 0, 0.33);
  }
  17% {
    background-color: rgba(0, 0, 0, 0.67);
    box-shadow: 15px 0px 0px 0px rgba(0, 0, 0, 1),
      30px 0px 0px 0px rgba(0, 0, 0, 0.67);
  }
  33% {
    background-color: rgba(0, 0, 0, 0.33);
    box-shadow: 15px 0px 0px 0px rgba(0, 0, 0, 0.67),
      30px 0px 0px 0px rgba(0, 0, 0, 1);
  }
  50% {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: 15px 0px 0px 0px rgba(0, 0, 0, 0.33),
      30px 0px 0px 0px rgba(0, 0, 0, 0.67);
  }
  67% {
    background-color: rgba(0, 0, 0, 0.33);
    box-shadow: 15px 0px 0px 0px rgba(0, 0, 0, 0),
      30px 0px 0px 0px rgba(0, 0, 0, 0.33);
  }
  83% {
    background-color: rgba(0, 0, 0, 0.67);
    box-shadow: 15px 0px 0px 0px rgba(0, 0, 0, 0.33),
      30px 0px 0px 0px rgba(0, 0, 0, 0);
  }
  100% {
    background-color: rgba(0, 0, 0, 1);
    box-shadow: 15px 0px 0px 0px rgba(0, 0, 0, 0.67),
      30px 0px 0px 0px rgba(0, 0, 0, 0.33);
  }
}
@media screen and (min-width: 750px) {

    .citybox .info,.filterbox .info {
       left:50%;
       width:700px;
       margin-left:-350px;
       height:14rem;margin-top:-7rem;
    }
    .citylist{height:calc(100% - 3.8rem);}
    .citylist li{font-size:16px;padding:.05rem 0;}
    .citylist li li{font-size:15px;padding:.15rem 0;}
    .citybox .info .tc a{font-size:.42rem;padding:.15rem 1rem;}
    .box,.tip{max-width:1200px;margin-left:auto;margin-right:auto;font-size:.4rem;box-sizing:border-box;}
  .searchbx h2{padding-left:.75rem;}
  .searchbx i{width:.65rem;margin-top:-.55rem ;}
  .searchbx h2 span{font-size:.5rem;}
  .searchbx h2 span:after{transform:rotate(45deg) scale(.8);margin-top:-.41rem;}
  .searchbx h2 a{font-size:16px;padding-top:.2rem;}
  .sinp input{padding:.2rem 0;font-size:18px;}
  .sinp{background-size:.55rem;padding-left:1rem;}
  .searchbx p{font-size:.4rem;}
  .empt{font-size:.4rem;}
  .filterlist{font-size:.4rem;}
  .filterbox .tc a{font-size:.4rem;}
  .citybox h2,.filterbox h2{font-size:.6rem;}
  .citybox .close,.filterbox .close{width:.7rem;}
  .citybox .close:after, .filterbox .close:after{height:3px;}
  .citybox .close:before, .filterbox .close:before{height:3px;}
  .filterlist label i{width:.5rem;height:.5rem;margin-top:-.25rem;}
  .filterlist label{padding-left:.8rem;}
  .filterlist label input:checked+i:after{width:.25rem;height:.15rem;}
  .box .t{font-size:18px;margin-left:-.5rem;}
  .box .t span:after{height:.47rem;top:.1rem;}
  .box{transition:.4s;}
  .wp .box:hover{box-shadow:0 0 .45rem rgba(0,0,0,.3);transform:scale(1.015);}
  .lists{display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-wrap:wrap;max-width:1200px;margin:0 auto 1rem; -webkit-box-pack: justify;-ms-flex-pack: justify;-webkit-justify-content: space-between;justify-content: space-between;}
  .lists .box{width:49%;margin:.5rem 0 0;}
  .wp{min-height:calc(100% - 511px)}
  .box p{font-size:16px;background-size:24px;background-position:6px 6px;}
  .box .t:after{top:1px;}
  .tip{padding-left:18px;}
}

</style>

<template>
  <div class="wrap" :style="wo?'overflow:hidden':''">
    <h1>营销活动</h1>
    <div class="box">
      <h2 class="t"><span>{{info.ac_name}}</span></h2>
      <p class="des">{{info.ac_description}}</p>
      <img :src="info.attachment_url" :onerror="defaultImg" />
    </div>
    <div class="box">
      <p class="des">欢迎在线申请，您提交以下信息后，我们会尽快与您联系。</p>
      <div class="cum">
        <input type="text" name="name" v-model="dataForm.name" placeholder="请输入本人姓名" />
      </div>
      <div class="cum">
        <input type="tel" name="phone" v-model="dataForm.phone" placeholder="请输入本人手机号" />
      </div>
      <div class="cum">
        <input type="text" name="referrer_name" v-model="dataForm.referrer_name" placeholder="请输入推荐人姓名" />
      </div>
      <div class="cum">
        <input type="tel" name="referrer_phone" v-model="dataForm.referrer_phone" placeholder="请输入推荐人姓名" />
      </div>
      <div class="cum">
        <input type="text" name="vin_number" v-model="dataForm.vin_number" placeholder="请输入VIN编码" />
      </div>
      <div class="cum sel" id="province" @click="getProvince">
        <b v-if="province.set">{{province.now.value}}</b><span v-else>请选择省份</span>
      </div>
      <div class="cum sel" id="city" @click="getCity">
        <b v-if="city.set">{{city.now.value}}</b><span v-else>请选择市区</span>
      </div>
      <div class="cum sel" id="dealer" @click="getDealer">
        <b v-if="dealer.set">{{dealer.now.value}}</b><span v-else>请选择经销商</span>
      </div>
      <div class="error"></div>
      <div class="tc"><a href="javascript:;" class="btn" @click="sub">提交</a></div>
    </div>
    <div :class="floattip.show?'show floatbox':'floatbox'" >
      <div class="info">
        <h3>提示</h3>
        <p>{{floattip.ms}}</p>
        <a href="javascript:;" class="btn" @click="floattip.show=false">确定</a>
      </div>
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import Footer from '../components/Footer'
import MobileSelect from 'mobile-select'
export default {
  name: 'Yingxiaohuodong',
  data () {
    return {
      token:'',
      wo:false,
      info:[], 
      defaultImg:'this.src="'+require('../assets/error.jpg')+'"',
      province:{selObj:null,data:[],now:{},set:false},
      city:{selObj:null,data:[],now:{},set:false},
      dealer:{selObj:null,data:[],now:{},set:false},
      dataForm:{
        name:'',
        phone:'',
        referrer_phone:'',
        referrer_name:'',
        vin_number:''
      },
      floattip:{ms:'',show:false}
    }
  },
  components: {
      Footer
  },
  created(){
    
    this.getThoken()
    this.getActiveInfo();
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

    getActiveInfo:function(){
      var _this = this;
      $.ajax({
        url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_ACTIVITIES",
        type:'post',
        headers:{
                  'Content-Type':'application/json;charset=utf8',
                  'Authorization':'Bearer ' + _this.token
                },
        data:JSON.stringify({
                }),
        success:function(data){
          if (data.result == 'S') {
            _this.info=data.info.lists[0];
          }
        }
      });
    },
    getThoken:function () {
      var that = this;
      $.ajax({
        url:process.env.API_ROOT+"/app/oauth/token?client_secret=secret&grant_type=password&client_id=client2&password=app_wx123&username=APP_WX",
        type:'post',
        async:false,
        success:function(result){
          that.token = result.access_token
        }
      });
    },

    getProvince:function(){
      let _this = this;
      if(_this.province.selObj)return false;
      _this.textTip('正在查询产品请稍后')
        $.ajax({
            url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_PROVINCE",          
            type:'post',
            headers:{
              'Content-Type':'application/json;charset=utf8',
              'Authorization':'Bearer ' + _this.token
            },
            data:JSON.stringify({
              "open_id":(new Date()).getTime()
            }),
            success:function(ms){
              if(ms.result == 'S'){
                
                _this.textTip('正在查询产品请稍后','false')

                $.each(ms.info.lists,function(index,item){
                  _this.province.data.push({
                    id:item.province_code,
                    value:item.province_name
                  })
                }) 
                _this.province.selObj = new MobileSelect({
                  trigger: "#province",
                  title: "省份",
                  triggerDisplayData:false,
                  wheels: [
                      {data:[{id:0,value:'请选择'}]}
                  ],
                  callback:function(indexArr, data){
                      _this.province.set=true;
                      if(data[0].id== _this.province.now.id){
                        _this.city.selObj.locatePosition(0,0);
                        _this.city.selObj.show()
                      }else{
                        _this.province.now=data[0]
                        _this.getCity()
                      }
                      

                  }
                });

                _this.province.selObj.updateWheel(0,_this.province.data)
                _this.province.selObj.locatePosition(0,0);
                _this.province.selObj.show();
                
              }
              
            }
        })
      
    },
    getCity:function(){
      let _this = this;
      _this.textTip('正在查询产品请稍后')
      $.ajax({
          url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_CITY",          
          type:'post',
          headers:{
            'Content-Type':'application/json;charset=utf8',
            'Authorization':'Bearer ' + _this.token
          },
          data:JSON.stringify({
            "open_id":(new Date()).getTime(),
            "province_code":_this.province.now.id
          }),
          success:function(ms){
            if(ms.result == 'S'){
              
              _this.textTip('正在查询产品请稍后','false')
              _this.city.data=[]
              $.each(ms.info.lists,function(index,item){
                _this.city.data.push({
                  id:item.city_code,
                  value:item.city_name
                })
              }) 
              if(_this.city.selObj==null){
                _this.city.selObj = new MobileSelect({
                  trigger: "#city",
                  title: "城市",
                  triggerDisplayData:false,
                  wheels: [
                      {data:_this.city.data}
                  ],
                  callback:function(indexArr, data){
                    _this.city.set=true;
                      if(data[0].id != _this.city.now.id ){
                         _this.city.now = data[0];
                         _this.getDealer()
                      }
                      
                  }
                });
              }
                _this.city.selObj.updateWheel(0,_this.city.data)
                _this.city.selObj.locatePosition(0,0);
                _this.city.selObj.show();
                
              
            }
            
          }
      })
    },
    getDealer:function(){
      let _this = this;
      _this.textTip('正在查询产品请稍后')
      $.ajax({
          url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_DEALER",          
          type:'post',
          headers:{
            'Content-Type':'application/json;charset=utf8',
            'Authorization':'Bearer ' + _this.token
          },
          data:JSON.stringify({
            "open_id":(new Date()).getTime(),
            "city_code":_this.city.now.id,
            "brand_code":"",
            "search_info":""
}         ),
          success:function(ms){
            if(ms.result == 'S'){
              
              _this.textTip('正在查询产品请稍后','false')
              _this.dealer.data=[]
              $.each(ms.info.lists,function(index,item){
                _this.dealer.data.push({
                  id:item.dealer_code,
                  value:item.dealer_name
                })
              }) 
              if(_this.dealer.selObj==null){
                _this.dealer.selObj = new MobileSelect({
                  trigger: "#dealer",
                  title: "经销商",
                  triggerDisplayData:false,
                  wheels: [
                      {data:_this.dealer.data}
                  ],
                  callback:function(indexArr, data){
                    _this.dealer.now=data[0]
                    _this.dealer.set=true;
                  }
                });
              }
                _this.dealer.selObj.updateWheel(0,_this.dealer.data)
                _this.dealer.selObj.locatePosition(0,0);
                _this.dealer.selObj.show();
                
              
            }
            
          }
      })
    },
    sub:function(){
      var _this=this;

      $.ajax({
          url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=ACTIVITIES_SAVE",          
          type:'post',
          headers:{
            'Content-Type':'application/json;charset=utf8',
            'Authorization':'Bearer ' + _this.token
          },
          data:JSON.stringify({
            "open_id":(new Date()).getTime(),
            "head_id": _this.info.head_id,
            "name": _this.dataForm.name,
            "phone": _this.dataForm.phone,
            "referrer_name": _this.dataForm.referrer_name,
            "referrer_phone": _this.dataForm.referrer_phone,
            "vin_number": _this.dataForm.vin_number,
            "province_code": _this.province.now.id,
            "city_code": _this.city.now.id,
            "dealer_code":  _this.dealer.now.id
          }),
          success:function(ms){
            if (ms.result=='S') {
              _this.dealer.set=false;
              _this.city.set=false;
              _this.province.set=false;
              _this.dataForm.name='';
              _this.dataForm.referrer_name='';
              _this.dataForm.phone='';
              _this.dataForm.referrer_phone='';
              _this.dataForm.vin_number='';
            }
            _this.floattip.ms=ms.message
            _this.floattip.show=true;
          }
        })
    }
  }
}
</script>


<style scoped>
h1{text-align:center;padding-top:.25rem;}
.wrap{padding-top:2rem;overflow:auto;box-sizing:border-box;}
.box{margin:.7rem;background:#fff;box-shadow:0 .3rem .45rem rgba(0,0,0,.08);border:1px solid #f3f3f3;border-radius:.25rem;padding:.5rem .5rem .7rem;position:relative;}
.hide{display:none;}
.box .t{position:relative;color:#143269;font-weight:500;font-size:.6rem;margin-bottom:.25rem;margin-left:-.5rem;}
.box .t span{margin-left:.5rem; display:block;padding-bottom:.15rem;}
.box .t:after{content:"";width:.12rem;height:.63rem;display:block;background:#143269;position:absolute;left:0;top:.16rem;}
.des{color:#666;}
.box .cum{border-bottom:1px solid #eee;height:1.8rem;line-height:1.8rem;position:relative;}
.box .cum input{border:none;width:96%;padding:0 2%;}
.box .cum.sel{padding:0 2%;}
.box .cum.sel span{color:#ccc;display:block;}
.box .cum.sel:after{content:"";display:block;width:.5rem;height:.5rem;border-right:1px solid #ddd;border-bottom:1px solid #ddd;transform:rotate(45deg);position:absolute;right:.5rem;top:.45rem}
.btn{margin:1rem;width:3rem;}
.error{padding:.5rem;text-align:center;color:red;}
.sel b{font-weight:500;}
.floatbox{background:rgba(0,0,0,.3);position:fixed;left:0;top:0;height:100%;width:100%;z-index:-99;opacity:0;}
.floatbox.show{z-index:99;opacity:1;}
.floatbox .info{background:#fff;border-radius:.3rem;width:10rem;height:7rem;position:absolute;left:50%;margin-left:-5rem;top:50%;margin-top:-3rem;text-align:center;}
.floatbox .info h3{padding:.7rem 0;}
@media screen and (min-width: 750px) {
    .box{max-width:750px;margin-left:auto;margin-right:auto;box-sizing:border-box;}
    
    .box .t{font-size:18px;}
    .box h3{font-size:16px;}
    
    h1{padding-top:.5rem;}
  }
.footer  >>> .ft_nav{display:none;}
</style>

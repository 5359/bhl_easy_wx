<template>
  <div class="wrap" :style="wo?'overflow:hidden':''" ref="bow">
    <h1>限时优惠</h1>
    <div class="boxw" >
      <div class="box box1" v-if="stepB">
        <h2 class="t"><span>{{info.ac_name}}</span></h2>
        <p class="des">{{info.ac_description}}</p>
        <img :src="info.attachment_url" :onerror="defaultImg" />
      </div>
      <div class="box" v-if="stepB">
        <p class="des">欢迎在线预约申请，如有问题我们会及时与您联系。</p>
        <div class="cum">
          <input type="text" name="name" v-model="dataForm.name" placeholder="*请输入本人姓名" />
        </div>
        <div class="cum" >
          <input type="tel" name="phone" v-model="dataForm.phone" placeholder="*请输入本人手机号" />
        </div>
        <div class="cum">
          <input type="text" name="address" v-model="dataForm.address" placeholder="请输入本人收件地址（选填）" />
        </div>
        <div class="cum">
          <input type="text" name="referrer_name" v-model="dataForm.referrer_name" placeholder="*请输入推荐人姓名" />
        </div>
        <div class="cum">
          <input type="tel" name="referrer_phone" v-model="dataForm.referrer_phone" placeholder="*请输入推荐人手机号" />
        </div>
        <div class="cum">
          <input type="text" name="referrer_address" v-model="dataForm.referrer_address" placeholder="请输入推荐人收件地址（选填）" />
        </div>
        <div class="cum ">
          <input type="text" name="vin_number" v-model="dataForm.vin_number" @keyup="toUC" @blur="getCarInt" placeholder="*请输入VIN编码" />
          <span class="carModel">{{carModel}}</span>
        </div>
        <div class="cum sel" id="province" @click="getProvince">
          <b v-if="province.set">{{province.now.value}}</b><span v-else>*请选择省份</span>
        </div>
        <template v-if="province.now.value!=''">
          <div class="cum sel" id="city" @click="getCity">
            <b v-if="city.set">{{city.now.value}}</b><span v-else>*请选择市区</span>
          </div>
        </template>
        <template v-else>
          <div class="cum del">
            <span>*请选择市区</span>
          </div>
        </template>
        <template v-if="city.now.value!=''&& province.now.value!=''">
          <div :class="!dealer.none?'cum sel show':'cum hide'" id="dealer" @click="getDealer">
            <b v-if="dealer.set">{{dealer.now.value}}</b><span v-else>*请选择经销商</span>
          </div>

          <div :class="dealer.none?'cum  def show':'cum hide'" >
            <span>{{city.now.value}}暂无经销商信息</span>
          </div>
        </template>

        <template v-else>
          <div class="cum def" >
            <span>*请选择经销商</span>
          </div>
        </template>
        <p class="ty"><label for="che"><input type="checkbox" :checked="check" @change="checkfn" id="che" />本人及推荐人同意并授权北现租赁有限公司收集或披露本人的个人信息。本人及推荐人已明确知悉并同意上述信息的提供及授权带来的一切影响。</label></p>
        <div class="error">{{errorTxt}}</div>
        <div class="tc"><a href="javascript:;" :class="check?'btn':'btn invalid'" @click="sub">下一步</a></div>
        <p class="txt">详情请咨询当地经销商</p>
      </div>
      <div class="box box3" v-if="!stepB">
        <p class="des">请上传推荐人的行驶证照片</p>
        <p class="des">此行驶证照片仅用于证明推荐人信息的真实性</p>
        <div class="fil" :style="{backgroundImage: 'url( '+ imagecode +')'}">
          <input type="file" name="fileInp" @change="fileUpload" id="fileInp" accept="image/*" ref="file" />
          <label for="fileInp" v-if="imagecode==''" ></label>
          <p v-if="imagecode==''">上传行驶证照片</p>
        </div>
        <div class="tc"><a href="javascript:;" class="btn" @click="filesave">提交</a></div>
      </div>
    </div>
    <div :class="floattip.show?'show floatbox':'floatbox'" >
      <div class="info">
        <h3>提示</h3>
        <p>{{floattip.ms}}</p>
        <a href="javascript:;" class="btn" @click="closefloat">确定</a>
      </div>
    </div>
    <div class="gs">*本次活动最终解释权归北现租赁有限公司所有</div>
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
        line_id:'',
        defaultImg:'this.src="'+require('../assets/error.jpg')+'"',
        province:{selObj:null,data:[],now:{},set:false},
        city:{selObj:null,data:[],now:{},set:false},
        dealer:{selObj:null,data:[],now:{},set:false,none:false},
        dataForm:{
          name:'',
          phone:'',
          referrer_phone:'',
          referrer_name:'',
          vin_number:'',
          address:'',
          referrer_address:''
        },
        carModel:'',
        check:false,
        floattip:{ms:'',show:false},
        errorTxt:'',
        stepB:true,
        imagecode:'',
        file:null
      }
    },
    components: {
      Footer
    },
    mounted () {
      const u = navigator.userAgent
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      // 如果是IOS设备
      if (isiOS) {
        let flag = false
        let pageBackNormFunc
        // 聚焦后，键盘弹起
        document.body.addEventListener('focusin', () => {
          flag = true
          pageBackNormFunc && clearTimeout(pageBackNormFunc)
        })
        // 失焦后，键盘关闭
        document.body.addEventListener('focusout', () => {
          if (flag) {
            // 页面滚动回原来的位置
            pageBackNormFunc = setTimeout(() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }, 200)
          }
          flag = false
        })
      }
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
      toUC:function(){
        this.dataForm.vin_number = this.dataForm.vin_number.toUpperCase()
      },

      getActiveInfo:function(){
        var _this = this;
        var pram={}
        if(_this.$route.query.source_code){
          pram.source_code=_this.$route.query.source_code
        }

        $.ajax({
          url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_ACTIVITIES",
          type:'post',
          headers:{
            'Content-Type':'application/json;charset=utf8',
            'Authorization':'Bearer ' + _this.token
          },
          data:JSON.stringify(pram),
          success:function(data){
            if (data.result == 'S') {
              _this.info=data.info.lists[0];
              _this.info.attachment_url= _this.info.attachment_url+'&access_token='+ _this.token
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
      getCarInt:function(){
        var _this = this;
        if(_this.dataForm.vin_number == ''){
          _this.carModel = '';
          return false;
        }
        $.ajax({
          url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_MODEL_NAME",
          type:'post',
          headers:{
            'Content-Type':'application/json;charset=utf8',
            'Authorization':'Bearer ' + this.token
          },
          data:JSON.stringify({
            "vin_number":_this.dataForm.vin_number
          }),
          success:function(ms){
            if (ms.result=='S') {
              _this.carModel = ms.info.lists[0].model_name
              console.log(_this.carModel)
            }else{
              _this.floattip.ms=ms.message
              _this.floattip.show=true;
            }
          }
        })
      },
      getProvince:function(){
        let _this = this;
        if(_this.province.selObj)return false;
        if(!_this.province.set){
          _this.textTip('正在查询省份','show')
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


                $.each(ms.info.lists,function(index,item){
                  _this.province.data.push({
                    id:item.province_code,
                    value:item.province_name
                  })
                })
                _this.textTip('查询省份完成','false')
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
                      _this.city.set=false
                      _this.dealer.set=false
                      _this.dealer.now={}
                      _this.city.now={}
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
        }
      },
      getCity:function(){
        if(!this.province.now.id){
          this.floattip.ms="请先选择省份"
          this.floattip.show=true
          return false;
        }
        let _this = this;
        if(!_this.city.set){
          _this.textTip('正在查询城市','show')
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

                _this.city.data=[]
                $.each(ms.info.lists,function(index,item){
                  _this.city.data.push({
                    id:item.city_code,
                    value:item.city_name
                  })
                })
                _this.textTip('查询城市完成','false')
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
                        _this.dealer.set=false
                        _this.dealer.now={}
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
        }
      },
      getDealer:function(){
        if(!this.province.now.id){
          this.floattip.ms="请先选择省份"
          this.floattip.show=true
          return false;
        }else if(!this.city.now.id){
          this.floattip.ms="请先选择城市"
          this.floattip.show=true
          return false;
        }
        let _this = this;
        if (!_this.dealer.set) {
          _this.textTip('正在查询经销商','show')

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
            }),
            success:function(ms){
              if(ms.result == 'S'){

                _this.dealer.data=[]

                $.each(ms.info.lists,function(index,item){
                  _this.dealer.data.push({
                    id:item.dealer_code,
                    value:item.dealer_name
                  })
                })
                _this.textTip('查询经销商完成','false')
                if (ms.info.lists.length) {
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

                  _this.dealer.none=false;
                  _this.dealer.selObj.updateWheel(0,_this.dealer.data)
                  _this.dealer.selObj.locatePosition(0,0);
                  _this.dealer.selObj.show();
                }else{
                  _this.dealer.none=true;
                }


              }

            }
          })
        }
      },
      checkfn:function(){
        this.check = !this.check
        this.errorTxt='';
      },
      sub:function(){
        var _this=this;
        let subform=true;
        _this.errorTxt=''
        const reg=/^1[0-9]{10}$/;
        if(!this.check) return false
        if (_this.dataForm.name==''){
          subform=false;
          _this.errorTxt = '请输入本人姓名'
        }else if(_this.dataForm.phone==''){
          subform=false;
          _this.errorTxt = '请输入本人手机号'

        }else if(!reg.test(_this.dataForm.phone)){
          subform=false;
          _this.errorTxt = '请输入正确的本人手机号'
        }else if(_this.dataForm.referrer_name==''){
          subform=false;
          _this.errorTxt = '请输入推荐人姓名'
        }else if(_this.dataForm.referrer_phone==''){
          subform=false;
          _this.errorTxt = '请输入推荐人手机号'
        }else if(!reg.test(_this.dataForm.referrer_phone)){
          subform=false;
          _this.errorTxt = '请输入正确的推荐人手机号'
        }else if(_this.dataForm.vin_number==''){
          subform=false;
          _this.errorTxt = '请输入VIN编码'
        }else if(!/^[A-HJ-NPR-Z\d]{8}[X\d][A-HJ-NPR-Z\d]{3}\d{5}$/.test(_this.dataForm.vin_number)){
          subform=false;
          _this.errorTxt='请输入正确的VIN编码'
        }else if(!_this.province.now.id){
          subform=false;
          _this.errorTxt = '请选择省份'
        }else if(!_this.city.now.id){
          subform=false;
          _this.errorTxt = '请选择城市'
        }else if(!_this.dealer.now.id){
          subform=false;
          _this.errorTxt = '请选择经销商'
        }
        // else if(!_this.check){
        //     subform=false;
        //     this.floattip.ms='请勾选本人同意并授权'
        //     this.floattip.show=true
        // }
        if(!subform)return false;
        _this.errorTxt='';
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
            "dealer_code":  _this.dealer.now.id,
            'address':_this.dataForm.address,
            'referrer_address':_this.dataForm.referrer_address
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

              _this.stepB=false;
              _this.line_id = ms.info.line_id

              _this.$nextTick(() => {
                $(document).scrollTop(0)
              });

            }else{
              _this.floattip.ms=ms.message
              _this.floattip.show=true;
            }
          }
        })
      },
      fileUpload:function(event){
        var _this = this;
        _this.file = this.$refs.file.files[0]
        _this.imagecode = ''
        const reader = new FileReader()
        reader.readAsDataURL(_this.file)
        reader.onload = function () {
          _this.imagecode = reader.result
        }
      },
      filesave:function(){
        var _this=this;
        _this.textTip('正在上传','show')
        let imageData = new FormData();
        imageData.append('open_id',(new Date()).getTime())
        imageData.append('source_type',"WX_ACTIVITIES_LINE")
        imageData.append('pkvalue',this.line_id)
        imageData.append('user_id','1')
        imageData.append('filePath',this.file);
        axios.post(
          process.env.API_ROOT+"/app/r/api/app/fileUploadSvc?sysName=BX_WX&apiName=atm_upload",
          imageData,
          {headers: {
              'Content-Type':'application/json;charset=utf8',
              'Authorization':'Bearer ' + this.token
            }
          }).then(function (response) {
          _this.textTip('完成','false')
          if (response.data.result=='S') {
            _this.floattip.ms="您的信息提交完成"
            _this.floattip.show=true;
          }
        }).catch(function (error) {
          _this.textTip('出错','false')
          _this.floattip.ms=error
          _this.floattip.show=true;
        });

      },
      closefloat:function(){
        this.floattip.show=false;
        if (!this.stepB) {
          this.stepB=true;
          this.imagecode='';
          this.file=null;
          this.line_id='';
          this.province={selObj:null,data:[],now:{},set:false};
          this.city={selObj:null,data:[],now:{},set:false};
          this.dealer={selObj:null,data:[],now:{},set:false,none:false};
          this.dataForm={
            name:'',
            phone:'',
            referrer_phone:'',
            referrer_name:'',
            vin_number:''
          };
          this.carModel='';
          this.check=false;
          this.stepB=true;
          this.imagecode='';
          this.file=null;
        }
      }
    }
  }
</script>


<style scoped>
  .txt{text-align:center;color:#666;}
  h1{text-align:center;padding-top:.25rem;}
  .wrap{padding-top:2rem;overflow:auto;box-sizing:border-box;}
  .box{margin:.7rem;background:#fff;box-shadow:0 .3rem .45rem rgba(0,0,0,.08);border:1px solid #f3f3f3;border-radius:.25rem;padding:.5rem .5rem .7rem;position:relative;}
  .boxw{min-height:20rem;min-height:20rem;}
  .hide{display:none;}
  .box .t{position:relative;color:#143269;font-weight:500; margin-bottom:.25rem;margin-left:-.5rem;}
  .box .t span{font-size:.6rem;margin-left:.5rem; display:block;padding-bottom:.15rem;}
  .box .t:after{content:"";width:.12rem;height:.63rem;display:block;background:#143269;position:absolute;left:0;top:.16rem;}
  .des{color:#666;}
  .box1 .des{padding-bottom:.3rem;}
  .box .cum{border-bottom:1px solid #eee;height:1.8rem;line-height:1.8rem;position:relative;}
  .box .cum.hide{display:none;}
  .box .cum input{border:none;width:96%;padding:0 2%;}
  .box .cum.sel,.box .cum.def{padding:0 2%;}
  .box .cum.sel span,.box .cum.def span{color:#ccc;display:block;}
  .box .cum.sel:after{content:"";display:block;width:.5rem;height:.5rem;border-right:1px solid #ddd;border-bottom:1px solid #ddd;transform:rotate(45deg);position:absolute;right:.5rem;top:.45rem}
  .btn{margin:1rem;width:3rem;}
  .btn.invalid{background:#ccc;}
  .error{padding:.5rem;text-align:center;color:red;}
  .sel b{font-weight:500;}
  .floatbox{background:rgba(0,0,0,.3);position:fixed;left:0;top:0;height:100%;width:100%;z-index:-99;opacity:0;}
  .floatbox.show{z-index:99;opacity:1;}
  .floatbox .info{background:#fff;border-radius:.3rem;width:10rem;height:7rem;position:absolute;left:50%;margin-left:-5rem;top:50%;margin-top:-3rem;text-align:center;}
  .floatbox .info h3{padding:.7rem 0;}
  .gs{background:#1a1a1a;color:rgba(255,255,255,.7);text-align:center;padding:.8rem 0 0;margin-bottom:-2px;}
  .fil{border-radius:.5rem;background:#eaeaea no-repeat center;background-size:cover; height:7rem;position:relative;}
  .fil input{display:block;width:100%;height:7rem;z-index:99;opacity:0;margin-top:.5rem;}
  .fil label{width:2rem;height:2rem;border-radius:50%;display:block;position:absolute;top:40%;left:50%;margin:-1rem 0 0 -1rem;background:#fff;z-index:0;}
  .fil label:after{content:"";width:1rem;height:4px;background:#ccc;position:absolute;top:50%;left:50%;margin:-2px 0 0 -.5rem;}
  .fil label:before{content:"";height:1rem;width:4px;background:#ccc;position:absolute;top:50%;left:50%;margin:-.5rem 0 0 -2px;}
  .fil p{position:absolute;top:70%;text-align:center;width:100%;color:#999;z-index:0;}
  .ty{padding:.5rem;position:relative;padding-left:1rem;font-size:.5rem;color:#666;}
  .ty input{position:absolute;left:0;top:.58rem;}
  .carModel{position:absolute;right:0;display:inline-block;height:1.8rem;line-height:1.8rem;top:0;}
  @media screen and (min-width: 750px) {
    .box{max-width:750px;margin-left:auto;margin-right:auto;box-sizing:border-box;}

    .box .t{font-size:18px;}
    .box h3{font-size:16px;}

    h1{padding-top:.5rem;}
  }
  .footer  >>> .ft_nav{display:none;}
</style>

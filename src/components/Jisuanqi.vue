<template>
  <div class="wrap" :style="selcar.show?'overflow:hidden;height:'+wh+'px':''">

    <div class="swiper-container carimgs">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,i) in attachmentList"><img :src="item" :onerror="defaultImg"></div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination pag"></div>
    </div>

    <h1>产品计算器</h1>
    <div class="tc"><a href="javascript:;" class="selCarBtn" @click="selcarBind"><span>选择心仪座驾</span></a></div>
    <div class="box step1">
      <h2 class="t">1、您选择的座驾</h2>

      <h3>{{setcarinfo.product_name}}</h3>
      <template><p class="desc">{{carlist.system.val.value}} {{carlist.dispose.val.value}}</p></template>
      <p class="display_flex justify-content_flex-justify"><span>厂商指导价：</span><b>￥ {{carlist.dispose.val.price/10000 || 0}} 万</b></p>
    </div>
    <div class="box step2">
      <h2 class="t">2、您选择的金融方案</h2>
     
      <h3 class="line" v-if="checkboxs.length">期限*</h3>
      <div class="qxsels ">
        <label v-for=" (item,i) in checkboxs " >
          <input type="radio" :checked="item.sel" name="qx" v-model='radioVal' @change="getRadioVal" :value="item.val" />
          <i></i>{{item.val}}个月
        </label>
      </div>
      <h3 class="display_flex justify-content_flex-justify line">预付款* <span v-if="checkboxs.length">￥ {{downpay_amount}}元</span></h3>
      <p class="tip red"  v-if="checkboxs.length">·此车型的有效预付款为￥{{carlist.dispose.val.price*setcarinfo.min_downpay_percentage/100 || 0}} 至 ￥{{carlist.dispose.val.price*setcarinfo.max_downpay_percentage/100 || 0}}</p>
      <h3 class="line" v-if="!checkboxs.length"></h3>
      <div class="sliderbox line" v-if="checkboxs.length">
        <vue-slider  class="" v-model="value1" 
          :min="setcarinfo.min_downpay_percentage" 
          :max="setcarinfo.max_downpay_percentage" 
          
          :data="setcarinfo.marks"  
          :marks='true'
          :tooltip-formatter="formatter2" 
          :tooltip="'always'" 
          :process="true" 
          :height="6"
          @change="sliderfn"
        ></vue-slider>
      </div>
      <h3 class="display_flex justify-content_flex-justify">预付比例*<span>{{value1}}%</span></h3>
      <!-- <h3 class="display_flex justify-content_flex-justify line" v-if="setcarinfo.isrv=='BALLOON'">{{setcarinfo.isrv=='BALLOON'?'尾款金额':'期末保值率'}}*<span>￥ <input @blur="inputChange" v-model="balloon_amt.val" type="text" /> 元</span></h3> -->
      <h3 :class="setcarinfo.isrv=='BALLOON'?'display_flex justify-content_flex-justify line':'hide'">尾款金额*<span>￥ <input @blur="inputChange" v-model="balloon_amt.val" type="text" /> 元</span></h3>
      <h3 :class="setcarinfo.isrv=='BALLOON'?'hide':'display_flex justify-content_flex-justify line'">
      	期末保值率*<span id="ratio" style="flex:1;text-align:right;">{{setcarinfo.balance_ratio}}%</span>
      </h3>
      <p class="tip red">{{balloon_txt}}</p>
      <!-- <h3 class="display_flex justify-content_flex-justify line">是否接受附加品* <span>
        <label class="fjpcheckbox"><input type="checkbox" v-model="checkboxed" :disabled="!checkboxs.length" @change="checkbox_change" name=""><i></i></label></span></h3> -->
      
      <!-- <h3 class="display_flex justify-content_flex-justify line">附加品总金额* <span>￥ <template v-if='checkboxed'><input type="text" v-model="setcarinfo.accessory_amount"  @blur="inputChange1" /></template><template v-else>{{setcarinfo.accessory_amount=0}}</template> 元</span></h3> -->

    </div>

    <div class="box step3">
      <h2 class="t">3、还款信息</h2>
      <h3 class="display_flex justify-content_flex-justify line">月付款<span>
        <span v-if="!mousePayB">计算失败，请选择其他车型看看吧</span>
        <span v-else>￥{{mousePay}}元</span>
      </span></h3>
      
    </div>
    <div class="tc"><a href="javascript:;" class="btn" @click="goTab('/dealer')">联系经销商</a></div>
    <div class="sx">
      <p>产品（含具体配置、相关细节等）以经销商展示、销售的适用于中国大陆的具体车型及产品为准。</p>
      <p>本产品网页中提及的所有价格（包括整车、配件、产品等）均为厂商建议零售价格。</p>
      <p>厂商建议零售价格仅为建议，不具有任何约束力。</p>
      <p>具体的零售交易价格、产品配置及交易细节请与相关授权经销商协商确定。</p>
      <p>本网站车贷计算器仅作为您贷款购车时指定贷款方案的辅助工具，详情请咨询当地经销商。</p>
    </div>
    <div class="selcarbox" :style="selcar.show?'display:block':'display:none;'">
      <div class="info boxSizing">
          <i class="close" @click="selcar.show = false"></i>
          <div class="cum display_flex align-items_center "><span>品牌：</span><b class="flex_1" id="brand">{{carlist.brand.val.value}}</b></div>
          <div class="cum display_flex align-items_center"><span>车系：</span><b class="flex_1" id="system">{{carlist.system.val.value}}</b></div>
          <div class="cum display_flex align-items_center"><span>配置：</span><b class="flex_1" id="dispose">{{carlist.dispose.val.value}}</b></div>
          <div class="cum display_flex align-items_center"><span>产品：</span><b class="flex_1" id="product">{{carlist.products.val.value}}</b></div>

          <div class="tc"><a href="javascript:;" class="btn" @click="selcar.show = false">确认</a></div>
      </div>
    </div>
    <Footer  />
  </div>
</template>

<script>
import Swiper from 'swiper'
import Footer from '../components/Footer'
import MobileSelect from 'mobile-select'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
export default {
  name: 'Jisuanqi',
  data () {
    return {
      token:'',
      value1: 0,
      wh:0,
      checkboxed:false,
      formatter2: '{value}%',
      carinfo:{
        imgurl:'../assets/car.png',
        title:'',
        price:'20.59'
      },
      selcar:{
        show:false,
        title:'新一代'
      },
      checkboxs:[],
      radioVal:'12',
      mousePay:0,
      mousePayB:true,
      carlist:{
        brand:{val:{id:'',value:'请选择'},sem:false,data:[{id:'',value:'请选择'}]},
        system:{val:{id:'',value:'请选择'},sem:false,data:[' ']},
        dispose:{val:{id:'',value:'请选择'},sem:false,data:[' ']},
        products:{val:{id:'',value:'请选择'},sem:false,data:[' ']}
      },
      balloon_amt:{
        val:0,
        min:0,
        max:0
      },
      balloon_txt:'',
      change_amt:null,
      brandSel:null,
      systemSel:null,
      disposeSel:null,
      productSel:null,
      czsel:null,
      productlistarr:[],
      downpay_amount:0,
      setcarinfo:{
        accessory_accept_flag: "Y",
        accessory_amount: 0,
        accessory_include_flag: "Y",
        balloon_amt:0,
        balance_ratio:0,
        description: "",
        downpay_amount:0,
        downpay_percentage:0,
        isrv: "RV",
        rv:'0%',
        max_downpay_percentage:100,
        min_downpay_percentage:0,
        product_code: "",
        product_name: "未选择",
        term: 0,
        term_from: 0,
        term_to: 0,
        interval:1,
        marks:[],
        moicn_name:''
      },
      mytip:null,
      attachmentList:[],
      defaultImg:'this.src="'+require('../assets/error.jpg')+'"',
      
    }
  },
  components: {
      Footer,
      VueSlider
  },
  created(){
      this.wh = $(window).height();
      this.getAttachment();
  },
  
  mounted() {

    const that = this;

    var carimgs = new Swiper ('.carimgs', {
        loop: true,
        autoHeight:true,
        pagination: {
          el: '.swiper-pagination',
        }
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
    selcarBind:function(){
      this.selcar.show = true;
      this.getThoken();
    },
    getAttachment(){
        var _this = this;
        if(_this.token == ''|| !_this.token){
          this.getThoken();
        }
        $.ajax({
          url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_WX_ATM",
          type:'post',
          async:false,
          headers:{
            'Content-Type':'application/json;charset=utf8',
            'Authorization':'Bearer ' + _this.token
          },
          data:JSON.stringify({
            'open_id':(new Date()).getTime()
          }),
          success:function(ms){
            if (ms.result == 'S') {
              for (var i = 0;i<ms.info.lists.length; i++) {
                var _url = ms.info.lists[i].attachment_url+ '&access_token='+ _this.token
                _this.attachmentList.push(_url)
              }
            }else{
               _this.textTip(ms.message,'show')
            }
          }
        });
    },
    inputChange() { 
      var _this = this;
        clearTimeout(this.change_amt)
       this.change_amt=setTimeout(function(){
          var balloon = _this.balloon_amt.val.replace(/[^\d]/g, '')
          // if(balloon>_this.setcarinfo.balloon_amt){
          //   balloon = _this.setcarinfo.balloon_amt
          // }

          //_this.balloon_amt.val = balloon>0?balloon:0
          if (balloon<_this.balloon_amt.min) {
            balloon = _this.balloon_amt.min
            _this.balloon_txt='尾款金额不低于'+balloon
          }else if(balloon>_this.balloon_amt.max){
            balloon=_this.balloon_amt.max            
            _this.balloon_txt='尾款金额不高于'+balloon
          }else{
            _this.balloon_txt=''
          }
          _this.balloon_amt.val = balloon
          if (_this.setcarinfo.balloon_amt != _this.balloon_amt.val) {
            _this.setcarinfo.balloon_amt = _this.balloon_amt.val
            _this.countBalance(_this.balloon_amt);
          }
        },20) 
    },
    inputChange1() { 
        clearTimeout(this.change_amt)
        var _this = this;
        this.change_amt=setTimeout(function(){
          var balloon = _this.setcarinfo.accessory_amount.replace(/[^\d]/g,'')
          if (balloon>0 && !isNaN(balloon)) {
             _this.setcarinfo.accessory_amount = balloon
            _this.countBalance();
          }else{
            _this.setcarinfo.accessory_amount = 0
          }
        },20) 
    },
    goTab:function(url){
      this.$router.push({path:url})
    },
    getThoken:function () {
      var _this = this;
      $.ajax({
        url:process.env.API_ROOT+"/app/oauth/token?client_secret=secret&grant_type=password&client_id=client2&password=app_wx123&username=APP_WX",
        type:'post',
        async:false,
        success:function(result){
          _this.token = result.access_token
          _this.textTip('正在查询品牌...','show')
          _this.getbrandlist(result.access_token)

        }
      });
      
    },
    getbrandlist:function(token){
      let _this = this
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
              _this.textTip('正在查询品牌...','false')
                let arrs =[] 
                ms.info.lists.forEach(function(item){
                  arrs.push({
                    id:item.brand_code,
                    value:item.brand_name
                  })
                })
                _this.carlist.brand.data = arrs
                if(!_this.carlist.brand.sem){
                  _this.carlist.brand.sem=true;
                  _this.brandSel = new MobileSelect({
                      trigger: "#brand",
                      title: "品牌",
                      position:[0,1],
                      triggerDisplayData:false,
                      wheels: [
                          {data: _this.carlist.brand.data}
                      ],
                      callback:function(indexArr, data){

                          if(_this.carlist.brand.val.value !=data[0].value ){
                            _this.carlist.system.val = {id:'',value:'请选择'};
                            _this.carlist.dispose.val = {id:'',value:'请选择'};
                            _this.carlist.products.val = {id:'',value:'请选择'};
                            _this.setcarinfo.product_name = '未选择'
                            _this.setcarinfo.balance_ratio=0;
                            _this.carlist.brand.val = {id:data[0].id,value:data[0].value}

                            _this.textTip('正在查询车系...','show')
                            _this.getSystemlist(token,data[0].id)

                          }
                      }
                  });
                }else{
                  _this.brandSel.updateWheel(0,_this.carlist.brand.data)
                  _this.brandSel.locatePosition(0,0);
                }

            }else{
              _this.textTip(ms.message)
            }
          }
        });
    },
    getSystemlist:function(token,code){
      let _this = this
      $.ajax({
          url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_MODEL_BY_BRAND",          
          type:'post',
          headers:{
            'Content-Type':'application/json;charset=utf8',
            'Authorization':'Bearer ' + token
          },
          data:JSON.stringify({
            'open_id':(new Date()).getTime(),
            'brand_code': code
          }),
          success:function(ms){
            if(ms.result == 'S'){
              _this.textTip('正在查询车系。。。','false')
              let arrs =[] 
               ms.info.lists.forEach(function(item){
                arrs.push({
                  id:item.model_code,
                  value:item.model_name
                })
               }) 

                _this.carlist.system.data = arrs
                if(!_this.carlist.system.sem){
                    _this.carlist.system.sem=true;
                    _this.systemSel = new MobileSelect({
                      trigger: "#system",
                      title: "车系",
                      position:[0,1],
                      triggerDisplayData:false,
                      wheels: [
                          {data: _this.carlist.system.data}
                      ],
                      callback:function(indexArr, data){
                          
                          if(_this.carlist.system.val.value !=data[0].value ){
                            _this.carlist.dispose.val = {id:'',value:'请选择'};
                            _this.carlist.products.val = {id:'',value:'请选择'};
                            _this.setcarinfo.product_name = '未选择'
                            _this.carlist.system.val = data[0]
                            _this.setcarinfo.balance_ratio=0;
                            _this.textTip('正在查询配置...','show')
                            _this.getDisposelist(token,data[0].id)
                          }
                      }
                  });
                }else{

                  _this.systemSel.updateWheel(0,_this.carlist.system.data)
                  _this.systemSel.locatePosition(0,0);
                  _this.systemSel.show()

                }
               
            }else{
              _this.textTip(ms.message)
            }
          }
        });
    },
    getDisposelist:function(token,code){
      let _this = this
      $.ajax({
          url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_MOICN_BY_MODEL",          
          type:'post',
          headers:{
            'Content-Type':'application/json;charset=utf8',
            'Authorization':'Bearer ' + token
          },
          data:JSON.stringify({
            'open_id':(new Date()).getTime(),
            'model_code': code
          }),
          success:function(ms){
            if(ms.result == 'S'){
              _this.textTip('正在查询配置...','false')
              let arrs =[] 
               ms.info.lists.forEach(function(item){
                arrs.push({
                  id:item.moicn_code,
                  value:item.moicn_name,
                  price:item.asset_price
                })
               }) 
                _this.carlist.dispose.data = arrs
                console.log('sem:'+ '' +_this.carlist.dispose.sem)
                if(!_this.carlist.dispose.sem){
                  _this.carlist.dispose.sem=true
                  _this.disposeSel = new MobileSelect({
                      trigger: "#dispose",
                      title: "配置",
                      triggerDisplayData:false,
                      wheels: [
                          {data: _this.carlist.dispose.data}
                      ],
                      callback:function(indexArr, data){

                        _this.carlist.products.val = {id:'',value:'请选择'};
                        _this.carlist.dispose.val = data[0];
                        _this.setcarinfo.product_name = '请稍后'
                        _this.setcarinfo.balance_ratio=0;
                        _this.textTip('正在查询产品请稍后','show')
                        _this.getProducts();
                      }
                  });
                }else{

                  _this.disposeSel.updateWheel(0,_this.carlist.dispose.data)
                  console.log(_this.disposeSel)
                  _this.disposeSel.locatePosition(0,0);
                  _this.disposeSel.show()

                } 
 
               
            }else{
              _this.textTip(ms.message)
            }
          }
        });
    },
    subbind:function(){
        var _this = this;

    },
    getProducts:function(){
      var _this = this;
      if(_this.carlist.brand.val.id!=''&&_this.carlist.dispose.val.id&&_this.carlist.system.val.id){

            $.ajax({
                url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX_POST&apiName=GET_PRODUCT",          
                type:'post',
                headers:{
                  'Content-Type':'application/json;charset=utf8',
                  'Authorization':'Bearer ' + _this.token
                },
                data:JSON.stringify({
                  'open_id':(new Date()).getTime(),
                  'brand_code':_this.carlist.brand.val.id,
                  'moicn_code':_this.carlist.dispose.val.id,
                  'model_code':_this.carlist.system.val.id
                }),
                success:function(ms){
                  if(ms.result == 'S'){
                    
                     _this.textTip('正在查询产品请稍后','false')

                   let arrs =[] 
                   _this.productlistarr = [];
                   $.each(ms.info.lists,function(index,item){
                    _this.productlistarr.push(item)
                    arrs.push({
                      id:item.product_code,
                      value:item.product_name,
                      ind:arrs.length
                    })
                   }) 
                    _this.carlist.products.data = arrs
                    if(!_this.carlist.products.sem){
                        _this.carlist.products.sem=true;
                        _this.productSel = new MobileSelect({
                          trigger: "#product",
                          title: "产品",
                          triggerDisplayData:false,
                          wheels: [
                              {data: _this.carlist.products.data}
                          ],
                          callback:function(indexArr, data){
                              if(_this.carlist.products.val.value !=data[0].value ){
                                _this.setcarinfo.marks = [];
                                _this.carlist.products.val = data[0]
                                $.each(_this.productlistarr[data[0].ind],function(key,val){
                                  _this.setcarinfo[key]  = val
                                })
                                console.log(_this.productlistarr[data[0].ind])
                                if(_this.productlistarr[data[0].ind].isrv != 'BALLOON'){
                                	_this.getRV(_this.productlistarr[data[0].ind]['product_code'])
                                }
                                _this.setcarinfo.balance_ratio=0;
                                
                                _this.value1 = _this.productlistarr[data[0].ind]['downpay_percentage']
                                _this.balloon_amt.min = _this.carlist.dispose.val.price*_this.productlistarr[data[0].ind].min_downpay_percentage/100
                                _this.balloon_amt.max = _this.carlist.dispose.val.price*_this.productlistarr[data[0].ind].max_downpay_percentage/100
                                _this.balloon_amt.val = _this.productlistarr[data[0].ind]['balloon_amt']

                                if (_this.balloon_amt.val>_this.balloon_amt.min) {
                                  _this.balloon_amt.min = _this.balloon_amt.val
                                }else{
                                  _this.balloon_amt.val = _this.balloon_amt.min
                                }
                                _this.setcarinfo.balloon_amt =  _this.balloon_amt.val
                                _this.radioVal = _this.productlistarr[data[0].ind].term
                                var term = _this.productlistarr[data[0].ind].term_to/12;
                                _this.checkboxs=[]
                                for(let i=_this.productlistarr[data[0].ind].term_from/12;i<=term;i++){
                                  _this.checkboxs.push( {val:12*i,sel:12*i==_this.productlistarr[data[0].ind].term?'true':'false'} )
                                }
                                var now = _this.productlistarr[data[0].ind].downpay_percentage
                                var max = _this.productlistarr[data[0].ind].max_downpay_percentage
                                var min = _this.productlistarr[data[0].ind].min_downpay_percentage
                                _this.setcarinfo.marks[0] = min
                                var sx=Math.round(now/10)*10
                                _this.value1 = sx;

                                //if(max>min){
                                    var nowmin = min+10
                                    for (var i = nowmin; i < max ; i++) {
                                      if (i%10 == 0) {
                                        _this.setcarinfo.marks.push(i)
                                      }
                                    }
                                    //}
                                console.log(_this.setcarinfo.marks)
                                _this.setcarinfo.marks.push(max)
                                _this.countBalance();
                              }
                          }
                          });
                      }else{

                        _this.productSel.updateWheel(0,_this.carlist.products.data)
                        _this.productSel.locatePosition(0,0);
                        _this.productSel.show()
                      }
                    
                  }else{
                    _this.textTip(ms.message)
                     _this.setcarinfo.product_name = '未找到产品，请重新选择'
                  }
                  
                }
              })
          }
    },
    getRV:function(proCode){
    	var _this = this;
		$.ajax({
	        url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX&apiName=GET_RVRATIO",          
	        type:'post',
	        headers:{
	          'Content-Type':'application/json;charset=utf8',
	          'Authorization':'Bearer ' + _this.token
	        },
	        data:JSON.stringify({
	          'open_id':(new Date()).getTime(),
	          'product_code':proCode
	        }),
	        success:function(ms){
	        	var ds=[]
	        	$.each(ms.info.lists,function(index,item){
	        		ds.push({
	        			id:index,
	        			value:item.ratiovalue
	        		})
	        	});
	        	if(_this.czsel == null){
					_this.czsel = new MobileSelect({
	                          trigger: "#ratio",
	                          title: "期末保值率",
	                          triggerDisplayData:false,
	                          wheels: [
	                              {data: ds}
	                          ],
	                          callback:function(indexArr, data){
	                          	_this.setcarinfo.balance_ratio = data[0].value

      							_this.countBalance();

	                          }
	                      })
				}else{
					_this.czsel.updateWheel(0,ds)
                    _this.czsel.locatePosition(0,0);
				}
	        }
	    })
    },
    getRadioVal:function(){
       this.countBalance();
    },
    checkbox_change:function(){
      if(this.setcarinfo.accessory_amount>0){
        this.countBalance();
      }
    },
    countBalance:function(){
      var _this = this;
      _this.mousePay = '计算中'
      _this.mousePayB=true;
      var _datas = {
            'open_id':(new Date()).getTime(),
            'downpay_amount':Math.floor(_this.value1/100*_this.carlist.dispose.val.price).toFixed(2),
            'downpay_percentage':_this.value1,
            'moicn_code':_this.carlist.dispose.val.id,
            'product_code':_this.setcarinfo.product_code,
            'accessory_amount':0,//_this.checkboxed?_this.setcarinfo.accessory_amount:0,
            'accessory_accept_flag':_this.checkboxed?'Y':'N',
            'term':_this.radioVal,
            'balloon_amt':_this.balloon_amt.val,
            'balance_ratio':_this.setcarinfo.balance_ratio
          }
       console.log(_datas)
      _this.textTip('计算中','show')
       $.ajax({
          url:process.env.API_ROOT+"/app/r/api?sysName=BX_WX_POST&apiName=PRODUCT_CALC",          
          type:'post',
          headers:{
            'Content-Type':'application/json;charset=utf8',
            'Authorization':'Bearer ' + _this.token
          },
          data:JSON.stringify(_datas),
          success:function(ms){
            if(ms.result == 'S'){
              
              _this.textTip('计算中','false')
              _this.mousePay = ms.info.due_amount
              _this.downpay_amount = ms.info.downpay_amount
            }else{
              console.log(ms.message)
               _this.mousePayB=false;
              _this.textTip('计算中','false')
              _this.textTip(ms.message)
            }
          }
        })
    },
    sliderfn:function(ind){
      this.countBalance();
    }
  }
}
</script>


<style scoped>
h1{text-align:center;padding-top:.25rem;}
.selCarBtn{display:inline-block;background:#143269;padding:.35rem 1rem;border-radius:1rem;margin:.5rem auto 0;}
.selCarBtn span{padding-left:1.07rem;background:url('../assets/icon4.png') no-repeat left center;background-size:.75rem;color:#fff;font-size:.6rem;}
.box{margin:.7rem;background:#fff;box-shadow:0 0 .25rem rgba(0,0,0,.3);border-radius:.25rem;padding:.5rem .5rem .7rem;}
.box .t{color:#143269;font-weight:500;font-size:.65rem;}
.box h3{font-size:.6rem;}
.carimgs{margin:0 auto;max-width:750px;padding-bottom:1rem;}
.carimgs >>> .swiper-slide{padding:0 .7rem;box-sizing:border-box;}
.carimgs img{display:block;width:100%;margin:.5rem auto;min-height:6rem;}
.carimgs >>> .swiper-pagination-bullet-active{background:#143269;}
.carimgs .pag{bottom:0;}
.step1 h3{font-size:.65rem;padding:.5rem 0;}
.step1 p{ color:#143269;}
.step1 p span{padding-top:.15rem;}
.step1 p b{color:#143269;font-weight:500;}
.step1 p.desc{color:#999;padding-bottom:.5rem;}
.selcarbox{background:rgba(0,0,0,.3);position:fixed;left:0;top:0;height:100%;width:100%;z-index:99;}
 .selcarbox h1{font-size:.8rem;text-align:center;font-weight:600;}
.selcarbox .info{margin:-6.4rem 0 0;height:13.5rem;background:#fff;border-radius:.25rem;box-shadow:0 0 .25rem rgba(0,0,0,.3);padding:1.5rem .55rem .55rem;position:absolute;top:50%;left:5%;width:90%; overflow:auto;}
.selcarbox .carimg img{width:70%;display:block;margin:1rem auto .5rem;}
.selcarbox i.close{position:absolute;top:1rem;right:1.5rem;}
.selcarbox i.close:after{content:"";display:block;width:1rem;height:.11rem;background:#999;transform:rotate(45deg);position:absolute;left:0;top:0;}
.selcarbox i.close:before{content:"";display:block; width:1rem;height:.11rem;background:#999;transform:rotate(-45deg);position:absolute;left:0;top:0;}
.selcarbox .cum{border-bottom:1px solid #e9e9e9;font-size:.6rem;margin:0 1rem;}
.selcarbox .cum span{color:#143269;}
.selcarbox .cum b{position:relative;padding:.35rem 1rem .35rem 0;font-weight:400;}
.selcarbox .cum b:after{position:absolute;right:.25rem;content:"";display:block;width:.5rem;height:.5rem;transform:rotate(45deg);border-bottom:1px solid #ddd;border-right:1px solid #ddd;top:50%;margin-top:-.35rem;}
.selcarbox .cum.cn b:after{display:none;}
.selcarbox .btn a{display:block;width:6rem;background:#143269;color:#fff;font-size:.75rem;text-align:center;height:1.5rem;line-height:1.5rem;border-radius:1rem;margin:1rem auto;}

.step2 .line{border-top:1px solid #e9e9e9;margin-top:.35rem;padding-top:.35rem;}
.step2 .bili span{display:block;width:100%;font-size:.65rem;position:relative;}
.step2 .bili span:after{content:'';width:.5rem;height:.5rem;border-bottom:1px solid #ddd;border-right:1px solid #ddd;transform:rotate(45deg);display:block;position:absolute;right:.5rem;top:50%;margin-top:-.5rem;}
.box h3 span{color:#143269;}
.step2 .tip{color:#ff2424;font-size:.5rem;padding-top:.2rem;}
.step2 .sliderbox{padding:2rem 1rem 1.5rem !important;}
.step2 input[type='text']{display:inline-block;border:none;width:2rem;text-align:center;border:1px solid #eee;}

label{display:inline-block;margin:.5rem 0 0 .5rem;padding-left:.75rem;position:relative;}
.qxsels{margin-left:-.5rem;}
label input{position:absolute;left:0;top:.14rem;display:none;}
label i{width:.5rem;height:.5rem;display:block;border-radius:.12rem;position:absolute;left:0;top:50%;margin-top:-.25rem;background:#fff;border:1px solid #d9d9d9;}
label input:checked+i{background:#143269;border-color:#143269;overflow:hidden;}
label input:checked+i:after{content:"";display:block;width:.25rem;height:.15rem;border-bottom:1px solid #fff;border-left:1px solid #fff;transform:rotate(-45deg);margin:.1rem;}
.step2 .fjpcheckbox{display:block;margin-top:.45rem;}
.step3 h3{padding-top:.5rem;}
.btn{margin:.7rem 0 1rem;}
#Footer >>> .ft_nav{display:none;}
.sx{padding:1rem 1.5rem;color:#666;font-size:.5rem;box-sizing:border-box;margin:0 auto;background:#1a1a1a;border-bottom:1px solid rgba(255,255,255,.2);}
.sx p{padding:.2rem 0;color:rgba(255,255,255,.7);max-width:750px;margin:0 auto;font-weight:400;}

.sliderbox >>> .vue-slider-process{background:#143269}
.sliderbox >>> .vue-slider-dot-tooltip-inner{border-color:#143269;background:#143269;}
.sliderbox >>> .vue-slider-mark-step{background:rgba(255, 255, 255, 0.36)}
.hide{display:none;}
@media screen and (min-width: 750px) {
    .box{max-width:750px;margin-left:auto;margin-right:auto;box-sizing:border-box;}
    .selcarbox .info {
      width:750px;
       left:50%;
       margin-left:-375px;
    }
    .carimgs{padding-bottom:20px;}
    .carimgs >>> .swiper-slide{padding:0;}
    .carimgs img{width:750px;margin-bottom:20px;}
    .selCarBtn {padding:5px 40px 8px;}
    .selCarBtn span{background-size:.55rem;font-size:18px;padding-left:1rem;}
    .box .t{font-size:18px;}
    .box h3{font-size:16px;}
    .step1 p{font-size:.4rem;}
    .step1 h3{font-size:.5rem;}
    .step1 p.desc{font-size:.4rem;}
    .step1 p b{}
    .step2,.step3{font-size:16px;}
    .selcarbox .cum{font-size:18px;}
    .selcarbox .info{height:10.5rem;}
    .selcarbox i.close{cursor:pointer;}
    .selcarbox i.close:before,.selcarbox i.close:after{width:.75rem;height:3px;}
    .sx p{font-size:14px;}
    h1{padding-top:.5rem;}
  }
.selcarbox .btn{margin-bottom:0;}
.ft_nav{display:none;}
</style>

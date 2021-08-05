<template>

  <h-view>
    <h-content v-if="status== 1">
      <title>加载中</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
      <link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">
      <div class="weui_msg">
        <div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div>
        <div class="weui_text_area"><h4 class="weui_msg_title">请在微信客户端打开链接</h4></div>
      </div>
    </h-content>

    <h-content v-if="status == 2">
      <!--<vue-qr style="width: 20%;" :bgSrc='config.imagePath' :text="config.value" :size="200"-->
      <!--:margin="0"></vue-qr>-->
      <h1 class="loading"><span>加载中...</span></h1>
      <!--<div class="weui_msg">-->
      <!--<div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div>-->
      <!--<div class="weui_text_area"><h4 class="weui_msg_title">请在微信客户端打开链接</h4></div>-->
      <!--</div>-->
    </h-content>
  </h-view>
</template>

<script>
  import VueQr from "vue-qr";

  export default {
    name: 'home',
    data() {
      return {
        token: "",
        navShow: false,
        status: '',
        config: {
          value: process.env.REDIRECT_URL,//显示的值、跳转的地址
          imagePath: require('../assets/logo.png')//中间logo的地址，require必要
        }
      }
    },
    mounted() {
    },
    created() {
      this.getWeixin();
    },
    components: {
      VueQr
    },
    methods: {
      getWeixin() {
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        var isAndroid = ua.indexOf('android') != -1;
        var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
        if (!isWeixin) {
          this.status = 1;
        } else {
          // this.status = 2;
          this.getThoken();
          this.getActiveInfo();
        }
      },
      getThoken: function () {
        var _this = this;
        $.ajax({
          url: process.env.API_ROOT + "/app/oauth/token?client_secret=secret&grant_type=password&client_id=client2&password=app_wx123&username=APP_WX",
          type: 'post',
          async: false,
          success: function (result) {
            _this.token = result.access_token
          }
        });

      },
      getActiveInfo: function () {
        var _this = this;
        var pram = {}
        pram.source_code = "QR-F";

        if (_this.$route.query.dealer_code) {
          pram.dealer_code = _this.$route.query.dealer_code
        }

        $.ajax({
          url: process.env.API_ROOT + "/app/r/api?sysName=BX_WX&apiName=GET_ACTIVITIES",
          type: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf8',
            'Authorization': 'Bearer ' + _this.token
          },
          data: JSON.stringify(pram),
          success: function (data) {
            if (data.result == 'S') {
              _this.status = 2;
              // window.open(process.env.REDIRECT_URL, '_self');
              window.location.href = process.env.REDIRECT_URL;
            } else {
              alert("获取活动失败，请联系管理员！");
            }
          }
        });
      },
    }
  }
</script>

<style scoped>
  .loading {
    display: block;
    text-align: center;
    padding: .2rem 0 1rem;
    font-size: .5rem;
    color: #ccc;
  }

  .loading i {
    display: block;
    width: 4px;
    height: 4px;
    background-color: #fff;
    border-radius: 50%;
    animation: loader4Animation 1s linear infinite;
    margin-left: calc(50% - 15px);
    margin-top: 5px;
  }
</style>

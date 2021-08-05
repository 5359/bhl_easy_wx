'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"http://test-app.bhlease.com.cn:8090"',
  REDIRECT_URL:'"https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzkxMzE5MTI3Nw==#wechat_redirect"'//正式环境

})

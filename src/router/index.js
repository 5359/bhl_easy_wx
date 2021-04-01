import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve=>(require(["@/components/Home"],resolve)),
      meta:{
        sel:0
      }
    },{
    	path:'/jsq',
    	name:'计算器',
    	component:resolve=>(require(["@/components/Jisuanqi"],resolve)),
      meta:{
        sel:1
      }
    },{
    	path:'/newplay',
    	name:'限购车新方案',
    	component:resolve=>(require(["@/components/NewPlay"],resolve)),
      meta:{
        sel:2
      }
    },{
    	path:'/about',
    	name:'关于北现租赁',
    	component:resolve=>(require(["@/components/About"],resolve)),
      meta:{
        sel:4
      }
    },{
    	path:'/contact',
    	name:'联系我们',
    	component:resolve=>(require(["@/components/Contact"],resolve)),
      meta:{
        sel:5
      }
    },{
    	path:'/dealer',
    	name:'经销商',
    	component:resolve=>(require(["@/components/Dealer"],resolve)),
      meta:{
        sel:3
      }
    },{
      path:'/emp',
      name:'空白页',
      component:resolve=>(require(["@/components/emp"],resolve)),
      meta:{
        sel:7
      }
    },{
      path:'/statement',
      name:'版权声明',
      component:resolve=>(require(["@/components/statement"],resolve)),
      meta:{
        sel:8
      }
    },{
      path:'/privacy',
      name:'隐私政策',
      component:resolve=>(require(["@/components/Privacy"],resolve)),
      meta:{
        sel:8
      }
    },{
      path:'/classHome',
      name:'微课堂',
      component:resolve=>(require(["@/components/ClassHome"],resolve)),
      meta:{
        sel:9
      }
    }
  ]
})

import App from './App'
Vue.config.productionTip = false
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

Vue.component('VueSlider', VueSlider)
import './comme/font.css'
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min'

var router = new VueRouter({
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
      path:'/active',
      name:'营销活动',
      component:resolve=>(require(["@/components/Active"],resolve)),
      meta:{
        sel:9
      }
    }
  ]
})

router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

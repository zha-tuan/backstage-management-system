import Vue from 'vue'
import App from './App'
import router from './router/index'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/reset.css'
import './assets/font/iconfont.css'
import Vuex from 'vuex'
import store from './store/store'

Vue.use(Vuex)
Vue.use(Element)
Vue.config.productionTip = false

//跳转路由之前查看是否登录，token是否过期
router.beforeEach((to, from, next) => {
	let user = sessionStorage.getItem('login');
	let token = sessionStorage.getItem('token');
	if(user) {
		if(to.path == '/login') {
			next()
		} else {
			if(token) {
				next()
			} else {
				Vue.prototype.$message('您的登录已过期，请重新登录');
				sessionStorage.removeItem('token')
				next('/login')
			}
		}
	} else {
		if(to.path == '/login') {
			next()
		} else {
			Vue.prototype.$message.warning('请登录!');
			next('/login')
		}
	}
})
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
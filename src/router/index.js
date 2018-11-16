import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			redirect: '/login',
		},
		{
			path: '/login',
			name: 'Login',
			component: (resolve) => require(['../components/login'], resolve),
			meta: {
				isVisit: true
			}
		},
		{
			path: '/home',
			name: 'Home',
			redirect: '/index',
			component: (resolve) => require(['../components/home'], resolve),
			children: [{
				path: '/index',
				name: 'Index',
				component: (resolve) => require(['../components/index/index'], resolve),
				meta: {
					isVisit: true
				}
			}, {
				path: '/UserManage',
				name: 'UserManage',
				component: (resolve) => require(['../components/UserManage/UserManage'], resolve),
				meta: {
					isVisit: true
				}
			}, {
				path: '/UserManage_article',
				name: 'UserManage_article',
				component: (resolve) => require(['../components/UserManage/UserManage_article'], resolve),
				meta: {
					isVisit: true
				}
			}, {
				path: '/menuManage',
				name: 'menuManage',
				component: (resolve) => require(['../components/MenuManage/menuManage'], resolve),
				meta: {
					isVisit: true
				}
			}, {
				path: '/actionManage_banner',
				name: 'actionManage_banner',
				component: (resolve) => require(['../components/actionManage/actionManage_banner'], resolve),
				meta: {
					isVisit: true
				}
			}, {
				path: '/actionManage_PushMessage',
				name: 'actionManage_PushMessage',
				component: (resolve) => require(['../components/actionManage/actionManage_PushMessage'], resolve),
				meta: {
					isVisit: true
				}
			}, {
				path: '/PushMessage_appoint',
				name: 'PushMessage_appoint',
				component: (resolve) => require(['../components/actionManage/PushMessage_appoint'], resolve),
				meta: {
					isVisit: true
				}
			}, {
				path: '/PushMessage_list',
				name: 'PushMessage_list',
				component: (resolve) => require(['../components/actionManage/PushMessage_list'], resolve),
				meta: {
					isVisit: true
				}
			}]
		}
	]
})
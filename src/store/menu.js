const menuData = [{
	content: "首页",
	icon: "icon-shouye",
	isParent: false,
	path: "/index",
	isShow: true,
	id: 1
}, {
	content: "用户管理",
	icon: "icon-yonghuguanli",
	isParent: false,
	path: "/UserManage",
	isShow: true,
	id: 2
}, {
	content: "菜单管理",
	icon: "icon-erji-caidanguanli",
	isParent: false,
	path: "/menuManage",
	isShow: true,
	id: 3
}, {
	content: "功能管理",
	icon: "icon-gongnengguanli",
	isParent: true,
	isShow: true,
	id: 4,
	children: [{
		content: "首页轮播",
		icon: "icon-duozhangxiaotulunbo",
		path: "/actionManage_banner",
		isShow: true,
		id: 6
	}, {
		content: "消息推送",
		icon: "icon-duozhangxiaotulunbo",
		path: "/actionManage_PushMessage",
		isShow: true,
		id: 6
	}, {
		content: "功能按钮",
		icon: "icon-xuanzeanniu",
		path: "",
		isShow: true,
		id: 5
	}]
}, {
	content: "设置",
	icon: "icon-set",
	isParent: true,
	isShow: true,
	id: 7,
	children: [{
		content: "修改密码",
		icon: "icon-iconfontmima",
		path: "",
		isShow: true,
		id: 8
	},{
		content: "我的资料",
		icon: "icon-iconfontmima",
		path: "",
		isShow: true,
		id: 9
	}]
}]
export default menuData
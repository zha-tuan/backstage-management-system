<template>
	<div class="home">
		<!--头部-->
		<div class="header">
			<div class="logo">后台管理系统</div>
			<div class="userInfo clear">
				<!--用户名称-->
				<div>
					<el-dropdown @command="handleCommand">
						<span class="el-dropdown-link">
							<img src="../../static/img/logo.jpg" /> 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="changePW">修改密码</el-dropdown-item>
							<el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<!--未读消息-->
				<div class="noRead_message clear" @click="toMessagePage">
					<el-badge :value="noRead_message" class="item">
						<el-button style="padding: 0;border: none;background: none;" size="small"><i class="iconfont icon-tongzhi"></i></el-button>
					</el-badge>
				</div>
			</div>
		</div>
		<div class="main">
			<!--左侧菜单-->
			<div class="menu_left" :class="{shrinkMenu: isCollapse}">
				<el-menu router :default-openeds="defaultOpen" :default-active="$route.path" :collapse="isCollapse" class="el-menu-vertical-demo" text-color="#808080" active-text-color="#02b9e3">
					<template v-for="(item, index) in menuData">
						<!--一级菜单-->
						<el-menu-item v-cloak v-if="!item.isParent && item.isShow" :index="item.path" :key="item.path">
							<i class="iconfont" :class="item.icon"></i>
							<span slot="title">{{item.content}}</span>
						</el-menu-item>
						<!--二级菜单-->
						<el-submenu v-cloak :index="item.content" v-if="item.isParent && item.isShow">
							<template slot="title">
								<i class="iconfont" :class="item.icon"></i>
								<span>{{item.content}}</span>
							</template>
							<el-menu-item @click="inDevelopment(iterm.path)" v-if="iterm.isShow" v-for="(iterm, index) in item.children" :index="iterm.path" :key="iterm.path">{{iterm.content}}</el-menu-item>
						</el-submenu>
					</template>
				</el-menu>
				<div class="shrinkButton" @click="menuShrink()">
					<img :src="shrinkImg" />
				</div>
			</div>
			<!--右侧内容页面-->
			<div class="conten_right clear" :class="{shrinContent: isCollapse}">
				<transition name="fade">
					<router-view></router-view>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				noRead_message: 9,
				//菜单data
				menuData: '',
				//菜单收缩
				isCollapse: false,
				defaultOpen: [],
				//菜单收缩按钮
				shrinkImg: 'static/img/shrink_01.png',
			}
		},
		methods: {
			//点击下拉菜单项
			handleCommand(command) {
				console.log(command)
				if(command == 'changePW') {
					this.$router.push({
						path: ''
					})
				} else {
					sessionStorage.clear();
					this.$router.push({
						path: '/login'
					})
				}
			},
			//去消息页面
			toMessagePage() {
				this.$router.path({
					path: ''
				})
			},
			//菜单收缩
			menuShrink() {
				this.isCollapse = !this.isCollapse
				if(this.isCollapse == true) {
					this.shrinkImg = 'static/img/shrink_02.png'
				} else {
					this.shrinkImg = 'static/img/shrink_01.png'
				}
			},
			inDevelopment(path) {
				if(path == '') {
					this.$message('功能开发中......')
				}
			},
		},
		mounted() {
			this.menuData = this.$store.state.menuData
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		height: 100%;
		overflow: hidden;
		.header {
			position: fixed;
			top: 0;
			width: 100%;
			height: 60px;
			padding: 0 20px;
			min-width: 1200px;
			background: #02b9e3;
			.logo {
				float: left;
				font-size: 18px;
				line-height: 60px;
				color: white;
			}
			.userInfo {
				float: right;
				&>div {
					float: left;
				}
				.el-dropdown-link {
					color: white;
					display: inline-block;
					height: 60px;
					line-height: 60px;
					padding-left: 25px;
					position: relative;
					img {
						position: absolute;
						left: 0;
						top: 20px;
						width: 20px;
						height: 20px;
						border-radius: 50%;
					}
				}
				.noRead_message {
					margin-top: 14px;
					margin-left: 20px;
					.icon-tongzhi {
						font-size: 24px;
						color: white;
					}
				}
			}
		}
		.main {
			height: 100%;
			padding-top: 60px;
			overflow: hidden;
			.menu_left {
				height: 100%;
				width: 200px;
				float: left;
				/*overflow: auto;*/
				position: relative;
				.shrinkButton {
					position: absolute;
					top: 40%;
					right: -20px;
					width: 20px;
					height: 72px;
					cursor: pointer;
					img {
						width: 100%;
					}
				}
			}
			.conten_right {
				float: left;
				height: 100%;
				overflow: auto;
				padding: 20px;
				background: white;
				width: calc(100% - 200px);
			}
		}
	}
	.shrinkMenu {
		width: 64px !important;
		span {
			display: none;
		}
	}
	.shrinContent {
		width: calc(100% - 64px) !important;
	}
	/*跳转动画*/
	.fade-enter-active {
		transition: all 1s ease;
	}
	.fade-enter {
		transform: translateX(40px);
		opacity: 0;
	}
</style>
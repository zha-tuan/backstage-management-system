<template>
	<div class="login">
		<div class="sub_login">
			<div>后台管理系统</div>
			<el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="44px" class="demo-ruleForm">
				<ul>
					<li>
						<el-form-item label="账号:" prop="UserName">
							<el-input v-model="loginForm.UserName"></el-input>
						</el-form-item>
					</li>
					<li>
						<el-form-item label="密码:" prop="UserPassword">
							<el-input type="password" v-model="loginForm.UserPassword"></el-input>
						</el-form-item>
					</li>
					<li class="rememeberPW">
						<el-checkbox v-model="RememberPWBoolean">记住密码</el-checkbox>
					</li>
					<li class="loginButtom" @click="submitForm('loginForm')">登录</li>
				</ul>
			</el-form>
		</div>
	</div>
</template>

<script>
	import Base64 from '../tools/base64.js'
	import Cookie from '../tools/cookie.js'
	export default {
		data() {
			return {
				//登录表单
				loginForm: {
					UserName: '',
					UserPassword: ''
				},
				//登录表单--验证规则
				loginRules: {
					UserName: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}],
					UserPassword: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				},
				RememberPWBoolean: false,   //记住密码
			}
		},
		methods: {
			//登录表单提交
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let UserName = Base64.encode(this.loginForm.UserName),          //账号密码加密
						    UserPassword = Base64.encode(this.loginForm.UserPassword);
						if (UserName == '6Z+p56uL' && UserPassword == 'MTIzNDU2') {
							sessionStorage.setItem('login', 'login')
							sessionStorage.setItem('token', 'token')
							if (this.RememberPWBoolean) {  //记住密码  设置cookie
								Cookie.setCookie('UserName', UserName, 20);
								Cookie.setCookie('UserPassword', UserPassword, 20);
							} else {    //清除密码   清除cookie
								Cookie.clearCookie('UserName');
								Cookie.clearCookie('UserPassword');
							}
							this.$router.push({
								path: '/home'
							})
						} else {
							this.$message({
								type:'error',
								message: '账号或者密码错误'
							});
						}
					}
				});
			},
			//记住密码
			rememeberPW() {
				this.RememberPWBoolean = !this.RememberPWBoolean
			},
			//获取账号、密码
			getUserPW() {
				if (Cookie.checkCookie()) {
					this.loginForm.UserName = Base64.decode(Cookie.getCookie('UserName'))
				    this.loginForm.UserPassword = Base64.decode(Cookie.getCookie('UserPassword'))
				    this.RememberPWBoolean = true
				}
			}
		},
		mounted() {
			this.getUserPW();
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: url(../../static/img/login_BG.jpg) no-repeat;
		background-size: cover;
		position: relative;
		color: #606266;
		.sub_login {
			width: 480px;
			height: 350px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -240px;
			margin-top: -175px;
			background: rgba(236, 246, 252, .9);
			padding: 30px 50px;
		}
		.sub_login>div:nth-child(1) {
			font-size: 16px;
			text-align: center;
			margin-bottom: 30px;
		}
		.rememeberPW {
			padding-left: 44px;
		}
		.loginButtom {
			margin-left: 44px;
			font-size: 14px;
			text-align: center;
			height: 40px;
			line-height: 40px;
			margin-top: 20px;
			border-radius: 4px;
			cursor: pointer;
			background: #045874;
			color: white;
		}
	}
</style>
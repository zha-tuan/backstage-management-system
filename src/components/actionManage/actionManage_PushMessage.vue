<template>
	<div>
		<!--面包屑导航-->
		<Breadcrumb :BreadcrumbList="BreadcrumbList"></Breadcrumb>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="推送标题" prop="title">
				<el-col :span="11">
					<el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="推送群体" prop="group">
				<el-col :span="11">
					<el-select v-model="ruleForm.group" placeholder="请选择推送群体">
						<el-option label="全体用户" value="全体用户"></el-option>
						<el-option label="会员用户" value="会员用户"></el-option>
						<el-option label="普通用户" value="普通用户"></el-option>
						<el-option label="五星会员用户" value="五星会员用户"></el-option>
						<el-option label="四星会员用户" value="四星会员用户"></el-option>
						<el-option label="三星会员用户" value="三星会员用户"></el-option>
						<el-option label="二星会员用户" value="二星会员用户"></el-option>
						<el-option label="一星会员用户" value="一星会员用户"></el-option>
						<el-option label="违规用户" value="违规用户"></el-option>
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item label="推送时间" required>
				<el-col :span="11">
					<el-col :span="12">
						<el-form-item prop="date1">
							<el-date-picker type="date" placeholder="请选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col class="line" style="text-align: center;" :span="1">-</el-col>
					<el-col :span="11">
						<el-form-item prop="date2">
							<el-time-picker type="fixed-time" placeholder="请选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
						</el-form-item>
					</el-col>
				</el-col>
			</el-form-item>
			<el-form-item label="推送内容" prop="content">
				<el-col :span="11">
					<el-input type="textarea" rows="4" v-model="ruleForm.content" placeholder="请填写推送内容"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="appointPush">指定人员推送</el-button>
				<el-button @click="PushList">我的推送列表</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import Breadcrumb from '../common/Breadcrumb'
	export default {
		data() {
			return {
				BreadcrumbList: [{
					path: '',
					title: '消息推送'
				}],
				ruleForm: {
					title: '',
					group: '',
					date1: '',
					date2: '',
					content: ''
				},
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}, {
						min: 3,
						max: 20,
						message: '长度在 3 到 20 个字符',
						trigger: 'blur'
					}],
					group: [{
						required: true,
						message: '请选择群体',
						trigger: 'change'
					}],
					date1: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					date2: [{
						type: 'date',
						required: true,
						message: '请选择时间',
						trigger: 'change'
					}],
					content: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}, {
						min: 5,
						max: 100,
						message: '长度在 5 到 100 个字符',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			//提交
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$message.success('提交成功')
					} else {
						return false;
					}
				});
			},
			//指定人员推送
			appointPush() {
				this.$router.push({
					path: '/PushMessage_appoint'
				})
			},
			//推送列表
			PushList() {
				this.$router.push({
					path: '/PushMessage_list'
				})
			}
		},
		components: {
			Breadcrumb
		}
	}
</script>

<style>

</style>
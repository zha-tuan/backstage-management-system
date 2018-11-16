<template>
	<div>
		<!--面包屑导航-->
		<Breadcrumb :BreadcrumbList="BreadcrumbList"></Breadcrumb>
		<!--查询表单-->
		<div class="inquireForm">
			<el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="姓名">
					<el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-select v-model="formInline.sex" placeholder="请选择性别">
						<el-option label="男" value="boy"></el-option>
						<el-option label="女" value="girl"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="会员">
					<el-select v-model="formInline.member" placeholder="请选择">
						<el-option label="是" value="shanghai"></el-option>
						<el-option label="否" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!--用户表格-->
		<div class="userTable">
			<el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="tableData" border style="width: 100%" :show-overflow-tooltip="true">
				<el-table-column type="selection" width="55" align="center">
				</el-table-column>
				<el-table-column prop="name" label="姓名" align="center">
				</el-table-column>
				<el-table-column prop="sex" label="性别" align="center">
				</el-table-column>
				<el-table-column prop="phone" label="手机" align="center">
				</el-table-column>
				<el-table-column prop="isMember" label="会员" align="center">
				</el-table-column>
				<el-table-column prop="memberRank" label="会员级别" align="center">
				</el-table-column>
				<el-table-column prop="isViolation" label="违规" align="center">
				</el-table-column>
				<el-table-column prop="isStopUse" label="停用" align="center">
				</el-table-column>
			</el-table>
			<!--分页-->
			<Pagination 
				:selectPageSizes="selectPageSizes" 
				:pageSize="pageSize" 
				:total="total">
			</Pagination>
		</div>
		<!--选中的用户-->
		<div class="selectedUser">
			<p>选定人员</p>
			<div class="sub_selectedUser">
				<el-tag :key="tag" size="small" v-for="tag in multipleSelection" closable :disable-transitions="false" @close="handleClose(tag)">
					{{tag.name}}
				</el-tag>
			</div>
			<div class="pushMessage" v-if="multipleSelection.length > 0">
				<el-button @click="dialogFormVisible = true" size="small">消息推送</el-button>
			</div>
		</div>
		<!--消息推送表单-->
		<div>
			<el-dialog title="指定人员消息推送" :visible.sync="dialogFormVisible">
				<el-form size="small" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="推送标题" prop="title">
						<el-col :span="14">
							<el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="推送时间" required>
						<el-col :span="14">
							<el-col :span="11">
								<el-form-item prop="date1">
									<el-date-picker type="date" placeholder="请选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col class="line" style="text-align: center;" :span="2">-</el-col>
							<el-col :span="11">
								<el-form-item prop="date2">
									<el-time-picker type="fixed-time" placeholder="请选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
								</el-form-item>
							</el-col>
						</el-col>
					</el-form-item>
					<el-form-item label="推送内容" prop="content">
						<el-col :span="14">
							<el-input type="textarea" rows="4" v-model="ruleForm.content" placeholder="请填写推送内容"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item>
						<el-col :span="14" style="text-align: center;">
						    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
						</el-col>
					</el-form-item>
				</el-form>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from '../common/Breadcrumb'
	import Pagination from '../common/Pagination'
	export default {
		data() {
			return {
				//分页数据
				selectPageSizes: [10, 20, 30, 40],
				pageSize: 10,
				total: 400,
				//消息推送数据
				BreadcrumbList: [{
					path: '/actionManage_PushMessage',
					title: '消息推送'
				}, {
					path: '',
					title: '指定人员推送'
				}],
				multipleSelection: [],
				//查询表单
				formInline: {
					name: '',
					sex: '',
					member: ''
				},
				//表格数据
				tableData: [{
					name: '王小虎1',
					sex: '女',
					phone: '157 2568 1586',
					isMember: '否',
					memberRank: '三星会员',
					isViolation: '否',
					isStopUse: '否'
				}, {
					name: '王小虎2',
					sex: '女',
					phone: '157 2568 1586',
					isMember: '否',
					memberRank: '三星会员',
					isViolation: '否',
					isStopUse: '否'
				}, {
					name: '王小虎3',
					sex: '女',
					phone: '157 2568 1586',
					isMember: '否',
					memberRank: '三星会员',
					isViolation: '否',
					isStopUse: '否'
				}, {
					name: '王小虎4',
					sex: '女',
					phone: '157 2568 1586',
					isMember: '否',
					memberRank: '三星会员',
					isViolation: '否',
					isStopUse: '否'
				}, {
					name: '王小虎5',
					sex: '女',
					phone: '157 2568 1586',
					isMember: '否',
					memberRank: '三星会员',
					isViolation: '否',
					isStopUse: '否'
				}, {
					name: '王小虎6',
					sex: '女',
					phone: '157 2568 1586',
					isMember: '否',
					memberRank: '三星会员',
					isViolation: '否',
					isStopUse: '否'
				}],
				//推送表单
				dialogFormVisible: false,
				ruleForm: {
					title: '',
					date1: '',
					date2: '',
					content: ''
				},
				//推送表单--验证规则
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
			//查询表单提交
			onSubmit() {
				console.log('submit!');
			},
			//选中状态改变
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			//删除选中的tag
			handleClose(tag) {
				this.multipleSelection.splice(this.multipleSelection.indexOf(tag), 1);
				this.$refs.multipleTable.toggleRowSelection(tag);
			},
			//推送表单提交
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$message.success('提交成功')
					} else {
						return false;
					}
				});
			},
		},
		components: {
			Breadcrumb,
			Pagination
		}
	}
</script>

<style lang="scss" scoped>
	.selectedUser {
		border: 1px solid #ebeef5;
		padding: 10px;
		margin-top: 15px;
		font-size: 14px;
		color: #606266;
		&>p {
			line-height: 14px;
			padding: 5px 0;
		}
		.sub_selectedUser {
			margin-top: 5px;
		}
		.el-tag+.el-tag {
			margin-left: 10px;
		}
		.pushMessage {
			margin-top: 40px;
		}
	}
</style>
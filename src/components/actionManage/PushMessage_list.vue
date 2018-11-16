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
				<el-form-item label="群体">
					<el-select v-model="formInline.group" placeholder="请选择">
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
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!--用户表格-->
		<div class="userTable">
			<el-table :data="tableData" border style="width: 100%" :show-overflow-tooltip="true">
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
				<el-table-column label="操作" width="220" align="center">
					<template slot-scope="scope">
						<el-button @click="examine(scope.row)" type="primary" size="mini">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--分页-->
			<Pagination 
				:selectPageSizes="selectPageSizes" 
				:pageSize="pageSize" 
				:total="total">
			</Pagination>
		</div>
		<!--查看弹窗-->
		<el-dialog title="指定人员消息推送" :visible.sync="dialogFormVisible">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="推送标题">
					<el-col :span="14">
						<el-input v-model="ruleForm.title" placeholder="" disabled></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="推送群体">
					<el-col :span="14">
						<el-select v-model="ruleForm.group" placeholder="" style="width: 100%;" disabled>
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
				<el-form-item label="推送时间">
					<el-col :span="14">
						<el-col :span="11">
							<el-form-item>
								<el-date-picker disabled type="date" placeholder="" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col class="line" style="text-align: center;" :span="2">-</el-col>
						<el-col :span="11">
							<el-form-item>
								<el-time-picker disabled type="fixed-time" placeholder="" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
							</el-form-item>
						</el-col>
					</el-col>
				</el-form-item>
				<el-form-item label="推送内容">
					<el-col :span="14">
						<el-input disabled type="textarea" rows="4" v-model="ruleForm.content" placeholder=""></el-input>
					</el-col>
				</el-form-item>
			</el-form>
		</el-dialog>
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
				//面包屑导航数据
				BreadcrumbList: [{
					path: '/actionManage_PushMessage',
					title: '消息推送'
				}, {
					path: '',
					title: '消息推送列表'
				}],
				dialogFormVisible: false,
				//查询表单
				formInline: {
					name: '',
					sex: '',
					group: ''
				},
				//弹窗表单
				ruleForm: {
					title: '',
					group: '',
					date1: '',
					date2: '',
					content: ''
				},
				//表格数据
				tableData: [{
					name: '王小虎',
					sex: '女',
					phone: '157 2568 1586',
					isMember: '否',
					memberRank: '三星会员',
					isViolation: '否',
					isStopUse: '否'
				}, {
					name: '王小虎',
					sex: '女',
					phone: '157 2568 1586',
					isMember: '否',
					memberRank: '三星会员',
					isViolation: '否',
					isStopUse: '否'
				}, {
					name: '王小虎',
					sex: '女',
					phone: '157 2568 1586',
					isMember: '否',
					memberRank: '三星会员',
					isViolation: '否',
					isStopUse: '否'
				}, {
					name: '王小虎',
					sex: '女',
					phone: '157 2568 1586',
					isMember: '否',
					memberRank: '三星会员',
					isViolation: '否',
					isStopUse: '否'
				}, {
					name: '王小虎',
					sex: '女',
					phone: '157 2568 1586',
					isMember: '否',
					memberRank: '三星会员',
					isViolation: '否',
					isStopUse: '否'
				}, {
					name: '王小虎',
					sex: '女',
					phone: '157 2568 1586',
					isMember: '否',
					memberRank: '三星会员',
					isViolation: '否',
					isStopUse: '否'
				}],
			}
		},
		methods: {
			//查询表单提交
			onSubmit() {
				console.log('submit!');
			},
			//查看
			examine(row) {
				this.dialogFormVisible = true
			}
		},
		components: {
			Breadcrumb,
			Pagination
		}
	}
</script>

<style>
</style>
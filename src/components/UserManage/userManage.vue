<template>
	<div>
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
			<el-table :data="tableData" border style="width: 100%" :show-overflow-tooltip="true">
				<el-table-column prop="name" label="姓名" width="120" align="center">
				</el-table-column>
				<el-table-column prop="sex" label="性别" width="120" align="center">
				</el-table-column>
				<el-table-column prop="registeredTime" label="注册时间" width="120" align="center">
				</el-table-column>
				<el-table-column prop="lastLoginTime" label="最后登录时间" width="120" align="center">
				</el-table-column>
				<el-table-column prop="isMember" label="会员" width="120" align="center">
				</el-table-column>
				<el-table-column prop="isStopUse" label="停用" width="120" align="center">
				</el-table-column>
				<el-table-column label="发布文章（篇）" width="120" align="center">
					<template slot-scope="scope">
						<div class="article" @click="goArticle">{{scope.row.articleNumber}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="address" label="地址" align="center" :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template slot-scope="scope">
						<el-button @click="examine(scope.row)" type="primary" size="mini">查看</el-button>
						<el-button @click="compile(scope.row)" type="primary" size="mini">编辑</el-button>
						<el-button @click="Delete(scope.row)" type="danger" plain size="mini">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--分页-->
			<Pagination :selectPageSizes="selectPageSizes" :pageSize="pageSize" :total="total">
			</Pagination>
		</div>
		<!--浏览人信息详情-->
		<el-dialog title="用户详情" :visible.sync="dialogFormVisible" width="800px">
			<el-form size="small" :model="form" label-width="110px">
				<el-form-item label="姓名：">
					<el-input v-model="form.name" :disabled="form.isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="性别：">
					<el-input v-model="form.sex" :disabled="form.isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="注册时间：">
					<el-input v-model="form.registeredTime" :disabled="form.isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="最后登录时间：">
					<el-input v-model="form.lastLoginTime" :disabled="form.isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="会员：">
					<el-input v-model="form.isMember" :disabled="form.isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="停用：">
					<el-input v-model="form.isStopUse" :disabled="form.isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="地址：">
					<el-input v-model="form.address" :disabled="form.isDisabled"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">关 闭</el-button>
				<el-button @click="submit" v-if="submitBoolean" type="primary">提 交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '../common/Pagination'
	export default {
		data() {
			return {
				//分页数据
				selectPageSizes: [10, 20, 30, 40],
				pageSize: 10,
				total: 400,
				//查询表单
				formInline: {
					name: '',
					sex: '',
					member: ''
				},
				//模态框表单
				form: {},
				dialogFormVisible: false,
				submitBoolean: false,
				//表格数据
				tableData: [{
					name: '王小虎1',
					sex: '女',
					registeredTime: '2018-05-06',
					lastLoginTime: '2018-05-06',
					isMember: '否',
					isStopUse: '否',
					articleNumber: '15',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					name: '王小虎2',
					sex: '女',
					registeredTime: '2018-05-06',
					lastLoginTime: '2018-05-06',
					isMember: '否',
					isStopUse: '否',
					articleNumber: '15',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					name: '王小虎3',
					sex: '女',
					registeredTime: '2018-05-06',
					lastLoginTime: '2018-05-06',
					isMember: '否',
					isStopUse: '否',
					articleNumber: '15',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					name: '王小虎4',
					sex: '女',
					registeredTime: '2018-05-06',
					lastLoginTime: '2018-05-06',
					isMember: '否',
					isStopUse: '否',
					articleNumber: '15',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					name: '王小虎5',
					sex: '女',
					registeredTime: '2018-05-06',
					lastLoginTime: '2018-05-06',
					isMember: '否',
					isStopUse: '否',
					articleNumber: '15',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					name: '王小虎6',
					sex: '女',
					registeredTime: '2018-05-06',
					lastLoginTime: '2018-05-06',
					isMember: '否',
					isStopUse: '否',
					articleNumber: '15',
					address: '上海市普陀区金沙江路 1518 弄'
				}]
			}
		},
		methods: {
			//查询表单提交
			onSubmit() {
				console.log('submit!');
			},
			//查看详情
			examine(row) {
				row.isDisabled = true;
				this.submitBoolean = false;
				this.form = row;
				this.dialogFormVisible = true;
			},
			//删除
			Delete(row) {
				this.$confirm('是否删除此记录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					
				});
			},
			//编辑
			compile(row) {
				row.isDisabled = false;
				this.submitBoolean = true;
				this.form = row;
				this.dialogFormVisible = true;
			},
			//去文章页
			goArticle() {
				this.$router.push({
					path: 'UserManage_article'
				})
			},
			//修改表单提交
			submit() {
				this.dialogFormVisible = false;
			}
		},
		components: {
			Pagination
		}
	}
</script>

<style lang="scss" scoped>
	.article {
		color: #4EA1DB;
		cursor: pointer;
	}
</style>
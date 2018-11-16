<template>
	<div class="index">
		<!--数据统计-->
		<ul>
			<li v-for="(item, index) in dataCount" :key="index" :index="index" class="clear">
				<div><i class="iconfont" :class="item.icon"></i></div>
				<div>
					<p :title="item.data">{{item.data}}</p>
					<p :title="item.title">{{item.title}}</p>
				</div>
			</li>
		</ul>
		<!--浏览人信息-->
		<div class="userInfo">
			<div>今日浏览量</div>
			<el-table :data="tableData" border style="width: 100%" :show-overflow-tooltip="true">
				<el-table-column prop="name" label="姓名" width="180" align="center">
				</el-table-column>
				<el-table-column prop="date" label="时间" width="180" align="center">
				</el-table-column>
				<el-table-column prop="isRegisteredUser" label="注册用户" width="180" align="center">
				</el-table-column>
				<el-table-column prop="isMember" label="会员" width="180" align="center">
				</el-table-column>
				<el-table-column prop="standingTime" label="停留时间" align="center">
				</el-table-column>
				<el-table-column prop="address" label="地址" align="center" :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column label="操作" width="160" align="center">
					<template slot-scope="scope">
						<el-button @click="examine(scope.row)" type="primary" size="mini">查看</el-button>
						<el-button @click="Delete(scope.row)" type="danger" plain size="mini">删除</el-button>
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
		<!--浏览人信息详情-->
		<el-dialog title="用户详情" :visible.sync="dialogFormVisible" width="700px">
			<el-form size="small" :model="form" label-width="90px">
				<el-form-item label="姓名：">
					<el-input v-model="form.name" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="时间：">
					<el-input v-model="form.date" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="注册用户：">
					<el-input v-model="form.isRegisteredUser" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="会员：">
					<el-input v-model="form.isMember" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="停留时间：">
					<el-input v-model="form.standingTime" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="地址：">
					<el-input v-model="form.address" disabled="disabled"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">关 闭</el-button>
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
				//模态框表单
				form: {},
				dialogFormVisible: false,
				//数据统计列表
				dataCount: [{
					icon: 'icon-suoyoukehu',
					data: '152305152',
					title: '今日新增用户'
				}, {
					icon: 'icon-huiyuan-',
					data: '152305',
					title: '今日新增会员'
				}, {
					icon: 'icon-putongren',
					data: '152305',
					title: '今日新增普通用户'
				}, {
					icon: 'icon-dengjizongshu',
					data: '152305',
					title: '今日浏览量'
				}, ],
				//表格数据
				tableData: [{
					name: '王小虎1',
					date: '2016-05-02',
					address: '上海市普陀区金沙江路 1518 弄',
					isRegisteredUser: '是',
					isMember: '否',
					standingTime: '3小时52分45秒',
					id: 1
				}, {
					name: '王小虎2',
					date: '2016-05-02',
					address: '上海市普陀区金沙江路 1518 弄',
					isRegisteredUser: '是',
					isMember: '否',
					standingTime: '3小时52分45秒',
					id: 1
				}, {
					name: '王小虎3',
					date: '2016-05-02',
					address: '上海市普陀区金沙江路 1518 弄',
					isRegisteredUser: '是',
					isMember: '否',
					standingTime: '3小时52分45秒',
					id: 1
				}, {
					name: '王小虎4',
					date: '2016-05-02',
					address: '上海市普陀区金沙江路 1518 弄',
					isRegisteredUser: '是',
					isMember: '否',
					standingTime: '3小时52分45秒',
					id: 1
				}, {
					name: '王小虎5',
					date: '2016-05-02',
					address: '上海市普陀区金沙江路 1518 弄',
					isRegisteredUser: '是',
					isMember: '否',
					standingTime: '3小时52分45秒',
					id: 1
				}, {
					name: '王小虎6',
					date: '2016-05-02',
					address: '上海市普陀区金沙江路 1518 弄',
					isRegisteredUser: '是',
					isMember: '否',
					standingTime: '3小时52分45秒',
					id: 1
				}]
			}
		},
		methods: {
			//查看详情
			examine(row) {
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
			}
		},
		components: {
			Pagination
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		background: white;
		min-height: 100%;
		ul {
			display: flex;
			li {
				flex: 1;
				width: 0;
				margin-right: 20px;
				background: white;
				box-shadow: 0 0 5px #e6e6e6;
				div {
					float: left;
					height: 80px;
				}
				div:nth-child(1) {
					width: 30%;
					line-height: 80px;
					text-align: center;
					background: #57c8f2;
					color: white;
					&>i {
						font-size: 50px;
					}
				}
				div:nth-child(2) {
					width: 70%;
					text-align: center;
					padding: 10px 0;
					color: #333;
					font-size: 14px;
					p {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					p:nth-child(1) {
						font-size: 27px;
					}
				}
			}
			li:last-child {
				margin-right: 0;
			}
		}
		.userInfo {
			margin-top: 20px;
			&>div:nth-child(1) {
				height: 47.6px;
				line-height: 47.6px;
				font-size: 14px;
				padding-left: 12px;
				background: #58c7f2;
				color: white;
			}
		}
	}
</style>
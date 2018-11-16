<template>
	<div>
		<!--菜单表格-->
		<div class="userInfo">
			<div>菜单管理</div>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="content" label="菜单名" width="180" align="center">
				</el-table-column>
				<el-table-column prop="icon" label="菜单Icon" width="180" align="center">
				</el-table-column>
				<el-table-column label="是否一级菜单" width="180" align="center">
					<template slot-scope='scope'>
						<p>{{scope.row.isParent?'是': '否'}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="path" label="菜单路由" align="center">
				</el-table-column>
				<el-table-column label="是否显示" align="center">
					<template slot-scope='scope'>
						<p>{{scope.row.isShow?'是': '否'}}</p>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="170" align="center">
					<template slot-scope="scope">
						<el-button @click="compile(scope.row)" type="primary" size="mini">编辑</el-button>
						<el-button @click="childrenMenucompile(scope.row)" type="primary" size="mini" v-if="scope.row.isParent">子菜单</el-button>
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
		<!--编辑弹窗-->
		<el-dialog title="编辑" :visible.sync="dialogFormVisible" width="600px">
			<el-form size="small" :model="form" label-width="100px">
				<el-form-item label="菜单名：">
					<el-input v-model="form.content"></el-input>
				</el-form-item>
				<el-form-item label="菜单Icon：">
					<el-input v-model="form.icon"></el-input>
				</el-form-item>
				<el-form-item label="菜单路由：">
					<el-input v-model="form.path"></el-input>
				</el-form-item>
				<el-form-item label="是否显示：">
					<el-select style="width: 100%;" v-model="form.isShow" placeholder="请选择">
						<el-option label="是" :value="true"></el-option>
						<el-option label="否" :value="false"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false" size="small">关 闭</el-button>
				<el-button @click="submit(form)" type="primary" size="small">提 交</el-button>
			</div>
		</el-dialog>
		<!--子菜单弹窗-->
		<el-dialog title="子菜单" :visible.sync="outerVisible">
			<!--外层内容-->
			<el-table :data="ChildrenMenuTableData" border style="width: 100%">
				<el-table-column prop="content" label="菜单名" width="120" align="center">
				</el-table-column>
				<el-table-column prop="path" label="菜单路由" align="center">
				</el-table-column>
				<el-table-column label="是否显示" align="center">
					<template slot-scope='scope'>
						<p>{{scope.row.isShow?'是': '否'}}</p>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="80" align="center">
					<template slot-scope="scope">
						<el-button @click="compileInnerVisible(scope.row)" type="primary" size="mini">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--内层内容-->
			<el-dialog width="30%" title="编辑" :visible.sync="innerVisible" append-to-body>
				<el-form size="small" :model="ChildrenMenuForm" label-width="100px">
					<el-form-item label="菜单名：">
						<el-input v-model="ChildrenMenuForm.content"></el-input>
					</el-form-item>
					<el-form-item label="菜单路由：">
						<el-input v-model="ChildrenMenuForm.path"></el-input>
					</el-form-item>
					<el-form-item label="是否显示：">
						<el-select style="width: 100%;" v-model="ChildrenMenuForm.isShow" placeholder="请选择">
							<el-option label="是" :value="true"></el-option>
							<el-option label="否" :value="false"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="innerVisible = false" size="small">关 闭</el-button>
					<el-button @click="ChildrenMenuFormSubmit(ChildrenMenuForm)" type="primary" size="small">提 交</el-button>
				</div>
			</el-dialog>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '../common/Pagination'
	export default {
		data() {
			return {
				tableData: [], //菜单管理表格数据
				dialogFormVisible: false, //编辑弹窗
				form: '', //编辑form
				//分页数据
				selectPageSizes: [10, 20, 30, 40],
				pageSize: 10,
				total: 400,
				//子菜单弹窗
				outerVisible: false,
				innerVisible: false,
				ChildrenMenuTableData: [],
				ChildrenMenuForm: ''
			}
		},
		methods: {
			//编辑
			compile(row) {
				this.form = JSON.parse(JSON.stringify(row));
				this.dialogFormVisible = true;
			},
			//子菜单显示
			childrenMenucompile(row) {
				console.log(row)
				this.ChildrenMenuTableData = JSON.parse(JSON.stringify(row.children))
				this.outerVisible = true
			},
			//获取菜单
			getMenu() {
				this.tableData = this.$store.state.menuData;
			},
			//编辑内容提交
			submit(form) {
				this.$store.commit('showPeoople', form);
				this.dialogFormVisible = false;
				this.$message({
					message: '修改成功',
					type: 'success'
				})
			},
			//编辑子菜单
			compileInnerVisible(row) {
				this.ChildrenMenuForm = JSON.parse(JSON.stringify(row));
				this.innerVisible = true
			},
			//子菜单提交
			ChildrenMenuFormSubmit(form) {
				this.$store.commit('ChildrenMenuChange', form);
				//对比原菜单与现在菜单，有变化则改变
				for (let i = 0; i < this.ChildrenMenuTableData.length; i++) {
					if (this.ChildrenMenuTableData[i].id == form.id) {
						this.ChildrenMenuTableData[i].content = form.content
						this.ChildrenMenuTableData[i].path = form.path
						this.ChildrenMenuTableData[i].isShow = form.isShow
					}
				}
				this.innerVisible = false;
				this.$message({
					message: '修改成功',
					type: 'success'
				})
			}
		},
		mounted() {
			this.getMenu();
		},
		components: {
			Pagination
		}
	}
</script>

<style lang="scss" scoped>
	.userInfo {
		&>div:nth-child(1) {
			height: 47.6px;
			line-height: 47.6px;
			font-size: 14px;
			padding-left: 12px;
			background: #58c7f2;
			color: white;
		}
	}
</style>
<template>
	<div class="Pagination">
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="selectPageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		props: ['selectPageSizes', 'pageSize', 'total'],
		data() {
			return {
				currentPage: 1,
			}
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				console.log(this.selectPageSizes)
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}

		},
		mounted() {

		}
	}
</script>

<style scoped>
	.Pagination {
		text-align: center;
		margin-top: 15px;
	}
</style>
<template>
	<div>
		<!--面包屑导航-->
		<Breadcrumb :BreadcrumbList="BreadcrumbList"></Breadcrumb>
		<!--文章-->
		<div class="article">
			<el-collapse v-model="activeName" accordion>
				<el-collapse-item title="一致性 Consistency" name="1">
					<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
				</el-collapse-item>
				<el-collapse-item title="反馈 Feedback" name="2">
					<div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
				</el-collapse-item>
				<el-collapse-item title="效率 Efficiency" name="3">
					<div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
				</el-collapse-item>
				<el-collapse-item title="可控 Controllability" name="4">
					<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
				</el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from '../common/Breadcrumb'
	export default {
		data() {
			return {
				BreadcrumbList: [{
					path: '/UserManage',
					title: '用户管理'
				}, {
					path: '',
					title: '文章查看'
				}]
			}
		},
		components: {
			Breadcrumb
		}
	}
</script>

<style>

</style>
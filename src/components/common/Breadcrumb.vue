<template>
	<div class="Breadcrumb">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in BreadcrumbList" :key="index" :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
	export default {
		props: ['BreadcrumbList']
	}
</script>

<style>
	.Breadcrumb {
		padding-bottom: 20px;
	}
</style>
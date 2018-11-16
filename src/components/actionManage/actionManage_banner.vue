<template>
	<div>
		<!--面包屑导航-->
		<Breadcrumb :BreadcrumbList="BreadcrumbList"></Breadcrumb>
		<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" multiple :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="beforeUpload" :limit="3" :on-exceed="handleExceed">
			<i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		<p>提示：最多上传三张图片，且图片格式只能是JPG、PNG、GIF，图片大小必须小于等于5M</p>
	</div>
</template>

<script>
	import Breadcrumb from '../common/Breadcrumb'
	export default {
		data() {
			return {
				BreadcrumbList: [{
					path: '',
					title: '首页轮播图上传'
				}],
				dialogImageUrl: '',
				dialogVisible: false
			}
		},
		methods: {
			//删除图片
			handleRemove(file, fileList) {
				console.log(file);
				console.log(fileList);
			},
			//预览大图
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//成功回调
			handleSuccess(response, file, fileList) {
				console.log(response)
				console.log(file)
				console.log(fileList)
			},
			//上传之前检测图片格式、大小
			beforeUpload(file) {
				let imgType = file.type,
					imgSize = file.size / 1024 / 1024;
				//检测图片格式
				if(imgType != 'image/jpeg' && imgType != 'image/png' && imgType != 'image/gif') {
					this.$message.error('请上传 JPG、PNG、GIF格式图片!');
					return false
				}
				//检测图片大小
				if(imgSize > 5) {
					this.$message.error('图片大小不能超过 5M !')
					return false
				}
			},
			//超过规定的图片数量（limit）时提醒
			handleExceed(files, fileList) {
				this.$message.warning(`最多上传三张图片`);
			},
		},
		components: {
			Breadcrumb
		}
	}
</script>

<style lang="scss" scoped>
	p {
		font-size: 14px;
		line-height: 14px;
		color: #606266;
		padding: 10px 0;
		color: #f56c6c;
	}
</style>
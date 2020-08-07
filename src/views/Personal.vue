<template>
	<div class="personal-wrapper">
		<div class="title">编辑个人信息</div>
		<el-form :model="$store.state.userInfo" :rules="rules" ref="infoForm" label-width="100px" class="infoForm">
			<el-form-item label=" 用户头像" prop="avatar">
				<el-upload class="avatar-uploader" :action="uploadUrl" accept="image/jpeg" :headers="uploadHeaders" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="avatarUrl" :src="avatarUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="账户名称" prop="name">
				<el-input v-model="$store.state.userInfo.name"></el-input>
			</el-form-item>
			<el-form-item label="昵称" prop="nickname">
				<el-input v-model="$store.state.userInfo.nickname"></el-input>
			</el-form-item>
			<el-form-item label="年龄" prop="age">
				<el-input-number v-model="$store.state.userInfo.age" :min="1" :max="99"></el-input-number>
			</el-form-item>
			<el-form-item style="margin-bottom:0">
				<el-button type="primary" @click="submitForm('infoForm')">保存</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>
<script>
export default {
	data() {
		return {
			uploadUrl: `${process.env.VUE_APP_SERVER_URL}/api/common/uploadImage`,
			uploadHeaders: {
				Authorization: ''
			},
			avatarUrl: this.$store.state.userInfo.avatar,
			rules: {
				name: [
					{ required: true, message: '请输入账户名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
				age: [{ required: true }]
			}
		}
	},
	methods: {
		handleAvatarSuccess(res) {
			this.avatarUrl = res.data
		},
		beforeAvatarUpload(file) {
			this.uploadHeaders.Authorization = localStorage.getItem('token')
			const isJPG = file.type === 'image/jpeg'
			const isLt2M = file.size / 1024 / 1024 < 2

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!')
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!')
			}
			return isJPG && isLt2M
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.updateUserInfo()
				} else {
					return false
				}
			})
		},
		updateUserInfo() {
			this.$store.commit('updateUserInfo', { key: 'avatar', value: this.avatarUrl })
			this.$api.user.updateUserInfo(this.$store.state.userInfo).then(() => {
				this.$router.push({ path: '/home' })
				this.$message.success('更新成功')
			})
		}
	},
	mounted() {
		this.$store.dispatch('getUserInfo')
	}
}
</script>

<style lang="scss">
.personal-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;

	.title {
		margin-bottom: 16px;
		font-weight: bold;
	}

	.infoForm {
		.avatar-uploader .el-upload {
			border: 1px dashed #000;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}
		.avatar-uploader .el-upload:hover {
			border-color: #409eff;
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 128px;
			height: 128px;
			line-height: 128px;
			text-align: center;
		}
		.avatar {
			width: 128px;
			height: 128px;
			display: block;
		}
		.el-form-item__label {
			text-align: left;
		}
	}
}
</style>

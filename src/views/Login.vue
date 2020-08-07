<template>
	<div class="login-wrapper">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
			<el-form-item label="账户名称" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item style="margin-bottom:0">
				<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
 
<script>
export default {
	data() {
		return {
			ruleForm: {
				name: 'hjd',
				password: '123456'
			},
			rules: {
				name: [
					{ required: true, message: '请输入账户名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				password: [{ required: true, message: '请输入账户密码', trigger: 'blur' }]
			}
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.login()
				} else {
					return false
				}
			})
		},
		login() {
			this.$api.user.login(this.ruleForm).then(async res => {
				localStorage.setItem('token', res.data.token)
				this.$store.commit('setUserId', res.data.userInfo.id)
				await this.$store.dispatch('getUserInfo')
				this.$router.push({ path: '/home' })
			})
		}
	},
	created() {}
}
</script>

<style lang="scss">
.login-wrapper {
	width: 100%;
	height: 100%;
	background-image: url('../assets/bg.jpg');
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;

	.ruleForm {
		width: 300px;
		background: rgba(255, 255, 255, 0.25);
		padding: 16px;
		border-radius: 4px;

		.el-form-item__label {
			text-align: left;
		}
	}
}
</style>

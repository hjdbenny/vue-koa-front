<template>
	<div class="home-header">
		<img @click="editPersonal()" :src="$store.state.userInfo.avatar" class="avatar">
		<div class="nickname">{{$store.state.userInfo.nickname}}</div>
		<div style="flex:1"></div>
		<el-button @click="writeArticle" style="align-self: flex-end;" type="primary" round>写文章</el-button>
	</div>
</template>
<script>
export default {
	data() {
		return {}
	},
	methods: {
		editPersonal() {
			this.$router.push({ path: '/home/personal' })
		},
		writeArticle() {
			this.$router.push({ path: '/home/write_article' })
		}
	}
}
</script>

<style lang="scss">
.home-header {
	position: relative;
	width: 1024px;
	height: 200px;
	margin-top: 60px;
	display: flex;
	align-items: center;
	.avatar {
		width: 200px;
		height: 200px;
		border-radius: 100%;
		cursor: pointer;
		margin-right: 24px;
	}
	.nickname {
		font-size: 64px;
		color: #f35626;
		background: coral;
		background-image: -webkit-linear-gradient(45deg, #f35626, #feab3a);
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: hue 6s infinite linear;
	}
	@keyframes hue {
		from {
			-webkit-filter: hue-rotate(0deg);
		}
		to {
			-webkit-filter: hue-rotate(-360deg);
		}
	}
}
</style>

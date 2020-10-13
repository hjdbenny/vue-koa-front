<template>
	<div class="read-wrapper">
		<div class="btn-groups">
			<el-button @click="backToList" type="primary" round>返回文章列表</el-button>
		</div>
		<h2 class="title">{{title}}</h2>
		<div class="content" v-html="html"></div>
		<div class="updateTime">发布于 {{updateTime}}</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			title: null,
			html: null,
			updateTime: null
		}
	},
	methods: {
		// 根据id获取文章
		getArticle() {
			this.$api.article
				.getArticle({ id: this.$store.state.curWritingArticleId })
				.then(res => {
					this.title = res.data.title
					this.updateTime = res.data.updateTime
					this.html = res.data.html
				})
		},
		backToList() {
			this.$router.push({ path: '/home' })
			this.$store.commit('setCurWritingArticleId', null)
		}
	},
	mounted() {
		let writeBtn = document.getElementById('writeBtn')
		writeBtn.style.display = 'none'
		this.getArticle()
	},
	beforeDestroy() {
		let writeBtn = document.getElementById('writeBtn')
		writeBtn.style.display = 'block'
	}
}
</script>

<style lang="scss">
.read-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;

	.btn-groups {
		position: absolute;
		right: 0;
		top: -100px;
		display: flex;
	}
	.title {
		text-align: center;
	}
	.content {
		margin: 16px 0;
	}
	.updateTime {
		font-size: 14px;
		color: #6c757d;
	}
}
</style>

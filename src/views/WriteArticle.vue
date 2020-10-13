<template>
	<div class="writer-wrapper">
		<div class="btn-groups">
			<el-button @click="backToList" type="primary" round>返回文章列表</el-button>
			<el-button @click="saveArticle" type="primary" round>保存</el-button>
		</div>
		<div class="field">
			<div class="title">标题</div>
			<el-input v-model="title" placeholder="请输入标题"></el-input>
		</div>
		<div class="field">
			<mavon-editor v-model="content" :externalLink="externalLink" ref="md" @imgAdd="uploadImage" @save="saveArticle" @change="change" style="min-height: 600px" />
		</div>
	</div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/gradient-dark.css'

export default {
	data() {
		return {
			title: '',
			content: '', // 输入的markdown
			html: '', // 及时转的html
			externalLink: false
		}
	},
	components: {
		mavonEditor: mavonEditor
	},
	methods: {
		// 所有操作都会被解析重新渲染
		change(value, render) {
			// render 为 markdown 解析后的结果[html]
			this.html = render
			this.highlighthandle()
		},
		saveArticle() {
			let params = {
				id: null,
				title: this.title,
				content: this.content,
				html: this.html,
				author: this.$store.state.userInfo.nickname
			}
			if (this.$store.state.curWritingArticleId) {
				params.id = this.$store.state.curWritingArticleId
				this.updateArticle(params)
			} else {
				this.addArticle(params)
			}
		},
		// 根据id获取文章
		getArticle() {
			this.$api.article
				.getArticle({ id: this.$store.state.curWritingArticleId })
				.then(res => {
					this.title = res.data.title
					this.content = res.data.content
					this.html = res.data.html
					this.$store.commit('setCurWritingArticleId', res.data.id)
				})
		},
		// 更新文章
		updateArticle(params) {
			this.$api.article.updateArticle(params).then(() => {
				this.$message.success('更新成功')
			})
		},
		// 新增文章
		addArticle(params) {
			this.$api.article.addArticle(params).then(res => {
				this.$store.commit('setCurWritingArticleId', res.data)
				this.$message.success('新增成功')
				this.getArticle()
			})
		},
		// 将图片上传到服务器，返回地址替换到md中
		uploadImage(pos, $file) {
			const formData = new FormData()
			formData.append('file', $file)
			this.$api.common.uploadImage(formData).then(res => {
				this.$refs.md.$img2Url(pos, res.data)
			})
		},
		highlighthandle: async () => {
			await hljs
			let highlight = document.querySelectorAll('code,pre')
			highlight.forEach(block => {
				hljs.highlightBlock(block)
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
		if (this.$store.state.curWritingArticleId) {
			this.getArticle()
		}
	},
	beforeDestroy() {
		let writeBtn = document.getElementById('writeBtn')
		writeBtn.style.display = 'block'
	}
}
</script>

<style lang="scss">
.writer-wrapper {
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

	.field {
		width: 100%;
		margin-bottom: 16px;
		display: flex;
		align-items: center;

		.title {
			width: 100px;
			margin-right: 16px;
		}

		.markdown-body {
			height: 600px;

			.content-input-wrapper {
				height: 100%;

				textarea {
					overflow: auto !important;
				}
			}
		}
	}
}
</style>

<template>
	<div class="writer-wrapper">
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
			console.log(this.html)
		},
		// 将图片上传到服务器，返回地址替换到md中
		uploadImage(pos, $file) {
			const formData = new FormData()
			formData.append('files', $file)
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
		}
	},
	mounted() {}
}
</script>

<style lang="scss">
.writer-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;

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

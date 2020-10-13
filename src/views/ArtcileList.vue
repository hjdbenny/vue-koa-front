<template>
	<div class="list-wrapper">
		<div class="list-box" v-if="articleList.length">
			<div class="article-item" v-for="(item) in articleList" :key="item.id">
				<div class="article-author">来自 {{item.author}}</div>
				<div class="article-title">{{item.title}}</div>
				<div class="article-content">{{item.content}}</div>
				<div class="article-time">{{item.updateTime}}</div>
				<img class="article-pic" src="../assets/default.jpg">
				<div class="article-operate">
					<el-button @click="operate(item,0)" type="primary" round>查看</el-button>
					<el-button @click="operate(item,1)" type="primary" round>编辑</el-button>
					<el-button @click="operate(item,2)" type="primary" round>删除</el-button>
				</div>
			</div>
		</div>
		<div class="list-box nodata" v-if="!articleList.length">
			暂无文章
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			articleList: [],
			totalRecords: 0,
			params: {
				pageSize: 10,
				pageNumber: 1
			}
		}
	},
	methods: {
		// 获取文章列表
		getArticleList() {
			this.$api.article.getArticleList(this.params).then(res => {
				this.articleList = res.data.datas
				this.totalRecords = res.data.totalRecords
			})
		},
		// 文章操作
		operate(data, type) {
			if (type == 0) {
				//查看
				this.$store.commit('setCurWritingArticleId', data.id)
				this.$router.push({ path: '/home/read_article' })
			} else if (type == 1) {
				//编辑
				this.$store.commit('setCurWritingArticleId', data.id)
				this.$router.push({ path: '/home/write_article' })
			} else if (type == 2) {
				//删除
				this.deleteArticle(data.id)
			}
		},
		// 根据id删除文章
		deleteArticle(id) {
			this.$api.article.deleteArticle(id).then(() => {
				this.$message.success('删除成功')
				this.getArticleList()
			})
		}
	},
	mounted() {
		this.$store.commit('setCurWritingArticleId', null)
		this.getArticleList()
	}
}
</script>
<style  lang="scss">
.list-wrapper {
	width: 100%;
	height: 100%;

	.list-box {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		&.nodata {
			justify-content: center;
			align-items: center;
		}

		.article-item {
			width: 100%;
			display: flex;
			flex-direction: column;
			height: 150px;
			justify-content: space-between;
			margin-top: 16px;
			border-radius: 4px;
			padding: 16px;
			background: ghostwhite;
			font-size: 14px;
			position: relative;
			overflow: hidden;
			cursor: pointer;

			&:first-of-type {
				margin-top: 0;
			}

			.article-author,
			.article-time {
				color: #9e9e9e;
			}

			.article-title {
				color: #212121;
				font-size: 18px;
				width: calc(100% - 112px);
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.article-content {
				color: #888888;
				width: calc(100% - 112px);
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.article-pic {
				position: absolute;
				width: 80px;
				height: 60px;
				right: 16px;
				top: 50%;
				transform: translateY(-50%);
			}

			.article-operate {
				position: absolute;
				top: 0;
				left: 110%;
				width: 100%;
				height: 100%;
				z-index: 2;
				background: rgba(135, 206, 235, 0.6);
				display: flex;
				justify-content: center;
				align-items: center;
			}

			&:hover .article-operate {
				left: 0;
				animation: fadeInRight;
				animation-duration: 0.3s;
			}
		}
	}
}
</style>
<template>
    <div class="read-wrapper">
        <div class="btn-groups">
            <el-button @click="backToList" type="primary" round>
                返回文章列表
            </el-button>
        </div>
        <h2 class="title">{{ title }}</h2>
        <div class="content" v-html="html"></div>
        <div class="updateTime">发布于 {{ updateTime }}</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: null,
            html: null,
            updateTime: null
        };
    },
    methods: {
        // 根据id获取文章
        getArticle() {
            this.$api.article
                .getArticle({ id: this.$store.state.curWritingArticleId })
                .then(res => {
                    this.title = res.data.title;
                    this.updateTime = res.data.updateTime;
                    this.html = res.data.html;
                });
        },
        backToList() {
            this.$router.push({ path: "/home" });
            this.$store.commit("setCurWritingArticleId", null);
        }
    },
    mounted() {
        this.getArticle();
    }
};
</script>

<style lang="scss">
.read-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .btn-groups {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 20px;
        align-items: center;
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

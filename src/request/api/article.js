import axios from "../http"; // 导入http中创建的axios实例

const article = {
    // 根据id获取文章
    getArticle(params) {
        return axios.get(
            `${process.env.VUE_APP_SERVER_URL}/api/article/getArticle`,
            {
                params: params,
            }
        );
    },
    // 更新文章
    updateArticle(params) {
        return axios.post(
            `${process.env.VUE_APP_SERVER_URL}/api/article/updateArticle`,
            params
        );
    },
    // 新增文章
    addArticle(params) {
        return axios.post(
            `${process.env.VUE_APP_SERVER_URL}/api/article/addArticle`,
            params
        );
    },
    // 获取文章列表
    getArticleList(params) {
        return axios.get(
            `${process.env.VUE_APP_SERVER_URL}/api/article/getArticleList`,
            {
                params: params,
            }
        );
    },
    // 根据id删除文章
    deleteArticle(params) {
        return axios.delete(
            `${process.env.VUE_APP_SERVER_URL}/api/article/deleteArticle`,
            {
                data: {
                    id: params,
                },
            }
        );
    },
};
export default article;

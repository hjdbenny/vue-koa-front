import Vue from "vue";
import Vuex from "vuex";
import api from "../request/api"; // 导入api接口

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isHttpLoading: false, // 请求时的loading状态
        userId: null,
        userInfo: null,
        curWritingArticleId: null, //当前正在编写的文章id
    },
    mutations: {
        // 切换请求时的loading状态
        changeLoadStatus(state, msg) {
            state.isHttpLoading = msg;
        },
        setUserId(state, msg) {
            state.userId = msg;
        },
        updateUserInfo(state, msg) {
            state.userInfo[msg.key] = msg.value;
        },
        setCurWritingArticleId(state, msg) {
            state.curWritingArticleId = msg;
        },
    },
    actions: {
        getUserInfo(context) {
            return new Promise((resolve) => {
                api.user
                    .getUserInfo({ id: context.state.userId })
                    .then((res) => {
                        context.state.userInfo = res.data;
                        resolve();
                    });
            });
        },
    },
    modules: {},
});

import axios from "../http"; // 导入http中创建的axios实例

const user = {
    // 登录
    login(params) {
        return axios.post(`${process.env.VUE_APP_SERVER_URL}/api/auth`, params);
    },
    // 获取个人信息
    getUserInfo(params) {
        return axios.get(
            `${process.env.VUE_APP_SERVER_URL}/api/user/getUserInfo`,
            {
                params: params,
            }
        );
    },
    // 更新个人信息
    updateUserInfo(params) {
        return axios.post(
            `${process.env.VUE_APP_SERVER_URL}/api/user/updateUserInfo`,
            params
        );
    },
};
export default user;

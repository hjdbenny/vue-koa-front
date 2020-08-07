import axios from "../http"; // 导入http中创建的axios实例

const common = {
    // 上传图片
    uploadImage(params) {
        return axios.post(
            `${process.env.VUE_APP_SERVER_URL}/api/uploadImage`,
            params
        );
    },
};
export default common;

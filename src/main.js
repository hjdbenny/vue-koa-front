import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./request/api"; // 导入api接口

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

import animated from "animate.css";
Vue.use(animated);

Vue.config.productionTip = false;

Vue.prototype.$api = api; // 将api挂载到vue的原型上

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");

<template>
    <div class="home-wrapper">
        <div class="home-body">
            <HomeHeader></HomeHeader>
            <div class="home-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import HomeHeader from "../components/HomeHeader";
export default {
    data() {
        return {};
    },
    components: {
        HomeHeader: HomeHeader
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<style lang="scss">
.home-wrapper {
    width: 100%;
    height: 100%;
    background-image: url("../assets/home_bg.jpg");
    background-size: cover;
    overflow: auto;

    .home-body {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .home-content {
        position: relative;
        width: 1024px;
        background: rgba(255, 255, 255, 0.8);
        margin-top: 60px;
        margin-bottom: 60px;
        border-radius: 4px;
        padding: 16px;
    }
}
</style>

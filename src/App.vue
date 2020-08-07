<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	data() {
		return {}
	},
	created() {
		if (sessionStorage.getItem('store')) {
			//页面加载前读取sessionStorage里的状态信息
			this.$store.replaceState(
				Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store')))
			)
		}

		window.addEventListener('beforeunload', () => {
			//在页面刷新前将vuex里的信息保存到sessionStorage里
			sessionStorage.setItem('store', JSON.stringify(this.$store.state))
		})
	}
}
</script>
<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
html,
body,
#app {
	height: 100%;
}
::-webkit-scrollbar {
	/*滚动条整体样式*/
	width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}

::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #535353;
}

::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	background: #ededed;
}
</style>

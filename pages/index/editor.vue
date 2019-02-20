
<template>
	<view class="editor-page-container">
		<web-view @message="messageHandle" :src="webviewUrl"></web-view>
	</view>
</template>

<script>
import config from "../../commons/config.js";
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
	},

	data() {
		return {
		}
	},
	
	computed:{
		webviewUrl() {
			const url = "/hybrid/html/richtext/index.html";
			return config.env == "production" ? url : ("http://127.0.0.1:8848/notes-mobile" + url);
		}
	},
	
	async onLoad() {
	},
	methods: {
		messageHandle(e) {
			console.log(e);
		}
	},
	mounted() {
	},
}
</script>

<style lang="less" scoped>
.editor-page-container {
	width:100%;
	height:100%;
}
</style>

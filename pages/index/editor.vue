
<template>
	<view class="editor-page-container">
		<web-view :src="webviewUrl"></web-view>
		<!-- <web-view :webview-styles="webviewStyles" @message="messageHandle" :src="webviewUrl"></web-view> -->
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
			webviewStyles: {
				progress: true,
			}
		}
	},
	
	computed: {
		webviewUrl() {
			return "/hybrid/html/richtext/test.html";
			const version = new Date().getTime();
			const token = this.token || "";
			const url = config.env == "production" ? "http://notes-modbile.wxaxiaoyao.cn/richtext/index.html" : "http://127.0.0.1:8848/notes-mobile/hybrid/html/richtext/index.html";
			return `${url}?v=${version}&token=${token}`;
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
	position: relative;
	width:100%;
	height:100%;
}
</style>

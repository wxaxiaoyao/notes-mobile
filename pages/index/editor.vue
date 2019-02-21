
<template>
	<view class="editor-page-container">
		<uni-nav-bar 
			status-bar=true 
			fixed=true
			left-icon="back" 
			left-text="编辑器"
			@click-left="back">
		</uni-nav-bar>
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
	
	computed:{
		webviewUrl() {
			//return "http://notes-modbile.wxaxiaoyao.cn/richtext/index.html";
			const url = "/hybrid/html/richtext/index.html";
			return config.env == "production" ? "http://notes-modbile.wxaxiaoyao.cn/richtext/index.html" : ("http://127.0.0.1:8848/notes-mobile" + url);
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

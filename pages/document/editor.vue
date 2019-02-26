
<template>
	<view class="editor-page-container">
		<web-view :src="webviewUrl"></web-view>
	</view>
</template>

<script>
import config from "../../commons/config.js";
import component from "../../components/component.js";

export default {
	mixins:[component],

	components: {
	},

	data() {
		return {
		}
	},
	
	computed: {
		webviewUrl() {
			const version = new Date().getTime();
			const token = this.token || "";
			const url = config.env == "production" ? "http://notes-modbile.wxaxiaoyao.cn/richtext/index.html" : "http://127.0.0.1:8848/notes-mobile/hybrid/html/richtext/index.html";
			const {id=0, text=""} = this.query;
			return `${url}?v=${version}&token=${token}&id=${id}&text=${text}`;
		}
	},
	
	async onLoad() {
		this.query = this.getPageArgs();
	},
	
	onBackPress(options) {
		// console.log(options);
		if (options.from === 'navigateBack') {  
			return false;  
        }  
        this.back();  
        return true;  
	},
	
	methods: {
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

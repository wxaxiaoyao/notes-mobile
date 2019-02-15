
<template>
	<view class="editor-page-container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back" 
			title="编辑器">
		</uni-nav-bar>
		<view contenteditable="true">
			hello wrold
		</view>
	</view>
</template>

<script>
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
	async onLoad() {
	},
	methods: {
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

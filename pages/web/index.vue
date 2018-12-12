
<template>
	<view class="user-info-modify-container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="测试"
			@click-left="back">
		</uni-nav-bar>

		<web-view style="width:100px; height:100px" src="http://wxaxiaoyao.cn"></web-view>
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
	onLoad(options) {
	},

	methods: {
	}
}
</script>

<style lang="less" scoped>
</style>


<template>
	<view class="index-page-container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back" 
			title="游戏">
		</uni-nav-bar>
		<view class="uni-list">
			<view class="uni-list-cell-divider"></view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="go('/pages/game/cube')" class="uni-list-cell-navigate uni-navigate-right">
					魔方
				</view>
			</view>
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
.index-page-container {
	width:100%;
	height:100%;
}
</style>

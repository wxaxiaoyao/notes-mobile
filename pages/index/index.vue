
<template>
	<view class="index-page-container">
		<uni-nav-bar status-bar=true title="NOTE"></uni-nav-bar>
		<view class="uni-list">
			<view class="uni-list-cell-divider"></view>

			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="go('/pages/daily/index')" class="uni-list-cell-navigate uni-navigate-right">
					日报
				</view>
			</view>

			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="go('/pages/page/index')" class="uni-list-cell-navigate uni-navigate-right">
					页面
				</view>
			</view>

			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="go('/pages/web/index')" class="uni-list-cell-navigate uni-navigate-right">
					webview
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
		this.authenticated();
		this.checkVersion();
	},
	methods: {
		upgrade() {
			this.upgradesIndexData.visible = true;
		}
	},
}
</script>

<style lang="less" scoped>
.index-page-container {
	width:100%;
	height:100%;
}
</style>


<template>
	<view class="index-page-container">
		<uni-nav-bar status-bar=true :title="title"></uni-nav-bar>
		<upgrades-index :__data__="upgradesIndexData"></upgrades-index>
		<view class="uni-list">
			<view class="uni-list-cell-divider"></view>

			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="go('/pages/daily/index')" class="uni-list-cell-navigate uni-navigate-right">
					日报
				</view>
			</view>

			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="go('/pages/web/index')" class="uni-list-cell-navigate uni-navigate-right">
					webview
				</view>
			</view>

			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="upgrade" class="uni-list-cell-navigate uni-navigate-right">
					升级
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import upgradesIndex from "../../components/upgrades/index.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"upgrades-index": upgradesIndex,
	},

	data() {
		return {
			title:"NOTE",
			upgradesIndexData:{visible:false},
		}
	},
	async onLoad() {
		this.authenticated();
		this.title = this.user.username;
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

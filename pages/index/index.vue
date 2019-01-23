
<template>
	<view class="index-page-container">
		<navigations-index></navigations-index>
		<view class="uni-list">
			<view class="uni-list-cell-divider"></view>

			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="go('/pages/daily/index')" class="uni-list-cell-navigate uni-navigate-right">
					日报
				</view>
			</view>

			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="go('/pages/note/index')" class="uni-list-cell-navigate uni-navigate-right">
					便条
				</view>
			</view>

			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="go('/pages/document/index')" class="uni-list-cell-navigate uni-navigate-right">
					文档
				</view>
			</view>

			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="clickScanCode" class="uni-list-cell-navigate uni-navigate-right">
					扫一扫
				</view>
			</view>

			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="clickNearContact" class="uni-list-cell-navigate uni-navigate-right">
					附近的人
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import navigationsIndex from "../../components/navigations/index.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"navigations-index": navigationsIndex,
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
		},
		clickScanCode() {
			uni.scanCode({
				success: res => {
					let info = undefined;
					try {
						info = JSON.parse(res.result);
					} catch(e) {
						info = undefined;
					}
					// 好友申请
					if (info.type == 0 && info.userId) {
						this.go("/pages/contact/apply-verify", {objectId:info.userId});
					} else {
						uni.showToast({title:"无效二维码", icon:"none"});
					}
				}
			});
		},
		clickNearContact() {
			this.go("/pages/index/near");
		},
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

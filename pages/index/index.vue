
<template>
	<view class="index-page-container">
		<uni-nav-bar status-bar=true :title="title"></uni-nav-bar>
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

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
	},

	data() {
		return {
			title:"NOTE",
		}
	},
	async onLoad() {
		this.authenticated();
		this.title = this.user.username;
	},
	methods: {
		upgrade() {
			uni.showLoading({
				title:'下载中'
			})
			const self = this
			const url = "https://service.dcloud.net.cn/build/download/6f2fb350-01d8-11e9-81bc-19f3fb2b4f51";
			uni.downloadFile({
				url,
				success: (res) => {
					console.log('downloadFile success, res is', res)
					self.imageSrc = res.tempFilePath;
					uni.hideLoading();
				},
				fail: (err) => {
					console.log('downloadFile fail, err is:', err)
					uni.hideLoading();
					uni.showToast({title:"下载失败", icon:"none"});
				}
			});
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

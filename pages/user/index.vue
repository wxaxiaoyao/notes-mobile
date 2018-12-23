
<template>
	<view>
		<navigations-index></navigations-index>

		<view class="uni-list">
			<view class="uni-list-cell-divider"></view>
			<view @click="go('/pages/user/info')" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-media-list">
					<view class="uni-media-list-logo">
						<image :src="user.portrait"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{ user.nickname || "" }}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{"用户名: " + user.username}}</view>
					</view>
				</view>
			</view>

			<view class="uni-list-cell-divider"></view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="go('/pages/debug/index')" class="uni-list-cell-navigate">调试</view>
			</view>

			<view class="uni-list-cell-divider"></view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="go('/pages/user/setting')" class="uni-list-cell-navigate">设置</view>
			</view>

			<view class="uni-list-cell-divider"></view>
			<view @click="clickLogoutBtn" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					退出
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
			title:"",
		}
	},
	onLoad() {
		this.authenticated();
		this.title = this.user.username;
	},
	methods: {
		clickLogoutBtn() {
			uni.reLaunch({url:"/pages/login/index"});
			this.setUser();
		}
	}
}
</script>

<style lang="less" scoped>
</style>


<template>
	<view class="user-page-container">
		<uni-nav-bar status-bar=true :title="title"></uni-nav-bar>
		<users-index></users-index>

		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="go('/pages/debug/index')" class="uni-list-cell-navigate uni-navigate-right">调试</view>
			</view>
		</view>

		<button @click="clickLogoutBtn">退出</button>
	</view>
</template>

<script>
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import usersIndex from "../../components/users/index.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		usersIndex,
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
.user-page-container {
	width:100%;
	height:100%;
}
</style>

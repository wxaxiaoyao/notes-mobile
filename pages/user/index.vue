
<template>
	<view class="user-page-container">
		<users-index></users-index>

		<button @tap="clickLogoutBtn">退出</button>
	</view>
</template>

<script>
import component from "../../components/component.js";

import usersIndex from "../../components/users/index.vue";

export default {
	mixins:[component],

	components: {
		usersIndex,
	},

	data() {
		return {
			title: 'Hello'
		}
	},
	onLoad() {
		this.authenticated();

		uni.setNavigationBarTitle({title:this.user.username || "NOTE"});
	},
	methods: {
		clickLogoutBtn() {
			this.setUser();
			uni.reLaunch({url:"/pages/login/index"});
		}
	}
}
</script>

<style lang="less" scoped>
.user-page-container {
	width:100%;
	height:100%;

	.username {
		color:red;
		width:100%;
	}
}
</style>

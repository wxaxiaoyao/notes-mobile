
<template>
	<view class="user-index-container">
		<uni-nav-bar status-bar=true :title="title"></uni-nav-bar>

		<view @click="go('/pages/user/info')" class="users-me-container">
			<view class="left-container">
				<image :src="user.portrait" class="portrait"></image>
			</view>
			<view class="main-container">
				<view class="username">{{ (user.nickname || "") + " " + user.username}}</view>
				<view class="description">{{user.description}}</view>
			</view>
		</view>

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

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
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
.users-me-container {
	display:flex;

	.left-container {
		padding:10px;
	}

	.portrait {
		width: 80px;
		height: 80px;
	}

	.main-container {
		padding: 20px 10px;
		.username {
			font-size:16px;
			font-weight: bold;
		}
		.description {
			margin-top:10px;
			font-size:12px;
		}
	}
}
</style>


<template>
	<view class="user-index-container">
		<uni-nav-bar status-bar=true :title="title"></uni-nav-bar>

		<view class="uni-list">
			<view class="uni-list-cell-divider"></view>
			<view @click="go('/pages/user/info')" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<image style="width:70px; height:70px" :src="user.portrait" class="portrait"></image>
					<view class="uni-column uni-list-cell-right uni-list-cell-pd">
						<view class="uni-ellipsis uni-title">{{ user.nickname || ""}}</view>
						<view class="uni-ellipsis uni-text uni-text-gray">{{ "用户名: " + user.username}}</view>
					</view>
				</view>
			</view>

			<view class="uni-list-cell-divider"></view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view @click="go('/pages/debug/index')" class="uni-list-cell-navigate">调试</view>
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

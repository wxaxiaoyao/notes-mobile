
<template>
	<view class="user-info-container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="个人信息"
			@click-left="back">
		</uni-nav-bar>

		<view class="uni-list">
			<view class="uni-list-cell-divider"></view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view>头像</view>
					<image :src="user.portrait" class="portrait"></image>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view>昵称</view>
					<view class="uni-text-gray">{{user.nickname}}</view>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view>用户名</view>
					<view class="uni-text-gray">{{user.username}}</view>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					更多
				</view>
			</view>
		</view>
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

<style lang="less">
.uni-navbar-header .uni-navbar-header-btns {
	width:100%;
}
.user-info-container {
	background-color: rgb(247,247,248);
	height:100%;
}
.portrait {
	width: 60px;
	height: 60px;
}
</style>

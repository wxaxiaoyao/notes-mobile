
<template>
	<view class="users-me-container">
		<view class="left-container">
			<image :src="user.portrait" class="portrait"></image>
		</view>
		<view class="main-container">
			<view class="username">{{ (user.nickname || "") + " " + user.username}}</view>
			<view class="description">{{user.description}}</view>
		</view>
	</view>
</template>

<script>
import component from "../component.js";

export default {
	mixins: [component],

	mounted() {

	}
}
</script>

<style lang="less">
.users-me-container {
	display:flex;
}
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
</style>

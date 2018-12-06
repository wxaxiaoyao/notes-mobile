
<template>
	<view class="navigation-index-container">
		<view class="status-bar"></view>
		<view class="navigator-bar">
			<view class="iconfont icon-back">&#xe612;</view>
		</view>
	</view>
</template>

<script>

export default {

}
</script>

<style lang="less">
.navigation-index-container {
}
.status-bar {
	height: var(--status-bar-height);
}
.navigator-bar {
	height: 44px;
	display: flex;
	align-items: center;

	.icon-back {
		margin-left: 10px;
	}
}
</style>

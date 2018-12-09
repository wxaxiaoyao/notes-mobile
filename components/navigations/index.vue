
<template>
	<view class="navigation-index-container">
		<view class="status-bar"></view>
		<view class="navigator-bar">
			<view class="navigator-bar-left-container">
				<view @click="clickBackBtn" v-show="isShowBackBtn" class="iconfont icon-back">&#xe612;</view>
			</view>
			<view class="navigator-bar-middle-container">{{__data__.title}}</view>
			<view class="navigator-bar-right-container">
			<view></view>
			</view>
		</view>
	</view>
</template>

<script>

export default {

	data: function() {
		return {
			isShowBackBtn:false,
			title: "NOTE",
		}
	},

	props: {
		__data__: {
			type: Object, 
			default: function() {
				return {
					title:"NOTE"
				}
			}
		}
	},

	methods: {
		clickBackBtn() {
			uni.navigateBack({delta:1});
		}
	},

	mounted() {
		const pages = getCurrentPages();
		this.isShowBackBtn = pages.length > 1 ? true : false;
	}
}
</script>

<style lang="less">
.navigation-index-container {
}
.status-bar {
	height: var(--status-bar-height);
}
.navigator-bar {
	background-color: rgb(250,250,250);
	height: 44px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.icon-back {
		margin-left: 10px;
	}
}
</style>

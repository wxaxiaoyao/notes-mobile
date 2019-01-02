<template>
	<view class="m-item">
		<view class="m-left">
			<image class="head_icon" :src="__data__.portrait" v-if="__data__.userId != user.id"></image>
		</view>
		<view class="m-content" :style="{width: contentWidth + 'px'}">
			<view class="m-content-head" :class="[__data__.userId == user.id ? 'm-content-head-right' : 'm-content-head-left']">
				<view :class="[__data__.userId == user.id ? 'm-content-head-customer' : 'm-content-head-home']">
					<view v-if="__data__.type == 0">
						{{__data__.text}} 
					</view>
					<view v-else-if="__data__.type == 1">
						<image :src="__data__.url" :style="{width: contentWidth + 'px', height: contentWidth + 'px'}"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="m-right">
			<image class="head_icon" :src="__data__.portrait" v-if="__data__.userId==user.id"></image>
		</view>
	</view>
</template>

<script>
import _ from "../../libs/lodash.min.js";
import component from "../component.js";
export default {
	mixins:[component],

	props: ["message"],

	data: function() {
		return {
			contentWidth: 0,
			default_data: {
				sessionId:"__rebot__",
				userId: 1,
				username: "xiaoyao",
				portrait: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/customerHL.png",
				text: "你好",
				type: 0,
			},
		}
	},

	beforeMount() {
		this.contentWidth = this.windowWidth - 60 * 2;
	}
}
</script>

<style>
	.m-item {
		display: flex;
		flex-direction: row;
		padding-top: 40upx;
	}
	.m-left {
		display: flex;
		width: 120upx;
		justify-content: center;
		align-items: flex-start;
	}
	.m-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		word-break: break-all;
		max-width: 100%;
	}
	.m-right {
		display: flex;
		width: 120upx;
		justify-content: center;
		align-items: flex-start;
	}
	.head_icon {
		width: 80upx;
		height: 80upx;
	}
	.m-content-head {
		position: relative;
	}
	.m-content-head-right {
		display: flex;
		justify-content: flex-end;
	}
	.m-content-head-left {
		display: flex;
		justify-content: flex-start;
	}
	.m-content-head-home {
		text-align: left;
		background: #1482d1;
		border: 1px #1482d1 solid;
		border-radius: 20upx;
		padding: 20upx;
		color: white;
	}
	.m-content-head-home:before {
		border: 15upx solid transparent;
		border-right: 15upx solid #1482d1;
		left: -26upx;
		width: 0;
		height: 0;
		position: absolute;
		content: ' '
	}
	.m-content-head-customer {
		border: 1upx white solid;
		background: white;
		border-radius: 20upx;
		padding: 20upx;
	}
	.m-content-head-customer:after {
		border: 15upx solid transparent;
		border-left: 15upx solid white;
		top: 20upx;
		right: -26upx;
		width: 0;
		height: 0;
		position: absolute;
		content: ' '
	}
</style>

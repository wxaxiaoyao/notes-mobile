
<template>
	<view class="page-container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="打赏"
			@click-left="back">
		</uni-nav-bar>

		<view class="page-content-container">
			<view class="options-container">
				<view @click="payQRUrl = weixinPayUrl" class="option" :class="{active: payQRUrl == weixinPayUrl}">
					微信
				</view>
				<view @click="payQRUrl = aliPayUrl" class="option" :class="{active: payQRUrl == aliPayUrl}">
					支付宝
				</view>
			</view>
			<view class="pay-image-container">
				<image class="pay-image" :src="payQRUrl"></image>
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

	data: function() {
		return {
			payQRUrl: "http://statics.wxaxiaoyao.cn/weixinpay.png",
			aliPayUrl: "http://statics.wxaxiaoyao.cn/alipay.jpg",
			weixinPayUrl:"http://statics.wxaxiaoyao.cn/weixinpay.png",
		}
	},

	onLoad() {
	}
}
</script>

<style lang="less">
.page-container {
	height:100%;
	width:100%;
	display: flex;
	flex-direction: column;
}

.page-content-container {
	flex:1;
	width:100%;
	position: relative;	
	display: flex;
	flex-direction: column;
}
.options-container {
	width:100%;
	height:40px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size:20px;

	.option {
		width: 60px;
		text-align: center;
	}
	.option.active {
		background-color: darkgrey;
	}
}
.pay-image-container {
	width:100%;
	flex:1;
	display: flex;
	flex-direction: column;
}
.pay-image {
	width:100%;
	flex:1;
}
</style>

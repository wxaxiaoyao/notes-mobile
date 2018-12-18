<template>
	<view class="uni-mask" v-show="__data__.visible" :style="{top:offsetTop + 'px'}" @click="__data__.visible = false">
		<view class="uni-flex uni-popup upgrades-container">
			<view class="uni-h4">下载进度</view>
			<progress :percent="percent" show-info stroke-width="12"/>
		</view>
	</view>
</template>

<script>
import component from "../../components/component.js";
import uniPopup from '../../components/unis/uni-popup.vue';

export default {
	mixins:[component],

	components: {
		"uni-popup": uniPopup,
	},

	data() {
		let offsetTop = 0;
		//#ifdef H5
		offsetTop = 44;
		//#endif
		return {
			offsetTop: offsetTop,
			percent:40,
			default_data: {
				visible: false,
				url:"",
			}
		}
	},

	watch: {
		"__data__.visible": function(visible) {
			this.upgrade();
		}
	},

	methods: {
		upgrade() {
			const url="https://service.dcloud.net.cn/build/download/d91e4d30-02cb-11e9-8232-8b317256730e"; 
			const downloadTask = uni.downloadFile({
				url,
				success: (res) => {
					console.log('downloadFile success, res is', res)
					const filename = res.tempFilePath;
					plus.runtime.install(filename);
					uni.hideLoading();
				},
				fail: (err) => {
					console.log('downloadFile fail, err is:', err)
					uni.hideLoading();
					uni.showToast({title:"下载失败", icon:"none"});
				}
			});
		}
	},

	mounted() {
	}
}
</script>

<style lang="less">
.uni-mask {
	position: fixed;
	z-index: 998;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, .3);
}
.uni-popup {
	position: absolute;
	z-index: 999;
	background-color: #ffffff;
	box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
}
.upgrades-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80%;
	border-radius: 10upx;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	justify-content: center;
	padding: 30upx;
	height: 100px;
}
</style>

<template>
	<view class="footer">
		<view class="footer-left">
			<view class="uni-icon uni-icon-mic" @tap="startRecognize"> </view>
		</view>
		<view class="footer-center">
			<input class="input-text" type="text" v-model="inputValue"></input>
		</view>
		<view class="footer-right" >
			<view @tap="sendMessage" v-if="inputValue">发送</view>
			<view @click="clickImage" v-else >图片</view>
		</view>
	</view>
</template>

<script>
import component from "../component.js";
import uniIcon from "../unis/uni-icon.vue";

export default {
	mixins: [component],
	
	components: {
		"uni-icon":uniIcon,
	},

	data() {
		return {
			inputValue: ''
		}
	},

	methods: {
		startRecognize: function () {
			var options = {};
			var that = this;
			options.engine = 'iFly';
			that.inputValue = "";
			plus.speech.startRecognize(options, function (s) {
				console.log(s);
				that.inputValue += s;
			}, function (e) {
				console.log("语音识别失败：" + e.message);
			});
		},
		sendMessage: function () {
			var that = this;
			if (that.inputValue.trim() == '') {
				that.inputValue = '';
				return;
			}
			
			//点击发送按钮时，通知父组件用户输入的内容
			this.__data__.sendMessage && this.__data__.sendMessage({text: this.inputValue});
			that.inputValue = '';
		},
		clickImage() {
			uni.chooseImage({
				sizeType: ['compressed'],
				sourceType: ['album'],
				success: (res) => {
					this.app._.each(res.tempFilePaths, filepath => {
						uni.uploadFile({
							url: this.app.config.baseURL + "files/sessionUpload",
							name: "file",
							filePath: filepath,
							header: {"Authorization": "Bearer " + this.token},
							success: async (res) => {
								console.log('uploadImage success, res is:', res)
								const url = res.data;
								this.__data__.sendMessage && this.__data__.sendMessage({url, type:1});
							},
							fail: (err) => {
								console.log('uploadImage fail', err);
							},
							complete: () => {
								console.log("complate")
							}
						});
					});
				},
				fail: (err) => {
					console.log('chooseImage fail', err)
					uni.hideLoading();
				},
				complete: () => {
					console.log("---");
				}
			});
		}
	}
}
</script>

<style>
	.footer {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 80upx;
		min-height: 80upx;
		border-top: solid 1px #bbb;
		overflow: hidden;
		padding: 5upx;
		background-color: #fafafa;
	}
	.footer-left {
		width: 80upx;
		height: 80upx;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.footer-right {
		width: 120upx;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #1482D1;
	}
	.footer-center {
		flex: 1;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.footer-center .input-text {
		flex: 1;
		background: #fff;
		border: solid 1upx #ddd;
		padding: 10upx !important;
		font-family: verdana !important;
		overflow: hidden;
		border-radius: 15upx;
	}
</style>

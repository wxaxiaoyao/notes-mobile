
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
			<view @click="clickPortrait" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-media-list uni-pull-right">
					<view class="uni-media-list-logo">
						<image :src="user.portrait"></image>
					</view>
					<view class="uni-media-list-body" style="justify-content:center">
						头像
					</view>
				</view>
			</view>
			<view @click="clickNickname" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view>昵称</view>
					<view class="uni-text-gray">{{user.nickname}}</view>
				</view>
			</view>
			<view @click="clickUsername" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view>用户名</view>
					<view class="uni-text-gray">{{user.username}}</view>
				</view>
			</view>
			<view @click="clickQR" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view>二维码名片</view>
					<view class="iconfont">&#xe693;</view>
				</view>
			</view>
			<view @click="clickMore" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					更多
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import queryString from 'query-string';
import config from "../../commons/config.js";
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
	},

	data() {
		return {
		}
	},
	onLoad() {
		this.authenticated();
		this.title = this.user.username;
	},
	methods: {
		clickPortrait() {
			uni.showLoading({});
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album'],
				success: (res) => {
					console.log('chooseImage success, temp path is', res.tempFilePaths[0])
					const imageSrc = res.tempFilePaths[0]
					uni.uploadFile({
						url: config.baseURL + "files/upload",
						filePath: imageSrc,
						name: 'file',
						header: {"Authorization": "Bearer " + this.token},
						success: async (res) => {
							console.log('uploadImage success, res is:', res)
							const url = res.data;
							if (res.statusCode !== 200) {
								uni.hideLoading();
								uni.showToast({title:"更换头像失败"});
								return;
							}

							this.user.portrait = url;
							this.setUser(this.user);

							const result = await this.api.users.update({portrait:url, id: this.user.id});
							if (result.isErr()) {
								uni.hideLoading();
								uni.showToast({title:"更换头像失败"});
								return;
							}

							uni.hideLoading();
							uni.showToast({
								title: '更换头像成功',
								icon: 'success',
								duration: 1000
							});
						},
						fail: (err) => {
							console.log('uploadImage fail', err);
							uni.showModal({
								content:err.errMsg,
								showCancel:false
							});
							uni.hideLoading();
						},
						complete: () => {
							console.log("complate")
						}
					})

				},
				fail: (err) => {
					console.log('chooseImage fail', err)
					uni.hideLoading();
				},
				complete: () => {
					console.log("---");
				}
			});
		},

		clickNickname() {
			this.go("/pages/user/info-modify", {title:"更改昵称", key:"nickname", value: this.user.nickname});
		},

		clickUsername() {
			this.go("/pages/user/info-modify", {title:"更改用户名", key:"username", value: this.user.username});
		},

		clickMore() {
			this.go("/pages/user/info-more");
		},

		clickLogoutBtn() {
			uni.reLaunch({url:"/pages/login/index"});
			this.setUser();
		},

		clickQR() {
			this.go("/pages/user/qrcard");
		},
	}
}
</script>

<style lang="less">
</style>

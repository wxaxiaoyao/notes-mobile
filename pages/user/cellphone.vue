
<template>
	<view class="login-container uni-column">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="手机绑定"
			:right-text="user.cellphone == cellphone ? '解绑' : '绑定'"
			@click-right="clickSubmit"
			@click-left="back">
		</uni-nav-bar>

		<view class="uni-form-item uni-flex cellphone-input-container">
			<view class="title">手机号</view>
			<input class="uni-input" v-model="cellphone" placeholder="用户名">
			<view @click="clickSendCaptcha" class="captcha-text">
				{{captchaText}}
			</view>
		</view>

		<view class="uni-form-item uni-flex">
			<view class="title">验证码</view>
			<input class="uni-input" v-model="captcha" placeholder="验证码">
		</view>

		<view v-if="user.cellphone" class="tip-info">
			当前账号已绑定手机号: {{user.cellphone}}
		</view>
	</view>
</template>

<script>
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";

export default {
	mixins: [component],

	components: {
		"uni-nav-bar": uniNavBar,
	},

	data: function() {
		return {
			cellphone:"",
			captcha:"",
			captchaText: "发送验证码",
			timeout: undefined,
		}
	},

	onLoad() {
		this.cellphone = this.user.cellphone || "";
	},

	methods: {
		async clickSendCaptcha() {
			if (this.timeout || !this.cellphone) return;
			const result = await this.api.users.captcha({key: this.cellphone, type:0});
			//if (result.isErr()) return uni.showToast({title:"验证发送失败"});
			this.timeout = 60;
			this.timer = setInterval(_ => {
				this.timeout--;
				this.captchaText = `请等候 ${this.timeout}`;
				if (this.titmeout == 0) {
					this.captchaText = "发送验证码";
					cleanInterval(this.timer);
				}
			}, 1000);
		},

		async clickSubmit() {
			const result = await this.api.users.cellphoneBind({
				cellphone: this.cellphone,
				captcha: this.captcha,
				bind: this.user.cellphone == this.cellphone ? false : true,
			});

			if (result.isErr()) return uni.showToast({title:result.error.message, icon:"none"});

			this.user.cellphone = cellphone;
			this.setUser(this.user);

			this.back();
		}
	}

}
</script>

<style lang="less">
.login-container {
}

.title {
	display: flex;
	align-items: center;
	justify-content: center;
	flex:2;
}
.uni-input {
	flex:8;
}
.tip-info {
	margin:10px 20px;
}
.cellphone-input-container {
	position: relative;
}
.captcha-text {
	position: absolute;
	right: 16px;
	z-index:10;
	height:100%;
	display: flex;
	align-items:center;
}
</style>

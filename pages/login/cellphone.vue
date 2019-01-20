
<template>
	<view class="login-container uni-column">
		<uni-nav-bar status-bar=true title="notes-登陆"></uni-nav-bar>

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

		<view class=uni-btn-v>
			<button @click="clickLoginBtn">登陆</button>
		</view>

		<view class="tip-info">
			<navigator url="/pages/login/index" open-type="reLaunch" hover-class="navigator-hover">账号密码登陆</navigator>	
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

		async clickLoginBtn() {
			const result = await this.api.users.cellphoneLogin({
				cellphone: this.cellphone,
				captcha: this.captcha,
			});

			if (result.isErr()) return uni.showToast({title:"验证码错误", icon:"none"});
			const user = result.data;

			this.setUser(user);

			uni.reLaunch({url:"/pages/index/index"});
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
	display:flex;
	justify-content: space-between;

	uni-navigator {
		/*margin-right:20px;*/
	}
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

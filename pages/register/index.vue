
<template>
	<view class="login-container">
		<view class="username-input-container">
			<input class="input" v-model="username" placeholder="用户名">
		</view>

		<view class="password-input-container">
			<input class="input" v-model="password" password placeholder="密码">
		</view>

		<view>
			<button @tap="clickRegisterBtn">注册</button>
		</view>

		<view class="login-link-container">
			<navigator url="/pages/login/index" open-type="reLaunch" hover-class="navigator-hover">已有账号 去登录</navigator>	
		</view>
	</view>
</template>

<script>
import component from "../../components/component.js";

export default {
	mixins: [component],

	data: function() {
		return {
			username:"",
			password:"",
		}
	},

	methods: {
		async clickLoginBtn() {
			const result = await this.api.users.register({username:this.username, password: this.password});
			if (result.isErr()) return uni.showToast({title:"用户已存在", icon:"none"});
			const user = result.data || {};
			this.setUser(user);

			uni.reLaunch({url:"/pages/index/index"});
		}
	}

}
</script>

<style lang="less">
.login-container {

}
.username-input-container, .password-input-container input {
	margin: 10px 0px;
	width:100%;
}

.login-link-container {
	margin:10px 20px;
	display:flex;
	justify-content: flex-end;

	uni-navigator {
		/*margin-right:20px;*/
	}
}
</style>

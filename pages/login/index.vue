
<template>
	<view class="login-container">
		<view class="username-input-container">
			<input class="input" v-model="username" placeholder="用户名">
		</view>

		<view class="password-input-container">
			<input class="input" v-model="password" password placeholder="密码">
		</view>

		<view>
			<button @tap="clickLoginBtn">登陆</button>
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
			const result = await this.api.users.login({username:this.username, password: this.password});
			if (result.isErr()) return uni.showToast({title:"用户名密码错误", icon:"none"});
			const user = result.data || {};
			this.setUser(user);

			uni.reLaunch({url:"/pages/index/index"});
		}
	}

}
</script>

<style>
.login-container {

}
.username-input-container, .password-input-container input {
	margin: 10px 0px;
	width:100%;
}
</style>

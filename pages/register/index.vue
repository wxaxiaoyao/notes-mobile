
<template>
	<view class="register-container">
		<uni-nav-bar status-bar=true title="notes-注册"></uni-nav-bar>

		<view class="uni-form-item uni-flex">
			<view class="title">用户名</view>
			<input class="uni-input" v-model="username" placeholder="用户名">
		</view>

		<view class="uni-form-item uni-flex">
			<view class="title">密  码</view>
			<input class="uni-input" v-model="password" password placeholder="密码">
		</view>

		<view class=uni-btn-v>
			<button @click="clickRegisterBtn">注册</button>
		</view>

		<view class="login-link-container">
			<navigator url="/pages/login/index" open-type="reLaunch" hover-class="navigator-hover">已有账号 去登录</navigator>	
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
			username:"",
			password:"",
		}
	},

	methods: {
		async clickRegisterBtn() {
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
.title {
	display: flex;
	align-items: center;
	justify-content: center;
	flex:2;
}
.uni-input {
	flex:8;
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

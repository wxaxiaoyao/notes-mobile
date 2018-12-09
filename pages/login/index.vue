
<template>
	<view class="login-container uni-column">
		<uni-nav-bar status-bar=true title="notes-登陆"></uni-nav-bar>

		<view class="uni-form-item uni-flex">
			<view class="title">用户名</view>
			<input class="uni-input" v-model="username" placeholder="用户名">
		</view>

		<view class="uni-form-item uni-flex">
			<view class="title">密  码</view>
			<input class="uni-input" v-model="password" password placeholder="密码">
		</view>

		<view class=uni-btn-v>
			<button @click="clickLoginBtn">登陆</button>
		</view>

		<view class="register-link-container">
			<navigator url="/pages/register/index" open-type="reLaunch" hover-class="navigator-hover">没有账号 去注册</navigator>	
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
.register-link-container {
	margin:10px 20px;
	display:flex;
	justify-content: flex-end;

	uni-navigator {
		/*margin-right:20px;*/
	}
}
</style>

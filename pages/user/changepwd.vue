

<template>
	<view class="container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="更新密码"
			right-text="提交"
			@click-right="clickSubmit"
			@click-left="back">
		</uni-nav-bar>

		<view class="form-container">
			<view class="form-item-container">
				<view class="input-label">旧密码</view>
				<view class="uni-input">
					<input password v-model="oldpassword"/>
				</view>
			</view>
			<view class="form-item-container">
				<view class="input-label">新密码</view>
				<view class="uni-input">
					<input password v-model="newpassword"/>
				</view>
			</view>
			<view class="form-item-container">
				<view class="input-label">确认密码</view>
				<view class="uni-input">
					<input password v-model="confrimPassword"/>
				</view>
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

	data() {
		return {
			oldpassword:"",
			newpassword:"",
			confrimPassword:"",
		}
	},

	computed: {
	},

	onLoad() {
	},
	methods: {
		async clickSubmit() {
			if (!this.oldpassword || !this.newpassword || !this.confrimPassword) {
				return uni.showToast({title:"密码不能为空", icon:"none"});
			}
			if (this.newpassword != this.confrimPassword) {
				return uni.showToast({title:"两次密码不一致", icon: "none"});
			}

			const result = await this.api.users.changepwd({
				password: this.newpassword,
				oldpassword: this.oldpassword,
			});

			if (result.isErr()) return uni.showToast({title:"密码错误", icon:"none"});

			uni.showToast({title:"密码修改成功"});
			this.back();
		}
	}
}
</script>

<style>
.input-label {
	width:80px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.form-item-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:2px;
}
.container {
	height: 100%;
}
</style>

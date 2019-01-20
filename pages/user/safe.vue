
<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="账号与安全"
			@click-left="back">
		</uni-nav-bar>

		<view class="uni-list">
			<view class="uni-list-cell-divider"></view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					<view>账号</view>
					<view class="uni-text-gray">{{user.username}}</view>
				</view>
			</view>
			<view @click="clickCellphone" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view>手机号</view>
					<view class="uni-text-gray">{{user.cellphone}}</view>
				</view>
			</view>
			<view @click="clickPassword" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view>账号密码</view>
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
		}
	},

	computed: {
	},

	onLoad() {
	},
	methods: {
		clickCellphone() {
			this.go("/pages/user/cellphone");
		},
		clickPassword() {
			this.go("/pages/user/changepwd");
		}
	}

}
</script>

<style>
</style>

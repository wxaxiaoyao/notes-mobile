
<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="设置"
			@click-left="back">
		</uni-nav-bar>

		<view class="uni-list">
			<view class="uni-list-cell-divider"></view>
			<view @click="clickAccountAndSafe" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view>账号与安全</view>
				</view>
			</view>
			<view @click="clickCheckVersion" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view>版本检测</view>
					<view class="uni-text-gray">{{version}}</view>
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
		version() {
			const version = this.app.config.version;
			const name = version.versionName;
			const no = version.versionNo;
			
			return `当前版本: ${name} ${no}`;
		}

	},

	onLoad() {
	},
	methods: {
		clickAccountAndSafe() {
			this.go("/pages/user/safe");
		},

		async clickCheckVersion() {
			const version = await this.checkVersion();
			if (!version) {
				uni.showToast({title:"已是最新版本", icon:"none"});
			}
		}
	}

}
</script>

<style>
</style>

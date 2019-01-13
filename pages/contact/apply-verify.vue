
<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-text="验证申请"
			left-icon="back" 
			right-text="发送"
			@click-right="clickSend"
			@click-left="back">
		</uni-nav-bar>

		<view class="uni-textarea">
			<textarea v-model="legend"/>
		</view>

	</view>
</template>

<script>
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import uniIcon from "../../components/unis/uni-icon.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"uni-icon": uniIcon,
	},

	data() {
		return {
			legend:"",
		}
	},

	onLoad() {
		const {objectId, objectType = 0} = this.getPageArgs();
		this.authenticated();
		this.legend = this.user.nickname || this.user.username;
		this.apply = {
			applyId: this.user.id,
			applyType: 0,
			objectId,
			objectType,
		};
	},

	methods: {
		back() {
			this.go("/pages/contact/apply", undefined, "redirectTo");
		},
		async clickSend() {
			this.apply.legend = this.legend;
			const result = await this.api.applies.create(this.apply);
			if (result.isErr()) return uni.showToast({title:"发送失败", icon:"none"});

			uni.showToast({title:"发送成功"});

			this.back();
		}
	}
}
</script>

<style lang="less" scoped>
</style>

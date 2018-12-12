
<template>
	<view class="user-info-modify-container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			:left-text="title"
			right-text="保存"
			@click-right="clickSave"
			@click-left="back">
		</uni-nav-bar>

		<textarea v-if="type == 'textarea'" v-model="value" class="uni-textarea" :maxlength="maxlength" auto-height />
		<input v-else v-model="value" class="uni-input"/>
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
			title:"",
			value: "",
			type: "",
			maxlength: 140,
		}
	},
	onLoad(options) {
		const {title, key, value} = options;
		this.title = title;
		this.value = value;
		this.type = options.type || "input";
		this.maxlength = options.maxlength || 140;
		this.options = options;
	},

	methods: {
		async clickSave() {
			if (this.value == this.options.value) return this.back();

			const result = await this.api.users.update({[this.options.key]: this.value, id: this.user.id});
			if (result.isErr()) return uni.showToast({title:"更新失败"});

			this.user[this.options.key] = this.value;
			this.setUser(this.user);

			this.back();
		}
	}
}
</script>

<style lang="less" scoped>
</style>

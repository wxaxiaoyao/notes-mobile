
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

		<view v-if="type == 'textarea'" class="uni-textarea">
			<textarea v-model="value" :placeholder="placeholder" :maxlength="maxlength"/>
		</view>
		<input v-else v-model="value" :placeholder="placeholder" class="uni-input"/>
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
			placeholder:"",
		}
	},
	onLoad(options) {
		const {title, key, value="", type="input", maxlength=140, placeholder=""} = this.getPageArgs();
		this.title = title;
		this.value = value;
		this.key = key;
		this.type = type;
		this.maxlength = maxlength;
		this.placeholder = placeholder;
	},

	methods: {
		async clickSave() {
			const result = await this.api.users.update({[this.key]: this.value, id: this.user.id});
			if (result.isErr()) {
				if (this.key == "username") {
					return uni.showToast({title:"用户名已存在", icon:"none"});
				} else {
					return uni.showToast({title:"更新失败", icon:"none"});
				}
			} 
			this.user[this.key] = this.value;
			this.setUser(this.user);
			this.back();
		}
	}
}
</script>

<style lang="less" scoped>
</style>

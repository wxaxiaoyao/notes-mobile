
<template>
	<view class="user-info-container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="添加标签"
			right-text="保存"
			@click-right="clickSave"
			@click-left="back">
		</uni-nav-bar>

		<view class="new-tag-container">
		</view>
		<view class="tags-container">
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
			contact:{extra:{}},
		}
	},
	async onLoad({id = 0}) {
		this.contact = await this.api.contacts.getById({id}).then(res => res.data);
	},
	methods: {
		clickSave() {
			console.log(this.contact);
		}
	}
}
</script>

<style lang="less">
.title {
	padding:10px 0 !important;
}
</style>


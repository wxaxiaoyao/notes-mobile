
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
		<view class="uni-flex">
			<uni-tag v-for="(x, i) in tags" :key="x.id" :text="x.tagname"></uni-tag>
		</view>
	</view>
</template>

<script>
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import uniTag from "../../components/unis/uni-tag.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"uni-tag": uniTag,
	},

	data() {
		return {
			newTags:[],
			tags:[],
		}
	},
	async onLoad({id = 0, tags:[]}) {
		this.newTags = tags;
		this.tags = await this.api.classifyTags.get({classify:1});
	},
	methods: {
		clickSave() {
		}
	}
}
</script>

<style lang="less">
</style>


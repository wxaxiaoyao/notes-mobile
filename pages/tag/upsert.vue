<template>
	<view class="page-container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="所有标签"
			right-text="提交"
			@click-right="clickSubmitBtn"
			@click-left="back">
		</uni-nav-bar>

		<view>
			<view class="uni-input">
				<input v-model="tag.tagname" placeholder="标签名称"/>
			</view>
		</view>

		<view v-if="tag.id">
			<button @click="clickDelete">删除</button>
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
			tag:{
				tagname:"",
			},
		}
	},

	async onLoad() {
		this.tag = this.getPageArgs();
	},

	async onUnload() {
	},

	onShow() {
	},

	async onPullDownRefresh() {
	},

	methods: {
		async clickSubmitBtn() {
			if (this.tag.id) {
				await this.api.tags.update(this.tag);
			} else {
				const result = await this.api.tags.create(this.tag);
				this.tag = result.data || this.tag;
			}
			this.back({action:"upsert", tag:this.tag});
		},
		async clickDelete() {
			if (!this.tag.id) return;

			await this.api.tags.destroy({id:this.tag.id});``

			return this.back({action:"delete", tag:this.tag});
		}
	},
}
</script>

<style lang="less" scoped>
</style>

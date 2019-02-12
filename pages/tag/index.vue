<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="所有标签"
			@click-right="clickCreate"
			right-icon="plusempty"
			@click-left="back">
		</uni-nav-bar>

		<view class="uni-list">
			<view @tap="clickUpdate(x)" v-for="(x, i) in tags" :key="x.id" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					{{x.tagname + "(" + (x.count || 0) + ")"}}
				</view>
			</view>
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
			tags:[],
		}
	},

	async onLoad() {
		const query = this.getPageArgs();
		const {classify=0} = query;
		this.classify = classify;
		this.tags = await this.api.tags.get({classify}).then(res => res.data || []);
	},

	async onUnload() {
		this.subpage = "";
	},

	onShow() {
		const {action, tag} = this.getBackArgs();
		console.log(tag);
		if (!tag || !tag.id) return;
		const index = this.tags.findIndex(o => o.id == tag.id);
		if (action == "delete" && index >= 0) this.tags.splice(index, 1);
		else this.tags.splice(index, index < 0 ? 0 : 1, tag);
	},

	async onPullDownRefresh() {
	},

	methods: {
		clickCreate() {
			this.go("/pages/tag/upsert", {classify:this.classify});
		},
		clickUpdate(x) {
			this.go("/pages/tag/upsert", x);
		},
	}
}
</script>

<style lang="less" scoped>
</style>


<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="所有标签"
			right-text="新建"
			@click-right="clickNewTag"
			@click-left="back">
		</uni-nav-bar>
		<view class="uni-list">
			<view @longtag="tagLongtap" @tap="tagTap(x)" v-for="(x, i) in tags" :key="x.id" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					{{x.tagname + "(" + x.objectTags.length + ")"}}
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
		this.authenticated();
		this.tags = await this.api.classifyTags.get({classify:this.app.consts.CLASSIFY_TAG_CONTACT}).then(res => res.data || []);
	},

	async onUnload() {
		this.subpage = "";
	},

	onShow() {
		if (this.subpage == "tag-modify") {
			const tag = this.getBackArgs();
			const index = this.app._.findIndex(this.tags, o => o.id == tag.id);
			this.tags.splice(index, 1, tag);
		}
	},

	async onPullDownRefresh() {
	},

	methods: {
		clickNewTag() {

		},
		tagLongtap(e) {
			console.log(e);
		},
		tagTap(x) {
			this.subpage = "tag-modify";
			this.go("/pages/contact/tag-modify", x);
		},
	}
}
</script>

<style lang="less" scoped>
</style>

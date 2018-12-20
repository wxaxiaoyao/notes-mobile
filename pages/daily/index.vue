
<template>
	<view>
		<uni-nav-bar status-bar=true left-icon="back" left-text="返回" @click-left="back" title="日报" right-text="新增" @click-right="clickNewBtn"></uni-nav-bar>
		<view class="uni-list">
			<view v-for="(x, i) in dailies" :key="i" @click="clickEditBtn(x)" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-flex uni-column uni-flex-item uni-list-cell-pd">
					<view class="uni-inline-item" style="justify-content: space-between">
						<view class="uni-title">
							{{x.date}}
						</view>
						<tags-index :__data__="{tags: x.tags, size:'small', inverted:true}"></tags-index>
					</view>
					<view class="uni-text">
						{{x.content}}
					</view>
				</view>
			</view>
			<uni-load-more :loadingType="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import uniLoadMore from "../../components/unis/uni-load-more.vue";
import tagsIndex from "../../components/tags/index.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"uni-load-more": uniLoadMore,
		"tags-index": tagsIndex,
	},

	data: function() {
		return {
			query: {
				"x-per-page":50,
				"x-page":1,
				"x-order":"date-desc",
			},
			dailies:[],
			loadingType: 0,
		}
	},

	methods: {
		clickBackBtn() {
			uni.navigateBack({delta:1});
		},
		clickNewBtn() {
			uni.navigateTo({url:"/pages/daily/upsert"});
		},
		clickEditBtn(x) {
			uni.navigateTo({url:"/pages/daily/upsert?id=" + x.id});
		},
		async loadDailies(query) {
			if (this.loading) return Promise.resolve([]);
			this.loading = true;
			query = query || this.query;
			const result = await this.api.dailies.get(query);
			this.dailies = this.dailies.concat(result.data || []);
			this.query["x-page"]++;
			this.loading = false;
			return result.data || [];
		},
		async initPageData() {
			this.query["x-page"] = 1;
			this.dailies = [];
			await this.loadDailies();
		}
	},

	async onLoad() {
		await this.initPageData();
	},

	async onShow() {
		await this.initPageData();
	},

	async onReachBottom() {
		if (this.loadingType !== 0) return;
		this.loadingType = 1;

		const datas = await this.loadDailies();

		this.loadingType = datas.length ? 0 : 2;
	},

	async mounted() {
	},
}
</script>

<style lang="less" scoped>
</style>

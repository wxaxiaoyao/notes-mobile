<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back" 
			title="页面" 
			right-text="新增" 
			@click-right="clickNewBtn">
		</uni-nav-bar>
		<view class="uni-list">
			<view v-for="(x, i) in pages" :key="i" @click="clickEditBtn(x)" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view class="uni-ellipsis">
						{{x.url}}
					</view>
					<view class="uni-text-gray">
						{{x.updatedTime}}
					</view>
				</view>
			</view>
			<uni-load-more :loadingType="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
import moment from "moment";
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import uniLoadMore from "../../components/unis/uni-load-more.vue";

moment.locale("zh-cn");

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"uni-load-more": uniLoadMore,
	},

	data: function() {
		return {
			query: {
				"x-per-page":50,
				"x-page":1,
				"x-order":"updatedAt-desc",
			},
			pages:[],
			loadingType: 0,
		}
	},

	methods: {
		clickNewBtn() {
			uni.navigateTo({url:"/pages/page/upsert"});
		},
		clickEditBtn(x) {
			uni.navigateTo({url:"/pages/page/upsert?id=" + x.id});
		},
		formatPage(page) {
			page.updatedTime = moment(page.updatedAt).fromNow();
			return page;
		},
		async loadPages(query) {
			if (this.loading) return Promise.resolve([]);
			this.loading = true;
			query = query || this.query;

			const result = await this.api.pages.get(query);
			const pages = _.map(result.data || [], this.formatPage);
			this.pages = this.pages.concat(pages);
			this.query["x-page"]++;
			this.loading = false;
			//console.log(this.pages);
			return pages;
		},
		async initPageData() {
			this.query["x-page"] = 1;
			this.pages = [];
			await this.loadPages();
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

		const datas = await this.loadPages();

		this.loadingType = datas.length ? 0 : 2;
	},
}
</script>

<style lang="less" scoped>
</style>


<template>
	<view class="daily-index-container">
		<uni-nav-bar status-bar=true left-icon="back" left-text="返回" @click-left="back" title="日报" right-text="新增" @click-right="clickNewBtn"></uni-nav-bar>
		<scroll-view class="dailies-list-container" scroll-y @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
			<view v-for="(x, i) in dailies" :key="i" @click="clickEditBtn(x)" class="daily-container">
				<view class="date">
					{{x.date}}
				</view>
				<view class="content">
					{{x.content}}
				</view>
			</view>
			<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		</scroll-view>	
	</view>
</template>

<script>
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import uniLoadMore from "../../components/unis/uni-load-more.vue";

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
				"x-order":"date-desc",
			},
			dailies:[],
			loadingType: 0,
			contentText: {
				contentdown: "上拉显示更多",
				contentrefresh: "正在加载...",
				contentnomore: "没有更多数据了"
			}
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
			//uni.showLoading({title:"加载中..."});
			query = query || this.query;
			const result = await this.api.dailies.get(query);
			this.dailies = this.dailies.concat(result.data || []);
			//uni.hideLoading();

			this.query["x-page"]++;

			return result.data || [];
		},
		upper(e) {
			console.log(e);
		},
		lower(e) {
			console.log(e);
		},
		scroll(e) {
			//console.log(e);
		},
	},

	async onLoad() {
		await this.loadDailies();
	},

	async onReachBottom() {
		if (this.loadingType !== 0) return;
		this.loadingType = 1;

		const datas = await this.loadDailies();

		this.loadingType = datas.length ? 0 : 2;
	},

	async mounted() {
	},

	async onShow() {
		this.query["x-page"] = 1;
		this.dailies = [];
		await this.loadDailies();
	},

	onHide() {
	}
}
</script>

<style lang="less" scoped>
.dailies-list-container {
	height:100%;
}

.daily-container {
	display:flex;
	flex-direction:column;
	padding:5px;
	border-bottom: 1px solid gray;

	.date {
		//text-align:center;
	}
}
</style>

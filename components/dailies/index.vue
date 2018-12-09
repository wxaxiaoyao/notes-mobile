
<template>
	<view class="dailies-index-container">
		<scroll-view class="dailies-list-container" scroll-y @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
			<view v-for="(x, i) in dailies" :key="i" class="daily-container">
				<view class="date">
					{{x.date}}
				</view>
				<view class="content">
					{{x.content}}
				</view>
			</view>
			<button @tap="clickMoreBtn">加载更多...</button>
		</scroll-view>	
	</view>
</template>

<script>
import component from "../component.js";

export default {
	mixins:[component],

	data: function() {
		return {
			query: {"x-per-page":50, "x-page":1},
			dailies:[],
		}
	},

	methods: {
		async loadDailies(query) {
			console.log(process.env.NODE_ENV);
			query = query || this.query;
			const result = await this.api.dailies.get(query);
			this.dailies = this.dailies.concat(result.data || []);
		},
		async clickMoreBtn() {
			this.query["x-page"]++;
			await this.loadDailies();
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
	async mounted() {
		await this.loadDailies();
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

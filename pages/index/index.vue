
<template>
	<view class="index-page-container">
	<navigations></navigations>
		<view class="entries">
			<view class="entry-item-container">
				<navigator url="/pages/daily/index">日报</navigator>
			</view>
			<view class="entry-item-container">
				<navigator url="/pages/daily/index"></navigator>
			</view>
			<view class="entry-item-container">
				<navigator url="/pages/daily/index"></navigator>
			</view>
		</view>
	</view>
</template>

<script>
			//"app-plus": {
				//"titleNView": false
			//},
			//"h5": {
				//"titleNView": false
			//},
		//<navigations></navigations>
import component from "../../components/component.js";
import navigations from "../../components/navigations/index.vue";

export default {
	mixins:[component],

	components: {
		navigations,
	},

	data() {
		return {
		}
	},
	async onLoad() {
		this.authenticated();
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.index-page-container {
	width:100%;
	height:100%;
}
.entries {
	display:flex;

	.entry-item-container {
		flex:1;
		height:100px;
		border:1px solid gray;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>

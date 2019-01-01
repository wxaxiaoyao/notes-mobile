<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="附近的人"
			@click-left="back">
		</uni-nav-bar>
		<view class="uni-list">
			<view v-for="(x, i) in users" :key="i" 
				@click="clickUser(x)" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-media-list">
					<view class="uni-media-list-logo">
						<image :src="x.portrait"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{x.nickname || x.username}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{x.distance + "m"}}</view>
					</view>
				</view>
			</view>
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
			users:[],
		}
	},

	onLoad() {
		//#ifdef H5
			this.getNearBy({latitude:22.621605, longitude:114.036362});
		//#endif

		//#ifndef H5
		uni.getLocation({
			success: res => {
				const longitude = res.longitude;
				const latitude = res.latitude;
				this.api.locations.upsert({latitude, longitude});
				this.getNearBy({latitude, longitude});
			},
			fail: res => {
				uni.showToast({title:"获取位置失败", icon:"none"});
				//console.log(res);
			},
			complete: res => {
			}
		});
		//#endif
	},

	async onPullDownRefresh() {
	},

	methods: {
		async getNearBy(opt = {}) {
			const list = await this.api.locations.getNearBy(opt).then(res => res.data || []);
			console.log(JSON.stringify(list));
			this.users = list;
		},
		clickUser() {
		
		}
	}
}
</script>

<style lang="less" scoped>
</style>

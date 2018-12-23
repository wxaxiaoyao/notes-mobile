
<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-text="新朋友"
			left-icon="back" 
			@click-left="back">
		</uni-nav-bar>

		<view class="uni-list">
			<view class="search-container">
				<uni-icon type="search"></uni-icon>
				<input class="search-input" @input="searchInput" placeholder="请输入用户名" />
			</view>
			<view v-for="(x, i) in users" :key="x.username" 
				@click="clickApplyVerify(x)"
				class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-media-list">
					<view class="uni-media-list-logo">
						<image :src="x.portrait"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{x.username}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">
							{{(x.nickname || "") + " " + (x.description || "")}}
						</view>
					</view>
				</view>
			</view>

			<view class="uni-list-cell-divider">新朋友</view>

			<view v-for="(x, i) in applies" :key="i" class="uni-list-cell">
				<view class="uni-media-list">
					<view class="uni-media-list-logo">
						<image :src="x.apply.portrait || ''"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{x.apply.username}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">
							{{x.legend || ""}}
						</view>
					</view>
					<view class="uni-flex" style="align-items:center">
						<view v-if="x.state == 0" class="uni-flex">
							<button @click="clickOperBtn(x, 1)" class="oper-btn" size="mini">同意</button>
							<button @click="clickOperBtn(x, 2)" class="oper-btn" size="mini">拒绝</button>
						</view>
						<view v-else>
							{{x.state == 1 ? "已同意" : "已拒绝"}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import uniIcon from "../../components/unis/uni-icon.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"uni-icon": uniIcon,
	},

	data() {
		return {
			title:"",
			applies:[],
			users:[],
		}
	},

	async onLoad() {
		this.authenticated();
		const userId = this.user.id;
		this.applies = await this.api.applies.get({objectId:userId, objectType:0, applyType:0}).then(o => o.data || []);
	},

	methods: {
		back() {
			this.go("/pages/contact/index", undefined, "switchTab");
		},
		searchInput(e) {
			const username = e.detail.value;
			clearTimeout(this.timer);

			if (!username) {
				this.users = [];
				return;
			}

			this.timer = setTimeout(async () => {
				const result = await this.api.users.search({"username-like":`%${username}%`});
				this.users = result.data.rows || [];
			}, 300);
		},

		async clickOperBtn(x, state) {
			console.log(x, state);
			x.state = state;
			await this.api.applies.setState({id:x.id, state});
		},

		clickApplyVerify(x) {
			this.go("/pages/contact/apply-verfiy", {objectId: x.userId}, "redirectTo");
		},
	}
}
</script>

<style lang="less" scoped>
.search-container {
	display: flex;
	padding:10px 15px;

	input {
		flex:1;
		margin: 0px 8px;
	}
}
.oper-btn {
	margin:0px 2px;
}
</style>

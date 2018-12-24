
<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-text="发起群聊"
			left-icon="back" 
			:right-text="rightText"
			@click-right="clickConfirm"
			@click-left="back">
		</uni-nav-bar>
		<view class="uni-list">
			<view class="search-container">
				<uni-icon type="search"></uni-icon>
				<input class="search-input" @input="searchInput" placeholder="请输入用户名" />
			</view>

			<view class="uni-list-cell-divider"></view>
			<label v-for="(x, i) in contacts" :key="x.id" 
				@click="clickContact(x)" 
				class="uni-list-cell" 
				hover-class="uni-list-cell-hover">
				<view class="uni-media-list">
					<view class="uni-media-list-logo">
						<image :src="x.user.portrait"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{x.alias || x.user.nickname || x.user.username}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{x.user.username}}</view>
					</view>
					<view class="uni-flex uni-center">
						<checkbox></checkbox>
					</view>
				</view>
			</label>
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
		"uni-icon": uniIcon,
		"uni-nav-bar": uniNavBar,
	},

	data() {
		return {
			contacts:[],
			memberIds:[],
		}
	},

	computed: {
		rightText() {
			if (this.memberIds.length == 0) return "未选择";

			return "确定(" + this.memberIds.length + ")";
		},
	},

	async onLoad() {
		this.authenticated();
		this.list = await this.api.contacts.get().then(res => res.data || []);
		this.contacts = this.list;
	},

	async onPullDownRefresh() {
	},

	methods: {
		searchInput(e) {
			const _ = this.app._;
			const value = e.detail.value;

			const isShow = (x) => {
				if (x.alias && x.alias.indexOf(value) >=0) return true;
				if (x.user.nickname && x.user.nickname.indexOf(value) >= 0) return true;
				if (x.user.username.indexOf(value) >= 0) return true;
				return false;
			}

			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.contacts = _.filter(this.list, isShow);
			}, 300);
		},

		clickContact(x) {
			//console.log(x);
			const userId = x.user.id;
			const index = this.memberIds.indexOf(userId);
			if (index < 0) {
				this.memberIds.push(userId);
			} else {
				this.memberIds.splice(index, 1);
			}
		},

		async clickConfirm() {
			if (this.memberIds.length == 0) return;
			
			const session = await this.api.sessions.create({
				memberIds: this.memberIds,
			}).then(o => o.data);	
			if (!session) return uni.showToast({title:"创建会话失败", icon:"none"});

			return this.go("/pages/chat/session", {
				sessionId: session.sessionId,
				title: session.title || "",
			});
		}
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
</style>

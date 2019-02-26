
<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-text="  NOTE">
		</uni-nav-bar>
		<view class="uni-list">
			<view @click="clickApply" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					新朋友
				</view>
			</view>
			<view @click="clickTag" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					标签
				</view>
			</view>

			<view class="uni-list-cell-divider"></view>
			<view v-for="(x, i) in contacts" :key="i" 
				@click="clickContact(x)" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-media-list">
					<view class="uni-media-list-logo">
						<image :src="x.user.portrait"></image>
					</view>
					<view class="uni-media-list-body" style="justify-content:center">
						{{ x.alias || x.user.nickname || x.user.username}}
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
			title:"",
			contacts:[],
		}
	},

	async onLoad() {
		this.authenticated();
		this.contacts = await this.api.contacts.get().then(res => res.data || []);
		this.app.storage.set("contacts", this.contacts);
	},

	async onPullDownRefresh() {
	},

	methods: {
		clickTag() {
			this.go("/pages/contact/tag");	
		},
		clickApply() {
			this.go("/pages/contact/apply", undefined, "redirectTo");	
		},
		clickContact(x) {
			const user = x.user;
			user.alias = x.alias;
			user.contactId = x.id;
			this.go("/pages/contact/info", user);	
		},
		clickLogoutBtn() {
			uni.reLaunch({url:"/pages/login/index"});
			this.setUser();
		}
	}
}
</script>

<style lang="less" scoped>
</style>

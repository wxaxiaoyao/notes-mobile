
<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="编辑标签"
			right-text="新建"
			@click-right="clickSave"
			@click-left="back">
		</uni-nav-bar>
		
		<view class="x-cell">
			<input v-model="tag.tagname" placeholder="标签名称"/>
		</view>

		<view>
			成员
		</view>
		<view class="x-cell">
			<view class="member" v-for="(x, i) in tagContacts" :key="i">
				<image></image>
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
			tag:{},
			tagContacts:[],
		}
	},

	async onLoad() {
		this.authenticated();
		await this.loadData();
	},

	async onPullDownRefresh() {
	},

	methods: {
		async loadData() {
			const {_} = this.app;
			const tags = await this.api.classifyTags.get({classify:this.app.consts.CLASSIFY_TAG_CONTACT}).then(res => res.data || []);
			const contacts = await this.api.contacts.get().then(res => res.data || []);
			_.each(contacts, contact => {
				_.each(contact.tags || [], tagname => {
					_.each(tags, tag => {
						tag.count = tag.count || 0;
						tag.contacts = tag.contacts || [];
						if (tag.tagname == tagname) {
							tag.count++;
							tag.contacts.push(contact);
						}
					});
				});
			});

			this.tags = tags;
			this.contacts = contacts;
		},
		clickSave() {

		},
		tagLongtap(e) {
			console.log(e);
		},
		tagTap(x) {
			console.log(x);
		},
	}
}
</script>

<style lang="less" scoped>
</style>


<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="编辑标签"
			right-text="保存"
			@click-right="clickSave"
			@click-left="back">
		</uni-nav-bar>
		
		<view class="x-cell">
			<input class="uni-input" v-model="tag.tagname" placeholder="标签名称"/>
		</view>

		<view class="uni-title uni-common-pl">
			成员
		</view>
		<view class="user-list">
			<view class="user" v-for="(x, i) in contacts" :key="i">
				<image class="portrait" :src="x.user.portrait"></image>
				<text>{{x.alias || x.user.nickname || x.user.username}}</text>
			</view>
			<view @click="clickNew" class="user">
				<uni-icon type="plus" size="60"></uni-icon>
			</view>
			<view @click="clickDelete" class="user">
				<uni-icon type="minus" size="60"></uni-icon>
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
			tag:{},
			contacts:[],
		}
	},

	async onLoad() {
		this.tag = this.getPageArgs();
		const contacts = this.app.storage.get("contacts");
		this.app._.each(this.tag.objectTags, x => this.contacts.push(this.app._.find(contacts, {id: x.objectId})));
	},

	onUnload() {
		this.subpage = "";
	},

	async onShow() {
		if (this.subpage == "select-tag-contact") {
			const selected = this.getPageArgs();
			this.tag.objectTags = [];
			this.contacts = [];

			this.app._.each(selected, id => this.tag.objectTags.push({
				classifyTagId: this.tag.id,
				objectId: id,
			}));
			const contacts = this.app.storage.get("contacts");
			this.app._.each(this.tag.objectTags, x => this.contacts.push(this.app._.find(contacts, {id: x.objectId})));
		}
	},

	async onPullDownRefresh() {
	},

	methods: {
		clickNew() {
			this.subpage = "select-tag-contact";
			
			const selected = [];
			const id = this.tag.id;
			this.app._.each(this.tag.objectTags, o => selected.push(o.objectId));
			this.go("/pages/contact/select", {selected, id});
		},

		clickDelete() {

		},
		async clickSave() {
			await this.api.classifyTags(this.tag);
			this.back(this.tag);
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
.user-list {
	background-color: #FFF;
	flex-wrap: wrap;
	display: flex;
}

.user {
	width: 80px;
	height: 80px;
	padding:5px;
	/*border: 1px solid gray;*/
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.portrait {
	width: 50px;
	height: 50px;
}
</style>

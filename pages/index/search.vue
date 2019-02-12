<template>
	<view class="page-container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="搜索"
			@click-left="back">
		</uni-nav-bar>

		<view class="uni-input">
			<input v-model="inputValue" :placeholder="inputTip"/>
		</view>
		<view class="classify-container">
			<view class="classify-item" @click="clickNote">便条</view>
			<view class="classify-item" @click="clickDaily">日记</view>
			<view class="classify-item" @click="clickDocument">文档</view>
		</view>
		<view class="tag-container">
			<view v-for="(x,i) in tags" :key="x.id" @click="clickTag(x)" class="tag-item"> {{x.tagname + "(" + (x.count || 0) + ")"}}</view>
		</view>

		<view class="list-container">
			<view v-for="(x, i) in list" :key="i" class="list-item">
				{{x.text}}
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
	},

	data() {
		return {
			inputTip:"搜索",
			inputValue:"",
			classify:0,
			tags:[],
			list:[],
		};
	},

	onLoad() {
	},

	async onPullDownRefresh() {
	},

	methods: {
		async search() {
		},

		async loadTags(classify) {
			this.tags = await this.api.tags.get({classify}).then(res => res.data || []);
		},

		async clickTag(x) {
			this.tagId = x.id;
			if (this.classify == 3) {
				this.list = await this.api.notes.search({value:this.inputValue, tagId: this.tagId}).then(res => res.data);
			} else if(this.classify == 4) {
				this.list = await this.api.notes.search({value:this.inputValue, tagId: this.tagId}).then(res => res.data);
			} else if(this.classify == 5) {
				this.list = await this.api.notes.search({value:this.inputValue, tagId: this.tagId}).then(res => res.data);
			}
		},

		async clickNote() {
			await this.loadTags(3);
			this.tagId = undefined;
			this.classify = 3;
			this.inputTip = "搜搜便条";
		},

		async clickDaily() {
			await this.loadTags(4);
			this.tagId = undefined;
			this.classify = 4;
			this.inputTip = "搜搜日记";
		},

		async clickDocument() {
			await this.loadTags(5);
			this.tagId = undefined;
			this.classify = 5;
			this.inputTip = "搜搜文档";
		},
	}
}
</script>

<style>
.page-container {

}
.classify-container {
	display: flex;
	justify-content:center;
	align-items: center;	
	height:30px;
}
.classify-item {
	margin:5px;
}
.tag-container {
	display: flex;
	align-items: center;
}
.tag-item {
	margin:4px;
}
.list-container {
	display: flex;
	flex-direction: column;
}
.list-item {
	overflow:hidden;
	text-overflow:ellipsis;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:3;
	word-break: break-all;
	word-wrap: break-word;
}
</style>

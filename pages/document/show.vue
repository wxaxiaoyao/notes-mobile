
<template>
	<view class="full-height">
		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back(document)" 
			title="文档详情">
		</uni-nav-bar>
		
		<view class="uni-list">
			<view class="uni-list-cell-divider"></view>
			<view @click="clickFilenameEdit" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view style="min-width:max-content">文档名</view>
					<view class="uni-text-gray uni-ellipsis uni-common-pl">{{document.filename}}</view>
				</view>
			</view>
			<view @click="clickTagEdit" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view style="min-width:max-content">标签</view>
					<view class="uni-text-gray uni-ellipsis uni-common-pl">{{tagstr}}</view>
				</view>
			</view>
			<view @click="clickText" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view style="min-width:max-content">正文</view>
					<view class="uni-text-gray uni-ellipsis uni-common-pl">{{"..."}}</view>
				</view>
			</view>
		</view>
		<view style="margin-top: 10px;">
			<button @click="clickDeleteBtn">删除</button>
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

	data: function() {
		return {
			document:{id: null},
			tags:[],
			textareaHeight:100,
		}
	},
	
	computed: {
		id() {
			return this.document.id;
		},
		richtext() {
			const text = this.document.text;
			return `<div style="white-space:pre-wrap; background-color:#fff; padding: 1px 4px;">${text}</div>`;
		},
		tagstr() {
			return this.tags.map(o => o.tagname).join("|");
		}
	},

	async onLoad() {
		this.document = this.getPageArgs();
		this.text = this.document.text || "";
		this.tags = await this.api.objectTags.get({classify:5, objectId:this.document.id}).then(res => res.data || []);
	},

	async onShow() {
		if (this.subpage == "tag-edit") {
			const {tags} = this.getBackArgs();
			this.tags = tags || this.tags;
			this.document.tags = this.tags;
			this.setBackArgs(this.currentPageUrl, {});
		} else if (this.subpage == "filename-edit") {
			const {filename} = this.getBackArgs();
			this.document.filename = filename;
		} else if (this.subpage == "text-show") {
			const {text} = this.getBackArgs();
			this.document.text = text;
		}
		this.subpage = "";
	},

	methods: {
		clickDeleteBtn() {
			if (!this.document.id) return;
			uni.showModal({
				title: '删除确认',
				content: '确认删除此篇文档?',
				success: async (res) => {
					if (res.confirm) {
						// console.log('用户点击确定');
						await this.api.documents.destroy({id:this.document.id});
						this.back({action:'delete', document:this.document});
					} else if (res.cancel) {
						//console.log('用户点击取消');
					}
				}
			});
		},
		clickFilenameEdit() {
			this.subpage = "filename-edit";
			this.go("/pages/document/filename", {id: this.document.id, filename: this.document.filename});
		},
		clickTagEdit() {
			this.subpage = "tag-edit";
			this.go("/pages/tag/edit", {objectId: this.document.id, tags: this.document.tags, classify:5});
		},
		clickText() {
			this.subpage = "text-show";
			this.go("/pages/document/text", {id: this.document.id, text: this.document.text});
		},
	},

}
</script>

<style>
.uni-tag {
	margin-left:2px;
}
.uni-textarea textarea{
	width:96%;
	padding:7px 2%;
	line-height:1.6;
	font-size:28upx;
	height:150upx;
}
.filename-input {
	/*width: 100%;*/
	/*background-color: rgb(245,245,245);*/
}
</style>

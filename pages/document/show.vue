
<template>
	<view class="full-height">
		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back" 
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
					<view class="uni-text-gray uni-ellipsis uni-common-pl">{{tags.map(o => o.tagname).join("|")}}</view>
				</view>
			</view>
			<view @click="clickText" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view style="min-width:max-content">标签</view>
					<view class="uni-text-gray uni-ellipsis uni-common-pl">{{"..."}}</view>
				</view>
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
	},

	async onLoad() {
		this.document = this.getPageArgs();
		this.text = this.document.text || "";
		this.tags = this.document.tags || [];
		this.textareaHeight = this.windowHeight - 44 - 33;  // 小程序状态栏25px 暂不考虑
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
		}
	},

	methods: {
		clickFilenameEdit() {
			this.subpage = "filename-edit";
			this.go("/pages/document/filename", {id: this.document.id, text: this.document.filename});
		},
		clickTagEdit() {
			this.subpage = "tag-edit";
			this.go("/pages/tag/edit", {objectId: this.document.id, tags: this.document.tags, classify:5});
		},
		clickText() {
			this.subpage = "text-edit";
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

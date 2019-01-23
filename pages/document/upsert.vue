
<template>
	<view class="full-height">
		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="clickBackBtn" 
			:title="document.id ? '便条-更新' : '便条-新增'"
		    right-icon="more-filled"
		    @click-right="clickMoreBtn">
		</uni-nav-bar>

		<view class="uni-flex uni-column">
			<view class="uni-input">
				<input v-model="document.filename" class="filename-input" placeholder="文档名" />
			</view>

			<view class="uni-textarea full-height">
				<textarea :style='{height: textareaHeight - 20 + "px"}' maxlength=-1 class="x-input-border" v-model="document.text" placeholder="请输入手记内容..."></textarea>
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
		}
	},

	async onLoad() {
		this.document = this.getPageArgs();
		this.text = this.document.text || "";
		this.tagstr = this.document.tags;
		this.textareaHeight = this.windowHeight - 44 - 33;  // 小程序状态栏25px 暂不考虑
	},

	async onShow() {
		const {selectedTags=[]} = this.getBackArgs();
		this.selectedTags = selectedTags || this.selectedTags;
		this.document.aliasTags = this.selectedTags.map(o => o.tagname);
		this.document.tags = "|" + this.document.aliasTags.join("|") + "|";
		this.tags = this.document.aliasTags;

		this.setBackArgs(this.currentPageUrl, {});
	},

	methods: {
		async saveDocument() {
			if (this.document.id) {
				if (this.text != this.document.text || this.tagstr != this.document.tags) {
					await this.api.documents.update(this.document);
				} else {
					return;
				}
			} else {
				if (this.document.text || this.document.tags) {
					const document = await this.api.documents.create(this.document).then(res => res.data);
					this.document = {...this.document, ...document};
				} else {
					return;
				}
			}
			this.document.updatedAt = new Date();
		},
		async clickBackBtn() {
			await this.saveDocument();
			return this.back({document:this.document});
		},

		clickMoreBtn() {
			uni.showActionSheet({
				itemList: ["保存", "分享到朋友圈", "分享给朋友", "编辑标签", "删除"],
				success: async (res) => {
					const index = res.tapIndex;
					if (index == 0) {
						await this.saveDocument();
					} else if (index == 1 || index == 2) {
						uni.share({
							provider: "weixin",
							scene: index == 1 ? "WXSenceTimeline" : "WXSceneSession",
							type: 1,
							summary: this.document.text || "",
							success: res => uni.showToast({title:"分享成功"}),
							fail: err => console.log("fail:", JSON.stringify(err)),
						});
					} else if (index == 3) {
						// 编辑标签
						this.go("/pages/tag/edit", {objectId: this.document.id, classify:0});
					} else if (index == 4) {
						if (!this.document.id) return;
						await this.api.documents.delete({id: this.document.id});
						return this.back({action:"delete", document:this.document});
					}
				},
				fail: res => console.log(res.errMsg),
			});
		},

		clickTagEdit() {
		}
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

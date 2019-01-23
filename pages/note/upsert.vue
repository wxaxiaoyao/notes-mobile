
<template>
	<view class="full-height">
		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="clickBackBtn" 
			:title="note.id ? '便条-更新' : '便条-新增'"
		    right-icon="more-filled"
		    @click-right="clickMoreBtn">
		</uni-nav-bar>

		<view class="uni-list">
			<view @click="clickTagEdit" class="uni-list-cell" hover-class="uni-list-cell-hover" style="height:40px">
				<view class="uni-list-cell-navigate" style="padding:9px 15px 9px 12px">
					<view>标签</view>
					<view class="uni-text-gray" style="max-width:200px;">
						<scroll-view scroll-x style="white-space:nowrap">
							<uni-tag size="small" v-for="(x, i) in tags" :key="i"  :text="x.tagname"></uni-tag>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell" :style='{height: textareaHeight + "px"}'>
				<view class="uni-list-cell-navigate full-height" style="padding:9px 15px 9px 12px">
					<view class="uni-textarea full-height">
						<textarea :style='{height: textareaHeight - 32 + "px"}' maxlength=-1 class="x-input-border" v-model="note.text" placeholder="请输入手记内容..."></textarea>
					</view>
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
			note:{id: null, tags:[]},
			tags:[],
			textareaHeight:100,
		}
	},
	
	computed: {
		id() {
			return this.note.id;
		}
	},

	async onLoad() {
		this.note = this.getPageArgs();
		this.tags = this.note.tags || [];
		this.text = this.note.text || "";
		this.textareaHeight = this.windowHeight - 44 - 40;  // 小程序状态栏25px 暂不考虑
	},

	async onShow() {
		if (this.subpage == "tag-edit") {
			const {tags} = this.getBackArgs();
			this.tags = tags || this.tags;
			this.note.tags = this.tags;
			this.setBackArgs(this.currentPageUrl, {});
		}
	},

	methods: {
		async saveNote() {
			if (this.note.id) {
				if (this.text != this.note.text) {
					await this.api.notes.update(this.note);
				} else {
					return;
				}
			} else {
				if (this.note.text || this.tags.length) {
					const note = await this.api.notes.create({...this.note, tags: this.tags}).then(res => res.data);
					this.note = {...this.note, ...note};
				} else {
					return;
				}
			}
			this.note.updatedAt = new Date();
		},
		async clickBackBtn() {
			await this.saveNote();
			return this.back({note:this.note});
		},

		clickMoreBtn() {
			uni.showActionSheet({
				itemList: ["保存", "分享到朋友圈", "分享给朋友", "删除"],
				success: async (res) => {
					const index = res.tapIndex;
					if (index == 0) {
						await this.saveNote();
					} else if (index == 1 || index == 2) {
						uni.share({
							provider: "weixin",
							scene: index == 1 ? "WXSenceTimeline" : "WXSceneSession",
							type: 1,
							summary: this.note.text || "",
							success: res => uni.showToast({title:"分享成功"}),
							fail: err => console.log("fail:", JSON.stringify(err)),
						});
					} else if (index == 3) {
						if (!this.note.id) return;
						await this.api.notes.delete({id: this.note.id});
						return this.back({action:"delete", note:this.note});
					}
				},
				fail: res => console.log(res.errMsg),
			});
		},

		clickTagEdit() {
			this.subpage = "tag-edit";
			this.go("/pages/tag/edit", {objectId: this.note.id, tags: this.tags, classify:3});
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
</style>


<template>
	<view class="full-height">
<!-- 		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back" 
			right-icon="plusempty"
		    @click-right="clickNewBtn">
			<view class="title-container" @click="clickTitle">
				便条
			</view>
		</uni-nav-bar> -->
		<view class="uni-navbar">
			<uni-status-bar></uni-status-bar>
			<view class="uni-navbar-header">
				<view class="uni-navbar-header-btns" @tap="back">
					<view>
						<uni-icon type="back" size="24"></uni-icon>
					</view>
					<view class="uni-navbar-btn-text">返回</view>
				</view>
				<view class="uni-navbar-container" @click="clickTitle">
					<view class="uni-navbar-container-title">{{title}}</view>
				</view>
				<view class="uni-navbar-header-btns" @tap="clickNewBtn">
		            <view>
		                <uni-icon type="plusempty" size="24"></uni-icon>
		            </view>
		        </view>
			</view>
		</view>
		<view class="page-content-container">
			<view class="mask" v-if="isShowTags" @click="isShowTags=false"></view>
			<view class="tags-container" v-if="isShowTags">
				<view class="uni-list">
					<view @tap="clickTagItem(x)" v-for="(x, i) in tags" :key="x.id" class="uni-list-cell" hover-class="uni-list-cell-hover">
						<view class="uni-list-cell-navigate">
							<view>{{x.tagname}}</view>
							<view class="uni-text-gray">{{x.count || 0}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view @click="clickTag" class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate">
						标签
					</view>
				</view>
			
				<view @click="clickNote(x, $event)" v-for="(x, i) in notes" :key="x.id" class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="note-container">
						<view class="uni-title uni-ellipsis">
							{{x.formatTitle}}
						</view>
						<view class="uni-text-small x-text-ellipsis">
							{{x.formatText}}
						</view>
						<view class="note-footer">
							<view>
								<scroll-view scroll-x style="white-space:nowrap">
									<uni-tag inverted=true  v-for="tag in x.tags" :key="x.id + '-' + tag.id"  :text="tag.tagname"></uni-tag>
								</scroll-view>
							</view>
							<text>{{x.formatUpdatedAt}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import moment from "moment";
import component from "../../components/component.js";
import uniStatusBar from "../../components/unis/uni-status-bar.vue";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import uniIcon from "../../components/unis/uni-icon.vue";
import uniTag from "../../components/unis/uni-tag.vue";

moment.locale("zh-cn");

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"uni-tag": uniTag,
		"uni-icon": uniIcon,
		"uni-status-bar": uniStatusBar,
	},

	data: function() {
		return {
			notes:[],
			tags: [],
			title: "便条",
			isShowTags: false,
		}
	},

	async onLoad() {
		await this.loadDatas({});
		
		this.tags = await this.api.tags.get({classify:3}).then(res => res.data || []);
		this.tags = [{tagname:"全部便条", count:this.total}].concat(this.tags);
	},

	async onShow() {
		const {note = {},action} = this.getBackArgs() || {};
		if (!note.id) return;
		const index = this.app._.findIndex(this.notes, o => o.id == note.id);

		if (action == "delete") {
			if (index < 0) return;
			this.notes.splice(index, 1);
		} else {
			this.format(note);
			if (index < 0) this.notes.push(note);
			else this.notes.splice(index, 1, note);
		}

		this.setBackArgs(this.currentPageUrl, {});
	},

	methods: {
		format(x) {
			const text = x.text || "";
			x.formatTitle = text.split("\n")[0];
			x.formatText = text.split("\n").slice(1).join(" ");
			x.formatUpdatedAt =  moment(x.updatedAt).fromNow();
		},
		clickTag() {
			return this.go("/pages/tag/index", {classify:this.app.consts.CLASSIFY_TAG_NOTE});
		},
		clickNote(x, e) {
			this.subPageType = "update";
			this.go("/pages/note/upsert", x);
		},
		clickNewBtn() {
			this.subPageType = "create";
			return this.go("/pages/note/upsert", {});
		},
		async clickTagItem(x) {
			if (x.id) {
				this.title = "便条-" + x.tagname;
				await this.loadDatas({tagId:x.id});
			} else {
				this.title = "便条";
				await this.loadDatas({});
			}
			this.isShowTags = false;
		},
		async clickTitle() {
			this.isShowTags = !this.isShowTags;
		},
		async loadDatas({text, tagId}) {
			const result = await this.api.notes.search({"x-order":"updatedAt-desc", text, tagId}).then(res => res.data);
			this.total = text == undefined && tagId == undefined && result.count;
			this.notes = result.rows || [];

			this.app._.each(this.notes, o => this.format(o));
			return;
		},
	}

}
</script>

<style>
.uni-navbar {
	display: block;
	position: relative;
	width: 100%;
	background-color: #FFFFFF;
	overflow: hidden;
}

.uni-navbar view{
	line-height:44px;
}

.uni-navbar-shadow {
	box-shadow: 0 1px 6px #ccc;
}

.uni-navbar.uni-navbar-fixed {
	position: fixed;
	z-index: 998;
}

.uni-navbar-header {
	display: flex;
	flex-direction: row;
	width: 100%;
	height:44px;
	line-height:44px;
	font-size: 16px;
}

.uni-navbar-header .uni-navbar-header-btns{
	display:inline-flex;
	flex-wrap:nowrap;
	flex-shrink:0;
	/*width: 120upx;*/
	min-width: 120upx;
	padding:0 12upx;
}

.uni-navbar-header .uni-navbar-header-btns:first-child{
	padding-left:0;
}
.uni-navbar-header .uni-navbar-header-btns:last-child{
	/*width: 60upx;*/
	min-width: 60upx;
}
.uni-navbar-container{
	width:100%;
	margin:0 10upx;
}
.uni-navbar-container-title{
	font-size:30upx;
	text-align:center;
	padding-right: 60upx;
}
	
	
.uni-tag+.uni-tag {
	margin-left:2px;
}
.page-content-container {
	position: relative;
	height: 100%;
}
.mask {
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
	position: absolute;
	z-index: 99;
	background-color: rgb(0,0,0, 0.6);
}
.tags-container {
	position: absolute;
	top: 0px;
	max-height: 400px;
	width: 100%;
	z-index: 100;
	overflow-y: auto;
}
.title-container {
	font-size:30upx;
	text-align:center;
	padding-right: 60upx;
	line-height: 44px;
}

.note-container {
	display: flex;
	flex: 1;
	width: 100%;
	flex-direction: column;
	box-sizing: border-box;
	padding: 22upx 30upx;
}
.note-footer {
	display:flex;
	justify-content: space-between;
	align-items: center;
	padding:5px 0px;
}
</style>

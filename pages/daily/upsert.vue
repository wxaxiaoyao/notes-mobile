
<template>
	<view>
		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back(daily)" 
			:title="daily.id ? '日记-更新' : '日记-新增'"
		    right-text="提交"
		    @click-right="clickSubmitBtn">
		</uni-nav-bar>
		
		<view class="uni-list">
			<view class="uni-list-cell-divider"></view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					<view>日期</view>
					<picker :value="daily.date" @change="dateChange" mode="date" start="2010-01-01" end="2050-01-01">
						<view>
							{{daily.date}}
						</view>
					</picker>
				</view>
			</view>
			<view @click="clickTagEdit" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view>标签</view>
					<view class="uni-text-gray" style="max-width:200px;">
						<scroll-view scroll-x style="white-space:nowrap">
							<uni-tag v-for="(x, i) in tags" :key="i" @click="clickDeleteTag(x, i)" size="small" :text="x.tagname"></uni-tag>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					<view class="uni-textarea">
						<textarea style="min-height:100px" class="x-input-border" v-model="daily.content" auto-height placeholder="请输入日记内容..."></textarea>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import moment from "moment";
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
			daily: {
				date:moment().format("YYYY-MM-DD"),
				content:"",
			},
			tags:[],
		}
	},

	onLoad() {
		const {daily} = this.getPageArgs();
		this.daily = daily || this.daily;
		this.tags = (this.daily.tags || "").split("|").filter(o => o).map(o => ({tagname:o}));
	},

	onShow() {
		const {tags} = this.getBackArgs();
		if (this.subpage == "tag-edit" && tags) {
			this.tags = tags;
		}
		this.subpage = undefined;
	},

	methods: {
		dateChange(evt) {
			this.daily.date = evt.detail.value;
		},
		clickTagEdit() {
			this.subpage = "tag-edit";
			this.go("/pages/tag/edit", {tags:this.tags, classify:4});
		},
		async clickSubmitBtn() {
			this.daily.tags = "|" + this.tags.map(o => o.tagname).join("|") + "|";
			if (this.daily.id) {
				await this.api.dailies.update(this.daily);
			} else {
				this.daily = await this.api.dailies.create(this.daily).then(res => res.data || {});
			}
			this.back(this.daily);
		},
	},

}
</script>

<style>
.uni-tag {
	margin-left:4px;
}
</style>

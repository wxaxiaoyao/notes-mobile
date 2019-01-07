
<template>
	<view>
		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back" 
			:title="note.id ? '手记-更新' : '手记-新增'"
		    right-text="提交"
		    @click-right="clickSubmitBtn">
		</uni-nav-bar>

		<view class="uni-list">
			<view @click="clickTagEdit" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<view>标签</view>
					<view class="uni-text-gray" style="max-width:200px;">
						<scroll-view scroll-x style="white-space:nowrap">
							<uni-tag v-for="(x, i) in selectedTags" :key="i" @click="clickDeleteTag(x, i)" :text="x.tagname"></uni-tag>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					<view class="uni-textarea">
						<textarea style="min-height:100px;" class="x-input-border" v-model="note.text" auto-height placeholder="请输入手记内容..."></textarea>
					</view>
				</view>
			</view>
		</view>

		<!--scroll-view v-if="showTags" scroll-x style="white-space:nowrap">
			<uni-tag v-for="(x, i) in tags" :key="x.id" @click="clickAddTag(x)" :text="x.tagname"></uni-tag>
		</scroll-view>

		<scroll-view scroll-x style="white-space:nowrap">
			<uni-tag @click="showTags = !showTags" text="标签"></uni-tag>
			<uni-tag v-for="(x, i) in selectedTags" :key="i" @click="clickDeleteTag(x, i)" :text="x.tagname"></uni-tag>
			<uni-tag @click="clickTagEdit" text="新增"></uni-tag>
		</scroll-view>

		<view class="uni-textarea">
			<textarea style="min-height:100px;" class="x-input-border" v-model="note.text" auto-height placeholder="请输入手记内容..."></textarea>
		</view-->
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
			note:{},
			tags:[],
			selectedTags:[],
			showTags: false,
		}
	},
	
	computed: {
		tag(){
			const tags = [];
			this.app._.each(this.selectedTags, o => tags.push(o.tagname));
			return tags.join(",");
		}
	},

	async onLoad() {
		this.tags = await this.api.classifyTags.get({classify:3}).then(res => res.data || []);
	},

	onShow() {
		const {selectedTags, tags} = this.getBackArgs();
		this.selectedTags = selectedTags || this.selectedTags;
		this.tags = tags || this.tags;
	},

	methods: {
		async clickSubmitBtn() {
			const oper = this.note.id ? "update" : "create";
			const result = await this.api.notes[oper](this.note);
			//return this.back();
		},

		clickAddTag(x) {
			const index = this.app._.findIndex(this.selectedTags, o => x.tagname == o.tagname);
			if (index >= 0) return;

			this.selectedTags.push(x);
		},
		
		clickDeleteTag(x, i) {
			this.selectedTags.splice(i, 1);
		},

		clickTagEdit() {
			this.go("/pages/note/tag-edit", {selectedTags:this.selectedTags, tags: this.tags});
		}
	},

}
</script>

<style>
.uni-tag {
	margin-left:2px;
}
</style>

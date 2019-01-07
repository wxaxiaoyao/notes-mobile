
<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="标签编辑" 
			right-text="确定"
			@click-right="clickConfirmBtn"
			@click-left="clickBackBtn">
		</uni-nav-bar>

		<view class="uni-flex" style="align-items:center; background-color:#FFF;">
			<input class="uni-flex-item uni-input" v-model="tag" placeholder="标签名">
			<uni-icon @click="clickSubmitTagBtn" type="plusempty"></uni-icon>
		</view>

		<view class="uni-title">
			已选择标签
		</view>
		<view class="uni-flex tags-container">
			<uni-tag v-for="(x, i) in selectedTags" :key="x.id" @click="clickDeleteTag(x)" :text="x.tagname"></uni-tag>
		</view>

		<view class="uni-title">
			标签列表(长按删除)
		</view>
		<view class="uni-flex tags-container">
			<uni-tag 
				v-for="(x, i) in tags" 
				:key="x.id" 
				@click="clickAddTag(x)" 
				@longtap="tagLongtap(x, i)"
				:text="x.tagname">
			</uni-tag>
		</view>
	</view>
</template>

<script>
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import uniIcon from "../../components/unis/uni-icon.vue";
import uniTag from "../../components/unis/uni-tag.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"uni-tag": uniTag,
		"uni-icon": uniIcon,
	},

	data: function() {
		return {
			tag:"",
			tags:[],
			selectedTags:[],
			showTags: false,
		}
	},
	
	async onLoad() {
		const {selectedTags = [], tags = []} = this.getPageArgs();
		this.selectedTags = selectedTags;
		this.tags = tags;
	},

	methods: {
		clickBackBtn() {
			this.setBackArgs("/pages/note/upsert", {
				tags: this.tags,
			});
			this.back();
		},
		clickConfirmBtn() {
			this.setBackArgs("/pages/note/upsert", {
				selectedTags:this.selectedTags,
				tags: this.tags,
			});
			this.back();
		},

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

		async clickSubmitTagBtn() {
			if (!this.tag) return;

			const index = this.app._.findIndex(this.tags, o => o.tagname == this.tag);
			if (index >= 0) {
				if (this.app._.findIndex(this.selectedTags, o => o.tagname == this.tag) >= 0) {
					this.tag = "";
					return;
				}

				this.selectedTags.push(this.tags[index]);
				return;
			}
			
			const result = await this.api.classifyTags.create({
				tagname:this.tag,
				classify:3,
				userId: this.user.id,
			});

			if (result.isErr()) {
				return uni.showToast({title:"服务器繁忙", icon:"none"});
			}

			const tag = result.data;
			this.tags.push(tag);
			this.selectedTags.push(tag);
			this.tag = "";
		},

		async tagLongtap(x, i) {
			this.tags.splice(i, 1);
			await this.api.classifyTags.delete({id:x.id});
		},
	},
}
</script>

<style>
.uni-tag {
	margin-left:4px;
}
.tags-container {
	flex-wrap: wrap;
	/*justify-content: space-between;*/
}
</style>

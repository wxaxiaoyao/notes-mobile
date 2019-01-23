<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="标签编辑" 
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
			<uni-tag v-for="(x, i) in selectedTags" :key="x.tagname" @click="clickDeleteTag(x)" :text="x.tagname"></uni-tag>
		</view>

		<view class="uni-title">
			标签列表(长按删除)
		</view>
		<view class="uni-flex tags-container">
			<view class="tag"
				v-for="(x, i) in tags" 
				:key="x.id" 
				@click="clickAddTag(x)" 
				@longtap="tagLongtap(x, i)">
				<uni-tag :text="x.tagname">
				</uni-tag>
			</view>
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
		const {tags = [], classify = 0, objectId} = this.getPageArgs();
		this.classify = classify || 0;
		this.selectedTags = tags;
		this.tags = await this.api.tags.get({classify}).then(res => res.data || []);
		if (objectId) {
			this.objectId = objectId;
			this.selectedTags = await this.api.objectTags.get({classify, objectId}).then(res => res.data || []);
		}
	},

	methods: {
		async clickBackBtn() {
			if (this.objectId) {
				await this.api.objectTags.setTags({
					objectId: this.objectId, 
					classify: this.classify,
					tags:this.selectedTags.map(o => ({objectId:this.objectId, tagId:o.id})),
				});
			}
			this.back({tags: this.selectedTags});
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
			
			const result = await this.api.tags.create({
				tagname:this.tag,
				classify: this.classify,
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
			await this.api.tags.delete({id:x.id});
		},
	},
}
</script>

<style>
.tag {
	margin-left:4px;
}
.tags-container {
	flex-wrap: wrap;
	/*justify-content: space-between;*/
}
</style>

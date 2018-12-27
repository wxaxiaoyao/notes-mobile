
<template>
	<view class="contact-tags-container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="添加标签"
			right-text="保存"
			@click-right="clickSave"
			@click-left="back">
		</uni-nav-bar>

		<view class="uni-flex tag-container new-tag-container">
			<view class="tag" v-for="(x, i) in newtags" :key="i">
				<uni-tag  @click="clickNewTag(i)" :text="x" inverted=true circle=true></uni-tag>
			</view>
			<input v-model="tag" @blur="tagInputFinish" @confirm="tagInputFinish"  
				placeholder-style="text-align:center"
				class="tag input-tag" placeholder="标签"/>
		</view>
		<view class="uni-flex tag-container">
			<view class="tag" v-for="(x, i) in tags" :key="x.id" >
				<uni-tag @click="clickTag(x.tagname)" :text="x.tagname" inverted=true circle=true></uni-tag>
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

	data() {
		return {
			tag:"",
			newtags:[],
			tags:[],
		}
	},
	async onLoad(options) {
		const {id = 0, tags = []} = this.getPageArgs();
		this.id = id;
		this.newtags = tags;
		this.tags = await this.api.classifyTags.get({classify:1}).then(res => res.data || []);
	},
	methods: {
		async clickSave() {
			await this.api.contacts.update({id:this.id, tags:this.newtags});
			await this.api.classifyTags.setTags({classify:1, tags: this.newtags});
			this.back();
		},
		tagInputFinish(e) {
			const tag = e.detail.value;
			if (!tag) return;
			if (this.newtags.includes(tag)) return;
			this.newtags.push(tag);
			this.tag = "";
		},
		clickTag(tagname) {
			if (this.newtags.includes(tagname)) return;
			this.newtags.push(tagname);
		},
		clickNewTag(i) {
			this.newtags.splice(i, 1);
		}
	}
}
</script>

<style lang="less">
.contact-tags-container {
	height:100%;
	background-color:#fff;
}
.tag {
	border-radius: 30upx;
	margin:5px;
}
.input-tag {
	width:40px;
}
.tag-container {
	align-items: center;
	padding:10px;
	flex-wrap: wrap;
}
.new-tag-container {
	border-bottom:1px solid gray;
}
</style>


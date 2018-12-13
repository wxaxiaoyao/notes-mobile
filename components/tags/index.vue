

<template>
	<view class="uni-flex" style="flex-wrap:wrap">
		<view v-for="(x, i) in tags" :key="i" class="uni-flex">
			<uni-tag :text="x" :size="__data__.size" :type="__data__.type" :disabled="__data__.disabled" :inverted="__data__.inverted" :circle="__data__.circle"></uni-tag>
			<uni-icon @click="clickTag(x, i)" type="closeempty"></uni-icon>
		</view>
		<view class="uni-flex">
			<input style="width:80px; padding:0px;" v-if="isShowInputTag" v-model="tag" class="x-input-border uni-input" @blur="comfirm" @comfirm="comfirm" focus/>
			<uni-tag v-else @click="isShowInputTag = true" text="新增" :size="__data__.size" :type="__data__.type" :disabled="__data__.disabled" :inverted="__data__.inverted" :circle="__data__.circle"></uni-tag>
		</view>
	</view>
</template>

<script>
import component from "../component.js";
import uniTag from "../unis/uni-tag.vue";
import uniIcon from "../unis/uni-icon.vue";
import _ from "../../libs/lodash.min.js";

export default {
	mixins:[component],

	components: {
		"uni-tag": uniTag,
		"uni-icon": uniIcon,
	},
	
	data: function() {
		return {
			isShowInputTag:false,
			tag: "",
			tags: "",

			default_data: {
				tags:[],
				split:"|",
				editable:false,
				size: "normal",
				type: "default",
				disabled: false,
				inverted: false,
				circle: false,
			}
		}
	},

	methods: {
		clickTag(tag, i) {
			this.tags.splice(i, 1);
		},
		comfirm(e) {
			if (this.tag && !this.tags.includes(this.tag)) {
				this.tags.push(this.tag);
			}
			this.isShowInputTag = false;
			this.tag = "";
		}
	},

	mounted() {
		if (_.isString(this.__data__.tags))	{
			this.tags = this.__data__.tags.split(this.__data__.split);
		} else if(_.isArray(this.__data__.tags)) {
			this.tags = this.__data__.tags;
		}
		this.isShowInputTag = this.__data__.editable;
		this.__data__.tags = this.tags;
	}
}
</script>

<style>
</style>


<template>
	<view>
		<uni-nav-bar status-bar=true left-icon="back" left-text="返回" @click-left="back" :title="daily.id ? '日报-更新' : '日报-新增'"></uni-nav-bar>
		
		<view class="uni-form-item">
			<view class="title">日期</view>
			<picker class="title" :value="daily.date" @change="dateChange" mode="date" start="2010-01-01" end="2050-01-01">
				{{daily.date}}
			</picker>
		</view>
		<view class="uni-textarea">
			<textarea style="min-height:100px"v-model="daily.content" auto-height placeholder="请输入日报内容..."></textarea>
		</view>
		<view class="uni-btn-v">
			<button @click="clickSubmitBtn">提交</button>
		</view>
	</view>
</template>

<script>
import moment from "moment";
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
	},

	data: function() {
		return {
			daily: {
				date:moment().format("YYYY-MM-DD"),
				content:"请输入日报内容...",
			}
		}
	},

	methods: {
		dateChange(evt) {
			this.daily.date = evt.detail.value;
		},
		async clickSubmitBtn() {
			if (this.daily.id) {
				await this.api.dailies.update(this.daily);
			} else {
				await this.api.dailies.create(this.daily);
			}
			this.back();
		},
	},

	async onLoad(options) {
		if (options.id) {
			const result = await this.api.dailies.getById({id: options.id});
			this.daily = result.data || this.daily;
		}
	}
}
</script>

<style lang="less" scoped>
</style>

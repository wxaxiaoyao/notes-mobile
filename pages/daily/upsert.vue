
<template>
	<view>
		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back" 
			:title="daily.id ? '日报-更新' : '日报-新增'"
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
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					<tags-index :__data__="tagsData"></tags-index>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					<view class="uni-textarea">
						<textarea style="min-height:100px" class="x-input-border" v-model="daily.content" auto-height placeholder="请输入日报内容..."></textarea>
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
import tagsIndex from "../../components/tags/index.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"tags-index": tagsIndex,
	},

	data: function() {
		return {
			daily: {
				date:moment().format("YYYY-MM-DD"),
				content:"请输入日报内容...",
			},
			tagsData: {
				tags:[],
				editable: true,
			}
		}
	},

	methods: {
		dateChange(evt) {
			this.daily.date = evt.detail.value;
		},
		async clickSubmitBtn() {
			this.daily.tags = this.tagsData.tags.join("|");
			if (this.daily.id) {
				await this.api.dailies.update(this.daily);
			} else {
				await this.api.dailies.create(this.daily);
			}
			this.back();
		},
	},

	async onLoad() {
		const options = this.getPageArgs();
		if (options.id) {
			const result = await this.api.dailies.getById({id: options.id});
			this.daily = result.data || this.daily;
			this.tagsData = {...this.tagsData, tags: this.daily.tags};
		}
	}
}
</script>

<style lang="less" scoped>
</style>

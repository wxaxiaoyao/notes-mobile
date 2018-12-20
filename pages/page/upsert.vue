
<template>
	<view class="full-height uni-flex uni-column">
		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back" 
		    right-text="提交"
		    @click-right="clickSubmitBtn">
			<view class="url-container full-height">
				<input class="url-input" align="center" v-model="page.url" placeholder="文档地址" :disabled="page.id ? true : false"/>
			</view>
		</uni-nav-bar>
		
		<view class="uni-flex-item uni-flex uni-column">
			<textarea class="uni-flex-item page-content" v-model="page.content" max-length=1></textarea>
		</view>
	</view>
</template>

<script>
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
	},

	data: function() {
		return {
			page: {
				content:"请输入页面内容...",
			},
		}
	},

	methods: {
		async clickSubmitBtn() {
			if (this.page.id) {
				await this.api.pages.update(this.page);
			} else {
				await this.api.pages.create(this.page);
			}
			this.back();
		},
	},

	async onLoad(options) {
		if (options.id) {
			const result = await this.api.pages.getById({id: options.id});
			this.page = result.data || this.page;
		}
	}
}
</script>

<style lang="less" scoped>
.page-content {
	background:#FFF;
}
.url-container {
	display: flex;
	justify-content:center;
	align-items:center;
	padding:0px 5px;
}
.url-input {
	width: 100%;
	border-bottom: 1px solid gray;
}
</style>

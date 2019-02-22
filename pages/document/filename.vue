
<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="文档名更新"
			@click-left="clickBack">
		</uni-nav-bar>

		<input v-model="filename" placeholder="请输入文档名" class="uni-input"/>
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

	data() {
		return {
			filename:""
		}
	},
	onLoad(options) {
		const {id, filename} = this.getPageArgs();
		this.id = id;
		this.oldfilename = filename;
		this.filename = filename;
	},

	methods: {
		async clickBack() {
			if (this.oldfilename != this.filename) {
				await this.api.documents.update({id:this.id, filename:this.filename});
			}
			return this.back({id:this.id, filename:this.filename});
		}
	}
}
</script>

<style lang="less" scoped>
</style>

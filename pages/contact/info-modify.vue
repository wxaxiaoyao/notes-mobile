
<template>
	<view class="user-info-container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="备注信息"
			right-text="保存"
			@click-right="clickSave"
			@click-left="back">
		</uni-nav-bar>

		<view class="uni-padding-wrap uni-common-mt">
			<form>
				<view class="uni-form-item uni-column">
					<view class="title">备注名</view>
					<input v-model="contact.alias" class="uni-input"  placeholder="备注名" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">标签</view>
					<view>
						
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">电话</view>
					<input v-model="contact.extra.cellphone" class="uni-input"  placeholder="备注名" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">描述</view>
					<input v-model="contact.extra.description" class="uni-input"  placeholder="备注名" />
				</view>
			</form>
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

	data() {
		return {
			contact:{extra:{}},
		}
	},
	async onLoad({id = 0}) {
		this.contact = await this.api.contacts.getById({id}).then(res => res.data);
	},
	methods: {
		clickSave() {
			console.log(this.contact);
		}
	}
}
</script>

<style lang="less">
.title {
	padding:10px 0 !important;
}
</style>


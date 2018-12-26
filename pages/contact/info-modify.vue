
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
					<view v-if="tags.length" class="uni-flex" @click="clickTag">
						<uni-tag 
							v-for="(tag, i) in tags" 
							:key="i" 
							:text="tag"
							class="tag"
							inverted=true
							circle=true>
						</uni-tag>
					</view>
					<input v-else @click="clickTag" class="uni-input" disabled=true placeholder="标签" />
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
import uniTag from "../../components/unis/uni-tag.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"uni-tag": uniTag,
	},

	data() {
		return {
			contact:{extra:{}},
			tags: [],
		}
	},
	async onLoad({id = 0}) {
		this.id = id;

		await this.loadData();
	},
	async onShow() {
		await this.loadData();
	},
	methods: {
		async loadData() {
			this.contact = await this.api.contacts.getById({id:this.id}).then(res => res.data);
			this.tags = this.contact.tags || [];
		},
		clickSave() {
			console.log(this.contact);
		},
		clickTag() {
			this.go("/pages/contact/tag", {id:this.contact.id, tags:this.tags});
		}
	}
}
</script>

<style lang="less">
.title {
	padding:10px 0 !important;
}
.tag + .tag {
	margin-left: 10px;
}
</style>


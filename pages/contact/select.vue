
<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="选择联系人"
		    right-text="确定"
		    @click-right="clickSave"
			@click-left="back(selected)">
		</uni-nav-bar>
		<contacts-index :__data__="contactsIndexData"></contacts-index>
	</view>
</template>

<script>
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import contactsIndex from "../../components/contacts/index.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"contacts-index": contactsIndex,
	},

	data() {
		return {
			selected:[],
			contactsIndexData:{},
		}
	},

	onLoad() {
		const {selected = [], id}= this.getPageArgs();
		this.selected = selected;
		this.id = id;
		this.contactsIndexData.selected = this.app._.cloneDeep(this.selected);
	},

	onUnload() {
	},

	methods: {
		async clickSave() {
			//await this.api.classifyTags.setObjects({
				//id: this.id,
				//objectIds: this.contactsIndexData.selected,
			//});
			this.back(this.contactsIndexData.selected);
		}
	}
}
</script>

<style lang="less" scoped>
</style>

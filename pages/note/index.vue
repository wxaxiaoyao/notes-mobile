
<template>
	<view>
		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back" 
			title="手记"
			right-icon="plusempty"
		    @click-right="clickNewBtn">
		</uni-nav-bar>
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
		}
	},
	
	async onLoad() {

	},

	methods: {
		clickNewBtn() {
			return this.go("/pages/note/upsert");
		}
	}

}
</script>

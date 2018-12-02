
<template>
	<view class="index-page-container">
	</view>
</template>

<script>
import component from "../../components/component.js";

export default {
	mixins:[component],
	data() {
		return {
			title: 'Hello'
		}
	},
	onLoad() {
		this.authenticated();
		//console.log(this.app);
	},
	methods: {

	}
}
</script>

<style>
.index-page-container {
	width:100%;
	height:100%;
}
</style>

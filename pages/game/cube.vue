<template>
	<web-view :src="url"></web-view>
</template>

<script>
import component from "../../components/component.js";

export default {
	mixins:[component],

	components: {
	},

	data() {
		return {
			url: process.env.NODE_ENV == "production" ? "http://magic-cube.wxaxiaoyao.cn" : "http://192.168.31.250:3020",
		}
	},

	computed: {
	},

	onLoad(options = {}) {
	},

	methods: {
	}
}
</script>

<style>
</style>


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
		}
	},

	computed: {
		url() {
			const webviewUrl = this.webviewUrl + "/note/editors/cellphone";
			const token = this.token;
			if (token) return `${webviewUrl}?access_token=${token}`;

			return `${webviewUrl}`;
		}
	},

	onLoad(options = {}) {
		this.webviewUrl = options.url || this.app.config.webviewUrl;
	},

	methods: {
	}
}
</script>

<style lang="less" scoped>
</style>

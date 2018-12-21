<template>
	<web-view :src="url"></web-view>
</template>

<script>
import component from "../../components/component.js";
export default {
	mixins:[component],

	components: {
	},

	data: function() {
		return {
			url:"",
		}
	},

	methods: {
	},

	async onLoad(options = {}) {
		const url = options.url || "";
		const token = this.token;
		const webviewUrl = this.app.config.webviewUrl;
		
		this.authenticated();
		this.url = `${webviewUrl}/note/editors/cellphone?access_token=${token}#${url}`;
	}
}
</script>

<style lang="less" scoped>
</style>

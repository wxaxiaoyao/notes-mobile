
<template>
	<view class="full-height">
		<uni-nav-bar status-bar=true 
			left-icon="back" 
			left-text="返回" 
			@click-left="back" 
			title="文档详情"
			right-icon="more-filled"
			@click-right="clickMoreBtn">
		</uni-nav-bar>
		<rich-text :nodes="richtext"></rich-text>
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
			document:{id: null},
		}
	},
	
	computed: {
		richtext() {
			const text = this.document.text;
			return `<div style="white-space:pre-wrap; background-color:#fff; padding: 1px 4px;">${text}</div>`;
		},
	},

	async onLoad() {
		this.document = this.getPageArgs();
	},

	async onShow() {
	
	},

	methods: {
		clickMoreBtn() {
			uni.showActionSheet({
				itemList: ["编辑", "分享到朋友圈", "分享给朋友"],
				success: async (res) => {
					const index = res.tapIndex;
					if (index == 0) {
						this.go("/pages/document/editor", {id: this.document.id, text: this.document.text});
					} else if (index == 1 || index == 2) {
						uni.share({
							provider: "weixin",
							scene: index == 1 ? "WXSenceTimeline" : "WXSceneSession",
							type: 1,
							summary: this.document.text || "",
							success: res => uni.showToast({title:"分享成功"}),
							fail: err => console.log("fail:", JSON.stringify(err)),
						});
					} else if (index == 3) {
					} else if (index == 4) {
					}
				},
				fail: res => console.log(res.errMsg),
			});
		},
	},

}
</script>

<style>
.uni-tag {
	margin-left:2px;
}
.uni-textarea textarea{
	width:96%;
	padding:7px 2%;
	line-height:1.6;
	font-size:28upx;
	height:150upx;
}
.filename-input {
	/*width: 100%;*/
	/*background-color: rgb(245,245,245);*/
}
</style>

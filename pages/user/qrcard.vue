
<template>
	<view class="full-height uni-flex uni-column">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="二维码名片"
			@click-left="back">
		</uni-nav-bar>

		<view class="qrcard-container uni-flex-item">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">
							<image :src="user.portrait"></image>
						</view>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{ user.nickname || user.username }}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">{{user.location || ""}}</view>
						</view>
					</view>
				</view>
				<view class="uni-list-cell uni-center" style="padding:20px">
					<image class="qrcode" :src="qrcode"></image>
				</view>
			</view>
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
			qrcode:"",
		}
	},

	async onLoad() {
		this.qrcode = await this.api.users.qr().then(res => res.data || "");
	},
}
</script>

<style>
.qrcard-container {
	padding: 20% 5%;
	background-color:dimgrey;
}

.qrcode {
	height: 300px;
	width: 300px;
}
</style>


<template>
	<view class="user-info-container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back" 
			left-text="详细资料"
			@click-left="back">
		</uni-nav-bar>

		<view class="uni-list">
			<view class="uni-list-cell-divider"></view>
			<view  class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-media-list">
					<view class="uni-media-list-logo">
						<image :src="contact.portrait"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{contact.alias || contact.nickname}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">
							{{contact.username}}
						</view>
					</view>
				</view>
			</view>

			<view class="uni-list-cell-divider"></view>

			<view @click="clickSetting" class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					设置备注和标签
				</view>
			</view>

			<view class="uni-list-cell-divider"></view>

			<button type="primary" @click="clickSendMsg" class="full-width">发送消息</button>
		</view>
	</view>
</template>

<script>
import queryString from 'query-string';
import config from "../../commons/config.js";
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
	},

	data() {
		return {
			contact:{},
		}
	},
	onLoad(options) {
		this.contact = this.getPageArgs();
	},
	methods: {
		async clickSendMsg() {
			const contact = this.contact;
			const contactId = this.app._.toNumber(this.contact.id);
			const session = await this.api.sessions.create({
				memberIds: [this.user.id, contactId],
			}).then(o => o.data);	
			if (!session) return uni.showToast({title:"创建会话失败", icon:"none"});

			//console.log(session);
			return this.go("/pages/chat/session", {
				sessionId: session.sessionId,
				title: contact.alias || contact.nickname || contact.username,
			});
		},
		clickSetting() {
			this.go("/pages/contact/info-modify", {id:this.contact.contactId});
		}
	}
}
</script>

<style lang="less">
</style>


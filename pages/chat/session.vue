<template>
	<view class="chatroom-container">
		<uni-nav-bar 
			status-bar=true 
			left-icon="back"
			:title="title" 
			@click-left="back">
		</uni-nav-bar>
		<view class="message-list-container">
			<scroll-view class="message-list" 
				id="scrollview" 
				:style="{height: style.contentViewHeight + 'px'}" 
				scroll-y="true" 
				scroll-into-view="scroll-view-bottm"
				:scroll-with-animation="true"
			    :scroll-top="scrollTop">
				<message-show v-for="(message,index) in messages" :key="index" :__data__="message"></message-show>
				<view id="scroll-view-bottm"></view>
			</scroll-view>
		</view>
		<view class="message-input-container">
			<chat-input :__data__="inputData"></chat-input>
		</view>
	</view>
</template>

<script>
import _ from "../../libs/lodash.min.js";
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import chatInput from '../../components/chats/chatinput.vue';
import messageShow from '../../components/chats/messageshow.vue';

export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		chatInput,
		messageShow
	},

	data() {
		return {
			name:'xcecd@qq.com',
			title:"rebot",
			sessionId: "__data__",
			session:{
			},
			style: {
				pageHeight: 0,
				contentViewHeight: 0,
				footViewHeight: 90,
				mitemHeight: 0,
			},
			scrollTop: 0,
			messages: [],
			inputData: {
				sendMessage: data => this.sendMessage(data),
			},
		}
	},

	computed: {
		isSystemSession() {
			return this.sessionId == "__rebot__" || this.sessionId == "__system__";
		},
	},

	async onLoad({sessionId, title}) {
		this.socket = await this.initSocket();
		this.title = title;
		this.sessionId = sessionId;

		const res = uni.getSystemInfoSync();
		const windowHeight = res.windowHeight;
		this.style.contentViewHeight = windowHeight - (110 * windowHeight / 750); // 100upx => px

		this.socket.on("push_messages", message => {
			this.messages.push(message)
		});

		this.socket.on("pull_messages", ({sessionId, userId}) => {
			if (this.user.id == userId || this.sessionId != sessionId) return;
			_.each(this.messages, o => o.state = 1); // 标记已读
		});

		const messages = await this.pullMessages(sessionId);
		this.messages = messages;
	},

	methods: {
		async pullMessages(sessionId) {
			if (sessionId == "__rebot__") {
				return Promise.resolve([]);
			}

			return await new Promise((resolve, reject) => {
				this.socket.emit("pull_messages", {sessionId}, (msgs = []) => {
					resolve(msgs);
				})
			});
		},
		sendMessage: function ({text, type=0}) { //获取子组件的输入数据
			const {username, id, portrait, nickname} = this.user;
			const msg = {sessionId:this.sessionId, type, text, userId: id, username, portrait, nickname, state:0, id:0};
			this.messages.push(msg);
			this.scrollToBottom();
			if (this.isSystemSession) {
				this.toRobot(text);
				return;
			};

			this.socket.emit("push_messages", msg, message => {
				msg.id = message.id;
				msg.createdAt = message.createdAt;
			});
		},
		scrollToBottom: function () {
			const that = this;
			setTimeout(() => {
				const query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();
				query.exec(function (res) {
					that.style.mitemHeight = 0;
					res[0].forEach((rect) => {
						that.style.mitemHeight = that.style.mitemHeight + rect.height + 20;
					});
					if (that.style.mitemHeight > that.style.contentViewHeight) {
						that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight;
					}
				});
			});
		},
		toRobot: function (info) {
			// this.addMessage('home', info, false);
			const apiUrl = 'http://www.tuling123.com/openapi/api';
			uni.request({
				url: apiUrl,
				data: {
					"key": 'acfbca724ea1b5db96d2eef88ce677dc',
					"info": info,
					"userid": 'uni-test'
				},
				success: (res) => {
					console.log("s", res);
					const text = res.data.text;
					const msg = {userId:0, username:"rebot", sessionId: this.sessionId, text, type:0};
					this.messages.push(msg);
					this.scrollToBottom();
					console.log('request success:' + res.data.text);
				},
				fail: (err) => {
					console.log('request fail', err);
					uni.showModal({
						content: err.errMsg,
						showCancel: false
					})
				}
			});
		}
	}
}
</script>

<style lang="less">
.chatroom-container {
	height: 100%;
	display: flex;
	flex-direction: column;
}
.message-list-container {
	flex:1;
	margin-bottom:100upx;
}
.message-input-container {
	position: fixed;
	width: 100%;
	height: 90upx;
	min-height: 90upx;
	left: 0upx;
	bottom: 0upx;
	overflow: hidden;

}
</style>

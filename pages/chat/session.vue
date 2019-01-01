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
				:style="{height: messageListHeight + 'px'}" 
				scroll-y="true" 
				scroll-into-view="scroll-view-bottom"
				:scroll-with-animation="true"
			    :scroll-top="scrollTop">
				<message-show v-for="(message,index) in messages" :key="index" :__data__="message"></message-show>
				<view id="scroll-view-bottom"></view>
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
			title:"",
			sessionId: "__data__",
			session:{
			},
			style: {
				pageHeight: 0,
				contentViewHeight: 0,
				footViewHeight: 90,
				mitemHeight: 0,
			},
			messageListHeight:0,
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
		this.messageListHeight = res.windowHeight - 20 - 44 - 38 - 15;  // 小程序状态栏25px 暂不考虑
		//#ifdef H5
			this.messageListHeight += 20;	
		//#endif

		this.socket.on("push_messages", message => {
			if (message.userId == this.user.id) return;
			this.messages.push(message)
			this.scrollToBottom();
		});

		this.socket.on("pull_messages", ({sessionId, userId}) => {
			if (this.user.id == userId || this.sessionId != sessionId) return;
			_.each(this.messages, o => o.state = 1); // 标记已读
			this.scrollToBottom();
		});

		const messages = await this.pullMessages(sessionId);
		this.messages = messages;
		this.scrollToBottom();
	},

	onShow() {
		this.scrollToBottom();
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
		sendMessage: function ({text, type=0, url}) { //获取子组件的输入数据
			const {username, id, portrait, nickname} = this.user;
			const msg = {url, sessionId:this.sessionId, type, text, userId: id, username, portrait, nickname, state:0, id:0};
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
					let mitemHeight = 0;
					res[0].forEach((rect) => {
						mitemHeight = mitemHeight + rect.height + 20;
					});
					if (mitemHeight > that.messageListHeight) {
						that.scrollTop = mitemHeight - that.messageListHeight
					}
				});
			}, 300);
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
	padding: 5px 0px 10px 0px;
}
.message-input-container {
	position: fixed;
	width: 100%;
	height: 38px;
	min-height: 38px;
	left: 0px;
	bottom: 0px;
	overflow: hidden;

}
</style>

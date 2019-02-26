<template>
	<view>
		<uni-nav-bar 
			status-bar=true 
			left-text="  NOTE">
		</uni-nav-bar>
		<scroll-view class="session-list-container" scroll-y>
			<view class="uni-list">
				<view v-for="(x, i) in sessions" :key="i" @click="clickSession(x)" class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">
							<image :src="x.logo"></image>
						</view>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{ x.title }}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">暂无消息</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>	
	</view>
</template>

<script>
import _ from "lodash";
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";
import navigationsIndex from "../../components/navigations/index.vue";


export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
		"navigations-index": navigationsIndex,
	},

	data: function() {
		return {
			rebotSession: {
				title: "rebot",
				sessionId:"__rebot__",
				logo:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/homeHL.png",
			},
			sessions:[],
			currentSessionId:"",
		}
	},

	methods: {
		formatSession(session) {
			const {portraits} = this.app;
			const userId = this.user.id;
			const members = session.members;
			if (members.length == 2) {
				const other = members[0].userId == userId ? members[1] : members[0];
				session.title = session.title || other.nickname || other.username;
				session.logo = other.portrait || portraits[other.username[0] + 1];
			} else {
				const names = [];
				_.each(members, o => names.push(o.nickname || o.username));
				session.title = session.title || names.join(" ");
				session.logo = session.user.portrait || portraits[session.user.username[0] + 1];
			}

			return session;
		},
		clickSession(x) {
			this.go("/pages/chat/session", {
				title:x.title,
				sessionId:x.sessionId,
			});
		},
	},

	async onLoad() {
		this.socket = await this.initSocket();
		this.socket.emit("pull_sessions", {}, (sessions = []) => {
			this.sessions = _.map(sessions, this.formatSession);
			this.sessions.splice(0,0, this.rebotSession);
		
			console.log(this.sessions);
		});

		this.socket.on("push_messages", message => {
			const session = _.find(this.sessions, {sessionId:message.sessionId});
			if (!session) return;
			if (this.currentSessionId != message.sessionId)	session.unreadMsgCount++;
			session.lastMsg = message;
		});
	}
}
</script>

<style>
</style>

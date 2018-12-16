<template>
	<view>
		<uni-nav-bar status-bar=true title="消息列表"></uni-nav-bar>
		<scroll-view class="session-list-container" scroll-y>
			<view class="uni-list">
				<view v-for="(x, i) in sessions" :key="i" @click="clickSession(x)" class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate">
						<image style="width:60px; height:60px" :src="x.logo"></image>
						<view class="uni-column uni-list-cell-right uni-list-cell-pd">
							<view class="uni-ellipsis uni-title">{{ x.title }}</view>
							<view class="uni-ellipsis uni-text uni-text-gray">暂无消息</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>	
	</view>
</template>

<script>
import _ from "../../libs/lodash.min.js";
import component from "../../components/component.js";
import uniNavBar from "../../components/unis/uni-nav-bar.vue";


export default {
	mixins:[component],

	components: {
		"uni-nav-bar": uniNavBar,
	},

	data: function() {
		return {
			sessions:[],
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
		clickSession() {
			
		},
	},

	async onLoad() {
		this.socket = await this.initSocket();
		this.socket.emit("pull_sessions", {}, (sessions = []) => {
			this.sessions = _.map(sessions, this.formatSession);
			console.log(this.sessions);
		});
	}
}
</script>

<style>
</style>

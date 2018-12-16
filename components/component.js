
import vue from "vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import _ from "../libs/lodash.min.js";
import api from "../commons/api/index.js";
import config from "../commons/config.js";
import socket from "../commons/socket.js";

export default {
	data: function() {
		return {
			api: api,
		}
	},

	props: {
		__data__: {
			type: Object,
			default:function() {
				return {};
			}
		},
	},

	computed: {
		...mapGetters({
			token: "token",
			user: "user",
			isAuthenticated: "isAuthenticated",
		}),
		authUserId() {
			if (this.user && this.user.id) return this.user.id;
			return 0;
		},
		authUsername() {
			if (this.user && this.user.username) return this.user.username;
			return "";
		},
	},

	watch: {
		__data__: function() {
			_.each(this.default_data, (val, key) => {
				if (this.__data__[key] == undefined) {
					vue.set(this.__data__, key, val);
				}
			});
		}
	},

	methods: {
		...mapMutations({
			setUser: "setUser",
		}),
		back() {
			uni.navigateBack({delta:1});
		},
		go(url) {
			uni.navigateTo({url});
		},
		authenticated() {
			if (this.isAuthenticated) return {...this.user, userId:this.user.id};

			uni.reLaunch({url:"/pages/login/index"});
		},
		async initSocket() {
			this.authenticated();
			return await socket(config.socketUrl, {token: this.token});
		}
	},

	beforeMount() {
		_.each(this.default_data, (val, key) => {
			if (this.__data__[key] == undefined) {
				vue.set(this.__data__, key, val);
			}
		});
	},
}


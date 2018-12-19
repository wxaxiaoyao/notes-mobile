
import vue from "vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import queryString from 'query-string';
import _ from "../libs/lodash.min.js";
import api from "../commons/api/index.js";
import config from "../commons/config.js";
import socket from "../commons/socket.js";

const portraits = {};
for (let i = 0; i < 26; i++) {
	for (let j = 1; j <= 4; j++) {
		const key = "abcdefghijklmnopqrstuvwxyz"[i] + j;
		const url = "http://statics.qiniu.wxaxiaoyao.cn/_/portraits/" +  key + ".png";
		portraits[key] = url;
	}
}

const app = {
	portraits,
};

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
		app() {return app},
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
		go(url, options = {}) {
			const qs = queryString.stringify(options, {encode:false});
			uni.navigateTo({url: `${url}?${qs}`});
		},
		authenticated() {
			if (this.isAuthenticated) return {...this.user, userId:this.user.id};

			uni.reLaunch({url:"/pages/login/index"});
		},
		async initSocket() {
			this.authenticated();
			return await socket(config.socketUrl, {token: this.token});
		},
		async checkVersion() {
			const result = await this.api.versions.get({"x-order":"id-desc", "type":0});
			const versions = result.data || [];
			if (versions.length == 0) return;
			const version = versions[0];
			if (config.version.id >= version.id) return ;
			return version;
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


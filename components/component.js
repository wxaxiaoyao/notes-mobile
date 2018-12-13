
import vue from "vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import _ from "../libs/lodash.min.js";
import api from "../commons/api/index.js";
import config from "../commons/config.js";

export default {
	data: function() {
		return {
			api: api,
			app: {
			},
		}
	},

	props: {
		__default_data__: {
			type: Object,
		},
	},

	computed: {
		...mapGetters({
			token: "token",
			user: "user",
			isAuthenticated: "isAuthenticated",
			getData: "getData",
		}),
		authUserId() {
			if (this.user && this.user.id) return this.user.id;
			return 0;
		},
		authUsername() {
			if (this.user && this.user.username) return this.user.username;
			return "";
		},
		__data__() {
			// 设置默认数据
			const data = this.__default_data__ || this.default_data || {};	
			_.each(this.default_data, (val, key) => {
				if (data[key] == undefined) {
					vue.set(data, key, val);
				}
			});

			return data;
		},
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
	},

	beforeMount() {
	},
}


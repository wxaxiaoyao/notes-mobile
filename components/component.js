
import vue from "vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import queryString from 'query-string';
import _ from "../libs/lodash.min.js";
import api from "../commons/api/index.js";
import config from "../commons/config.js";
import socket from "../commons/socket.js";
import consts from "../commons/const.js";
import storage from "../commons/storage.js";

const portraits = {};
for (let i = 0; i < 26; i++) {
	for (let j = 1; j <= 4; j++) {
		const key = "abcdefghijklmnopqrstuvwxyz"[i] + j;
		const url = "http://statics.qiniu.wxaxiaoyao.cn/_/portraits/" +  key + ".png";
		portraits[key] = url;
	}
}

const app = {
	_,
	portraits,
	config,
	consts,
	storage,
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
		currentPageUrl() {
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			return "/" + page.route;
		},
		windowHeight() {
			const windowHeight = uni.getSystemInfoSync().windowHeight;
			
			//#ifdef H5
			return windowHeight;
			//#endif
			//#ifndef H5
			return windowHeight + 44;
			//#endif
		},
		windowWidth() {
			return uni.getSystemInfoSync().windowWidth;
		},
		navBarHeight() {
			//#ifdef H5
				return 44;
			//#endif
			return 64;
		}
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
		setPageArgs(url, args = {}) {
			url = url || this.currentPageUrl;
			storage.set(url, args);
		},
		getPageArgs(url) {
			url = url || this.currentPageUrl;
			const args = storage.get(url);
			//console.log(url, args);
			return args || {};
		},
		setBackArgs(url, args = {}) {
			url = (url || this.currentPageUrl) + "-back";
			storage.set(url, args);
		},
		getBackArgs(url) {
			url = (url || this.currentPageUrl) + "-back";
			const args = storage.get(url);
			//console.log(url, args);
			return args || {};
		},
		back(args) {
			const pages = getCurrentPages();
			if (pages.length > 1)  {
				const page = pages[pages.length - 2];
				const url = "/" + page.route;
				this.setBackArgs(url, args);
			}
			uni.navigateBack({delta:1});
		},
		go(url, options, type="navigateTo") {
			this.setPageArgs(url, options);
			uni[type]({url});
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
			const result = await this.api.versions.get({
				"x-order":"versionNo-desc",
				"x-per-page":1,
			   	"type":0,
			});
			const versions = result.data || [];
			if (versions.length == 0) return;
			const version = versions[0];
			if (config.version.versionNo >= version.versionNo) return ;
			if (!version.downloadUrl) return;
			uni.showModal({
				title:"版本更新",
				content:"存在新的可用版本, 升级获取更好服务与体验.",
				success: res => {
					if (!res.confirm) return ;
					uni.showLoading({title:"下载中...", mask:true});
					uni.downloadFile({
						url: version.downloadUrl,
						success: (res) => {
							console.log('downloadFile success, res is', res)
							const filename = res.tempFilePath;
							//#ifdef APP-PLUS
							plus.runtime.install(filename);
							//#endif
						},
						fail: (err) => {
							console.log('downloadFile fail, err is:', err)
							uni.showToast({title:"下载失败", icon:"none"});
						},
						complete: () => {
							uni.hideLoading();
						},
					});
				}
			});
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



import vue from "vue";
import {mapGetters, mapActions, mapMutations} from "vuex";
import _ from "../libs/lodash.min.js";
import api from "../commons/api/index.js";
import config from "../commons/config.js";

export default {
	data: function() {
		return {
			api: api,
			app: {config},
		}
	},

	props: {
		__data__: {
			type: Object,
		}
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
	},

	methods: {
		...mapMutations({
			setUser: "setUser",
			setToken: "setToken",
			setMsg: "setMsg",
		}),
		back() {
			uni.navigateBack({delta:1});
		},
		go(url) {
			uni.navigateTo({url});
		},
		systemPortrait(username = "username") {
			const key = username.toLowerCase()[0] + 1;
			return g_app.portraits[key];
		},
		authenticated() {
			if (this.isAuthenticated) return {...this.user, userId:this.user.id};

			uni.reLaunch({url:"/pages/login/index"});
		},
		setShareData(key, data) {
			g_app.setData(key, data);
		},
		getShareData(key, defaultValue) {
			return g_app.getData(key, defaultValue);
		},
		setData(key, data, replace=false) {
			data = _.cloneDeep(data);
			if (!replace && typeof(data) == "object") data = _.merge({}, this.getData(key), data);
			this.$store.commit("setData", {[key]:data});
		},
		on(eventName, callback) {
			events.$on(eventName, callback);
		},
		emit(eventName, ...args) {
			events.$emit(eventName, ...args);
		},
		push(path, data = {}) {
			g_app.storage.sessionStorageSetItem(path, _.cloneDeep(data));
			this.$router.push({path});
		},
		setEditorMode(mode) {
			this.setData("__editor_mode__", mode);
		},
		setCurrentUrl(url) {
			this.setData("__currentUrl__", url);
		},
		setCurrentContent(content) {
			this.setData("__currentContent__", content || "");
		},
	},

	beforeMount() {
	},
}


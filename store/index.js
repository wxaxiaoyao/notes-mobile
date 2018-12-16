
import vue from "vue";
import vuex from "vuex";
import _ from "../libs/lodash.min.js";
import jwt from "jwt-simple";

import storage from "../commons/storage.js";
import socket from "../commons/socket.js";
import config from "../commons/config.js";
import api from "../commons/api/index.js";

vue.use(vuex);

const getTokenPayload = token => {
	if (!token) return ;
	const payload = jwt.decode(token, null, true);

	if (payload.nbf && Date.now() < payload.nbf*1000) {
		return;
	}
	if (payload.exp && Date.now() > payload.exp*1000) {
		return;
	}

	return payload;
}
const userinfo = storage.get("__userinfo__") || {};
const payload = getTokenPayload(userinfo.token);

api.options.baseURL = config.baseURL;
if (payload) {
	api.options.header.Authorization = "Bearer " + userinfo.token;
	socket(config.socketUrl, {token:userinfo.token});
}

export const state = () => ({
	isSmallScreen: false,

	// 认证token
	token:null,

	// 模式
	mode: "normal",

	// socket state
	// socketState: "disconnect",

	// 用户信息
	user: userinfo,

	// 通用数据
	data: {},

	// mod数据
	modsData: {},

	// share data  共享数据 不处理响应式
	
	// msg 消息
	msg: null,  // socket 消息传递
});

export const getters = {
	isAuthenticated: (state) => {
		const token = (state.user || {}).token;
		if (!token) return false;
		const payload = jwt.decode(token, null, true);

		if (payload.nbf && Date.now() < payload.nbf*1000) {
			return false;
		}
		if (payload.exp && Date.now() > payload.exp*1000) {
			return false;
		}

		return true;
	},
	token: (state) => (state.user || {}).token,
	user: (state) => _.cloneDeep(state.user),
}

export const actions = {
	nuxtServerInit({commit, state}, {req}) {
		let token = state.token;
		if (process.server && req && req.ctx) {
			token = req.ctx.state.token;
			//console.log(req.ctx.state.token);
			state.token = token;
		}

		api.options.headers = _.merge({}, api.options.headers, {
			"Authorization": "Bearer " + token,
		});
	},
}

export const mutations = {
	setState(state, obj) {
		_.each(obj, (val, key) => vue.set(state, key, val));
	},
	setMode(state, mode) {
		state.mode = mode;
	},
	setUser(state, user = {}) {
		state.user = user;
		storage.set("__userinfo__", user);
		if (user.token) api.options.header.Authorization = "Bearer " + user.token;
	},
	setMsg(state, msg) {
		state.msg = msg;
	},
	setData(state, data) {
		_.each(data, (val, key) => vue.set(state.data, key, val));
	},
	setModsData(state, data) {
		_.each(state.modsData, (val, key) => {
			if (!_.has(data, key)) vue.delete(state.modsData, key);
		});
		_.each(data, (val, key) => {
			if (JSON.stringify(val) == JSON.stringify(state.modsData[key])) return;
			vue.set(state.modsData, key, _.cloneDeep(val));
		});
	},
	setModData(state, data) {
		const modData = _.cloneDeep(data || {});
		_.each(modData, (val, key) => vue.set(state.modsData, key, val));
	},
	setCurrentMod(state, data) {
		vue.set(state.data, CURRENT_MOD, _.cloneDeep(data));
	},
	setCurrentModData(state, data) {
		const currentMod = state.data.__currentMod__;
		if (!currentMod || !currentMod.__mod_key__ || !currentMod.__key__) return;
		const __mod_key__ = currentMod.__mod_key__;
		const __key__ = currentMod.__key__;
		const modData = {};
		_.set(modData,__mod_key__,  _.cloneDeep(state.modsData[__mod_key__]));
		_.set(modData, __key__, _.cloneDeep(data));
		vue.set(state.modsData, __mod_key__, modData[__mod_key__]);
	},
}

export default new vuex.Store({
	state,
	getters,
	mutations,
	actions,
});

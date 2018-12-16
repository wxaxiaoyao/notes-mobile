import _ from "../libs/lodash.min.js";

import storage from './storage.js';

const portraits = {};
for (let i = 0; i < 26; i++) {
	for (let j = 1; j <= 4; j++) {
		const key = "abcdefghijklmnopqrstuvwxyz"[i] + j;
		const url = "http://statics.qiniu.wxaxiaoyao.cn/_/portraits/" +  key + ".png";
		portraits[key] = url;
	}
}

export default {
	_,
	storage,
	portraits,
}

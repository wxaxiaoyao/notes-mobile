
const platform = uni.getSystemInfoSync().platform;
const defaultConfig = {
	version:{
		versionNo:4,
		versionName: "0.0.4",
		description: `增加页面编辑器功能`,
	},
}

const developmentConfig = {
	env:"development",
	baseURL: platform == "android" ? "http://192.168.31.250:3001/api/v0/" : "http://xiaoyao.com:3001/api/v0/",
	socketUrl: platform == "android" ? "ws://192.168.31.250:3001/" : "ws://127.0.0.1:3001/",
	//socketUrl: platform == "android" ? "ws://192.168.31.250:3001/" : "ws://api.wxaxiaoyao.cn/",
	//socketUrl:"http://39.106.11.114:3001/",
	webviewUrl: platform == "android" ? "http://192.168.31.250:3000" : "http://xiaoyao.com:3000",
}

const productionConfig = {
	env:"production",
	//baseURL:"http://192.168.31.250:3001/api/v0/",
	baseURL:"http://api.wxaxiaoyao.cn/api/v0/",
	socketUrl: "ws://api.wxaxiaoyao.cn/",
	webviewUrl: "http://wxaxiaoyao.cn",
}

const configs = {
	development: {...defaultConfig, ...developmentConfig},
	production: {...defaultConfig, ...productionConfig}
}

export default configs[process.env.NODE_ENV];

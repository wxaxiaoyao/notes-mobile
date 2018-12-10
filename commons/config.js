
const platform = uni.getSystemInfoSync().platform;
const defaultConfig = {
}

const developmentConfig = {
	env:"development",
	baseURL:"http://localhost:3001/api/v0/",
}

const productionConfig = {
	env:"production",
	//baseURL:"http://192.168.31.250:3001/api/v0/",
	baseURL:"http://api.wxaxiaoyao.cn/api/v0/",
}

const configs = {
	development: {...defaultConfig, ...developmentConfig},
	production: {...defaultConfig, ...productionConfig}
}

let ENV = "production";
if (process.env.NODE_ENV == "development" && platform == "ios") {
	ENV = "development";
}

export default configs[ENV || process.env.NODE_ENV];

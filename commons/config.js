
const defaultConfig = {
}

const developmentConfig = {
	baseURL:"http://localhost:3001/api/v0/",
}

const productionConfig = {
	//baseURL:"http://192.168.31.250:3001/api/v0/",
	baseURL:"http://api.wxaxiaoyao.cn/api/v0/",
}

const config = {
	development: {...defaultConfig, ...developmentConfig},
	production: {...defaultConfig, ...productionConfig}
}

export default config[process.env.NODE_ENV];

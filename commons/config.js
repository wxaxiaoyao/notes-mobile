
const ENV = "release";

const defaultConfig = {

}

const localConfig = {
	baseURL:"http://192.168.31.250:3001/api/v0/",
}

const releaseConfig = {
	baseURL:"http://api.wxaxiaoyao.cn/api/v0/",
}

const config = {
	local: {...defaultConfig, ...localConfig},
	release: {...defaultConfig, ...releaseConfig}
}

export default config[ENV];

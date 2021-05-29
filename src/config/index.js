// 一些全局的config配置
const modeUrlObj = {
	// 开发环境
	development: {
		baseURL: '/api'
	},
	// 测试环境
	test: {
		baseURL: ''
	},
	// 生产环境
	pro: {
		baseURL: ''
	}
};

let baseURL = modeUrlObj.development;
if(process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'test') { //区分环境和环境变量
	baseURL = modeUrlObj.test;
} else if(process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'pro') {
	baseURL = modeUrlObj.pro;
}
export default baseURL
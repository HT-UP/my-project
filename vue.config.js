module.exports = {
	productionSourceMap: false,
	devServer: {
		port: '8090', // 端口号
		https: false, 
		open: false, // 配置自动启动浏览器
		// 配置代理
		proxy: {
			"/api": {
//				target: 'https://o2i.vibeac.com/service-admin',  //测试
				target: 'http://192.168.1.219:8097',  //肖思宇
				changeOrigin: true, // 开启跨域,在本地创建一个虚拟服务,然后发送请求的数据,并同时接收请求的数据,这样服务端和服务端进行数据交互就不会有问题
				pathRewrite: {
					"^/api": '', // 利用这个里面的值拼接上target里面的地址
				}
			}
		}
	},
	
	publicPath: './' // 公共路径  发布时改为 ./
}
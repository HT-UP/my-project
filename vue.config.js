/*本地多端口代理设置:
base： /api 替换标志
port： 端口号
acceptIps： 允许代理的白名单，只有存在的白名单才被与允许多端口代理*/
const base = "";
const port = "8050";
const acceptIps = ["192.168.1.219", "192.168.1.143", "192.168.1.29"];

module.exports = {
	outputDir: 'dist',//打包后的目录名称
	indexPath: 'index.html',//html 的输出路径
    productionSourceMap:false,  //去掉打包的时候生成的map文件
    lintOnSave: false,
    filenameHashing: false,
	devServer: {
		port: '8098', // 端口号
		https: false, // https: {type:Bollean}
		open: false, // 配置自动启动浏览器
		//显示警告和错误
        overlay: {
            warnings: false,
            errors: true
        },
		// 配置代理
		proxy: {
			"/api": {
                target: 'https://chinanet.vvtech.tech/tel_mgr',  //测试
				changeOrigin: true, // 开启跨域,在本地创建一个虚拟服务,然后发送请求的数据,并同时接收请求的数据,这样服务端和服务端进行数据交互就不会有问题
				pathRewrite(path, req) {
					const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
					if(acceptIps.indexOf(ip) >= 0) {
						return path.replace('/api', base);
					}
					return path.replace('/api', '');
				},
				router(req) {
					const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]; // 多端口代理， 哪个客户端请求， 转发到那个客户端服务， 针对白名单用户， 非白名单用户走正常代理流程
					if(acceptIps.indexOf(ip) >= 0) {
						return `${req.protocol}://${req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]}:${port}`;
					}
					return
				}
			}
		}
	},

	transpileDependencies: ["*"],

	publicPath: process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_BASE // 公共路径 
}

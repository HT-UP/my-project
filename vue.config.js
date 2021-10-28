module.exports = {
	outputDir: 'dist',//打包后的目录名称
	indexPath: 'index.html',//html 的输出路径
    productionSourceMap:false,  //去掉打包的时候生成的map文件
    lintOnSave: false,
    filenameHashing: false,
	devServer: {
		port: '8090', // 端口号
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
                target: 'https://chinanet.vvtech.tech/web/admin',  //测试
				changeOrigin: true, // 开启跨域,在本地创建一个虚拟服务,然后发送请求的数据,并同时接收请求的数据,这样服务端和服务端进行数据交互就不会有问题
				pathRewrite: {
					"^/api": '', // 利用这个里面的值拼接上target里面的地址
				}
			}
		}
	},

	transpileDependencies: ["*"],

	publicPath: process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_BASE // 公共路径 
}

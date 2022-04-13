import qs from 'qs';
import axios from 'axios';
import store from '@/store';
import router from '@/router';

import { message } from '../assets/js/message';

// 设置环境
axios.defaults.baseURL = process.env.VUE_APP_URL;
// 设置请求超时
axios.defaults.timeout = 3000000;
// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //form表单数据

// 添加请求拦截器
axios.interceptors.request.use((requestConfig) => {
	// 在发送请求之前做些什么
	// 每次发送请求之前判断vuex中是否存在token
	// 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
	// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
	if(requestConfig.url != '/login') {
		let token = store.state.token || localStorage.getItem("Authorization");
		token && (requestConfig.headers.token = token);
	}
	return requestConfig;
}, (error) => {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((res) => {
	//处理返回数据
	if(res.data.status == 1){
		return Promise.resolve(res);
	}else{
		//token失效抛出报错
		if(res.data.errorCode == '080006' || res.data.errorCode == '080007' || res.data.errorCode == '080008') {
			router.push('/login');
		}
		message.error(res.data.errorMsg);
		return Promise.reject(res.data.errorMsg);
	}
}, (error) => {
	if(error && error.response) {
		// 1.公共错误处理
		// 2.根据响应码具体处理
		switch(error.response.status) {
			case 400:
				error.message = '错误请求'
				break;
			case 401:
				error.message = '未授权，请重新登录'
				break;
			case 403:
				error.message = '拒绝访问'
				break;
			case 404:
				error.message = '请求地址不存在'
				break;
			case 405:
				error.message = '请求方法未允许'
				break;
			case 408:
				error.message = '请求超时'
				break;
			case 500:
				error.message = '服务器端出错'
				break;
			case 501:
				error.message = '网络未实现'
				break;
			case 502:
				error.message = '网络错误'
				break;
			case 503:
				error.message = '服务不可用'
				break;
			case 504:
				error.message = '网络超时'
				break;
			case 505:
				error.message = 'http版本不支持该请求'
				break;
			default:
				error.message = `连接错误${error.response.status}`
		}
	} else {
		// 超时处理
		if(JSON.stringify(error).includes('timeout')) {
			message.error('服务器响应超时，请刷新当前页');
		}
		error.message = '连接服务器失败';
	}
	
	message.error(error.message);

	// 对响应错误做点什么
	return Promise.reject(error);
});

//封装get和post方法
export const get = (url, params) => {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: params
			})
			.then(res => {
				resolve(res.data);
			}, err => {
				reject(err);
			}).catch(err => {
				reject(err);
			})
	})
};

export const post = (url, params, contentType) => {
	if(contentType == 'formData') {
		axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
	} else if(contentType == 'json') {
		axios.defaults.headers.post['Content-Type'] = 'application/json';
	} else {
		axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		params = qs.stringify(params);
	}
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(res => {
				resolve(res.data);
			}, err => {
				reject(err);
			}).catch(err => {
				reject(err);
			})
	})
};
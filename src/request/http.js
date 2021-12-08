import qs from 'qs';
import axios from 'axios';
import store from '@/store';
import router from '@/router';

import {message} from '../assets/js/message';

// 设置环境
axios.defaults.baseURL = process.env.VUE_APP_URL;
// 设置请求超时
axios.defaults.timeout = 3000000;
// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //form表单数据

// 添加请求拦截器
axios.interceptors.request.use(function (requestConfig) {
    // 在发送请求之前做些什么
   	// 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    if(requestConfig.url != '/login'){
    	let token = store.state.token || localStorage.getItem("Authorization");
    	token && (requestConfig.headers.token = token);
    }
    return requestConfig;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
// 添加响应拦截器
axios.interceptors.response.use(function (res) {
    // 对响应数据做点什么
    if(res.data.errorCode == '080006' || res.data.errorCode == '080007' || res.data.errorCode == '080008'){
    	router.push('/login');
    }
    return res;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

//封装get和post方法
export const get = (url, params) => {
	return new Promise((resolve, reject) => {
		axios.get(url, {params: params})
			.then(res => {
				resolve(res.data);
			}, err => {
				message.error("请求超时，请检查网络!");
				reject(err);
			}).catch(err => {
				reject(err);
			})
	})
};

export const post = (url, params, contentType) => {
	if(contentType == 'formData'){
    	axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
	}else if(contentType == 'json'){
    	axios.defaults.headers.post['Content-Type'] = 'application/json';
	}else{
    	axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		params = qs.stringify(params);
	}
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(res => {
				resolve(res.data);
			}, err => {
				message.error("请求超时，请检查网络!");
				reject(err);
			}).catch(err => {
				reject(err);
			})
	})
};


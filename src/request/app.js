import qs from 'qs';
import axios from 'axios'
import config from '../config/index'
// 设置环境
axios.defaults.baseURL = config.baseURL;
// 设置请求超时
axios.defaults.timeout = 3000000;
// post请求头的设置
// axios.defaults.headers.post['Content-Type'] = 'application/json'; //json
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //form表单数据
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';  //需要在表单中进行文件上传时，就需要使用该格式

// 添加请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
   	// 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // let token = store.state.token;
    if(config.url == '/login'){

    }else{
    	// let token = store.state.token || localStorage.getItem("Authorization");
    	// token && (config.headers.loginAccessToken = token);
    }
        return config;
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
// 添加响应拦截器
axios.interceptors.response.use(response => {
    // 对响应数据做点什么
    if(response.data.errorCode == '888888'){
    	// router.push('/403');
    }else if(response.data.errorCode == '000001'){
//  	router.push('/login');
    }
    return response;
  }, error => {
    // 对响应错误做点什么
    return Promise.reject(error);
});
// post方法必须要使用对提交从参数对象进行序列化的操作
function getAjax(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err)        
    	})    
	});
}

function postAjax(url,params,contentType) {
	if(contentType=='formData'){
		axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
	}else if(contentType=='json'){
		axios.defaults.headers.post['Content-Type'] = 'application/json';
	}else{
		axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		params = qs.stringify(params);
	}
	return new Promise((resolve, reject) => {
         axios.post(url, params)
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err)
        })
    });
}

let request = {
	getAjax:getAjax,
	postAjax:postAjax
}
export{
	request
}

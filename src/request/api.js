import { get, post } from './http';

//登录请求
export const login = params => {
	return post('/account/login', params, '');
};

//首页获取固话数据
export const getTelephoneCount = params => {
	return get('/telephone/getTelephoneCount', params);
};

//首页获取固话表格数据
export const getTelephoneData = params => {
	return post('/telephone/queryAll', params, '');
};


























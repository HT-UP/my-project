import { get, post } from './http';

//登录请求
export const login = params => {
	return post('/account/login', params, '');
};

//首页获取固话设备表格数据
export const getTelList = params => {
	return post('/telephone/queryAll', params, '');
};


























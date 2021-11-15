import Request from '@/utils/requset.js'
let request = new Request().http

export default {
	login(data) {
		return request({
			url: 'mp-api/api/account/login',
			method: 'POST',
			data: data
		})
	},
	indexList(data) {
		return request({
			url: 'mp-api/api/list',
			method: 'GET',
			data: data
		})
	},
	subjectList(data) {
		return request({
			url: 'mp-api/api/getUserExam',
			method: 'POST',
			data: data
		})
	},
	subjectSelect(data) {
		return request({
			url: 'mp-api/api/add',
			method: 'POST',
			data: data
		})
	},
	userScoreCount(data) {
		return request({
			url: 'mp-api/api/userScoreCount',
			method: 'POST',
			data: data
		})
	},
	personalScoreCount(data) {
		return request({
			url: 'mp-api/api/userInfoSort',
			method: 'GET',
			data: data
		})
	}
}
/*
请求样式：
    自定义名字: function(data) {
        return request({
            url: "/banner", //请求头
            method: "GET", //请求方式 
            data: data,    //请求数据
            token: token, // 可传  
            hideLoading: false, //加载样式
        })
    },
*/
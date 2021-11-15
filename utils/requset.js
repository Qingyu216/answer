import operate from '@/common/operate.js'

export default class Request {
	http(param) {
		// 请求参数
		var url = param.url,
			data = param.data || {},
			header = {},
			method = param.method,
			hideLoading = param.hideLoading || false;

		//拼接完整请求地址
		var requestUrl = operate.api + url;

		//请求方式:GET或POST(POST需配置
		// header: {'content-type' : "application/x-www-form-urlencoded"},)
		if (method) {
			method = method.toUpperCase(); //小写改为大写
			if (method == "POST") {
				header = {
					// 'content-type': "application/x-www-form-urlencoded"
					'Content-Type': "application/json"
				}
			} else {
				header = {
					'Content-Type': "application/json"
				}
			}
		}

		//加载圈
		if (!hideLoading) {
			uni.showLoading({
				title: '加载中...'
			});
		}

		// 返回promise
		return new Promise((resolve, reject) => {
			// 请求
			uni.request({
				url: requestUrl,
				data: data,
				method: method,
				header: header,
				success: (res) => {
					// 判断 请求api 格式是否正确
					if (res.data.code && res.data.code != 200) {
						uni.showToast({
							title: "数据获取失败",
							icon: 'error'
						});
						return;
					}
					// code判断:200成功,不等于200错误
					if (res.data.code) {
						if (res.data.code != '200') {
							uni.showToast({
								title: "数据获取失败",
								icon: 'error'
							});
							return;
						}
					} else {
						uni.showToast({
							title: "数据获取失败",
							icon: 'error'
						});
						return;
					}
					// 将结果抛出
					resolve(res.data)
				},
				//请求失败
				fail: (e) => {
					uni.showToast({
						title: "数据获取失败",
						icon: 'error'
					});
					resolve(e.data);
				},
				//请求完成
				complete() {
					//隐藏加载
					if (!hideLoading) {
						uni.hideLoading();
					}
					resolve();
					return;
				}
			})
		})
	}
}

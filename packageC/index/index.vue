<template>
	<view>
		<div class="satellite-con header-bg">
			<cu-custom bgColor="header-bg" :isBack="true">
				<block slot="backText" style="font-size: 14px;">返回</block>
				<block slot="content" style="font-size: 14px;">卫星厅</block>
			</cu-custom>
			<div class="satellite-text">
				深圳机场卫星厅项目自2018年12月21日正式动工。总建筑面积23万多平方米，由中央、东南、东北、西南和西北五个指廊组成，采用“X”构型设计，分为地上四层、地下一层，通过捷运系统与T3航站楼相连接，从T3航站楼乘坐捷运到卫星厅仅需3分钟。卫星厅可为
				2200 万人次旅客提供候机和中转服务，有助于进一步提升深圳机场保障供给能力。
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
			}
		},
		onLoad() {
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		methods: {
			onShareTimeline() { //分享到朋友圈
				return {  
					title: '答题酷',
					imageUrl: '/static/share.png'
				}  
			}
		},
		onShareAppMessage() { //发送给朋友
		    return {
		      title: '答题酷',
		      path: 'pages/login/index',
			  imageUrl: '/static/share.png'
		    }
		}
	}
</script>

<style lang="less" scoped>
	.satellite-con {
		height: 100vh;
		position: relative;
		.satellite-text {
			padding: 30px 20px;
			text-indent: 2em;
			line-height: 34px;
			font-size: 16px;
			color: #fff;
		}
	}
</style>

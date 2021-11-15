<template>
	<view class="container header-bg">
		<image class="title" :src="titleImage"></image>
		<view class="content">
			<view class="hd">
				<image class="wave" :src="waveImage" mode="aspectFill"></image>
				<image class="wave wave-bg" :src="waveImage" mode="aspectFill"></image>
			</view>
			<view class="bd">
				<button v-if="authorized" @click="loginTest" class="confirm-btn header-bg">登录</button>
				<button v-else @click="start" class="confirm-btn animation">开始答题</button>
			</view>
		</view>
	</view>
</template>

<script>
	import operate from '@/common/operate.js'
	export default {
		name: 'login',
		data() {
			return {
				authorized: true,
				userInfo: {
					code: '',
					headPortrait: '',
					userName: ''
				}
			}
		},
		onLoad() {
			var that = this
			if (wx.getStorageSync('openId')) {
				that.authorized = false
			} else {
				uni.login({
					success: (res) => {
						if (res.errMsg == 'login:ok') {
							that.userInfo.code = res.code
						} else {
							uni.showToast({
								title: '系统异常，请联系管理员！'
							})
						}
					}
				})
			}

			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		computed: {
			titleImage() {
				return operate.api + 'mp-api/title.png'
			},
			waveImage() {
				return operate.api + 'mp-api/wave.png'
			}
		},
		methods: {
			loginTest() { 
				var that = this
				uni.showModal({
					title: '是否微信登录？',
					content: '登录以后可以开始答题，未登录需要重新登录答题',
					success: function (res) {
						if (res.confirm) {
							uni.getUserProfile({
								desc: 'weixin',
								success: async (res) => {
									that.userInfo.headPortrait = res.userInfo.avatarUrl
									that.userInfo.userName = res.userInfo.nickName
							
									that.$api.login(that.userInfo).then(res => {
										if (res.code == 200) {
											uni.setStorageSync('openId', res.data.openId)
											that.authorized = false
										}
									})
								}
							})
						} else if (res.cancel) {
							uni.showToast({
								title: '请重新授权',
								icon: 'error',
								duration: 1000
							})
						}
					}
				});
			},
			start() {
				uni.navigateTo({
					url: "../index/index"
				})
			},
			onShareTimeline() { //分享到朋友圈
				return {
					title: '答题大挑战',
					imageUrl: '/static/share.png'
				}
			}
		},
		onShareAppMessage() { //发送给朋友
			return {
				title: '答题大挑战',
				path: 'pages/login/index',
				imageUrl: '/static/share.png'
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		align-items: stretch;
		padding: 0;
		height: 100%;
		overflow: hidden;

		.title {
			position: absolute;
			top: 30rpx;
			left: 50%;
			width: 600rpx;
			height: 200rpx;
			margin-left: -300rpx;
			opacity: 0;
			animation: show 2.5s cubic-bezier(0.19, 1, 0.22, 1) .5s forwards;
		}
	}

	.content {
		flex: 1;
		display: flex;
		position: relative;
		z-index: 10;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding-bottom: 450rpx;
		background: -webkit-gradient(linear, left top, left bottom, from(rgba(244, 244, 244, 0)), color-stop(0.1, #f4f4f4), to(#f4f4f4));
		opacity: 0;
		transform: translate3d(0, 100%, 0);
		animation: rise 3s cubic-bezier(0.19, 1, 0.22, 1) .25s forwards;

		.hd {
			position: absolute;
			top: 0;
			left: 50%;
			width: 1000rpx;
			margin-left: -500rpx;
			height: 200rpx;
			transition: all .35s ease;
			z-index: 1;

			.wave {
				position: absolute;
				z-index: 3;
				right: 0;
				bottom: 0;
				opacity: 0.5;
				height: 260rpx;
				width: 2250rpx;
				max-width: none;
				animation: wave 10s linear infinite;
			}

			.wave-bg {
				z-index: 1;
				animation: wave-bg 10.25s linear infinite;
			}
		}

		.bd {
			position: relative;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: stretch;
			animation: bd-rise 2s cubic-bezier(0.23, 1, 0.32, 1) .75s forwards;
			opacity: 0;
			z-index: 2;

			.confirm-btn {
				font-size: 13pt;
				width: 460rpx;
				height: 85rpx;
				line-height: 85rpx;
				text-align: center;
				border-radius: 50px;
				margin: 40% auto;

				&.animation {
					color: #db3c38;
					border: 1px solid #db3c38;
					background: transparent;
					border-radius: 60px;
					animation: btn4Ani 2s linear infinite;
				}
			}
		}
	}

	@keyframes show {
		0% {
			opacity: 0;
		}

		100% {
			opacity: .95;
		}
	}

	@keyframes rise {
		0% {
			opacity: 0;
			transform: translate3d(0, 100%, 0);
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 1;
			transform: translate3d(0, 450rpx, 0);
		}
	}

	@keyframes bd-rise {
		from {
			opacity: 0;
			transform: translate3d(0, 60rpx, 0);
		}

		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	@keyframes wave {
		from {
			transform: translate3d(125rpx, 0, 0);
		}

		to {
			transform: translate3d(1125rpx, 0, 0);
		}
	}

	@keyframes wave-bg {
		from {
			transform: translate3d(375rpx, 0, 0);
		}

		to {
			transform: translate3d(1375rpx, 0, 0);
		}
	}

	@keyframes btn4Ani {
		0% {			
			width: 460rpx;
			height: 85rpx;
		}

		30% {
			width: 540rpx;
			height: 117rpx;
			line-height: 117rpx;
			transform: rotate(0deg);
		}

		40% {
			width: 540rpx;
			height: 117rpx;
			line-height: 117rpx;
			transform: rotate(-5deg);
		}

		50% {
			width: 540rpx;
			height: 117rpx;
			line-height: 117rpx;
			transform: rotate(5deg);
		}

		60% {
			width: 540rpx;
			height: 117rpx;
			line-height: 117rpx;
			transform: rotate(-5deg);
		}

		70% {
			width: 540rpx;
			height: 117rpx;
			line-height: 117rpx;
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(0deg);
			width: 460rpx;
			height: 85rpx;
			line-height: 85rpx;
		}
	}
</style>

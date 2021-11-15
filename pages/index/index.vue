<template>
	<view class="container">
		<cu-custom bgColor="header-bg">
			<block slot="content" style="font-size: 14px;">答题大挑战</block>
		</cu-custom>
		<div class="star_img" @click="starImgBtn">
			<image mode="widthFix" :src="image1_2"></image>
		</div>
		<div class="container-con">
			<div class="bg_btn_inner">
				<div class="bg_btn_img">
					<image mode="widthFix" :src="image1_1"></image>
				</div>
				<div class="bg_btn_mask" :class="maskHeight">
					<image mode="widthFix" :src="image1_1"></image>
				</div>
				<div v-if="maskHeight == 'maskHeight10'" class="bg_btn_bottom" @click="satelliteBtn">
					<div>点击图片查看卫星厅</div>
				</div>
				<div class="bg_btn_box">
					<div class="bg_btn" :class='"bg_btn" + item.id' v-for="(item, index) in btnList" :key="index">
						<template v-if="item.status == 1">
							<div v-for="(item2,index2) in item.toptics" :index="item2.id" :key="index2" class="bg_btn_dian"
								:class="{'doneError': item2.status == 0 && item2.status !=null, 'doneRight' : item2.status == 1 && item2.status !=null}"
								@click="subjectBtn(item2.id)">{{item2.id}}</div>
						</template>
						<template v-else>
							<div v-for="(item2,index2) in item.toptics" :index="item2.id" :key="index2" class="bg_btn_dian notOpen"
								@click="subjectBtnNotOpen">{{item2.id}}</div>
						</template>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import image1_1 from '../assets/1_1.png'
	import operate from '@/common/operate.js'
	export default {
		data() {
			return {
				image1_1: image1_1,
				level: 1,
				btnList: [],
				maskHeight: "maskHeight0",
				eventBtn: false
			}
		},
		onLoad() {
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		onShow() {
			this.getList()
		},
		computed: {
			image1_2() {
				return operate.api + 'mp-api/1_2.png'
			}
		},
		methods: {
			getList() {
				let that = this
				let idNum = 0
				this.$api.indexList({openId: wx.getStorageSync('openId')}).then(res => {
					if (res.code == 200) {
						that.btnList = res.data
						res.data.forEach(item => {
							if(item.status == 1) {
								if(item.id > idNum) {
									idNum = item.id
									that.maskHeight = 'maskHeight' + idNum
								}
							}
							if(item.id == 10) {
								if(item.status == 1) {
									that.eventBtn = true
								}
							}
						})
					}
				})
			},
			satelliteBtn() {
				if(this.eventBtn) {
					uni.navigateTo({
						url: "../../packageC/index/index"
					})
				}else {
					uni.showToast({
						title: '卫星厅未开放',
						icon: 'error',
						duration: 1000
					})
				}
			},
			starImgBtn() {
				uni.navigateTo({
					url: "../../packageB/list/index"
				})
			},
			subjectBtn(id) {
				if (id > 1) {
					this.btnList.forEach(item => {
						if (item.status == 1) {
							item.toptics.forEach(item2 => {
								if (parseInt(item2.id) == parseInt(parseInt(id) - 1)) {
									if(parseInt(item2.status) == 0 || parseInt(item2.status) == 1) {
										uni.navigateTo({
											url: "../../packageA/list/index?id=" + id
										})
									}else {
										uni.showToast({
											title: '请先做前面的题',
											icon: 'error',
											duration: 1000
										})
									}
								}
							})
						} 
					})
				}else {
					uni.navigateTo({
						url: "../../packageA/list/index?id=" + id
					})
				}
			},
			subjectBtnNotOpen() {
				uni.showToast({
					title: '题目未开放',
					icon: 'error',
					duration: 1000
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
		position: relative;
		background: #fff;
		min-height: 100vh;

		.star_img {
			position: fixed;
			right: 0;
			top: 7rem;
			z-index: 99;
			image {
				width: 36px;
			}
		}
		
		.container-con {
			position: relative;
			background: linear-gradient(#da3c38, #f0907a);
			overflow: hidden;
			
			image {
				width: 100%;
				height: auto;
				display: block;
			}
			
			.bg_btn_inner {
				padding: 20px 0;
				margin: 0 auto;
				.bg_btn_img {
					width: 100%;
					image {
						width: 100%;
						height: auto;
						display: block;
					}
				}
				.bg_btn_mask {
					width: 100%;
					position: absolute;
					bottom: 20px;
					left: 0;
					filter: grayscale(1);
					overflow: hidden;
					z-index: 1;
					image {
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;
						height: auto;
						display: block;
					}
				}
				
				.bg_btn_bottom {
					position: absolute;
					z-index: 3;
					>div {
						position: absolute;
						bottom: -35px;
						width: 100%;
						text-align: center;
						color: rgba(255, 255, 255, 0.1);
						background: #ed8080;
						background: -moz-linear-gradient(left, #ed8080 0%, #2a77d6 16%, #5eb524 32%, #eacd25 48%, #ed8080 64%, #2a77d6 80%, #5eb524 100%);
						background: -webkit-gradient(linear, left top, right top, color-stop(0%, #ed8080), color-stop(16%, #2a77d6), color-stop(32%, #5eb524), color-stop(48%, #eacd25), color-stop(64%, #ed8080), color-stop(80%, #2a77d6), color-stop(100%, #5eb524));
						background: -webkit-linear-gradient(left, #ed8080 0%, #2a77d6 16%, #5eb524 32%, #eacd25 48%, #ed8080 64%, #2a77d6 80%, #5eb524 100%);
						background: -o-linear-gradient(left, #ed8080 0%, #2a77d6 16%, #5eb524 32%, #eacd25 48%, #ed8080 64%, #2a77d6 80%, #5eb524 100%);
						background: -ms-linear-gradient(left, #ed8080 0%, #2a77d6 16%, #5eb524 32%, #eacd25 48%, #ed8080 64%, #2a77d6 80%, #5eb524 100%);
						background: linear-gradient(to right, #ed8080 0%, #2a77d6 16%, #5eb524 32%, #eacd25 48%, #ed8080 64%, #2a77d6 80%, #5eb524 100%);
						-webkit-background-size: 300% 300%;
						-moz-background-size: 300% 300%;
						background-size: 300% 300%;
						-webkit-background-clip: text;
						-moz-background-clip: text;
						background-clip: text;
						animation: shimmer infinite 3s linear;
						-o-animation: shimmer infinite 3s linear;
						-moz-animation: shimmer infinite 3s linear;
						-webkit-animation: shimmer infinite 3s linear;
						background-repeat: no-repeat;
						background-position: top left;
						background-color: #222;
						font-size: 14px;
						font-weight: bold;
					}
				}
				
				.bg_btn_box {
					.bg_btn {
						.bg_btn_dian {
							&.notOpen {
								background: #939393 !important;
							}
						}
					}
				}
			}
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
			transform: translate3d(0, 0, 0);
		}
	}
	@media screen and (max-width: 350px) {
		.container-con {
			height: 2872px;
			
			.bg_btn_inner {
				width: 300px;
				position: relative;
				
				.bg_btn_mask {
					&.maskHeight0 {
					    height: 2560px;
					}
					&.maskHeight1 {
					    height: 2356px;
					}
					&.maskHeight2 {
					    height: 2116px;
					}
					&.maskHeight3 {
						height: 1814px;
					}
					&.maskHeight4 {
						height: 1544px;
					}
					&.maskHeight5 {
					    height: 1302px;
					}
					&.maskHeight6 {
					    height: 1018px;
					}
					&.maskHeight7 {
					    height: 776px;
					}
					&.maskHeight8 {
					    height: 494px;
					}
					&.maskHeight9 {
					    height: 232px;
					}
					&.maskHeight10 {
					    height: 0px;
					}
				}

				.bg_btn_bottom {
					width: 130px;
					height: 77px;
					bottom: 174px;
					right: 18px;
					border-radius: 7px;
					>div {
						left: -127px;
					}
				}
				.bg_btn_box {
					position: absolute;
					top: 16px;
					left: 0;
					height: 100%;
					width: 100%;
					z-index: 2;
					.bg_btn {
						position: relative;
						width: 288px;
						margin-top: 80px;
						.bg_btn_dian {
							width: 24px;
							height: 24px;
							border-radius: 50%;
							overflow: hidden;
							background: #f7a853;
							position: absolute;
							text-align: center;
							line-height: 24px;
							color: #fff;
							font-weight: bold;
							font-size: 12px;
							&.doneError {
								background: #DF4F47;
							}
			
							&.doneRight {
								background: #4FC95A;
							}
						}
					}
					.bg_btn1 {
						margin-top: 357px;
						height: 125px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 138px;
								top: 2px;
							}
							&:nth-child(2) {
								left: 89px;
								top: 56px;
							}
							&:nth-child(3) {
								left: 132px;
							    top: 95px;
							}
						}
					}
					.bg_btn2 {
						height: 160px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 84px;
								top: 36px;
							}
							&:nth-child(2) {
								left: 133px;
								top: 72px;
							}
							&:nth-child(3) {
								left: 190px;
								top: 101px;
							}
						}
					}
					.bg_btn3 {
						height: 222px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 74px;
								top: 28px;
							}
							&:nth-child(2) {
							    left: 207px;
							    top: 96px;
							}
							&:nth-child(3) {
							    left: 170px;
							    top: 156px;
							}
						}
					}
					.bg_btn4 {
						height: 190px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 116px;
								top: 2px;
							}
							&:nth-child(2) {
								left: 110px;
								top: 58px;
							}
							&:nth-child(3) {
								left: 193px;
								top: 113px;
							}
						}
					}
					.bg_btn5 {
						height: 162px;
						.bg_btn_dian {
							&:nth-child(1) {
							    left: 74px;
							    top: 53px;
							}
							&:nth-child(2) {
							    left: 222px;
							    top: 50px;
							}
							&:nth-child(3) {
							    left: 130px;
							    top: 124px;
							}
						}
					}
					.bg_btn6 {
						height: 204px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 128px;
							    top: 8px;
							}
							&:nth-child(2) {
							    left: 162px;
							    top: 90px;
							}
							&:nth-child(3) {
								left: 139px;
								top: 142px;
							}
						}
					}
					.bg_btn7 {
						height: 162px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 32px;
								top: 70px;
							}
							&:nth-child(2) {
							    left: 98px;
							    top: 70px;
							}
							&:nth-child(3) {
								left: 204px;
								top: 100px;
							}
						}
					} 
					.bg_btn8 {
						height: 206px;
						.bg_btn_dian {
							&:nth-child(1) {
							    left: 191px;
							    top: 89px;
							}
							&:nth-child(2) {
							    left: 90px;
							    top: 74px;
							}
							&:nth-child(3) {
								left: 141px;
							    top: 131px;
							}
						}
					}
					.bg_btn9 {
						height: 176px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 134px;
								top: 24px;
							}
							&:nth-child(2) {
							    left: 112px;
							    top: 122px;
							}
							&:nth-child(3) {
								left: 204px;
								top: 138px;
							}
						}
					}
				}
			}
		}
	}
	@media screen and (min-width: 351px) {
		.container-con {
			height: 3155px;
			
			.bg_btn_inner {
				width: 330px;
				position: relative;
				
				.bg_btn_mask {
					&.maskHeight0 {
					    height: 2816px;
					}
					&.maskHeight1 {
						height: 2592px;
					}
					&.maskHeight2 {
						height: 2328px;
					}
					&.maskHeight3 {
						height: 1996px;
					}
					&.maskHeight4 {
						height: 1698px;
					}
					&.maskHeight5 {
						height: 1432px;
					}
					&.maskHeight6 {
					    height: 1120px;
					}
					&.maskHeight7 {
					    height: 854px;
					}
					&.maskHeight8 {
					    height: 540px;
					}
					&.maskHeight9 {
					    height: 256px;
					}
					&.maskHeight10 {
					    height: 0px;
					}
				}
				
				.bg_btn_bottom {
					width: 142px;
					height: 83px;
					bottom: 190px;
					right: 20px;
					border-radius: 7px;
					>div {
						left: -145px;
					}
				}
				.bg_btn_box {
					position: absolute;
					top: 16px;
					left: 0;
					height: 100%;
					width: 100%;
					z-index: 2;
					.bg_btn {
						position: relative;
						width: 288px;
						margin-top: 90px;
						.bg_btn_dian {
							width: 24px;
							height: 24px;
							border-radius: 50%;
							overflow: hidden;
							background: #f7a853;
							position: absolute;
							text-align: center;
							line-height: 24px;
							color: #fff;
							font-weight: bold;
							font-size: 12px;
							&.doneError {
								background: #D9001B;
							}
			
							&.doneRight {
								background: #70B603;
							}
						}
					}
					.bg_btn1 {
						margin-top: 394px;
						height: 132px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 151px;
								top: 2px;
							}
							&:nth-child(2) {
								left: 99px;
								top: 61px;
							}
							&:nth-child(3) {
								left: 147px;
								top: 104px;
							}
						}
					}
					.bg_btn2 {
						height: 180px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 93px;
								top: 42px;
							}
							&:nth-child(2) {
								left: 147px;
								top: 81px;
							}
							&:nth-child(3) {
								left: 212px;
								top: 115px;
							}
						}
					}
					.bg_btn3 {
						height: 240px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 82px;
								top: 29px;
							}
							&:nth-child(2) {
								left: 229px;
								top: 103px;
							}
							&:nth-child(3) {
								left: 188px;
								top: 169px;
							}
						}
					}
					.bg_btn4 {
						height: 205px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 128px;
								top: 2px;
							}
							&:nth-child(2) {
								left: 122px;
								top: 64px;
							}
							&:nth-child(3) {
								left: 213px;
								top: 124px;
							}
						}
					}
					.bg_btn5 {
						height: 180px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 82px;
								top: 60px;
							}
							&:nth-child(2) {
								left: 246px;
								top: 57px;
							}
							&:nth-child(3) {
								left: 142px;
								top: 137px;
							}
						}
					}
					.bg_btn6 {
						height: 220px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 141px;
								top: 7px;
							}
							&:nth-child(2) {
								left: 179px;
								top: 98px;
							}
							&:nth-child(3) {
								left: 154px;
								top: 155px;
							}
						}
					}
					.bg_btn7 {
						height: 176px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 37px;
								top: 77px;
							}
							&:nth-child(2) {
								left: 108px;
								top: 77px;
							}
							&:nth-child(3) {
							    left: 226px;
							    top: 109px;
							}
						}
					} 
					.bg_btn8 {
						height: 225px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 212px;
								top: 98px;
							}
							&:nth-child(2) {
								left: 101px;
								top: 81px;
							}
							&:nth-child(3) {
							    left: 157px;
							    top: 145px;
							}
						}
					}
					.bg_btn9 {
						height: 190px;
						.bg_btn_dian {
							&:nth-child(1) {
								left: 148px;
								top: 26px;
							}
							&:nth-child(2) {
							    left: 124px;
							    top: 134px;
							}
							&:nth-child(3) {
								left: 226px;
								top: 152px;
							}
						}
					}
				}
			}
		}
	}
	
	@-moz-keyframes shimmer {
	    0% {
	        background-position: top left;
	    }
	    100% {
	        background-position: top right;
	    }
	}
	@-webkit-keyframes shimmer {
	    0% {
	        background-position: top left;
	    }
	    100% {
	        background-position: top right;
	    }
	}
	@-o-keyframes shimmer {
	    0% {
	        background-position: top left;
	    }
	    100% {
	        background-position: top right;
	    }
	}
	@keyframes shimmer {
	    0% {
	        background-position: top left;
	    }
	    100% {
	        background-position: top right;
	    }
	}
</style>

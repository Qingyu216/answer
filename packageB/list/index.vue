<template>
	<view>
		<div class="question-con header-bg">
			<cu-custom bgColor="header-bg" :isBack="true" class="navigationBarHeight">
				<block slot="backText" style="font-size: 14px;">返回</block>
				<block slot="content" style="font-size: 14px;">积分排行榜</block>
			</cu-custom>
			<div class="ranking_box" :style='{height: "calc(100vh - " + navigationBarHeight+"px)"}'>
				<image mode="scaleToFill" :src="image2_1" class="ranking_bg"></image>
				<div class="ranking_box_top" v-if="starList.list.length > 0">
					<div class="ranking_kab">
						<div class="two">
							<div class="ranking_kab_info">
								<image mode="widthFix" :src="image2_3" class="ranking_kab_infobg"></image>
								<image mode="widthFix" :src="starList.list[1].headPortrait" class="ranking_kab_headPortrait"></image>
								<text class="user_count"><text v-if="starList.list[1].count">{{starList.list[1].count}}积分</text></text>
							</div>
							<div class="user_info"><text v-if="starList.list[1].userName">{{starList.list[1].userName}}</text><text v-else>虚位以待</text></div>
						</div>
						<div class="one">
							<div class="ranking_kab_info">
								<image mode="widthFix" :src="image2_2" class="ranking_kab_infobg"></image>
								<image mode="widthFix" :src="starList.list[0].headPortrait" class="ranking_kab_headPortrait"></image>
								<text class="user_count"><text v-if="starList.list[0].count">{{starList.list[0].count}}积分</text></text>
							</div>
							<div class="user_info"><text v-if="starList.list[0].userName">{{starList.list[0].userName}}</text><text v-else>虚位以待</text></div>
						</div>
						<div class="three">
							<div class="ranking_kab_info">
								<image mode="widthFix" :src="image2_4" class="ranking_kab_infobg"></image>
								<image mode="widthFix" :src="starList.list[2].headPortrait" class="ranking_kab_headPortrait"></image>
								<text class="user_count"><text v-if="starList.list[2].count">{{starList.list[2].count}}积分</text></text>
							</div>
							<div class="user_info"><text v-if="starList.list[2].userName">{{starList.list[2].userName}}</text><text v-else>虚位以待</text></div>
						</div>
					</div>
				</div>
				<view class="h-table">
					<view class="h-tr h-header">
						<view class="h-td h-th">排名</view>
						<view class="h-td h-th">玩家</view>
						<view class="h-td h-th">积分</view>
						<view class="h-td h-th">达成时间</view>
					</view>
					<view class="h-content">
						<template v-if="starList.list.length > 0">
							<view class="h-tr" v-for="(item, index) in starList.list" :key="index">
								<view class="h-td">
									<div class="h-my-sort">
										<image mode="heightFix" :src="image2_5" style="height: 34px;"></image>
										<text>{{item.sort}}</text>
									</div>
								</view>
								<view class="h-td">
									<div style="justify-content: left;">
										<image mode="heightFix" :src="item.headPortrait" style="height: 30px;margin: 5px;border-radius: 50%;"></image>
										<text class="userInfo_name">{{item.userName}}</text>
									</div>
								</view>
								<view class="h-td">
									<div>{{item.count}}</div>
								</view>
								<view class="h-td">
									<div style="line-height: 14px;"><span v-if="item.findTime != null">{{item.findTime}}</span></div>
								</view>
							</view>
						</template>
						<template v-else>
							<div style="line-height: 40px;text-align: center;">
								暂无数据
							</div>
						</template>
					</view>
				</view>
				<view class="h-tr h-my">
					<view class="h-td">
						<div class="h-my-sort">
							<image mode="heightFix" :src="image2_5" style="height: 34px;"></image>
							<text>{{personalStarList.userInfo.sort}}</text>
						</div>
					</view>
					<view class="h-td">
						<div>
							<image mode="heightFix" :src="personalStarList.userInfo.headPortrait" style="height: 30px;margin: 5px;border-radius: 50%;"></image> 
							<text class="userInfo_name">我</text>
						</div>
					</view>
					<view class="h-td">
						<div>{{personalStarList.userInfo.count}}</div>
					</view>
					<view class="h-td">
						<div style="line-height: 14px;"><span v-if="personalStarList.userInfo.findTime != null">{{personalStarList.userInfo.findTime}}</span></div>
					</view>
				</view>
			</div>
		</div>
	</view>
</template>

<script>	
	import operate from '@/common/operate.js'
	export default {
		data() {
			return {
				openId: '',
				loading: false,
				starList: [],
				personalStarList: {},
				navigationBarHeight: ''
			}
		},
		onLoad() {
			let that = this
			this.openId = wx.getStorageSync('openId')
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			let info = uni.createSelectorQuery().select(".navigationBarHeight");
　　　  　	info.boundingClientRect(function(data) {
　　　  　		that.navigationBarHeight = data.height
　　  		}).exec()
			this.userScoreCount()
			this.personalScoreCount()
		},
		computed: {
			image2_1() {
				return operate.api + 'mp-api/2_1.png'
			},
			image2_2() {
				return operate.api + 'mp-api/2_2.png'
			},
			image2_3() {
				return operate.api + 'mp-api/2_3.png'
			},
			image2_4() {
				return operate.api + 'mp-api/2_4.png'
			},
			image2_5() {
				return operate.api + 'mp-api/2_5.png'
			}
		},
		methods: {
			userScoreCount() {
				let that = this
				this.$api.userScoreCount({openId: that.openId}).then(res => {
					if(res.code == 200) {
						that.starList = res.data
					}
				})
			},
			personalScoreCount() {
				let that = this
				this.$api.personalScoreCount({openId: that.openId}).then(res => {
					if(res.code == 200) {
						that.personalStarList = res.data
					}
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
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.question-con {
		min-height: 100vh;
		position: relative;

		.ranking_box {
			padding: 60px 20px;
			box-sizing: border-box;
			position: relative;
			
			.ranking_bg {
				height: 100%;
				width: 100%;
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 0;
			}

			.ranking_box_top {
				margin: 0 0 30px;
				z-index: 1;
				position: relative;
			}

			.ranking_kab {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				width: 100%;
				margin: 0 auto;
				&.ranking_kab_one {
					justify-content: center;
				}

				>div {
					text-align: center;

					.ranking_kab_info {
						position: relative;
						
						.ranking_kab_infobg {
							z-index: 1;
						}
						
						.ranking_kab_headPortrait {
							position: absolute;
							border-radius: 50%;
							z-index: 0;
						}
						
						.user_count {
							position: absolute;
							left: 0;
							bottom: 3px;
							width: 100%;
							text-align: center;
							z-index: 2;
							color: #DB403B;
							font-size: 12px;
							font-weight: bold;
						}
					}
					
					.user_info  {
						margin-top: 10px;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						word-break: break-all;
						font-size: 14px;
					}
					
					&.one {
						width: 100px;
						.ranking_kab_infobg {
							width: 100px;
						}
						.ranking_kab_headPortrait {
							left: 19px;
							top: 21px;
							width: 58px;
						}
					}
					
					&.two,
					&.three {
						width: 80px;
						.ranking_kab_infobg {
							width: 80px;
						}
						.ranking_kab_headPortrait {
							left: 15px;
							top: 16px;
						}
					}
					&.two {
						.ranking_kab_headPortrait {
							width: 48px;
						}
					}
					&.three {
						.ranking_kab_headPortrait {
							width: 47px;
						}
					}
				}
			}

			.h-table {
				width: 100%;
				border-collapse: collapse;
				position: relative;
				height: calc(~'100% - 190px');
				overflow: hidden;
				z-index: 1;

				.h-header {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					z-index: 2;
					background: #E5663F;
					overflow: hidden;
				}

				.h-content {
					padding-top: 40px;
					height: 100%;
					box-sizing: border-box;
					overflow: scroll;

					.h-tr {
						background: #ED803D;
						border-radius: 6px;
						overflow: hidden;
						margin-top: 10px;
					}
				}
				.h-tr {
					display: flex;
					.h-td {
						text-align: center;
						line-height: 14px;
						font-size: 12px;
						position: relative;
						&.h-th {
							font-size: 16px;
							line-height: 40px;
						}
						.h-my-sort {
							align-items: normal !important;
							line-height: 28px;
							image {
								position: absolute;
								left: 50%;
								top: 50%;
								transform: translate(-50%,-50%);
								z-index: 0;
							}
							text {
								position: relative;
								z-index: 1;
							}
						}
						&:nth-child(1) {
							width: 50px;
						}
						&:nth-child(2) {
							width: 100px;
						}
						&:nth-child(3) {
							width: 50px;
						}
						&:nth-child(4) {
							width: calc(~'100% - 200px');
						}
						div {
							display: flex;
							justify-content: center;
							align-items: center;
							height: 100%;
							position: relative;
							.userInfo_name {
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
								word-break: break-all;
								max-width: 60px;
								display: block;
							}
						}
					}
				}
			}
		}
		.h-my {
			display: flex;
			width: calc(~'100% - 20px');
			position: fixed;
			bottom: 40px;
			left: 10px;
			box-shadow: 0 0 10px rgba(0,0,0,.4);
			background: #ED803D;
			border-radius: 6px;
			overflow: hidden;
			z-index: 1;
			.h-td {
				text-align: center;
				line-height: 14px;
				font-size: 12px;
				position: relative;
				.h-my-sort {
					align-items: normal !important;
					line-height: 28px;
					image {
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%,-50%);
						z-index: 0;
					}
					text {
						position: relative;
						z-index: 1;
					}
				}
				&:nth-child(1) {
					width: 50px;
				}
				&:nth-child(2) {
					width: 80px;
				}
				&:nth-child(3) {
					width: 50px;
				}
				&:nth-child(4) {
					width: calc(~'100% - 180px');
				}
				div {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					position: relative;
				}
			}
		}
	}
</style>

<template>
	<view>
		<div class="question-con header-bg">
			<cu-custom bgColor="header-bg" :isBack="true" class="navigationBarHeight">
				<block slot="backText" style="font-size: 14px;">返回</block>
				<block slot="content" style="font-size: 14px;">答题大挑战</block>
			</cu-custom>
			<div class="question-con-inner" :style='{minHeight: "calc(100vh - " + navigationBarHeight+"px)"}'>
				<image mode="scaleToFill" :src="image2_1" class="question_bg"></image>
				<div class="question-con-frame">
					<image mode="widthFix" :src="image3_1" class="question_frame_bg"></image>
					<div class="question-con-bigTitle">{{ questionList.questionNumber }}</div>
					<div class="question-con-subject">
						<div class="question-con-smallTitle"><span>{{questionList.toptic}}</span></div>
						<template v-if="questionList.isMultiple == 0">
							<template v-if="questionList.status == 2">
								<radio-group class="block" @change="RadioChange">
									<ul>
										<li v-for="(item, index) in questionList.mapList" :key="index">
											<label>
												<radio
													:class="radio == (item.answer).split('.')[0] ? 'checked':''"
													:checked="radio==(item.answer).split('.')[0]?true:false"
													:value="(item.answer).split('.')[0]"></radio>
												{{item.answer}}
											</label>
										</li>
									</ul>
								</radio-group>
								<div class="submitBtn" @click="()=>questionBtn(radio)">提交答案</div>
							</template>
							<template v-else>
								<ul>
									<li v-for="(item, index) in questionList.mapList" :key="index"
										:class="[{error_bg: (item.answer).split('.')[0] == questionList.writeAnswer && questionList.correctAnswer != questionList.writeAnswer},{right_bg:(item.answer).split('.')[0] == questionList.writeAnswer && questionList.correctAnswer == questionList.writeAnswer}]">
										{{item.answer}}
										<text class="cuIcon-check"
											v-if="(item.answer).split('.')[0] == questionList.writeAnswer && questionList.correctAnswer == questionList.writeAnswer"></text>
										<text class="cuIcon-close"
											v-if="(item.answer).split('.')[0] == questionList.writeAnswer && questionList.correctAnswer != questionList.writeAnswer"></text>
									</li>
								</ul>
							</template>
						</template>
						<template v-else>
							<template v-if="questionList.status == 2">
								<checkbox-group @change="checkboxChange">
									<ul>
										<li v-for="(item, index) in questionList.mapList" :key="index">
											<label>
												<checkbox class='round' :value="(item.answer).split('.')[0]"/>
												{{item.answer}}
											</label>
										</li>
									</ul>
								</checkbox-group>
								<div class="submitBtn" @click="submit_select_btn">提交答案</div>
							</template>
							<template v-else>
								<ul>
									<li v-for="(item, index) in questionList.mapList" :key="index"
										:class="[{error_bg: questionList.writeAnswer.indexOf((item.answer).split('.')[0]) == -1 && questionList.correctAnswer.indexOf((item.answer).split('.')[0]) == -1},{right_bg:questionList.writeAnswer.indexOf((item.answer).split('.')[0]) != -1 && questionList.correctAnswer.indexOf((item.answer).split('.')[0]) != -1}]">
										{{item.answer}}
										<text class="cuIcon-check"
											v-if="questionList.writeAnswer.indexOf((item.answer).split('.')[0]) != -1 && questionList.correctAnswer.indexOf((item.answer).split('.')[0]) != -1"></text>
										<text class="cuIcon-close"
											v-if="questionList.writeAnswer.indexOf((item.answer).split('.')[0]) == -1 && questionList.correctAnswer.indexOf((item.answer).split('.')[0]) == -1"></text>
									</li>
								</ul>
							</template>
						</template>
					</div>
					<div class="question-con-analysis" v-if="questionList.status != 2">
						<ul>
							<li>您的选择：<span :class="questionList.correctAnswer == questionList.writeAnswer ? 'error_green':'right_red'">{{questionList.writeAnswer}}</span></li>
							<li>正确答案：<span style="color: #4FC95A;">{{questionList.correctAnswer}}</span></li>
							<li>解析: {{questionList.remark}}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<view class="msb_dialog" v-if="dialogShow" :style="fullHeight">
			<view class="dialog_1">
				<image mode="widthFix" :src="image3_2" class="dialog_bg"></image>
				<view class="dialog_con">
					<view class="close" @click="close_dialog">
						<text class="cuIcon-close"></text>
					</view>
					<view class="analysis_dialog">
						<image v-if="diaList.status != 1" mode="widthFix" :src="image3_4"></image>
						<image v-else mode="widthFix" :src="image3_3"></image>
						<ul>
							<template v-if="diaList.status != 1">
								<li>您的选择：{{diaList.writeAnswer}}</li>
								<li style="color: #DD3E3B">正确答案：{{diaList.correctAnswer}}</li>
							</template>
							<li>解析: {{diaList.remark}}</li>
						</ul>
					</view>
				</view>
				<view class="dialog_btn" @click="btnSubmit">下一题</view>
			</view>
		</view>
	</view>
</template>

<script>
	import operate from '@/common/operate.js'
	export default {
		data() {
			return {
				paramsList: {
					toptocId: '1',
					openId: '',
					writeAnswer: ''
				},
				questionList: {},
				dialogShow: false,
				fullHeight: '',
				diaList: {},
				multipleSelect: '',
				radio: '',
				navigationBarHeight: ''
			}
		},
		onLoad(option) {
			let that = this
			this.paramsList.openId = wx.getStorageSync('openId')
			this.paramsList.toptocId = option.id
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			let info = uni.createSelectorQuery().select(".navigationBarHeight");
			info.boundingClientRect(function(data) {
				that.navigationBarHeight = data.height
			}).exec()
			this.getList()
		},
		created() {
			let that = this
			// 获取当前设备屏幕高度
			uni.getSystemInfo({
				success: (res) => {
					that.fullHeight = "height:" + res.windowHeight + "px";
				}
			});
		},
		computed: {
			image2_1() {
				return operate.api + 'mp-api/2_1.png'
			},
			image3_1() {
				return operate.api + 'mp-api/3_1.png'
			},
			image3_2() {
				return operate.api + 'mp-api/3_2.png'
			},
			image3_3() {
				return operate.api + 'mp-api/3_3.png'
			},
			image3_4() {
				return operate.api + 'mp-api/3_4.png'
			}
		},
		methods: {
			getList() {
				let that = this
				this.$api.subjectList(that.paramsList).then(res => {
					if (res.code == 200) {
						that.questionList = res.data
					}
				})
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			questionBtn(val) {
				let that = this
				if (val) {
					this.paramsList.writeAnswer = val
					this.$api.subjectSelect(this.paramsList).then(res => {
						if (res.code == 200) {
							that.diaList = res.data
						}
					})
					this.dialogShow = true;
				} else {
					uni.showToast({
						title: '请选择一个',
						icon: 'error',
						duration: 1000
					})
				}
			},
			close_dialog() {
				this.getList()
				this.dialogShow = false
			},
			checkboxChange(e) {
				this.multipleSelect = e.detail.value.join('')
			},
			submit_select_btn() {
				let that = this
				if (this.multipleSelect.length > 0) {
					that.paramsList.writeAnswer = that.multipleSelect
					that.$api.subjectSelect(that.paramsList).then(res => {
						if (res.code == 200) {
							that.diaList = res.data
						}
					})
					this.dialogShow = true;
				} else {
					uni.showToast({
						title: '请至少选择一个',
						icon: 'error',
						duration: 1000
					})
				}
			},
			btnSubmit() {
				let that = this
				let nextId = parseInt(parseInt(that.paramsList.toptocId) + 1)
				if (this.paramsList.toptocId > 26) {
					uni.showToast({
						title: '没有更多的题目',
						icon: 'error',
						duration: 1000
					})
					setTimeout(() => {
						this.getList()
						this.dialogShow = false
					}, 1000)
				} else {
					this.$api.indexList({openId: wx.getStorageSync('openId')}).then(res => {
						if (res.code == 200) {
							res.data.forEach(item => {
								item.toptics.forEach(item2 => {
									if (parseInt(item2.id) == nextId) {
										if (item.status == 1) {
											that.paramsList.toptocId = nextId
											that.paramsList.writeAnswer = ''
											that.radio = ''
											that.getList()
											that.dialogShow = false
										} else {
											uni.showToast({
												title: '下一题未开放',
												icon: 'error'
											})
											setTimeout(() => {
												this.getList()
												this.dialogShow = false
											}, 2000)
										}
									}
								})
							})
						}
					})
				}
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

<style lang="less">
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.question-con {
		height: 100vh;
		position: relative;

		.question-con-inner {
			color: #DF4F47;
			font-size: 16px;
			position: relative;

			.question_bg {
				height: 100%;
				width: 100%;
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 0;
			}

			.question-con-frame {
				width: 300px;
				position: relative;
				padding: 80px 0;
				margin: 0 auto;

				.question_frame_bg {
					width: 100%;
					display: block;
				}

				.question-con-bigTitle {
					position: absolute;
					top: 86px;
					left: 50%;
					transform: translate(-50%, 0);
					color: #fff;
					font-size: 18px;
					font-weight: bold;
				}

				.question-con-subject {
					width: 100%;
					padding: 20px;
					box-sizing: border-box;
					position: absolute;
					top: 178px;
					left: 0;

					.question-con-smallTitle {
						margin-bottom: 10px;
						font-size: 16px;
						font-weight: bold;
					}

					ul {
						li {
							margin-bottom: 5px;
							padding: 5px 0;
							position: relative;
							font-size: 16px;
							font-weight: bold;

							label {
								display: flex;
								align-items: center;
							}

							radio,
							checkbox {
								transform: scale(0.7);
								margin-right: 5px;
							}

							.ng_color,
							.ng_color_checkbox {
								&::before {
									display: none !important;
								}
							}

							.ng_color.checked::after {
								background-color: #DF4F47 !important;
								border-color: #DF4F47 !important;
								color: #ffffff !important;
								content: "";
								background-color: transparent;
								display: block;
								position: absolute;
								width: 38px;
								height: 38px;
								z-index: 999;
								top: 0rpx;
								left: -12rpx;
								right: 0;
								bottom: 0;
								margin: auto;
								border-radius: 200upx;
								border: 0px solid #ffffff !important;
								transform: scale(0.7);
							}

							.ng_color_checkbox[checked] .wx-checkbox-input {
								background-color: #DF4F47 !important;
								border-color: #DF4F47 !important;
								color: #ffffff !important;
								border-color: #DF4F47 !important;
							}

							&.right_bg {
								background: #4FC95A;
								color: #fff;
							}

							&.error_bg {
								background: #DF4F47;
								color: #fff;
							}

							text {
								position: absolute;
								right: 10px;
								top: 50%;
								transform: translate(0, -50%);
							}
						}
					}

					.submitBtn {
						width: 236px;
						height: 40px;
						margin: 40px auto 0;
						text-align: center;
						line-height: 40px;
						font-size: 16px;
						font-weight: bold;
						background: #DF4F47;
						border-radius: 20px;
						color: #fff;
					}

					.uni-list-cell {
						position: relative;
						display: -webkit-box;
						display: flex;
						-webkit-box-orient: horizontal;
						-webkit-box-direction: normal;
						flex-direction: row;
						-webkit-box-align: center;
						align-items: center;
						-webkit-box-pack: start;
						justify-content: flex-start;
						margin-bottom: 5px;
						padding: 5px 20px 5px 10px;

						.question-con-name {
							margin-left: 10px;
						}
					}

					.confirm-btn {
						font-size: 13pt;
						line-height: 85rpx;
						height: 85rpx;
						text-align: center;
						border-radius: 50px;
						margin: 30px 20%;
					}
				}

				.question-con-analysis {
					padding: 0 20px;
					position: absolute;
					left: 0;
					top: 368px;
					width: 100%;
					box-sizing: border-box;
					color: #333;

					ul {
						li {
							margin-bottom: 5px;

							.right_red {
								color: #e7233a;
							}
							.error_green {
								color: #4FC95A;
							}
						}
					}
				}
			}
		}
	}

	.msb_dialog {
		width: 100%;
		height: 100vh;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.8);

		.dialog_1 {
			margin: 50rpx 0;
			position: relative;
			top: 50%;
			transform: translateY(-50%);
			overflow: hidden;

			.dialog_bg {
				width: 300px;
				margin: 0 auto;
				display: block;
			}

			.dialog_con {
				position: absolute;
				top: 100px;
				left: 50%;
				width: 260px;
				transform: translate(-50%, 0);

				.close {
					font-size: 24px;
					position: absolute;
					right: 3px;
					top: 2px;
					z-index: 1;
					color: #fff;
				}

				.analysis_dialog {
					width: 100%;
					position: relative;

					image {
						width: 100%;
						height: auto;
						display: block;
					}

					ul {
						font-size: 12px;
						color: #333;
						position: absolute;
						top: 188px;
						padding: 0 20px 10px;
						background: #fff;
						border-radius: 0 0 30px 30px;
						display: block;
						width: 100%;

						li {
							margin-bottom: 5px;

							&:last-child {
								margin-bottom: 0;
							}
						}
					}
				}
			}

			.dialog_btn {
				position: absolute;
				bottom: 35px;
				left: 50%;
				transform: translate(-50%, 0);
				font-size: 18px;
				font-weight: bold;
				color: #fff;
				width: 200px;
				height: 40px;
				background: #DD3E3B;
				border-radius: 20px;
				text-align: center;
				line-height: 40px;
			}
		}
	}
</style>

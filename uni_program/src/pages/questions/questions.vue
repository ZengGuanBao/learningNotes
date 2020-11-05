<template>
	<view class="questions">
		<view v-for="(item, index) in questionList" :key="index" @click="chooseQues(index)">
			<view class="quesItem">
				<view class="quesIcon"></view>
				<view class="content">{{ item }}？</view>
				<image :class="{ isShow: curIndex == index && isShow }" class="arrow" src="../../static/rightArrow.png" mode="aspectFit"></image>
			</view>
			<view class="answer" v-if="curIndex == index && isShow">
				答：扣款时间会受网络影响，正常在30s～90s之间。 如一直未扣款，客户可再次扫描二维码进行主动支付 或者联系客服进行处理。
			</view>
		</view>
		<view class="quesBottom">
			<view class="fixBox" @click="goReport">
				<image src="../../static/fix.png" mode="aspectFit"></image>
				<view>故障上报</view>
			</view>
			<view class="cusBox" @click="goConact">
				<image src="../../static/custom.png" mode="aspectFit"></image>
				<view>联系客服</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isShow: false,
			curIndex: null,
			questionList: ['扫码打不开门怎么办？', '扫码开门后，旁边有人拿东西怎么办？', '食物过期退货流程', '扣款详情', '退款问题', '机器二维码不能进行扫描']
		};
	},
	methods: {
		chooseQues(index) {
			this.curIndex = index;
			this.isShow = !this.isShow;
		},
		goReport() {
			uni.navigateTo({
				url: '/pages/my/goodRepair'
			});
		},
		goConact() {
			uni.makePhoneCall({
				phoneNumber: '029-85793157'
			});
		}
	}
};
</script>

<style scoped>
view {
	box-sizing: border-box;
}

.quesItem {
	height: 102rpx;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 0 30rpx;
}

.quesIcon {
	width: 50rpx;
	height: 50rpx;
	margin-right: 18rpx;
	border-radius: 50%;
	background-image: url(../../static/QQ.png);
	background-size: 22rpx 30rpx;
	background-repeat: no-repeat;
	background-position: center;
	background-color: #ff7e00;
}

.content {
	font-size: 30rpx;
	color: #202020;
	margin-right: auto;
}

.arrow {
	width: 14rpx;
	height: 24rpx;
}

.isShow {
	transform: rotate(90deg);
}

.answer {
	width: 100%;
	padding: 38rpx 54rpx 28rpx 54rpx;
	background-color: #fafafa;
	font-size: 28rpx;
	color: #5c5c5c;
	line-height: 44rpx;
}
.quesBottom {
	width: 100%;
	height: 98rpx;
	border-top: 2rpx solid #f2f2f2;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
}
.quesBottom .fixBox,
.quesBottom .cusBox {
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.fixBox image {
	width: 30rpx;
	height: 30rpx;
	margin-right: 10rpx;
}
.cusBox image {
	width: 42rpx;
	height: 30rpx;
	margin-right: 10rpx;
}
.quesBottom::after {
	content: '';
	width: 2rpx;
	height: 60rpx;
	background-color: #f0f0f0;
	position: absolute;
	left: 50%;
	top: 19rpx;
}
</style>

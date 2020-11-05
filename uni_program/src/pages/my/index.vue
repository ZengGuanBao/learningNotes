<template>
	<view class="container">
		<view class="my">
			<image src="/static/B.png" mode="aspectFill" class="my-bg"></image>
			<view class="my-information">
				<image class="portrait" mode="aspectFill" src="/static/touxiang.jpg"></image>
				<view class="my-user">
					<view class="my-name">艾科丽丽</view>
					<image class="user-vip" mode="aspectFill" src="/static/vip.png"></image>
					<view class="user-phone">188*********</view>
				</view>
			</view>
		</view>

		<view class="content">
			<view class="list" @click="goMyOrder">
				<view class="left">
					<image class="icon" src="/static/wodedigndan.png"></image>
					<text>我的订单</text>
				</view>
				<image class="right" src="/static/rightArrow.png"></image>
			</view>

			<view class="list" @click="goCoupon">
				<view class="left">
					<image class="icon" src="/static/co.png"></image>
					<text>我的优惠券</text>
				</view>
				<image class="right" src="/static/rightArrow.png"></image>
			</view>

			<view class="list" @click="goQuestion">
				<view class="left">
					<image class="icon" src="/static/lianxikehu.png"></image>
					<text>常见问题</text>
				</view>
				<image class="right" src="/static/rightArrow.png"></image>
			</view>

			<view class="list" @click="goConact">
				<view class="left">
					<image class="icon" src="/static/yijianyufankui.png"></image>
					<text>联系客服</text>
				</view>
				<view class="list-kefu">
					<text>029-85793157</text>
					<image class="right" src="/static/rightArrow.png"></image>
				</view>
			</view>

			<view class="list" @click="goFeedback">
				<view class="left">
					<image class="icon" src="/static/gognzhognhaoxinxi.png"></image>
					<text>意见与反馈</text>
				</view>
				<image class="right" src="/static/rightArrow.png"></image>
			</view>

			<view class="list">
				<view class="left">
					<image class="icon" src="/static/chagnjianwenti.png"></image>
					<text>公众号信息</text>
				</view>
				<image class="right" src="/static/rightArrow.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		goMyOrder() {
			uni.navigateTo({
				url: '/pages/order/index'
			});
		},
		goCoupon() {
			uni.navigateTo({
				url: '/pages/couponList/couponList'
			});
		},
		goQuestion() {
			uni.navigateTo({
				url: '/pages/questions/questions'
			});
		},
		goFeedback() {
			uni.navigateTo({
				url: '/pages/my/feedback'
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

<style>
.list-kefu text {
	color: #ff7e00;
	font-size: 28rpx;
	padding-right: 30rpx;
}
.left {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.left text {
	color: #202020;
	font-size: 30rpx;
}

.icon {
	width: 36rpx;
	height: 36rpx;
	margin-right: 20rpx;
}
.right {
	width: 13rpx;
	height: 24rpx;
}
.list {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx 0 30rpx;
	height: 60rpx;
	padding-top: 30rpx;
	padding-bottom: 30rpx;
}
.content {
	background-color: #fff;
	position: absolute;
	top: 230rpx;
	width: 100%;
	padding-top: 50rpx;
	border-radius: 25rpx 25rpx 0 0;
}
.my {
	position: relative;
}
.my-bg {
	width: 100%;
	height: 400rpx;
}
.my-information {
	position: absolute;
	left: 30rpx;
	right: 0;
	top: 60rpx;
	display: flex;
	flex-direction: row;
}
.portrait {
	width: 140rpx;
	height: 140rpx;
	border-radius: 50%;
}
.user-vip {
	width: 30rpx;
	height: 30rpx;
}
.my-user {
	position: relative;
	color: #fff;
	left: 20rpx;
	top: 20rpx;
}
.user-vip {
	position: absolute;
	top: 0;
	right: -20rpx;
}
.user-phone {
	font-size: 30rpx;
}
.container {
	position: relative;
}
</style>

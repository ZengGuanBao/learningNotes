<template>
	<view class="couponList">
		<view class="couponLi" :class="{newBg : item.type == 2}" v-for="(item,index) in couponList" :key="index">
			<image class="couponStatus" :src="'../../static/couponStatus'+item.type+'.png'" mode="aspectFit"></image>
			<view class="leftInner">
				<view class="liPrice">￥{{item.price}}</view>
				<view class="liTip">(满减券)</view>
			</view>
			<view class="rightInner">
				<view class="rightTop">
					<view>{{item.couponContent}}</view>
					<view class="rule">活动规则</view>
				</view>
				<view class="rightBottom">
					<view>{{item.useAddr}}01店使用</view>
					<view>使用期限：{{item.useDate}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				couponList:[
					{
						price:10,
						useAddr:'仅限西安火车站01店使用',
						useDate:'2020-03-11至2020-05-20',
						couponContent:'满20减5代金券',
						type:0,//2代表过期
					},
					{
						price:50,
						useAddr:'仅限西安火车站01店使用',
						useDate:'2020-03-11至2020-05-20',
						couponContent:'满20减5代金券',
						type:1,//2代表过期
					},
					{
						price:20,
						useAddr:'仅限西安火车站01店使用',
						useDate:'2020-03-11至2020-05-20',
						couponContent:'满20减5代金券',
						type:2,//2代表过期
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	view{
		box-sizing: border-box;
	}
	.couponList{
		padding: 0 22rpx;
	}
	.couponLi{
		margin-top: 14rpx;
		width: 100%;
		height: 206rpx;
		background: url(../../static/cuponBg.png);
		background-size: 100% 100%;
		display: flex;
		position: relative;
	}
	.couponStatus{
		width: 106rpx;
		height: 66rpx;
		position: absolute;
		right: 28rpx;
		bottom: 40rpx;
	}
	.newBg{
		background: url(../../static/cuponBgGrey.png);
		background-size: 100% 100%;
	}
	.leftInner{
		width: 136rpx;
		height: 100%;
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.rightInner{
		width: calc(100% - 136rpx);
		padding:30rpx 30rpx 12rpx 30rpx;
		display: flex;
		flex-direction: column;
	}
	.liPrice{
		font-size: 60rpx;
		font-weight: 400;
	}
	.liPrice::first-letter{
		font-size: 30rpx;
	}
	.liTip{
		font-size: 22rpx;
	}
	.rightTop{
		color: #202020;
		font-size: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: auto;
	}
	.rule{
		width: fit-content;
		color: #9C9C9C;
		font-size: 22rpx;
		position: relative;
	}
	.rule::after{
		content: '';
		width: 100%;
		height: 2rpx;
		position: absolute;
		background-color: #9C9C9C;
		bottom: -6rpx;
		left: 0;
	}
	.rightBottom{
		font-size: 24rpx;
		color: #5C5C5C;
	}
	.rightBottom view{
		padding-left: 10rpx;
		position: relative;
	}
	.rightBottom view::after{
		content: '';
		width: 4rpx;
		height: 4rpx;
		background-color: #5C5C5C;
		border-radius: 50%;
		position: absolute;
		top: 14rpx;
		left: 0;
	}
</style>

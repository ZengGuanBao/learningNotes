<template>
	<view class="">
		<view class="tel">待支付</view>
		<view class="kuang">
			<view class="item">
				<view class="title">
					<view class="shijian">交易时间：2020-02-12 12:22:22</view>
					<view v-if="jianyi" class="jiayizhuangtai">交易成功</view>
					<view v-else class="jiayizhuangtai">交易失败</view>
				</view>

				<!-- 商品循环 -->
				<view class="con">
					<image src="https://via.placeholder.com/150"></image>
					<view class="content">
						<view class="cons">豪威客巢人乳味汽...</view>
						<view class="num">X 10</view>
						<view class="money">￥20.0</view>
					</view>
				</view>
				<view class="con">
					<image src="https://via.placeholder.com/150"></image>
					<view class="content">
						<view class="cons">豪威客巢人乳味汽...</view>
						<view class="num">X 10</view>
						<view class="money">￥20.0</view>
					</view>
				</view>

				<!-- 合计 -->
				<view class="heji">
					<text>共1件商品</text>
					<text class="bianju">合计：</text>
					<text class="qian">￥20.00</text>
				</view>
			</view>
		</view>

		<!-- 订单信息 -->
		<view class="tel">订单信息</view>
		<view class="kuang">
			<view class="item items">
				<view class="row">
					<view class="zuo">消费时间：</view>
					<view class="you">2020-02-16 17:01</view>
				</view>
				<view class="row">
					<view class="zuo">扣费时间：</view>
					<view class="you">2020-02-16 17:01</view>
				</view>
				<view class="row">
					<view class="zuo">订单编号：</view>
					<view class="you">4674676468656773575</view>
				</view>
				<view class="row">
					<view class="zuo">设备编号：</view>
					<view class="you">D00081</view>
				</view>
			</view>
		</view>

		<!-- 到底了 -->
		<view class="zhifu"><view class="">立即支付</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			Inv: 0,
			jianyi: false,
			an: 1
		};
	},
	onLoad() {},
	methods: {
		changeTab(Inv) {
			this.Inv = Inv;
			console.log(Inv);
			if (this.Inv == 1) {
				this.an = 3;
			} else {
				this.an = 1;
			}
		}
	}
};
</script>

<style>
page {
	background-color: #f2f2f2;
}

.tel {
	width: 100%;
	line-height: 68rpx;
	font-size: 30rpx;
	font-weight: 400;
	color: rgba(32, 32, 32, 1);
	padding-left: 30rpx;
	box-sizing: border-box;
}

/* 内容样式 */
.kuang {
	width: 100%;
	padding: 0rpx 30rpx;
	box-sizing: border-box;
	background: rgba(255, 255, 255, 1);
}
.item {
	width: 100%;
	padding: 30rpx 17rpx 0;
	box-sizing: border-box;
	border-radius: 10rpx;
}
.items {
	padding-bottom: 30rpx;
}
.title {
	width: 100%;
	display: flex;
	justify-content: space-between;
	border-bottom: 2rpx dashed #c7c7c7;
	padding-bottom: 10rpx;
}
.shijian {
	font-size: 26rpx;
	font-weight: 400;
	color: rgba(92, 92, 92, 1);
	line-height: 54rpx;
}
.jiayizhuangtai {
	font-size: 26rpx;
	font-weight: 400;
	color: rgba(255, 126, 0, 1);
	line-height: 54rpx;
}

.con {
	width: 100%;
	padding: 20rpx 0;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
}
.con image {
	width: 150rpx;
	height: 150rpx;
}
.content {
	flex-grow: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.con .cons {
	width: 252rpx;
	font-size: 28rpx;
	font-family: SourceHanSansCN;
	font-weight: 400;
	color: rgba(32, 32, 32, 1);
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	margin-left: 10rpx;
}
.con .num {
	font-size: 28rpx;
	font-weight: 400;
	color: rgba(32, 32, 32, 1);
}
.con .money {
	font-size: 30rpx;
	font-family: SourceHanSansCN;
	font-weight: 400;
	color: rgba(239, 76, 32, 1);
}

.heji {
	width: 100%;
	height: 80rpx;
	border-top: 2rpx dashed #c7c7c7;
	line-height: 80rpx;
	font-size: 30rpx;
	text-align: right;
}
.bianju {
	margin: 0 0rpx 0 25rpx;
}
.qian {
	color: #f92828;
}

/* 信息 */
.row {
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 20rpx;
}
.row .zuo {
	font-size: 24rpx;
	font-weight: 400;
	color: rgba(166, 166, 166, 1);
}
.row .you {
	font-size: 24rpx;
	font-weight: 400;
	color: rgba(32, 32, 32, 1);
}

/* 按钮 */
.zhifu {
	width: 100%;
	position: fixed;
	bottom: 0;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	background: #ffffff;
}
.zhifu view {
	width: 100%;
	height: 90rpx;
	background: #ff7e00;
	border-radius: 8px;
	color: #ffffff;
	font-size: 30rpx;
	line-height: 90rpx;
	text-align: center;
}
</style>

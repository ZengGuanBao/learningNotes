<template>
	<view class="productSku">
		<view class="skuBox">
			<view class="skuTop">
				<view class="buyDate">交易时间：2020-02-12  12:22:22</view>
				<view class="buySucess">交易成功</view>
			</view>
			<view class="contentBox">
				<image class="skuEl" src="../static/skuEl.png" mode="aspectFit"></image>
				<view class="skuRight">
					<view class="skuName">{{item.name}}</view>
					<view class="skuNum">X{{item.num}}</view>
					<view class="skuPrice">￥{{item.price}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				"default":{
					name:'豪威客巢人乳味汽...',
					num:10,
					price:20.0
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
	.skuBox{
		width: 100%;
	}
	.skuTop{
		height: 64rpx;
		width: 100%;
		border-bottom: 2rpx dashed #A7A7A7;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
	}
	.buyDate{
		color: #5C5C5C;
		margin-right: auto;
	}
	.buySucess{
		color: #FF7E00;
	}
	.contentBox{
		padding: 20rpx 0;
		display: flex;
	}
	.skuEl{
		width: 150rpx;
		height: 150rpx;
		margin-right: 10rpx;
	}
	.skuRight{
		width: calc(100% - 160rpx);
		display: flex;
		justify-content: space-between;
		padding-top: 42rpx;
	}
	.skuName{
		max-width: 252rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 28rpx;
		color: #202020;
	}
	.skuNum{
		font-size: 28rpx;
		color: #202020;
	}
	.skuPrice{
		color: #EF4C20;
		font-size: 30rpx;
	}
</style>

<template>
	<view class="container column">
		<image src="../../static/success.png" mode="aspectFill" class='openImgUrl'></image>
		<view class="top column">
			<text class="title">开门成功</text>
			<text>欢饮用餐，请勿乱丢垃圾</text>
		</view>
		<view class="footer column">
			<image src="../../static/code.png" mode="aspectFill"></image>
			<view class="arrow"></view>
			<text>长按关注日日鲜公众号享受更多优质服务</text>
		</view>
	</view>
</template>

<script></script>

<style>
	.row{display: flex; display: -webkit-flex;flex-direction: row;}
	.column{display: flex;display: -webkit-flex; flex-direction: column;}
	.container, .top{
		align-items: center;
	}
	.openImgUrl{
		width: 306rpx;
		height: 306rpx;
		margin: 50rpx auto;
	}
	
	.top{
		justify-content: space-around;
		height: 150rpx;
		font-size: 26rpx;
		color: #5C5C5C;
	}
	
	.title{
		font-size: 34rpx;
		font-weight: 600;
		color: #000;
	}
	
	.footer{
		align-items: center;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 160rpx;
	}
	
	.footer text{
		font-size: 24rpx;
		background-color: #FF9810;
		color: #fff;
		padding: 5rpx 20rpx;
		border-radius: 30rpx;
	}
	
	.footer image{
		width: 260rpx;
		height: 260rpx;
		border-radius: 50%;
		margin-bottom: 30rpx;
	}
	
	.arrow{
		width:0;
		height:0;
		border-color: transparent transparent #FF9810 transparent;
		border-style:solid;
		border-width:0px 20rpx 20rpx 20rpx;
		position:absolute;
		bottom: 30rpx;
		content:'';
	}
</style>

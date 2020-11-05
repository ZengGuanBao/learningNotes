<template>
	<view class="container column">
		<image src="../../static/defeated.png" mode="aspectFill" class='openImgUrl'></image>
		<view class="top column">
			<text class="title">开门失败</text>
			<text>请关闭网络后重新连接再扫码开门</text>
		</view>
		<view class="main">故障上报</view>
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
	
	.main{
		margin-top: 50rpx;
		padding: 16rpx 64rpx 18rpx 64rpx;
		border:1px solid rgba(255,126,0,1);
		border-radius:8rpx;
		font-size:28rpx;
		font-family:AlibabaPuHuiTi;
		font-weight:400;
		color:rgba(255,126,0,1);
	}
	
	.footer{
		align-items: center;
		position: relative;
		margin-top: 50rpx;
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

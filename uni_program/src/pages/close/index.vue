<template>
	<view class="container column">
		<image src="../../static/dui.png" mode="aspectFill" class='openImgUrl'></image>
		<view class="top column">
			<text class="title">关门成功</text>
			<text>您可关闭本页面，稍后将推送账单通知。</text>
			<text>因网络环境，结账需几秒至几分钟不等。</text>
		</view>
		<view class="main row">
			<image src="../../static/coupon.png" class="mainLogo" mode="aspectFill"></image>
			<view class="middle column">
				<text class="mT">支付立得，随时抵扣</text>
				<text class="mF">你有一张5元立减代金券</text>
			</view>
			<view class="btn">领取</view>
		</view>
		<view class="footer column">
			<image src="../../static/code.png" mode="aspectFill"></image>
			<view class="arrow"></view>
			<text class='text'>长按关注日日鲜公众号享受更多优质服务</text>
			<text class="txt">如有疑问请联系客服：029-85793157</text>
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
		width: 110rpx;
		height: 75rpx;
		margin: 100rpx auto;
	}
	
	.top{
		justify-content: space-around;
		height: 150rpx;
		font-size: 26rpx;
		color: #5C5C5C;
		margin-bottom: 50rpx;
	}
	
	.title{
		font-size: 34rpx;
		font-weight: 600;
		color: #000;
		margin-bottom: 30rpx;
	}
	
	.main{
		width: 100%;
		height: 160rpx;
		align-items: center;
		justify-content: center;
		margin: 20rpx auto;
		border-top: 15rpx solid #f2f2f2;
		border-bottom: 15rpx solid #f2f2f2;
	}
	
	.mainLogo{
		width: 70rpx;
		height: 47rpx;
		margin-right: 30rpx;
	}
	
	.middle{
		width: 420rpx;
		height: 120rpx;
		justify-content: space-around;
	}
	
	.mT{
		font-size: 24rpx;
		color: #A7A7A7;
	}
	
	.mF{
		font-family:SourceHanSansCN;
		font-weight:400;
		color:rgba(32,32,32,1);
		font-size: 36rpx;
	}
	
	.btn{
		width: 108rpx;
		height: 54rpx;
		border-radius: 10rpx;
		background-color: #ff7e00;
		color: #FFFFFF;
		text-align: center;
		line-height: 54rpx;
		font-size: 24rpx;
	}
	
	.footer{
		align-items: center;
		position: relative;
		margin-top: 50rpx;
	}
	
	.text{
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
	
	.txt{
		font-size:24rpx;
		font-family:SourceHanSansCN;
		font-weight:400;
		color:rgba(167,167,167,1);
		margin-top: 30rpx;
	}
	
	.arrow{
		width:0;
		height:0;
		border-color: transparent transparent #FF9810 transparent;
		border-style:solid;
		border-width:0px 20rpx 20rpx 20rpx;
		position:absolute;
		bottom: 100rpx;
		content:'';
	}
</style>

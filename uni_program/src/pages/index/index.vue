<template>
	<view class="">
		<view class="homePage">
			<view class="homeBar">
				<view class="homelocation"></view>
				<text class="barSite">西安市莲湖小区</text>
				<image class="homejt" src="/static/home/arrows.png" mode="widthFix"></image>
				<view class="homeIputvie">
					<input adjust-position="false" class="homeIput" type="text" value="" placeholder="请输入商品名称" />
					<image class="searchSymbol" src="/static/home/search.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="menuNavigation">
				<view class="menuLits" v-for="(val, index) in menuLits" :key="index">
					<view class="listImg"><image src="http://placehold.it/88x88/" mode="widthFix"></image></view>
					<view class="listName">{{ val.name }}</view>
				</view>
			</view>
			<view class="newHouse"><image src="http://placehold.it/710x200/" mode="widthFix"></image></view>
		</view>
		<!-- 商品部分 -->
		<view class="">
			<view class="commodity">
				<view class="commodityCenr">
					<text>热销商品</text>
					<image src="/static/home/zhe_icon.png" mode="widthFix"></image>
				</view>
				<view class="commodityList">
					<view class="list" v-for="(val, index) in commodityList" :class="{ mar0: (index + 1) % 3 == 0 }" :key="index">
						<view class="img"><image src="http://placehold.it/88x88/" mode="widthFix"></image></view>
						<view class="title">{{ val.name }}</view>
						<view class="price">
							<text class="p1">{{ val.parce }}元</text>
							<text class="p2">数量：{{ val.sum }}</text>
						</view>
					</view>
					<view class="isolationLayer"></view>
				</view>
			</view>
		</view>
		<!-- 底部导航 -->
		<view class="bottomNavigation">
			<view class="oder" @click="goMyOrder">
				<image src="/static/home/o.png" mode="widthFix"></image>
				<view class="">订单</view>
			</view>
			<view class="saoma" @click="SweepDoor">
				<image src="/static/home/qrd.png" mode="widthFix"></image>
				<view>扫码开门</view>
			</view>
			<view class="myuer" @click="goMyProfile">
				<image src="/static/home/p.png" mode="widthFix"></image>
				<view class="">我的</view>
			</view>
		</view>

		<!-- 开锁 -->
		<view class="advertisingShells" @touchmove.stop.prevent="" v-show="show">
			<view class="mian">
				<text>正在开锁...</text>

				<image src="/static/home/key.png" mode="widthFix"></image>
			</view>
		</view>
		<!-- 广告 -->
		<view class="advertisingShells" @touchmove.stop.prevent="" v-show="advertisementShow">
			<view class="advertisement">
				<image src="http://placehold.it/620x816/" mode="widthFix"></image>
				<image @click="close" class="close" src="/static/home/close.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			menuLits: [
				{ name: '早餐优先', imgurl: '' },
				{ name: '早餐优先', imgurl: '' },
				{ name: '早餐优先', imgurl: '' },
				{ name: '早餐优先', imgurl: '' },
				{ name: '早餐优先', imgurl: '' }
			],
			commodityList: [
				{ name: '娃哈哈AD钙奶含乳 饮料', imgurl: '', parce: 0.01, sum: 8 },
				{ name: '娃哈哈AD钙奶含乳 饮料', imgurl: '', parce: 0.01, sum: 8 },
				{ name: '娃哈哈AD钙奶含乳 饮料', imgurl: '', parce: 0.01, sum: 8 },
				{ name: '娃哈哈AD钙奶含乳 饮料', imgurl: '', parce: 0.01, sum: 8 },
				{ name: '娃哈哈AD钙奶含乳 饮料', imgurl: '', parce: 0.01, sum: 8 }
			],
			show: false,
			advertisementShow: true
		};
	},
	methods: {
		SweepDoor() {
			this.show = !this.show;
			setTimeout(() => {
				this.show = false;
				uni.navigateTo({
					url: '/pages/open/index'
				});
			}, 2000);
		},
		close() {
			this.advertisementShow = !this.advertisementShow;
		},
		goMyOrder() {
			uni.navigateTo({
				url: '/pages/order/index'
			});
		},
		goMyProfile() {
			uni.navigateTo({
				url: '/pages/my/index'
			});
		}
	},
	mounted() {}
};
</script>

<style lang="less">
.isolationLayer {
	width: 100%;
	height: 213rpx;
	clear: both;
}
.homePage {
	width: 710rpx;
	margin: 0 auto;
	.homeBar {
		width: 100%;
		height: 60rpx;
		margin: 20rpx 0 29rpx 0px;

		.homelocation {
			width: 32rpx;
			height: 40rpx;
			background-image: url(https://snice.oss-cn-hangzhou.aliyuncs.com/app/daily-fresh/static/home/map.png);
			background-size: 100%;
			float: left;
			margin-top: 8rpx;
		}
		.barSite {
			font-size: 32rpx;
			font-family: SourceHanSansCN;
			font-weight: 400;
			color: rgba(33, 33, 33, 1);
			float: left;
			margin: 7rpx 9rpx 0 11rpx;
		}
		.homejt {
			width: 8rpx;
			height: 14rpx;
			float: left;
			margin-top: 23rpx;
		}
		.homeIputvie {
			width: 380rpx;
			height: 60rpx;
			float: right;
			position: relative;
		}
		.homeIput {
			width: 320rpx;
			height: 60rpx;
			background: rgba(240, 241, 243, 1);
			border-radius: 30rpx;
			float: right;
			font-size: 24rpx;
			font-family: SourceHanSansCN;
			font-weight: 400;
			color: rgba(104, 104, 104, 1);
			padding-left: 60rpx;
		}
		.searchSymbol {
			position: absolute;
			width: 24rpx;
			height: 24rpx;
			left: 20rpx;
			top: 18rpx;
		}
	}
	.menuNavigation {
		width: 100%;
		height: 124rpx;
		display: flex;
		justify-content: space-between;
		margin-bottom: 40rpx;
		.menuLits {
			width: 88rpx;
			height: 100%;
			.listImg {
				width: 88rpx;
				height: 88rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.listName {
				width: 88rpx;
				height: 23rpx;
				text-align: center;
				font-size: 22rpx;
				font-family: SourceHanSansCN;
				font-weight: 400;
				color: rgba(33, 33, 33, 1);
				margin-top: 13rpx;
			}
		}
	}
	.newHouse {
		width: 100%;
		height: 200rpx;
		margin-bottom: 30rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
}
.commodity {
	width: 750rpx;
	height: 66rpx;
	background: rgba(246, 246, 246, 1);
	.commodityCenr {
		width: 710rpx;
		height: 100%;
		margin: 0 auto;
		line-height: 66rpx;
		font-size: 30rpx;
		font-family: SourceHanSansCN;
		font-weight: bold;
		color: rgba(32, 32, 32, 1);
		image {
			width: 24rpx;
			height: 30rpx;
			margin-left: 10rpx;
		}
	}
}
.commodityList {
	width: 710rpx;
	margin: 20rpx auto 0rpx;
	//display: flex;
	// justify-content: center;
	// flex-wrap: wrap;
	// align-content: flex-start;
	.list {
		width: 198rpx;
		height: 273rpx;
		// background: red;
		float: left;
		margin-right: 51rpx;
		margin-bottom: 29rpx;
		.img {
			width: 166rpx;
			height: 166rpx;
			margin: 0 auto;
			image {
				width: 166rpx;
				height: 166rpx;
			}
		}
		.title {
			font-size: 24rpx;
			font-family: SourceHanSansCN;
			font-weight: 400;
			color: rgba(32, 32, 32, 1);
			margin: 20rpx 0rpx 12rpx 0rpx;
			line-height: 27rpx;
		}
		.price {
			font-size: 26rpx;
			.p1 {
				float: left;
				font-family: SourceHanSansCN;
				font-weight: bold;
				color: rgba(239, 76, 32, 1);
			}
			.p2 {
				float: right;
				font-size: 22rpx;
				font-family: SourceHanSansCN;
				font-weight: 400;
				color: rgba(104, 104, 104, 1);
			}
		}
	}
	.mar0 {
		margin-right: 0rpx;
	}
}
.bottomNavigation {
	width: 100%;
	height: 213rpx;
	position: fixed;
	bottom: 0rpx;
	left: 0rpx;
	background-image: url(https://snice.oss-cn-hangzhou.aliyuncs.com/app/daily-fresh/static/home/TEB.png);
	background-size: 100%;
	.oder {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		font-weight: 400;
		color: rgba(32, 32, 32, 1);
		margin: 120rpx 170rpx 0px 124rpx;
		float: left;
		image {
			width: 46rpx;
			height: 46rpx;
		}
	}
	.saoma {
		width: 80rpx;
		float: left;
		margin-top: 60rpx;
		font-size: 20rpx;
		font-family: SourceHanSansCN;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		image {
			width: 66rpx;
			height: 66rpx;
			margin: 0px 0px 5px 2px;
		}
	}
	.myuer {
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		font-weight: 400;
		color: rgba(32, 32, 32, 1);
		margin: 120rpx 70rpx 0px 154rpx;
		float: left;
		image {
			width: 46rpx;
			height: 46rpx;
		}
	}
}
.advertisingShells {
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	left: 0px;
	top: 0px;
	display: flex;

	justify-content: center;

	align-items: center;

	.mian {
		width: 444rpx;
		height: 582rpx;
		font-size: 40rpx;
		font-family: SourceHanSansCN;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		image {
			width: 444rpx;
			height: 451rpx;
			margin-top: 93rpx;
			animation: myfirst 5s;
			-webkit-animation: myfirst 2s linear infinite; /* Safari and Chrome */
		}
	}
	.advertisement {
		width: 620rpx;
		height: 959rpx;
		text-align: center;
		image {
			width: 620rpx;
			height: 816rpx;
		}
		.close {
			width: 64rpx;
			height: 64rpx;
			margin-top: 72rpx;
		}
	}
}

@keyframes myfirst {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>

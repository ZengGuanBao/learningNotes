<template>
	<view class="myOrderLeo">
		<view class="divideBar">退款商品</view>
		<view class="skuLi">
			<product-sku></product-sku>
		</view>
		<view class="divideBar">退款原因</view>
		<view class="reasons">
			<radio-group @change="radioChange">
				<label class="radioItem" v-for="(item, index) in items" :key="item.value">
					<view>
						<radio :value="item.value" :checked="index === curIndex" color="#FF7E00" />
					</view>
					<view>{{item.name}}</view>
				</label>
			</radio-group>
			<textarea placeholder="请输入您的反馈意见" placeholder-class="placeholder"></textarea>
		</view>
		<view class="divideBar">上传凭证</view>
		<view class="imgBox">
			<view v-for="(item,index) in imgList" :key="index">
				<image class="uploadBtn" :src="item" mode="aspectFit"></image>
			</view>
			<image class="uploadBtn" v-if="imgList.length < 3" src="../../static/uploadImg.png" mode="aspectFit" @click="chooseImg"></image>
		</view>
		<view class="sumbit">确认提交</view>
		<cover-view v-if="isShowModal" class="myMask" @catchtouchmove="true" @click="hideModal">
		</cover-view>
		<cover-view class="modalBox" v-if="isShowModal">
			<cover-image src="../../static/modalBg.png" mode="aspectFit"></cover-image>
			<cover-view class="modalContent">
				<cover-view>提交成功</cover-view>
				<cover-view class="modalTip">您已提交成功，请耐心等待</cover-view>
				<cover-view class="modalBtn" @click="hideModal">确认提交</cover-view>
			</cover-view>
		</cover-view>
	</view>
</template>

<script>
	import productSku from '../../components/productSku.vue';
	export default {
		components: {
			productSku
		},
		data() {
			return {
				isShowModal:true,
				imgList: [],
				curIndex: 1,
				items: [{
						value: 'error',
						name: '订单扣款错误',
					},
					{
						value: 'breaked',
						name: '商品损坏或不可食用'
					},
					{
						value: 'other',
						name: '其他'
					},
				]
			}
		},
		methods: {
			hideModal(){
				this.isShowModal = false;
			},
			chooseImg() {
				let _this = this;
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						_this.imgList = res.tempFilePaths
						console.log(_this.imgList)
					}
				});
			},
			radioChange(e) {

			}
		}
	}
</script>

<style scoped>
	view {
		box-sizing: border-box;
	}

	.myOrderLeo {
		min-height: 100vh;
		height: 100%;
		width: 100%;
		background-color: #f5f5f5;
		padding-bottom: 160rpx;
	}

	.skuLi {
		padding: 0 46rpx;
		background-color: #FFFFFF;
	}

	.divideBar {
		font-size: 30rpx;
		color: #202020;
		padding: 20rpx 0 20rpx 46rpx;
	}

	radio {
		transform: scale(0.7);
	}

	.reasons {
		padding: 14rpx 48rpx;
		background-color: #FFFFFF;
	}

	.radioItem {
		display: flex;
		height: 64rpx;
		align-items: center;
		color: #272727;
		font-size: 26rpx;
	}

	.imgBox {
		width: 100%;
		height: 224rpx;
		padding: 30rpx 0 30rpx 46rpx;
		background-color: #FFFFFF;
		display: flex;
	}

	.uploadBtn {
		width: 164rpx;
		height: 164rpx;
		margin-right: 12rpx;
	}

	.choosedImg {
		width: 100%;
		height: 164rpx;
	}

	.sumbit{
		width: 690rpx;
		height: 90rpx;
		border-radius: 8rpx;
		position: fixed;
		left: 30rpx;
		bottom: 30rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		text-align: center;
		line-height: 90rpx;
		background-color: #FF7E00;
	}
	textarea{
		width: 100%;
		height: 160rpx;
		background-color: #F5F5F5;
		padding: 26rpx 0 0 18rpx; 
		margin: 14rpx 0 16rpx 0;
	}
	textarea[placeholder-class="placeholder"]{
		font-size: 26rpx !important;
		color: #0E0E0E !important;
	}
	.myMask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #000000;
		opacity: 0.6;
	}
	.modalBox{
		position: absolute;
		left: 50%;
		top:50%;
		transform: translate(-50%,-50%);
		width: 500rpx;
		height: 576rpx;
	}
	.modalBox cover-image{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 9;
	}
	.modalContent{
		width: 100%;
		position: absolute;
		top: 260rpx;
		text-align: center;
		z-index: 99;
		font-size: 36rpx;
		color: #1D1D1D;
	}
	.modalTip{
		color: #A7A7A7;
		font-size: 26rpx;
		margin-top: 16rpx;
	}
	.modalBtn{
		color: #FFFFFF;
		font-size: 30rpx;
		width: 200rpx;
		height: 70rpx;
		border-radius: 8rpx;
		background-color: #FF7E00;
		line-height: 70rpx;
		margin: 92rpx auto 0 auto;
		
	}
</style>

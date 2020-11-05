<template>
	<view class="feedback_page">
		<!-- <view class="empty" v-if="true">
					<image class="empty-img" src="/static/images/empty_01.png" mode="aspectFit"></image>
					<view class="empty-tip-btn">暂无数据</view>
		</view> -->
		<view class="wrap">
			<view class="box box-1">
				我的建议
			</view>
			<view class="box box-2">
				<view class="textarea">
					<textarea maxlength="500" placeholder=" 请输入您的反馈意见"></textarea>
				</view>
			</view>
			<view class="box box-1">
				照片上传
			</view>
			<view class="box box-3">
				<view class="addImageCom">
					<view class="image-list">
						<view class="item">
							<image class="img" src="/static/images/icon_add_01.png" mode="aspectFill" />
							<image class="close" src="/static/images/icon_clear_01.png" mode="aspectFill" />
						</view>
						<view class="item">
							<image class="img" src="/static/images/icon_add_01.png" mode="aspectFill" />
							<image class="close" src="/static/images/icon_clear_01.png" mode="aspectFill" />
						</view>
						<view class="item">
							<image class="img" src="/static/images/icon_add_01.png" mode="aspectFill" />
							<image class="close" src="/static/images/icon_clear_01.png" mode="aspectFill" />
						</view>
						<view class="item add-com" ><image class="img" src="/static/images/icon_add_01.png" mode="aspectFill" /></view>
					</view>
				</view>
			</view>
			
			<view class="btn">
				确认提交
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
	methods: {
		chooseQues(index) {
			this.curIndex = index;
			this.isShow = !this.isShow;
		}
	}
		
	}
</script>

<style lang="less">
	.feedback_page{
		.box-1{
			width: 100%;
			height:70rpx;
			background:rgba(245,245,245,1);
			font-size:30rpx;
			color:rgba(51,48,48,1);
			line-height: 70rpx;
			padding-left: 30rpx;
		}
		.box-2{
			padding: 20rpx 30rpx 30rpx;
			.textarea {
				width: 100%;
				height: 220rpx;
				background:rgba(242,242,242,1);
				position: relative;
				textarea {
					width: 100%;
					height: 202rpx;
					padding:26rpx 18rpx;
					font-size: 24rpx;
					box-sizing: border-box;
				}
			}
		}
		.box-3{
			padding: 0 30rpx;
		}
		.addImageCom {
			margin-top: 20rpx;
			.image-list {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				.item {
					position: relative;
					margin: 0 14rpx 14rpx 0;
					width:160rpx;
					height:160rpx;
					// background-color: #ededed;
					.img {
						width: 100%;
						height: 100%;
					}
					.close {
						position: absolute;
						top: 0rpx;
						right: 0rpx;
						width: 34rpx;
						height: 34rpx;
					}
					&:nth-child(4n) {
						margin-right: 0;
					}
				}
			}
		}
		
		.btn{
			width:690rpx;
			height:90rpx;
			margin: 422rpx auto 0;
			background:rgba(255,126,0,1);
			border-radius:8rpx;
			line-height: 90rpx;
			text-align: center;
			font-size:30rpx;
			color:rgba(255,255,255,1);
		}
	
		.empty {
		  display: flex;
		  flex-flow: column;
		  align-items: center;
		  width: 100%;
		  // height: 100vh;
		  height:calc(100vh - 44px);
		  padding-top: 260rpx;
		  background-color: #fafafa;
		  box-sizing: border-box;
		  image {
		    width: 230rpx;
		    height: 258rpx;
		    /* transform: translateX(-5rpx); */
		  }
		  .empty-tip-btn{
			  margin-top: 40rpx;
			  font-size:30rpx;
			  color:rgba(168,165,168,1);
		  }
		
		}
	}
</style>

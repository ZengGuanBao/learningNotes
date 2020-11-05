<template>
  <view class="pay-success">
    <view class="pay-success-info">
      <image src="../../static/paySuccess/wechat.png" mode="widthFix"></image>
      <view>支付成功</view>
      <view class="pay-success-amount">
        ¥
        <text class="pay-amount">{{ amount }}</text>
      </view>
    </view>
    <view class="pay-success-subtitle">商品清单</view>
    <view class="pay-product-list">
      <block v-for="(item, index) in productList" :key="index">
        <view class="product-list-box">
          <image :src="item.image" mode="widthFix"></image>
          <view class="pay-product-title">{{ item.title }}</view>
          <view class="pay-product-quantity">x{{ item.quantity }}</view>
          <view class="pay-product-price">¥{{ item.price }}</view>
        </view>
      </block>
    </view>
    <view class="pay-success-subtitle">订单详情</view>
    <view class="pay-order-detail">
      <view class="order-detail-content">
        <view>消费时间：</view>
        <view class="order-detail-text">{{ orderDetail.cusTime }}</view>
      </view>
      <view class="order-detail-content">
        <view>扣费时间：</view>
        <view class="order-detail-text">{{ orderDetail.chargTime }}</view>
      </view>
      <view class="order-detail-content">
        <view>订单编号：</view>
        <view class="order-detail-text">{{ orderDetail.orderNo }}</view>
      </view>
      <view class="order-detail-content">
        <view>设备编号：</view>
        <view class="order-detail-text">{{ orderDetail.equipNo }}</view>
      </view>
    </view>
    <view class="pay-success-button">
      <view class="success-return-button">返回首页</view>
      <view class="success-drawback-button">申请退款</view>
    </view>
  </view>
</template>
<script>
export default {
  data () {
    return {
      amount: '23.50',
      productList: [
        {
          image: '../../static/paySuccess/product.png',
          title: '豪豪豪豪豪豪豪豪豪豪豪豪豪豪',
          quantity: '10',
          price: '20'
        },
        {
          image: '../../static/paySuccess/product.png',
          title: '豪豪豪豪豪豪豪豪豪豪豪豪豪豪',
          quantity: '10',
          price: '20'
        }
      ],
      orderDetail: {
        cusTime: '2020-02-16 17:01',
        chargTime: '2020-02-16 17:01',
        orderNo: '4674676468656773575',
        equipNo: 'D00081'
      }
    };
  },
  onLoad () { },
  onShow () { }
};
</script>
<style lang="less" scoped>
.pay-success {
  width: 100%;
  height: 100%;
  padding-bottom: 60rpx;
}
.pay-success-subtitle {
  width: 100%;
  height: 66rpx;
  background-color: #f5f5f5;
  font-size: 30rpx;
  color: #202020;
  box-sizing: border-box;
  padding-left: 30rpx;
  padding-top: 16rpx;
  padding-bottom: 20rpx;
}
.pay-success-info {
  width: 100%;
  // height: 312rpx;
  padding-top: 62rpx;
  padding-bottom: 60rpx;
  box-sizing: border-box;
  background-color: #fff;
  image {
    width: 46rpx;
    height: 46rpx;
    display: block;
    margin: 0 auto 40rpx;
  }
  image + view {
    color: #202020;
    font-size: 30rpx;
    height: 30rpx;
    line-height: 30rpx;
  }
  view {
    text-align: center;
  }
  .pay-success-amount {
    color: #202020;
    font-size: 46rpx;
    line-height: 46rpx;
    height: 46rpx;
    margin-top: 40rpx;
    .pay-amount {
      font-size: 60rpx;
    }
  }
}
/*商品列表*/
.pay-product-list {
  padding: 20rpx 30rpx;
  background-color: #fff;
  .product-list-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10rpx;
    font-size: 28rpx;
    color: #202020;
  }
  image {
    width: 150rpx;
    height: 150rpx;
    display: inline-block;
    margin-right: 12rpx;
  }
  .pay-product-title {
    width: 252rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pay-product-quantity {
    margin-left: 72rpx;
    margin-right: 66rpx;
  }
  .pay-product-price {
    color: #ef4c20;
    font-size: 30rpx;
  }
}
/*详情*/
.pay-order-detail {
  padding: 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
  .order-detail-content {
    color: #a6a6a6;
    font-size: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 18rpx;
    &:first-child {
      margin-top: 0;
    }
  }
  .order-detail-text {
    color: #202020;
  }
}
/*按钮*/
.success-return-button {
  width: 690px;
  height: 90px;
  background: rgba(255, 126, 0, 1);
  border-radius: 8px;
  width: 690rpx;
  height: 90rpx;
  margin: 30rpx auto;
  font-size: 30rpx;
  color: #ffffff;
  text-align: center;
  line-height: 90rpx;
}
.success-drawback-button {
  color: #a7a7a7;
  font-size: 24rpx;
  line-height: 24rpx;
  text-align: center;
}
</style>

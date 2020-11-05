<template>
  <view class="">
    <view class="inv-h-w">
      <view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @click="changeTab(0)">全部订单</view>
      <view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @click="changeTab(1)">退款订单</view>
    </view>

    <!-- 站位 -->
    <view style="width: 100%;height: 100rpx;"></view>

    <view class="" v-show="Inv == 0">
      <!-- 从这里循环嵌套 -->
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

          <!-- 按钮 -->
          <view class="an">
            <view v-if="an == 1" class="shen">申请退款</view>
            <view v-if="an == 1" class="zai">再来一单</view>
            <view v-if="an == 2" class="zhi">立即支付</view>
            <view v-if="an == 3" class="tui">退款详情</view>
          </view>
        </view>
      </view>
    </view>
    <view class="" v-show="Inv == 1">
      <view class="kuang" v-for="refundOrderItem in refundOrder">
        <view class="item">
          <view class="title">
            <view class="shijian">交易时间：{{refundOrderItem.orderTime}}</view>
            <view v-if="refundOrderItem.orderStatus === 1" class="jiayizhuangtai">交易成功</view>
            <view v-else class="jiayizhuangtai">交易失败</view>
          </view>

          <!-- 商品循环 -->
          <view class="con" v-for="refundOrderList in refundOrderItem.list">
            <image :src="refundOrderList.imageUrl"></image>
            <view class="content">
              <view class="cons">{{refundOrderList.goodName}}</view>
              <view class="num">X {{refundOrderList.goodsNum}}</view>
              <view class="money">￥2{{refundOrderList.goodsAmount}}</view>
            </view>
          </view>

          <!-- 合计 -->
          <view class="heji">
            <text>共{{refundOrderItem.list.length}}件商品</text>
            <text class="bianju">合计：</text>
            <text class="qian">￥{{efundOrderItem.actualOrderAmount}}</text>
          </view>

          <!-- 按钮 -->
          <view class="an">
            <view v-if="an == 1" class="shen">申请退款</view>
            <view v-if="an == 1" class="zai">再来一单</view>
            <view v-if="an == 2" class="zhi">立即支付</view>
            <view v-if="an == 3" class="tui">退款详情</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 到底了 -->
    <view class="dibu">已经到底了~</view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      Inv: 0,
      jianyi: true,
      an: 1,
      current: 1,
      pageSize: 10,
      refundOrder: [],
      allOrder: []
    };
  },
  onLoad () {
    this.requestApi({
      payChannel: 'wechat',
      current: this.current,
      pageSize: this.pageSize

    })
  },
  methods: {
    changeTab (Inv) {
      this.Inv = Inv;
      console.log(Inv);
      if (this.Inv == 1) {
        this.an = 3;
        this.requestApi({
          payChannel: 'wechat',
          current: this.current,
          pageSize: this.pageSize
        })
      } else {
        this.an = 1;
      }
    },
    requestApi (parameter) {
      this.$api.order.order(parameter).then(res => {
        if (res.code === 200) {
          thi.refundOrder = res.data.data
        }
      })
    }
  }
};
</script>

<style>
/* 顶部央视 */
.inv-h-w {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  height: 100rpx;
  display: flex;
  justify-content: space-between;
}

.inv-h {
  font-size: 30rpx;
  flex: 1;
  text-align: center;
  height: 100rpx;
  line-height: 100rpx;
  font-weight: 400;
  color: rgba(32, 32, 32, 1);
}

.inv-h-se {
  position: relative;
}
.inv-h-se:after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -40rpx;
  height: 0;
  width: 80rpx;
  border-bottom: 6rpx solid rgba(32, 32, 32, 1);
}

page {
  background-color: #f2f2f2;
}

/* 内容样式 */
.kuang {
  width: 100%;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
}
.item {
  width: 100%;
  padding: 30rpx 17rpx;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  border-radius: 10rpx;
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
  border-bottom: 2rpx dashed #c7c7c7;
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

/* 按钮 */
.an {
  width: 100%;
  padding-top: 30rpx;
  display: flex;
  justify-content: flex-end;
}
.an view {
  width: 160rpx;
  height: 54rpx;
  line-height: 54rpx;
  border-radius: 8rpx;
  font-size: 26rpx;
  text-align: center;
  margin-left: 20rpx;
}
.shen {
  border: 1px solid #a7a7a7;
  color: #a7a7a7;
}
.zai {
  border: 1px solid #5c5c5c;
  color: #5c5c5c;
}
.zhi {
  background-color: #ff7e00;
  color: #ffffff;
}
.tui {
  border: 1px solid #ff7e00;
  color: #ff7e00;
}

/* 到底 */
.dibu {
  width: 100%;
  text-align: center;
  font-size: 22rpx;
  font-weight: 400;
  color: rgba(202, 202, 202, 1);
  line-height: 54rpx;
}
</style>

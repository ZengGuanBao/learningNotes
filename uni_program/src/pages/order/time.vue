<template>
  <view class="">
    <view class="inv-h-w">
      <view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @click="changeTab(0)">全部</view>
      <view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @click="changeTab(1)">待支付</view>
      <view :class="['inv-h', Inv == 2 ? 'inv-h-se' : '']" @click="changeTab(2)">退款</view>
    </view>

    <!-- 站位 -->
    <view style="width: 100%;height: 100rpx;"></view>

    <view class="" v-show="Inv == 0">全部</view>
    <view class="" v-show="Inv == 1">待付款</view>
    <view class="" v-show="Inv == 2">
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
            <view class="shen" @tap="tapBtn('advert')">申请退款</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 到底了 -->
    <view class="dibu">已经到底了~</view>

    <view class="mask" v-if="value" @tap.stop="tapCancel">
      <view class="advert-view">
        <view class="box">
          <image src="../../static/images/img.png"></image>
          <view class="shibai">退款申请失败</view>
          <view class="tishi">请在支付完成后12个小时内申请！</view>
          <view class="btn">返回首页</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import TabMask from '@/components/chunLei-modal/tabMask.js';
export default {
  data () {
    return {
      Inv: 2,
      jianyi: true,
      an: 1,
      value: true,
      type: 'default',
      data: {},
      tabMask: null,
      can: true,
      opacity: {
        type: Number,
        default: 0.6
      }
    };
  },
  onLoad () { },
  mounted () {
    //#ifdef APP-PLUS
    this.tabMask = new TabMask({
      tabbarHeight: this.tabbarHeight,
      navHeight: this.navHeight,
      opacity: this.opacity,
      fn: this.tapMask
    });
    //#endif
  },
  watch: {
    value: {
      immediate: true,
      handler (newVal, oldVal) {
        //#ifdef APP-PLUS
        if (newVal) {
          this.tabMask.show();
        } else {
          this.tabMask.hide();
        }
        //#endif
      }
    }
  },
  methods: {
    changeTab (Inv) {
      this.Inv = Inv;
      console.log(Inv);
      if (this.Inv == 1) {
        this.an = 3;
      } else {
        this.an = 1;
      }
    },
    // 关闭弹框
    tapCancel () {
      this.value = false;
    },
    // 暂时不知
    yearChange: function (e) {
      console.log(e);
      //获得对象的 detail的 value
      //通过数组的下标改变显示在页面的值
      this.yearsIndex1 = e.detail.value[0];
      this.yearsIndex2 = e.detail.value[1];
    },

    // 打开弹框
    tapBtn (type) {
      this.type = type;
      this.value = !this.value;
      switch (this.type) {
        case 'advert':
          this.data = this.advertData;
          this.value = true;
          break;
      }
    }
  }
};
</script>

<style lang="less">
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

// 弹框

button {
  margin-top: 50rpx;
}

.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  transition: background 0.3s linear;
  display: flex;
  align-items: center;

  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
}
.hover {
  background: #f2f2f2;
}

.advert-view {
  width: 500rpx;
  padding: 10rpx 50rpx 65rpx;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 15rpx;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  .box {
    width: 100%;
    text-align: center;
    image {
      width: 240rpx;
      height: 240rpx;
    }
    .shibai {
      margin-top: 30rpx;
      font-size: 36rpx;
      font-weight: 400;
      color: rgba(29, 29, 29, 1);
    }
    .tishi {
      font-size: 26rpx;
      font-weight: 400;
      color: rgba(167, 167, 167, 1);
      margin-top: 20rpx;
    }
    .btn {
      width: 200rpx;
      height: 70rpx;
      line-height: 70rpx;
      border: 1rpx solid rgba(255, 126, 0, 1);
      border-radius: 8rpx;
      text-align: center;
      font-size: 30rpx;
      color: rgba(255, 126, 0, 1);
      margin: 0 auto;
      margin-top: 70rpx;
    }
  }
}

.word-break {
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
}
</style>

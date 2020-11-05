<template>
  <view class="good-repair">
    <view class="box box-1">
      <view class="top">
        <image
          class="img"
          src="/static/images/icon_01.png"
          mode="widthFix"
        ></image>
        <view class="title">感谢您的反馈！</view>
      </view>
      <view class="msg">
        <view class="wrap">
          <view class="left">
            <view class="label">设备编号</view>
            <view class="value">10000001</view>
          </view>
          <view class="right">
            <view class="label">所属门店</view>
            <view class="value">陕西西安市高新区</view>
          </view>
        </view>
      </view>
    </view>
    <view class="box box-2">
      <view class="list list-1">
        <radio-group @change="radioChange">
          <label class="item" v-for="(item, index) in items" :key="item.value">
            <view
              ><radio
                color="#FE7E03"
                style="transform:scale(0.7)"
                :value="item.value"
                :checked="index === current"
            /></view>
            <view class="txt">{{ item.name }}</view>
          </label>
        </radio-group>
      </view>
      <view class="label">问题描述</view>
      <view class="textarea">
        <textarea
          maxlength="200"
          placeholder="请详细描述您遇到的问题，我们会尽快处理，感谢您的反馈"
        ></textarea>
        <view class="text">0/200</view>
      </view>
      <view class="label">上传故障图片（最多四张）</view>
      <view class="addImageCom">
        <view class="image-list">
          <view class="item">
            <image
              class="img"
              src="/static/images/icon_add_01.png"
              mode="aspectFill"
            />
            <image
              class="close"
              src="/static/images/icon_clear_01.png"
              mode="aspectFill"
            />
          </view>
          <view class="item">
            <image
              class="img"
              src="/static/images/icon_add_01.png"
              mode="aspectFill"
            />
            <image
              class="close"
              src="/static/images/icon_clear_01.png"
              mode="aspectFill"
            />
          </view>
          <view class="item">
            <image
              class="img"
              src="/static/images/icon_add_01.png"
              mode="aspectFill"
            />
            <image
              class="close"
              src="/static/images/icon_clear_01.png"
              mode="aspectFill"
            />
          </view>
          <view class="item add-com"
            ><image
              class="img"
              src="/static/images/icon_add_01.png"
              mode="aspectFill"
          /></view>
        </view>
      </view>
      <view class="btn">确认提交</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      items: [
        {
          value: 0,
          name: "扫码后点击开门，打不开门"
        },
        {
          value: 1,
          name: "门关不上"
        },
        {
          value: 2,
          name: "其他"
        }
      ]
    };
  },
  methods: {
    radioChange(evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.target.value) {
          this.current = i;
          break;
        }
      }
    }
  }
};
</script>

<style lang="less">
view {
  box-sizing: border-box;
}
.good-repair {
  .box-1 {
    border-top: 20rpx solid rgba(242, 242, 242, 1);
    border-bottom: 20rpx solid rgba(242, 242, 242, 1);
    .top {
      padding: 32rpx 28rpx 15rpx;
      display: flex;
      align-items: center;
      .img {
        width: 54rpx;
        height: 50rpx;
      }
      .title {
        margin-left: 18rpx;
        font-size: 36rpx;
        font-weight: bold;
        color: rgba(12, 12, 12, 1);
      }
    }
    .msg {
      padding: 0rpx 50rpx;
      .wrap {
        padding: 20rpx 0;
        flex: 1;
        border-top: 1px solid rgba(242, 242, 242, 1);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .label {
        font-size: 24rpx;
        font-weight: 400;
        color: rgba(161, 161, 161, 1);
      }
      .value {
        font-size: 28rpx;
        font-weight: 400;
        color: rgba(32, 32, 32, 1);
      }
      .left,
      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
  .box-2 {
    padding: 0 30rpx;
    .list-1 {
      .item {
        padding-top: 15rpx;
        display: flex;
        align-items: center;
        .txt {
          font-size: 28rpx;
          font-weight: 400;
          color: rgba(39, 39, 39, 1);
        }
      }
    }
    .label {
      padding: 40rpx 0 20rpx;
      font-size: 28rpx;
      color: rgba(12, 12, 12, 1);
    }
    .textarea {
      width: 100%;
      height: 200rpx;
      background: rgba(242, 242, 242, 1);
      position: relative;
      textarea {
        width: 100%;
        height: 130rpx;
        padding: 30rpx 20rpx 0rpx;
        font-size: 24rpx;
        box-sizing: border-box;
      }
      .text {
        position: absolute;
        bottom: 30rpx;
        right: 30rpx;
        font-size: 30rpx;
        color: #c1c1c1;
      }
    }

    .addImageCom {
      .image-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .item {
          position: relative;
          margin: 0 14rpx 14rpx 0;
          width: 160rpx;
          height: 160rpx;
          background-color: #ededed;
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

    .btn {
      width: 100%;
      height: 90rpx;
      margin-top: 95rpx;
      margin-bottom: 60rpx;
      background: rgba(255, 126, 0, 1);
      border-radius: 8rpx;
      line-height: 90rpx;
      text-align: center;
      font-size: 30rpx;
      color: rgba(255, 255, 255, 1);
    }
  }

  .uni-radio-wrapper {
    .uni-radio-input {
      width: 36rpx !important;
      height: 36rpx !important;
    }
  }
}
</style>

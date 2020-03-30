<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">{{$t('home')}}</router-link> |
      <router-link to="/about">{{$t('about')}}</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
// @import '~vux/src/styles/reset.less';
// iphonex 适配
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  body.iphonex {
    padding-bottom: constant(safe-area-inset-bottom); //为底下圆弧的高度 34px
    padding-bottom: env(safe-area-inset-bottom); //为底下圆弧的高度 34px
  }
}
</style>

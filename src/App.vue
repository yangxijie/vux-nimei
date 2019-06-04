<template>
  <div id="app" style="height:100%;">
    <view-box ref="viewBox">
      <!--<x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"></x-header>-->
      <router-view ></router-view>
      <tabbar slot="bottom">
        <tabbar-item selected link="/">
          <img slot="icon" src="./assets/demo/icon_home.png">
          <img slot="icon-active" src="./assets/demo/icon_home_active.png">
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item link="http://w1.ttkefu.com/k/linkurl/?t=5B1BGFJ9">
        <!--<tabbar-item link="/getCoupon">-->
          <img slot="icon" src="./assets/demo/icon_classify.png">
          <img slot="icon-active" src="./assets/demo/icon_classify_active.png">
          <span slot="label">咨询</span>
        </tabbar-item>
        <tabbar-item link="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4090b3ba169287ef&redirect_uri=http%3a%2f%2fwww.anniemodern.com%2finfo&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect">
          <img slot="icon" src="./assets/demo/icon_info.png">
          <img slot="icon-active" src="./assets/demo/icon_info_active.png">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
  import {ViewBox, Tabbar, TabbarItem, XHeader} from 'vux'
  export default {
    name: 'app',
    components: {
      ViewBox,
      Tabbar,
      TabbarItem,
      XHeader
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>

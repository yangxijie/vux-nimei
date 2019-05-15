<template>
  <div id="tabb">
    <tabbar>
      <tabbar-item selected>
        <img slot="icon" src="../assets/demo/icon_home.png">
        <img slot="icon-active" src="../assets/demo/icon_home_active.png">
        <span slot="label">主页</span>
      </tabbar-item>
      <tabbar-item >
        <img slot="icon" src="../assets/demo/icon_classify.png">
        <img slot="icon-active" src="../assets/demo/icon_classify_active.png">
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item link="/page/Info">
        <img slot="icon" src="../assets/demo/icon_info.png">
        <img slot="icon-active" src="../assets/demo/icon_info_active.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'
  export default {
    components: {
      Tabbar,
      TabbarItem
    }
  }
</script>
<style scoped lang="less">
  .tabb{
    height: 100%;
  }
  .weui_tabbar {
    position: fixed !important;
  }
</style>

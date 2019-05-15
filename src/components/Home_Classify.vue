<template>
  <div>
    <grid :show-lr-borders="false">
      <grid-item :link="{ path: '/detail', query: {id: '5cce7d3441b6401d2f68c1de'}}">
        <img slot="icon" src="../assets/demo/icon_nav_01_new.png">
        <span slot="label">丰胸</span>
      </grid-item>
      <grid-item :link="{ path: '/detail', query: {id: '5cce7d3441b6401d2f68c1f8'}}">
        <img slot="icon" src="../assets/demo/icon_nav_02_new.png">
        <span slot="label">脸部</span>
      </grid-item>
      <grid-item :link="{ path: '/detail', query: {id: '5cce7d3441b6401d2f68c1fe'}}">
        <img slot="icon" src="../assets/demo/icon_nav_03_new.png">
        <span slot="label">形体</span>
      </grid-item>
      <grid-item :link="{ path: '/detail', query: {id: '5cce7d3441b6401d2f68c1f2'}}">
        <img slot="icon" src="../assets/demo/icon_nav_04_new.png">
        <span slot="label">除皱</span>
      </grid-item>
    </grid>
  </div>
</template>
<script>
  import { Grid, GridItem } from 'vux'

  export default {
    components: {
      Grid,
      GridItem
    },
    methods: {

    }
  }
</script>
<style scoped>
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
  .weui-grids {
    background-color: #fff;
  }
</style>

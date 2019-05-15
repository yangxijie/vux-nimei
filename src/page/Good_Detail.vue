<template>
  <div>
    <swiper :list="detail.images"></swiper>
    <div style="height: 5px;background-color: ghostwhite"></div>
    <div class="shop_info">
      <p style="height: 25px;font-size: 20px">{{detail.productName}}</p>
      <p style="height: 55px;font-size: 35px;color: red">定金：{{detail.promotePrice}}</p>
      <p style="height: 20px;font-size: 15px;color: lightgrey">已有{{detail.stock}}人购买</p>
    </div>
    <div style="height: 5px;background-color: ghostwhite"></div>
    <div class="price_info">
      <p class="pp"><del>市场价：{{detail.originalPrice}}元</del></p>
      <p class="pp">优惠价：{{detail.privilegePrice}}元</p>
    </div>
    <!--<div style="height: 2px;background-color: ghostwhite"></div>-->
    <group>
      <cell
        :title="title"
        is-link
        :border-intent="false"
        :arrow-direction="showContent ? 'up' : 'down'"
        @click.native="showContent = !showContent"></cell>
      <p class="slide" :class="showContent?'animate':''">购买商品时请仔细确认，确认无误后就可以开始下单，
        目前支付功能正在开发中，支付相关功能将在下一个版本和许多新功能一起推出。如果有什么疑问请联系客服，客服电话为02862125207</p>
    </group>
    <div style="height: 5px;background-color: ghostwhite"></div>
    <div style="background-color: white;text-align: center;font-size: 20px">商品详情</div>
    <div class="imgDel">
      <span v-html="detail.detailInfo"></span>
    </div>
    <box gap="10px 10px">
      <a href="http://w1.ttkefu.com/k/linkurl/?t=7B1BGBB2"><x-button type="primary">咨询</x-button></a>
    </box>
  </div>
</template>
<script>
  import { Swiper, Cell, Group, Box, XButton } from 'vux'
  import {api} from '../api/api'
  export default {
    components: {
      Swiper,
      Cell,
      Group,
      Box,
      XButton
    },
    data: function () {
      return {
        title: '注意事项',
        detail: {},
        showContent: false
      }
    },
    methods: {
      async onQueryDetail () {
        let data = await api.get('product/getStepProductById', {
          id: this.$route.query.id
        })
        this.detail = data.result
      }
    },
    mounted: function () {
      this.onQueryDetail()
    }
  }
</script>
<style>
  span > p{
    width: 100%;
    overflow: hidden;
  }
  span img{
    display: block;
    height: auto;
    max-width: 100%;
  }
  .pp{
    font-size: 20px;
  }
  .price_info{
    display: flex;
    justify-content: space-around;
    background-color: white;
  }
  .shop_info{
    width: 100%;
    height: 100px;
    text-align: center;
    background-color: white;
  }
  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
</style>

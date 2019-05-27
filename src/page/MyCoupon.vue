<template>
  <section class="aui-flexView">
    <header class="aui-navBar aui-navBar-fixed b-line">
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">我的优惠券</span>
      </div>
    </header>
    <section class="aui-scrollView">
      <div class="aui-tab" data-ydui-tab>
        <div class="tab-panel">
          <div class="tab-panel-item tab-active">
            <a href="javascript:;" class="aui-flex" v-for="(value, key) in couponList" :key="key">
              <div class="aui-price-nub">
                <div class="aui-digit">
                  <h2><em>￥</em>{{value.offset}}</h2>
                </div>
                <div class="aui-full">
                  <p>代金卷</p>
                </div>
              </div>
              <div class="aui-flex-box">
                <h2>{{value.describe}}</h2>
                <h3>2019.09.03~2029.09.29</h3>
                <!-- <button>去使用</button> -->
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import '../assets/styles/coupon.css'
  import {api} from '../api/api'
  export default {
    created () {
      this.getCpist(this.$route.query.id)
    },
    data: function () {
      return {
        couponList: []
      }
    },
    methods: {
      async getCpist (userOpenid) {
        let data = await api.get('user/getCoupon', {
          userId: userOpenid
        })
        console.log(data.result)
        this.couponList = data.result
      }
    }
  }
</script>

<style lang="less">

</style>

<template>
  <section class="aui-flexView">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">确认订单</span>
      </div>
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-sys"></i>
      </a>
    </header>
    <section class="aui-scrollView">
      <div class="aui-order-box">
        <div class="aui-flex aui-choice-white aui-mar15">
          <div class="aui-flex-box">请填写联系</div>
          <input type="text" class="linkman" placeholder="请输入姓名"><br>
        </div>
        <div class="aui-flex aui-choice-white aui-mar15 a">
          <div class="aui-flex-box">请填写手机号</div>
          <input type="text" class="linktel" placeholder="请输入手机号">
        </div>
        <div class="aui-flex aui-flex-default aui-mar15">
          <div class="aui-flex-goods">
            <img :src="productList.cover" alt="">
          </div>
          <div class="aui-flex-box">
            <h2>{{productList.productName}}</h2>
            <!--<p>尺码：43</p>-->
            <div class="aui-flex aui-flex-clear">
              <div class="aui-flex-box">￥{{productList.privilegePrice}}</div>
              <div>x1</div>
            </div>
          </div>
        </div>
        <div class="aui-flex aui-choice-white b-line">
          <div class="aui-flex-box">支付方式</div>
          <div class="aui-flex-triangle">微信支付</div>
        </div>
        <div class="aui-flex aui-choice-white b-line">
          <div class="aui-flex-box">代金券</div>
          <div class="aui-flex-triangle">{{couplenth}}张可用</div>
        </div>
        <div class="aui-flex aui-choice-white  aui-mar15">
          <div class="aui-flex-box">发票信息</div>
          <div class="aui-flex-triangle">不可开发票</div>
        </div>
        <div class="aui-flex aui-choice-white ">
          <div class="aui-flex-box">
            <h2>商品总价</h2>
            <!--<h3>运费总额</h3>-->
            <!--<p>年度消费满2000元,订单满99元包邮。您已消费38900元</p>-->
          </div>
          <div class="aui-flex-triangle aui-flex-triangle-clear">
            <h4>￥{{productList.privilegePrice}}</h4>
            <!--<p>+￥10元</p>-->
          </div>
        </div>
      </div>
    </section>
    <footer class="aui-bar-footer">
      <div class="aui-flex">
        <div class="aui-flex-box">
          应付金额：<em>{{productList.privilegePrice}}</em>
        </div>
        <div class="aui-btn-button">
          <button @click="toPayFor">去支付</button>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
  import '../assets/styles/toorder.css'
  import {api} from '../api/api'
  export default {
    name: 'ToOrder',
    created () {
      this.productList = JSON.parse(this.$route.query.pro)
      this.getUserInfo(this.$route.query.code)
      this.toPayFor(this.openid, (new Date()).valueOf(), this.productList.productName, this.productList.privilegePrice)
    },
    data: function () {
      return {
        productList: {},
        useropenid: {},
        userInfo: {},
        couponList: {},
        couplenth: {}
      }
    },
    async getUserInfo (code) {
      let data = await api.get('api/userInfo', {
        code: code
      })
      this.userInfo = data.result
      this.useropenid = data.result.openId
      this.getCpist(data.result.openId)
    },
    async getCpist (userOpenid) {
      let data = await api.get('user/getCoupon', {
        userId: userOpenid
      })
      this.couponList = data.result
      this.couplenth = data.result.length()
    },
    toPayFor (openid, outTradeNo, body, totalFee) {
      let data = api.get('pay/createOrder', {
        openid: openid,
        outTradeNo: outTradeNo,
        body: outTradeNo,
        totalFee: totalFee
      })

    }
  }
</script>

<style scoped>

</style>

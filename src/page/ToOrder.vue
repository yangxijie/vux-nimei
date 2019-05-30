<template>
  <section class="aui-flexView">
    <header class="aui-navBar aui-navBar-fixed" style="text-align:center">
      <div class="aui-center">
        <span class="aui-center-title">订单确认</span>
      </div>
    </header>
    <section class="aui-scrollView">
      <div class="aui-order-box">
        <!--<div class="aui-flex aui-choice-white aui-mar15">-->
          <!--<div class="aui-flex-box">请填写联系</div>-->
          <!--<input type="text" class="linkman" placeholder="请输入姓名"><br>-->
        <!--</div>-->
        <!--<div class="aui-flex aui-choice-white aui-mar15 a">-->
          <!--<div class="aui-flex-box">请填写手机号</div>-->
          <!--<input type="text" class="linktel" placeholder="请输入手机号">-->
        <!--</div>-->
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
  import wx from 'weixin-js-sdk'
  export default {
    name: 'ToOrder',
    created () {
      this.getUserInfo(this.$route.query.code)
      this.getCpist(this.useropenid)
      this.onQueryDetail(this.$route.query.state)
      this.getJsApiConfig(document.URL)
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
    methods: {
      async getJsApiConfig (url) {
        let data = await api.get('api/getJsApiSign', {
          url: url
        })
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx4090b3ba169287ef', // 必填，公众号的唯一标识
          timestamp: data.result.time_stamp, // 必填，生成签名的时间戳
          nonceStr: data.result.nonce_str, // 必填，生成签名的随机串
          signature: data.result.signature, // 必填，签名
          jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
        })
      },
      async getUserInfo (code) {
        let data = await api.get('api/userInfo', {
          code: code
        })
        this.userInfo = data.result
        this.useropenid = data.result.openId
        this.getCpist(data.result.openId)
      },
      async onQueryDetail (uid) {
        let data = await api.get('product/getStepProductById', {
          id: uid
        })
        this.productList = data.result
      },
      async getCpist (userOpenid) {
        let data = await api.get('user/getCoupon', {
          userId: userOpenid
        })
        this.couponList = data.result
        this.couplenth = data.result.length
      },
      async toPayFor () {
        console.log('1')
        await api.post('pay/createOrder', {
          openid: this.useropenid,
          outTradeNo: (new Date()).valueOf(),
          body: this.productList.productName,
          totalFee: (parseFloat(this.productList.privilegePrice).toFixed(2)) * 100
        }).catch(data => {
          console.log('错误：' + JSON.stringify(data))
          if (data.status === true) {
            console.log('执行微信SDK。。。。')
            wx.chooseWXPay({
              appId: data.result.appId,
              timestamp: data.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.result.nonceStr, // 支付签名随机串，不长于 32 位
              package: data.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: data.result.paySign, // 支付签名
              success: function (res) {
                console.log(res)
                // 支付成功后的回调函数
                this.$router.push('/info')
              },
              fail: function (err) {
                console.log('出现错误.....')
                console.log(err)
              }
            })
          }
        })
        // console.log('2')
        // console.log('数据 ' + JSON.stringify(data.result))
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <div class="qr">
    <qrcode :value="value"></qrcode>
  </div>
</template>
<script>
  import { Qrcode } from 'vux'
  import {api} from '../api/api'

  const uri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4090b3ba169287ef&redirect_uri=http%3a%2f%2fwww.kaidi.work%2finfo&response_type=code&scope=snsapi_userinfo&state='
  const defUri = 'http://www.kaidi.work'
  export default {
    created () {
      this.qrCheckMember(this.$route.query.id)
    },
    components: {
      Qrcode
    },
    data: function () {
      return {
        value: ''
      }
    },
    methods: {
      async qrCheckMember (userOpenid) {
        let r = await api.get('user/getMember', {
          openId: userOpenid
        })
        if (r.status === true) {
          this.value = uri + userOpenid + '#wechat_redirect'
        } else {
          this.value = defUri
        }
      }
    }
  }
</script>
<style>
  .qr{
    height: 100vh;
    display: flex;
    align-items:center;
    justify-content:center;
  }
</style>

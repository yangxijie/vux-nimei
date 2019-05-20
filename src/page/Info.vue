<template>
  <div>
    <div class="header">
      <div class="header_content">
        <img class="avatarUrl" :src="userInfo.headImgUrl"/>
        <div class="nickName cfff">{{userInfo.nickname}}</div>
        <div style="color: white;font-size: 15px"><span v-if="member">【等级：会员】</span> <span>【推荐人：{{referName}}】</span></div>
        <!--<div style="height: 30px;background-color: #ff6a3c"></div>-->
      </div>
    </div>
    <div>
      <tab>
        <tab-item selected @on-item-click="onItemClick">会员中心</tab-item>
        <tab-item @on-item-click="onItemClick">分销中心</tab-item>
      </tab>
    </div>
    <group v-if="index === 0">
      <cell-box is-link link="">
        成为会员
      </cell-box>
      <cell-box is-link link="">
        优惠卷
      </cell-box>
    </group>
    <group v-else>
      <cell-box is-link :link="{ path: '/qr', query: {id: userInfo.openId}}">
        我要分销
      </cell-box>
    </group>
  </div>
</template>
<script>
  import {CellBox, Group, Tab, TabItem, Toast} from 'vux'
  import {api} from '../api/api'
  export default {
    created () {
      this.getUserInfo(this.$route.query.code)
    },
    components: {
      Tab,
      TabItem,
      Group,
      CellBox,
      Toast
    },
    methods: {
      onItemClick (index) {
        this.index = index
      },
      async getUserInfo (code) {
        let data = await api.get('api/userInfo', {
          code: code
        })
        this.userInfo = data.result
        this.insertUser(data.result.nickname, data.result.openId)
        this.getReferName(this.userInfo.openId)
        this.checkMember(data.result.openId)
        if (this.$route.query.state === 'STATE') {
          return
        }
        this.addMember(this.$route.query.state, data.result.openId)
      },
      async addMember (parentOpenid, childOpenid) {
        await api.get('user/Sellto', {
          parentName: parentOpenid,
          subclassName: childOpenid
        })
        let da = await api.get('user/getMember', {
          openId: parentOpenid
        })
        this.referName = da.result.name
      },
      async insertUser (userName, userOpenid) {
        await api.get('user/login', {
          Name: userName,
          openId: userOpenid
        })
      },
      async getReferName (childOpenId) {
        let res = await api.get('user/getParentName', {
          subclassName: childOpenId
        })
        if (res.status === true) {
          this.referName = res.result
        } else {
          this.referName = '无'
        }
      },
      async checkMember (userOpenid) {
        let r = await api.get('user/getMember', {
          openId: userOpenid
        })
        this.member = r.status
      }
    },
    data () {
      return {
        index: 0,
        userInfo: {},
        member: false,
        referName: ''
      }
    }
  }
</script>
<style lang="less">
  .title{
    background-color: white;
  }
  .header {
    background: #ff6a3c;
    height: 260px;
    width: 100%;
  }
  .header_content {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding-top: 48px;
  }
  .avatarUrl {
    width: 122px;
    height: 122px;
    border-radius: 50%;
  }
  .nickName {
    font-size: 30px;
    padding-top: 15px;
    color: white;
  }
</style>

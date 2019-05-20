<template>
  <div>
    <swiper :list="imgList" auto style="margin:0 auto;" height="180px"
            dots-class="custom-bottom" dots-position="center" @on-index-change="indexChange" @click.native="skip"></swiper>
    <hc></hc>
    <divider>限时秒杀</divider>
    <sc></sc>
    <divider>优选商品</divider>
    <shopcard :card="cardList" v-if="cardList.length"></shopcard>
  </div>
</template>
<script>
  import {Divider, Swiper} from 'vux'
  import hc from '../components/Classification'
  import sc from '../components/Seckill_Card'
  import shopcard from '../components/Shop_card'
  import {api} from '../api/api'

  export default {
    created () {
      this.getImgList()
      this.getGoodList()
    },
    components: {
      Divider,
      hc,
      sc,
      shopcard,
      Swiper
    },
    data: function () {
      return {
        img_index: 0,
        imgList: [],
        cardList: []
      }
    },
    methods: {
      async getImgList () {
        let data = await api.get('getList')
        this.imgList = data.result
      },
      async getGoodList () {
        let data = await api.get('product/getStepProduct')
        this.cardList = data.result
      },
      indexChange (index) {
        this.img_index = index
      },
      skip () {
        console.log('list信息：' + this.imgList[this.img_index].title)
        this.$router.push({path: '/detail', query: {id: this.imgList[this.img_index].id}})
      }
    },
    mounted () {
    }
  }
</script>

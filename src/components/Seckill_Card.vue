<template>
  <div>
    <card v-for="item in li" :key="item.pid" @click.native="onSkipGood(item)">
      <img slot="header" :src="item.logo" style="width:100%;height: 230px; display:block;">
      <div slot="content" class="card-padding">
        <p style="font-size:14px;line-height:1.2;">{{item.intro}}</p>
      </div>
    </card>
  </div>
</template>
<script>
  import { Card } from 'vux'
  import { api } from '../api/api'
  export default {
    created () {
      this.onQueryCardList()
    },
    components: {
      Card
    },
    data: function () {
      return {
        li: []
      }
    },
    methods: {
      onSkipGood (item) {
        this.$router.push({path: '/detail', query: {id: item.pid}})
      },
      async onQueryCardList () {
        let data = await api.get('pic/getDiscover')
        this.li = data.result
      }
    }
  }
</script>
<style scoped lang="less">
  .card-padding {
    padding: 15px;
  }
</style>

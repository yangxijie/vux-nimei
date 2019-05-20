<template>
  <div class="box">
    <div class="shop_list" v-for="i in list" :key="i.id" @click="onItemClick(i)">
      <img :src="i.cover" class="img"/>
      <p style="text-align: center">{{i.productName}}</p>
      <p>定金¥{{i.promotePrice}}元</p>
      <p>已有{{i.stock}}人购买</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['card'],
    data: function () {
      return {
        list: this.card
      }
    },
    methods: {
      onItemClick (i) {
        this.$router.push({path: '/detail', query: {id: i.id}})
      }
    }
  }
</script>
<style scoped>
  .box{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
  }
  .shop_list{
    box-sizing: border-box;
    flex: 0 0 50%;
    height: 230px;
    border: 1px solid white;
  }
  .img{
    width: 100%;
    height: 75%;
  }
  .sp1{
    color: red;
    font-size: 20px;
  }
  .sp2{
    color: #999;
    font-size: 5px;
  }
</style>

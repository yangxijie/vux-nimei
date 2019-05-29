<template>
  <div>
    <section class="icons">
      <swiper :options="iconSwiperOption">
        <swiper-slide  class="icons-silde"  v-for="(slide, key) in iconsList" :key="key" >
          <ul class="icons-ul">
            <li class="icons-li" v-for="(value, key) in slide" :key="key" data-id="value.id">
              <router-link class="icons-link" :to="{ path: '/detail',query: { id: value.id }}">
                <img class="icons-img" :src="value.imgSrc" alt="">
                <span style=" font-size: 0.95rem;">{{value.text}}</span>
              </router-link>
            </li>
          </ul>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </section>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import '../assets/styles/reset.css' // 引入默认配置样式文件
import '../assets/styles/border.css' // 引入1像素边框样式文件
import { swiper, swiperSlide } from 'vue-awesome-swiper'

const imgLi = [{
  id: '5cce7d3441b6401d2f68c1de',
  imgSrc:
    'static/icon_nav_01_new.png',
  text: '丰胸'
}, {
  id: '5cce7d3441b6401d2f68c1f8',
  imgSrc:
    'static/icon_nav_02_new.png',
  text: '脸部'
}, {
  id: '5cce7d3441b6401d2f68c1fe',
  imgSrc:
    'static/icon_nav_03_new.png',
  text: '形体'
}, {
  id: '5cce7d3441b6401d2f68c1f2',
  imgSrc:
    'static/icon_nav_04_new.png',
  text: '除皱'
}, {
  id: '',
  imgSrc:
    'static/icon_nav_05_new.png',
  text: '鼻部整形'
}, {
  id: '5cce7d3441b6401d2f68c1ec',
  imgSrc:
    'static/icon_nav_06_new.png',
  text: '腿部整形'
}, {
  id: '5cce7d3441b6401d2f68c1e8',
  imgSrc:
    'static/icon_nav_07_new.png',
  text: '激光脱毛'
}, {
  id: '5cce7d3441b6401d2f68c1e8',
  imgSrc:
    'static/icon_nav_08_new.png',
  text: '化妆品'
}, {
  id: '5cce7d3441b6401d2f68c1ee',
  imgSrc:
    'static/icon_nav_09_new.png',
  text: '嘴部整形'
}, {
  id: '5cce7d3441b6401d2f68c1f6',
  imgSrc:
    'static/icon_nav_10_new.png',
  text: '玻尿酸'
}]
export default {
  created () {
    this.iconsList = this.arrTrans(8, imgLi)
  },
  data () {
    return {
      iconSwiperOption: {
        pagination: { el: '.swiper-pagination' }
      },
      iconsList: []
    }
  },
  methods: {
    arrTrans: function (num, arr) { // 一维数组转换为二维数组
      let iconsArr = [] // 声明数组
      for (let i = 0; i < Math.ceil(arr.length / num); i++) {
        iconsArr[i] = [] // 声明该数组第一个元素为一个数组
        for (let j = 0; j < num && j + num * i < arr.length; j++) {
          iconsArr[i].push(arr[j + num * i])
        }
      }
      return iconsArr
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style scoped>
  .icons{
    height: 190px;
    margin: 6px 0 8px;
    background-color: #FFF;
  }
  .icons-silde{
    height: 190px;
  }
  .icons-ul{
    display: flex;
    flex-wrap: wrap;
  }
  .icons-li{
    flex: 0 1 25%;
    margin: 5px 0;
  }
  .icons-link{
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #333;
    text-decoration: none;
  }
  .icons-img{
    height: 55px;
    width: 55px;
  }
</style>

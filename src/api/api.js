import axios from 'axios'
// const qs = require('qs')

axios.defaults.baseURL = 'http://www.anniemodern.com/nimei/'
// axios.defaults.baseURL = 'http://localhost:9090/nimei/'
// // 设置默认请求头
// axios.defaults.headers = {
//   'content-type': 'application/json;charset=utf-8'
// }
axios.defaults.timeout = 10000

const api = {
  async get (url, data) {
    try {
      let res = await axios.get(url, {params: data})
      res = res.data
      return new Promise((resolve) => {
        if (res.code === 0) {
          resolve(res)
        } else {
          resolve(res)
        }
      })
    } catch (err) {
      console.log(err)
      this.$vux.toast.text('请求出错', 'middle')
    }
  },
  async post (url, data) {
    try {
      let res = await axios.post(url, data)
      // let res = await axios({
      //   method: 'post',
      //   url: url,
      //   data: data,
      //   headers: {
      //     'content-type': 'application/json;charset=utf-8'
      //   }
      // })
      res = res.data
      return new Promise((resolve, reject) => {
        if (res.code === 0) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      console.log(err)
      this.$vux.toast.text('请求出错', 'middle')
    }
  }
}
export {api}

<template>
  <div class="home">
    <van-button type="default" @click="register">注册</van-button>
    <van-button type="default" @click="login">登录</van-button>
    <van-button type="default" @click="getUser">获取用户信息</van-button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'temp',
  components: {
    HelloWorld
  },
  data() {
    return {
    }
  },
  methods: {
    async getUser() {
      const address = this.tronWeb.defaultAddress.base58;
      this.axios.request({
        url: `${this.apis.userInfo}/${address}`,
        method: 'get',
      }).then(res => {
        console.log(res);
      })
    },
    async register() {
      const address = this.tronWeb.defaultAddress.base58;
      const sign = await this.tronWeb.trx.sign(this.tronWeb.toHex(address));
      this.axios.request({
        url: this.apis.register,
        method: 'post',
        data: {
          address,
          nickname: 'zxplus',
          sign
        }
      }).then(res => {
        console.log(res);
      })
    },
    async login() {
      const address = this.tronWeb.defaultAddress.base58;
      const sign = await this.tronWeb.trx.sign(this.tronWeb.toHex(address));
      this.axios.request({
        url: this.apis.login,
        method: 'post',
        data: {
          address,
          sign
        }
      }).then(res => {
        this.utils.setCookie('token', res.data.access_token);
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>

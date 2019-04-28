<template>
  <div class="about">
    <van-row>
      <van-button type="default" @click="transferXAS">转账</van-button>
    </van-row>
    <van-row>
      <van-button type="default" @click="callContract">调用智能合约</van-button>
    </van-row>
    <van-row>
      <van-button type="default" @click="payContract">向智能合约转账</van-button>
    </van-row>
    <van-row>
      <van-button type="default" @click="getTotal">调用查询方法</van-button>
    </van-row>
    <van-row>
      <van-button type="default" @click="open2">open2</van-button>
    </van-row>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        aschWeb: null
      }
    },
    methods: {
      async transferXAS() {
        let result = await this.aschWeb.api.transferXAS(123456, 'AFN1dw63qaTUgXrgDaJz5Be6khu1f2PY2n', 'test transfer XAS')
        console.log('result:' + JSON.stringify(result))
      },
      async callContract() {
        const gasLimit = 5000000;
        const name = 'zuoyao-contract';
        const method = 'onPay';
        const methodArgs = [1, 'XAS'];

        this.aschWeb.api
            .callContract(name, method, methodArgs, gasLimit, true)
            .then(res => {
              console.log('result:' + JSON.stringify(res))
            })
            .catch(err => {
              console.error(err)
            })
      },
      // 向智能合约转账
      payContract() {
        //args参数示例
        const gasLimit = 5000000;
        const name = 'zuoyao-contract';
        const method = 'onPay';
        const amount = String(100 * (10 ** 8)); // 100 XAS
        const currency = 'XAS';
        //使用asch-web 构建，签名和广播交易
        this.aschWeb.api
            .payContract(currency, amount, name, method, gasLimit, true)
            .then(res => {
              console.log('result:' + JSON.stringify(res))
            })
            .catch(err => {
              console.error(err)
            })
      },
      getTotal() {
        const name = 'zuoyao-contract';
        const method = 'getPayTimes';
        const testnet = 'http://testnet.asch.io:4096';
        axios.request({
          url: `${testnet}/api/v2/contracts/${name}/constant/${method}`,
          method: 'post',
          data: []
        }).then(res => {
          console.log(res);
        })
      },
      open2() {
        this.aschWeb.api
            .open()
            .then(res => {
              console.log('transfer XAS response:' + JSON.stringify(res))
            })
            .catch(err => {
              console.error(err)
            })
      }
    },
    mounted() {
      this.aschWeb = window.aschPay;
      console.log(window.aschPay);
      console.log(this.aschWeb.defaultAccount.address);
    }
  }
</script>

<template>
  <div class="web3">
    <van-cell-group>
      <van-field label="名字" v-model="name" placeholder="名字" />
      <van-field label="基因" v-model="genes" placeholder="基因" />
    </van-cell-group>
    <van-row>
      <van-button type="default" @click="createGirl">创建</van-button>
    </van-row>
    <van-row>
      <van-field label="address" v-model="address" placeholder="基因" />
      <van-button type="primary" @click="getGirlsByOwner">根据address查找girl</van-button>
    </van-row>
    <van-row>
      <van-field label="girlID" v-model="girlID" placeholder="基因" />
      <van-button type="primary" @click="getGirlsByID">根据ID查找girl</van-button>
    </van-row>
    <van-row>
      <van-button type="primary" @click="getThisAddress">获取this</van-button>
    </van-row>
    <van-row>
      <van-button type="primary" @click="getBalanceOf">get BalanceOf</van-button>
    </van-row>
    <van-row>
      <van-button type="primary" @click="transfer">转移女孩</van-button>
    </van-row>
  </div>
</template>
<script>
import girl from './girl.json';
import Web3 from 'web3';
const ownerAddress = '0x0530b049EebbB433De580f6358150574C7FB0346';
export default {
  name: 'web3',
  data() {
    return {
      name: 'zxplus',
      genes: 1,
      address: ownerAddress,
      girlID: 0,
      myContract: null,
      web3js: null
    }
  },
  methods: {
    createGirl() {
      this.web3js.eth.getCoinbase().then((from) => {
        this.myContract.methods.createGirl(this.name, this.genes).send({
          from
        }).then((result) => {
          console.log(result);
        });
      })
    },
    getGirlsByOwner() {
      this.myContract.methods.getGirlsByOwner(this.address).call().then((result) => {
        console.log(result);
      })
    },
    getGirlsByID() {
      this.myContract.methods.girls(this.girlID).call().then((result) => {
        console.log(result);
        const hexToNumberString = this.web3js.utils.hexToNumberString;
        let girl =  {
          name: result.name,
          birthTime: hexToNumberString(result.birthTime),
          genes: hexToNumberString(result.genes),
        }
        console.log(girl);
      })
    },
    listenEvent() {
      this.myContract.events.NewGirl({}, (error, event) => { console.log(event); })
              .on('data', (event) => {
                console.log(event); // same results as the optional callback above
              })
              .on('changed', (event) => {
                // remove event from local database
              })
              .on('error', console.error);
    },
    getThisAddress() {
      this.myContract.methods.getThisAddress().call().then(result => {
        console.log('getThisAddress:', result);
      })
      this.myContract.methods.cooAddress().call().then(result => {
        console.log('getCooAddress:', result);
      })
      this.myContract.methods.getMsgSender().call().then(result => {
        console.log('getMsgSender:', result);
      })
    },
    transfer() {
      this.web3js.eth.getCoinbase().then((from) => {
        this.myContract.methods
                .transfer('0xe66c5A3e044afa1F4b8CFa53160D1dD66ADE99f3', 0)
                .send({
                  from
                })
                .then((result) => {
                  console.log(result);
                })
      });
    },
    getBalanceOf() {
      this.myContract.methods.balanceOf(ownerAddress).call().then((result) => {
        console.log(result);
      })
    },
  },
  mounted() {
    const web3js = new Web3(window.web3.currentProvider);
    console.log(web3js);
    this.web3js = web3js;
    const myContract = new web3js.eth.Contract(girl, '0x0f906e9a2880a5e0d50770d967d3c3df078706b5');
    /*myContract.methods.cooAddress().call().then((result) => {
      console.log('cooaddress:', result);
    });*/
    this.myContract = myContract;
  }
}
</script>
<style>
  .web3 {
    background: #ccc;
  }
</style>

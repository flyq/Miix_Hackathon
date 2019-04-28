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
import girlFactory from '../util/girlFactory';
import girlOwnership from '../util/girlOwnership';
import girlAuction from '../util/girlAuction';
import Web3 from 'web3';
const ownerAddress = '0xe66c5A3e044afa1F4b8CFa53160D1dD66ADE99f3';
export default {
  name: 'web3',
  data() {
    return {
      name: 'zxplus',
      genes: 1,
      address: '0xe66c5A3e044afa1F4b8CFa53160D1dD66ADE99f3',
      girlID: 0,
      myContract: null,
      auctionContract: null,
      OwnershipContract: null,
      web3js: null
    }
  },
  methods: {
    createGirl() {
      this.web3js.eth.getCoinbase().then((from) => {
        this.auctionContract.methods.createGirl(this.name, this.genes).send({
          from
        }).then((result) => {
          console.log(result);
        });
      })
    },
    getGirlsByOwner() {
      this.auctionContract.methods.getGirlsByOwner(this.address).call().then((result) => {
        console.log(result);
      })
    },
    getGirlsByID() {
      this.auctionContract.methods.girls(this.girlID).call().then((result) => {
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
      this.auctionContract.events.NewGirl({}, (error, event) => { console.log(event); })
              .on('data', (event) => {
                console.log(event); // same results as the optional callback above
              })
              .on('changed', (event) => {
                // remove event from local database
              })
              .on('error', console.error);
    },
    getThisAddress() {
      this.auctionContract.methods.getThisAddress().call().then(result => {
        console.log('getThisAddress:', result);
      })
      this.auctionContract.methods.cooAddress().call().then(result => {
        console.log('getCooAddress:', result);
      })
      this.auctionContract.methods.getMsgSender().call().then(result => {
        console.log('getMsgSender:', result);
      })
    },
    transfer() {
      this.web3js.eth.getCoinbase().then((from) => {
        this.OwnershipContract.methods
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
      this.OwnershipContract.methods.balanceOf(ownerAddress).call().then((result) => {
        console.log(result);
      })
    },
  },
  mounted() {
    const web3js = new Web3(window.web3.currentProvider);
    this.web3js = web3js;
    const myContract = new web3js.eth.Contract(girlFactory, '0x2c8a717653ae6562f292e12bb1940828b3c152d9');
    const auctionContract = new web3js.eth.Contract(girlAuction, '0x70c883b368dfc676577def8feca25bf0684c5dae');
    const OwnershipContract = new web3js.eth.Contract(girlOwnership, '0x408698a47d77f94bd9ddd8646b0c3c41f254362b');
    /*myContract.methods.cooAddress().call().then((result) => {
      console.log('cooaddress:', result);
    });*/
    this.myContract = myContract;
    this.auctionContract = auctionContract;
    this.OwnershipContract = OwnershipContract;
    this.listenEvent();
  }
}
</script>
<style>
  .web3 {
    background: #ccc;
  }
</style>

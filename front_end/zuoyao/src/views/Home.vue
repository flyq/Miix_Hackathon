<template>
    <div class="home-page">
        <van-nav-bar title="🔥阿希捉妖🔥" @click-left="sidebarShow = true" @click-right="login" fixed :z-index="3">
            <van-icon name="wap-nav" slot="left" size="1.2rem"/>
            <span slot="right">
                <span v-if="!isLogin">AJ...2n</span>
                <van-icon v-else name="user-o" size="1.2rem"/>
            </span>
        </van-nav-bar>
        <div class="home-main">
            <div class="home-main-top">
                <div class="bg-inner">
                    <p>阿希捉妖是一款AI+GAN+区块链的项目</p>
                    <p>现已上线阿希测试网</p>
                    <router-link to="play" class="aTag">查看玩法 ></router-link>
                </div>
            </div>
            <template v-for="(item, i) in girls" >
                <van-row gutter="20" :key="i" v-if="i % 2 === 0" style="margin-bottom: 20px;">
                    <van-col span="12">
                        <GirlCard :girl="girls[i]"></GirlCard>
                    </van-col>
                    <van-col span="12" v-if="girls[i+1]">
                        <GirlCard :girl="girls[i+1]"></GirlCard>
                    </van-col>
                </van-row>
            </template>
            <div><van-button type="warning" plain size="large" @click="$router.push({path: '/girls'})">浏览更多</van-button></div>
        </div>
        <van-popup v-model="sidebarShow" position="left" class="sidebar">
            <div class="container">
                <van-cell title="👉首页" is-link to="/"/>
                <van-cell title="🔥发现" is-link to="girls"/>
                <van-cell title="📖玩法介绍" is-link to="play" />
                <van-cell title="😋关于" is-link to="about"/>
            </div>
        </van-popup>
        <van-dialog
                v-model="registerShow"
                title="第一次登录"
                @confirm="register">
            <van-field
                    v-model="nickname"
                    required
                    clearable
                    label="用户名"
                    placeholder="请输入用户名"/>
        </van-dialog>
    </div>
</template>

<script>
import GirlCard from '@/components/GirlCard'
import Web3 from 'web3';
import { Notify } from 'vant';
export default {
    name: "Home",
    components: {
        GirlCard
    },
    data() {
        return {
            sidebarShow: false,
            registerShow: false,
            nickname: '',
            girls: [{
                id: 1,
                imgUrl: '/1/009.jpg',
            },{
                id: 2,
                imgUrl: '/1/010.jpg',
            },{
                id: 3,
                imgUrl: '/1/011.jpg',
            },{
                id: 4,
                imgUrl: '/1/014.jpg',
            },],
            web3js: null,
            address: '',
            sign: '',
            isLogin: false
        }
    },
    methods: {
        login() {
            this.web3js.eth.getCoinbase().then((address) => {
                this.web3js.eth.personal.sign(this.web3js.utils.fromUtf8('zxplus'), address, (res, sign) => {
                    this.address = address;
                    this.sign = sign;
                    this.trueLogin(address, sign);
                })
            })
        },
        async trueLogin(address, sign) {
            this.axios.request({
                url: this.apis.login,
                method: 'post',
                data: {
                    address,
                    sign
                }
            }).then(res => {
                if (res.code === 2000003) {
                    this.registerShow = true;
                } else {
                    this.utils.setCookie('token', res.data.access_token);
                    this.isLogin = true;
                }
            })
        },
        async register() {
            this.axios.request({
                url: this.apis.register,
                method: 'post',
                data: {
                    address: this.address,
                    nickname: this.nickname,
                    sign: this.sign
                }
            }).then(res => {
                this.utils.setCookie('token', res.data.access_token);
                this.isLogin = true;
            })
        },
        getGirls() {
            this.axios.request({
                url: this.apis.girls,
                method: 'get',
                params: {
                    pageIndex: 1,
                    pageSize: 10
                }
            }).then(res => {
                this.girls = res.data.rows;
            })
        },
    },
    mounted() {
        const web3js = new Web3(window.web3.currentProvider);
        this.web3js = web3js;
        this.getGirls();
        if (this.utils.getCookie('token')) {
            this.isLogin = true;
        } else {
            this.isLogin = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .home-page {
        min-height: 100%;
        background-color: #f2f3f5;
    }
    .sidebar {
        height: 100%;
        width: 50%;
        .container {
            margin-top: 30px;
        }
    }
    .home-main {
        padding: 20px;
        padding-top: 46px;
        .home-main-top {
            color: #fff;
            padding: 20px;
            /*display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;*/
            margin-bottom: 20px;
            height: 200px;
            background: url("../assets/inner-kv.png") no-repeat;
            background-size: cover;
            .bg-inner {
                font-size: 18px;
                font-weight: bolder;
                color: #806986;
                width: 100%;
                p {
                    padding: 0;
                    margin: 0;
                }
            }
        }
    }
    .aTag {
        color: #1989fa;
        font-size: 14px;
    }
</style>

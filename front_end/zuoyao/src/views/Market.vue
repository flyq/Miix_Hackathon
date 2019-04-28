<template>
    <div class="home-page">
        <div class="fixed-top">
            <van-nav-bar title="🦄阿希捉妖🐦" left-text="返回" left-arrow @click-left="$router.push({path: '/'})">
                <van-icon name="search" slot="right" size="1.2rem"/>
            </van-nav-bar>
            <div class="header-filter">
                <div class="header-filter-item active">👣全部</div>
                <div class="header-filter-item">🐐待领养</div>
                <div class="header-filter-item">🐘最新</div>
                <div class="header-filter-item flex-center" @click="filterShow = true"><span>🌲筛选</span><van-icon name="filter-o" /></div>
            </div>
        </div>
        <div class="girls-main">
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
        </div>
        <van-popup v-model="filterShow" position="right" class="sidebar">
            <div class="container">
                <p>😂😂😂敬请期待😂😂😂</p>
            </div>
        </van-popup>
    </div>
</template>

<script>
import GirlCard from '@/components/GirlCard'
export default {
    name: "Home",
    components: {
        GirlCard
    },
    data() {
        return {
            filterShow: false,
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
            },{
                id: 5,
                imgUrl: '/1/009.jpg',
            },{
                id: 6,
                imgUrl: '/1/010.jpg',
            },{
                id: 7,
                imgUrl: '/1/011.jpg',
            },{
                id: 8,
                imgUrl: '/1/014.jpg',
            },],
        }
    },
    methods: {
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
        }

    },
    mounted() {
        this.getGirls();
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
        width: 60%;
        .container {
            margin-top: 50%;
            text-align: center;
        }
    }
    .girls-main {
        margin-top: 66px;
        padding: 20px
    }
    .fixed-top {
        top: 0;
        left: 0;
        width: 100%;
        position: fixed;
        z-index: 10;
        background-color: #fff;
    }
    .header-filter {
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 30px;
        box-sizing: border-box;
        .active {
            color: #f44!important;
        }
    }
    .header-filter-item {
        line-height: 1;
        font-size: 14px;
        color: #2a2825;
    }
    .flex-center {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
</style>

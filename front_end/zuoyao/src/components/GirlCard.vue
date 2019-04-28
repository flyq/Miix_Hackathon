<template>
    <div class="girl-card">
        <div class="card-body" @click="$router.push({path: '/detail/' + girl.id})">
            <div class="image-container">
                <img src="https://myblog-images1.oss-cn-beijing.aliyuncs.com/tronproducer/anonymous.png" alt="" class="ycy">
            </div>
            <div class="card-desc">
                <p>#{{girl.id}}</p>
                <p>{{girl.name || '暂无名字'}}</p>
                <!--<p class="like-btn">
                    <van-button type="default">
                        <div class="flex-center">
                            <van-icon name="like-o" />
                            <span style="margin-left: 4px">{{girl.likeCount}}</span>
                        </div>
                    </van-button>
                </p>-->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GirlCard",
    props: {
        girl: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
      return {

      }
    },
    methods: {
        likeGirl() {

        }
    }
}
</script>

<style lang="scss" scoped>
.girl-card {
    position: relative;
    font-size: 14px;
    color: #000;
    background-color: #fff;
    .image-container {
        height: 150px;
        //width: 150px;
        position: relative;
        overflow: hidden;
        .ycy {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: auto;
            z-index: 1;
            transition-duration: .3s;
            transition-property: all;
            transition-timing-function: ease-out;
            transform: translateZ(0);
        }
    }
    .card-desc {
        padding: 10px;
        p {
            margin: 5px 0;
        }
    }
    .card-body {
        cursor: pointer;
    }
    .girl-like {
        &:hover {
            background-color: #ccc;
        }
    }
}
.flex-center {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
</style>
<style lang="scss">
    .like-btn {
        .van-button--normal {
             padding: 0;
        }
        .van-button--default {
            border: none;
        }
        .van-button {
            height: inherit;
            line-height: 0;
        }
    }
</style>

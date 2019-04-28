<template>
    <div class="detail-page">
        <van-nav-bar title="阿希捉妖" left-text="返回" left-arrow fixed :z-index="3" @click-left="$router.push({path: '/'})"/>
        <div class="detail-container">
            <div style="display: flex;align-items: center;justify-content: center;flex-direction: column">
                <img :src="imgURL" alt="" class="ycy" @click="previewImg">
                <van-uploader :after-read="onRead" v-show="isMe">
                    <van-button type="default">上传图片</van-button>
                </van-uploader>
            </div>
            <div class="detail-info">
                <van-cell title="名称" :label="girl.name || '暂无名称'" size="large" />
                <van-cell title="序号" :label="'#' + girl.id" size="large" />
                <van-cell title="所有者" :label="girl.owner" size="large" />
                <van-cell title="简介" :label="girl.bio" size="large" />
            </div>
            <!--<div class="comment-container">
                <van-cell>
                    <template slot="title">
                        <span class="custom-text">评论(1212)</span>
                    </template>
                    <van-button slot="right-icon" plain hairline type="danger" size="small" @click="commentShow = true">查看全部</van-button>
                </van-cell>
                <div class="comments-wrap">
                    <CommentCard v-for="(item, i) in commentList" :key="i" :comment="item"></CommentCard>
                </div>
            </div>-->
        </div>
        <van-goods-action>
            <!--<van-goods-action-mini-btn
                    :info="girl.likeCount"
                    icon="like-o"
                    text="喜欢"
                    @click="likeGirl"
            />
            <van-goods-action-mini-btn
                    :info="commentCount"
                    icon="comment-o"
                    text="评论"
                    @click="editCommentShow = true"
            />
            <van-goods-action-mini-btn
                    icon="share"
                    text="分享"
            />-->
            <van-goods-action-big-btn
                    text="购买"
                    @click="buy"
            />
            <van-goods-action-big-btn
                    primary
                    text="卖出"
                    @click="sellModal = true"
            />
        </van-goods-action>
        <van-popup v-model="commentShow" position="bottom" class="sidebar">

            <van-nav-bar title="评论" @click-left="commentShow = false">
                <van-icon name="cross" slot="left" size="1.2rem"/>
            </van-nav-bar>
            <div class="comment-outer">
                <div class="comments-wrap">
                    <CommentCard v-for="(item, i) in commentList" :key="i" :comment="item"></CommentCard>
                </div>
            </div>
        </van-popup>
        <van-dialog
                v-model="editCommentShow"
                title="评论"
                showCancelButton
                @confirm="addComment">
            <van-field
                    v-model="comment"
                    clearable
                    type="textarea"
                    autosize
                    rows="2"
                    placeholder="请输入评论"/>
        </van-dialog>
        <van-dialog
                v-model="sellModal"
                title="卖出精灵"
                showCancelButton
                @confirm="sell">
            <van-field
                    v-model="sellPrice"
                    type="number"
                    clearable
                    autosize
                    placeholder="请输入卖出价格"/>
        </van-dialog>
    </div>
</template>

<script>
import { ImagePreview } from 'vant';
import CommentCard from '@/components/CommentCard'
import axios from 'axios';
export default {
    name: "Detail",
    components: {
        CommentCard
    },
    data() {
        return{
            commentShow: false,
            girlId: null,
            girl: {
                likeCount: 0,
                name: '妖灵蛋',
                id: 1,
                owner: 'AFN1dw63qaTUgXrgDaJz5Be6khu1f2PY2n',
                bio: '这是一个妖灵蛋，你可以买下它并通过上传三次元图片来孵化妖灵'
            },
            editCommentShow: false,
            comment: '',
            commentCount: 0,
            commentList: [],
            avatarID: '',
            sellPrice: '',
            sellModal: false,
            aschWeb: null,
            isMe: false
        }
    },
    computed: {
        imgURL() {
            if (this.avatarID === '') {
                return 'https://myblog-images1.oss-cn-beijing.aliyuncs.com/tronproducer/anonymous.png'
            }
            return this.utils.getImgURL(this.avatarID)
        }
    },
    methods: {
        buy() {
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
                    this.isMe = true
                    this.girl.owner = 'AJ4691pRy9Hdoy8f4MTXoVdvwPPRRhYu2n'
                    this.$notify('购买成功');
                    console.log('result:' + JSON.stringify(res))
                })
                .catch(err => {
                    console.error(err)
                })
        },
        sell() {
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
                    this.$notify('卖出成功，等待链上数据确认');
                    console.log('result:' + JSON.stringify(res))
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getImgURL(v) {
            this.utils.getImgURL(v);
        },
        onRead(params) {
            console.log(params);
            let reader = new FileReader();
            reader.readAsDataURL(params.file);
            reader.onload = (e) => {
                let formData = new FormData();
                formData.append('id', this.utils.uniqueid());
                formData.append('do_waifu2x', false);
                formData.append('image', e.target.result);
                const loading = this.$toast.loading({
                    mask: true,
                    message: '妖精生成中',
                    duration: 0
                });
                axios.request({
                    method: 'post',
                    url: this.apis.UPLOAD_URL,
                    data: formData
                }).then((res) => {
                    this.avatarID = res.data.id_str;
                    setTimeout(() => {
                        loading.clear();
                    }, 1000);
                })
            }
        },
        previewImg() {
            ImagePreview([
                this.imgURL
            ]);
        },
        getGirl(id) {
            this.axios.request({
                url: this.apis.girls + '/' + this.girlId,
                method: 'get'
            }).then(res => {
                this.girl = res.data;
            })
        },
        async getComment() {
            this.axios.request({
                url: `${this.apis.comment}/${this.girlId}`,
                method: 'get',
                params: {
                    pageSize: 4,
                    pageIndex: 1,
                }
            }).then(res => {
                this.commentList = res.data.rows;
                this.commentCount = res.data.count;
            })
        },
        async addComment() {
            this.axios.request({
                url: `${this.apis.comment}/${this.girlId}`,
                method: 'post',
                data: {
                    content: this.comment
                }
            }).then(res => {
                this.getComment();
            })
        },
        async likeGirl() {
            this.axios.request({
                url: `${this.apis.like}/${this.girlId}`,
                method: 'post'
            }).then(res => {
                this.getGirl()
            })
        },
        async account() {
        }
    },
    mounted() {
        /*this.girlId = this.$route.params.id;
        this.getGirl();
        this.getComment();*/
        this.aschWeb = window.aschPay;
    }
}
</script>

<style lang="scss" scoped>
    .detail-page {
        color: #2a2825;
        .photo-icon {
            position: absolute;
            margin: auto;
            top:50%;
            left:50%;
            color: #fff;
            transform:translate(-50%,-50%);
        }
        .detail-container {
            background-color: #f2f3f5;
            margin-top: 46px;
            margin-bottom: 80px;
        }
        .image-container {
            height: 300px;
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
        .detail-info {
            background-color: #fff;
            .KittyHeader-name-text {
                width: 100%;
                font-size: 1.8rem;
                line-height: 1.2;
            }
            .KittyHeader-details-item {
                font-weight: 500;
                color: #9c9c9b;
            }
        }
        .comment-container {
            background-color: #fff;
            margin-top: 10px;
        }
        .comment-outer {
            overflow-y: auto;
            height: 100%;
            margin-bottom: 100px;
        }
        .comments-wrap {
            padding-left: 18px;
            padding-right: 18px;
            margin-bottom: 50px;
        }
        .sidebar {
            height: 80%;
            width: 100%;
            overflow: hidden;
        }
        .comment-header {
            padding: 10px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ccc;
            position: absolute;
            width: 100%;
        }
    }
</style>

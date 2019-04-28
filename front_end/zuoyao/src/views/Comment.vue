<template>
  <div class="about">
    <p>comment</p>
    <van-field label="ID" v-model="id" type="number" placeholder="请输入id" />
    <van-button type="default" @click="getComment(id)">获取全部评论</van-button>
    <van-cell-group>
      <van-field label="评论" v-model="comment" placeholder="请输入评论" />
    </van-cell-group>
    <van-button type="default" @click="addComment(id)">添加评论</van-button>
    <van-row>
      <van-button type="default" @click="likeGirl(id)">点赞</van-button>
    </van-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        comment: '',
        id: 1
      }
    },
    methods: {
      async likeGirl(id) {
        this.axios.request({
          url: `${this.apis.like}/${id}`,
          method: 'post'
        }).then(res => {
          console.log(res);
        })
      },
      async getComment(id) {
        this.axios.request({
          url: `${this.apis.comment}/${id}`,
          method: 'get',
          params: {
            pageSize: 10,
            pageIndex: 1,
          }
        }).then(res => {
          console.log(res);
        })
      },
      async addComment(id) {
        this.axios.request({
          url: `${this.apis.comment}/${id}`,
          method: 'post',
          data: {
            content: this.comment
          }
        }).then(res => {
          console.log(res);
        })
      },
    }
  }
</script>

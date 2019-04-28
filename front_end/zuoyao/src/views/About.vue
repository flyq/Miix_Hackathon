<template>
  <div class="about">
    <van-field label="name" v-model="name" placeholder="请输入name" />
    <van-field label="bio" v-model="bio" placeholder="请输入bio" />
    <van-field label="link" v-model="imageLink" placeholder="请输入imageLink" />
    <van-row>
      <van-button type="default" @click="createGirl">创建girl</van-button>
    </van-row>

    <van-row>
      <van-button type="default" @click="hairColorShow=true">头发颜色</van-button>
      <van-button type="default" @click="hairStyleShow=true">发型</van-button>
      <van-button type="default" @click="eyeColorShow=true">眼睛颜色</van-button>
      <van-button type="default" @click="mouthShow=true">嘴巴</van-button>
      <van-button type="default" @click="expressionShow=true">情绪</van-button>
    </van-row>
    <van-row>
      <span>头发颜色: {{attribute.hairColor}}</span>
      <span>发型: {{attribute.hairStyle}}</span>
      <span>眼睛颜色: {{attribute.eyeColor}}</span>
      <span>嘴巴: {{attribute.mouth}}</span>
      <span>情绪: {{attribute.expression}}</span>
    </van-row>
    <van-popup v-model="hairColorShow" position="bottom">
      <van-picker show-toolbar :columns="attributesOptions.hairColor" @cancel="hairColorShow=false" @confirm="popConfirm($event, 'hairColor')" />
    </van-popup>
    <van-popup v-model="hairStyleShow" position="bottom">
      <van-picker show-toolbar :columns="attributesOptions.hairStyle" @cancel="hairStyleShow=false" @confirm="popConfirm($event, 'hairStyle')" />
    </van-popup>
    <van-popup v-model="eyeColorShow" position="bottom">
      <van-picker show-toolbar :columns="attributesOptions.eyeColor" @cancel="eyeColorShow=false" @confirm="popConfirm($event, 'eyeColor')" />
    </van-popup>
    <van-popup v-model="mouthShow" position="bottom">
      <van-picker show-toolbar :columns="attributesOptions.mouth" @cancel="mouthShow=false" @confirm="popConfirm($event, 'mouth')" />
    </van-popup>
    <van-popup v-model="expressionShow" position="bottom">
      <van-picker show-toolbar :columns="attributesOptions.expression" @cancel="expressionShow=false" @confirm="popConfirm($event, 'expression')" />
    </van-popup>
    <van-row>
      <van-button type="default" @click="updateAttr(10)">修改属性</van-button>
    </van-row>
    <van-row>
      <van-button type="default" @click="getGirls">获取girl</van-button>
    </van-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        hairColorShow: false,
        hairStyleShow: false,
        eyeColorShow: false,
        mouthShow: false,
        expressionShow: false,
        attributesOptions: {
          // 金色 棕色 黑色 蓝色 粉色 紫色 绿色 红色 银色 白色 橙色 水色 灰色
          hairColor: [ 'blonde', 'brown', 'black', 'blue', 'pink', 'purple', 'green', 'red', 'silver', 'white', 'orange', 'aqua', 'grey'],
          // 长 短 双马尾 卷 马尾
          hairStyle: ['long', 'short', 'twintails', 'drill', 'ponytail'],
          // 蓝色 红色 棕色 绿色 紫色 黄色 粉色 水色 黑色 橙色
          eyeColor: ['blue', 'red', 'brown', 'green', 'purple','yellow', 'pink', 'aqua', 'black', 'orange'],
          // 嘟嘴 张嘴
          mouth: ['pout', 'open'],
          // 开心 伤心 平静
          expression: ['happy', 'sad', 'calm']
        },
        attribute: {
          hairColor: '',
          hairStyle: '',
          eyeColor: '',
          mouth: '',
          expression: ''
        },
        name: '',
        bio: '',
        imageLink: '',
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
          console.log(res);
        })
      },
      updateAttr(id) {
        this.axios.request({
          url: `${this.apis.attr}/${id}`,
          method: 'put',
          data: this.attribute
        }).then(res => {
          console.log(res);
        })
      },
      createGirl() {
        this.axios.request({
          url: this.apis.girls,
          method: 'post',
          data: {
            name: this.name,
            bio: this.bio,
            imageLink: this.imageLink
          }
        }).then(res => {
          console.log(res);
        })
      },
      popConfirm(value, type) {
        this.attribute[type] = value;
        this[type + 'Show'] = false;
      },
    }
  }
</script>

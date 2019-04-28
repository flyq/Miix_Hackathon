<template>
    <div>
        <van-nav-bar title="玩法介绍" left-text="返回" left-arrow fixed :z-index="3" @click-left="$router.push({path: '/'})"/>
        <div class="main">
            <p>步骤一：安装AschPay</p>
            <p>步骤二：申请一个Asch测试网账号</p>
            <p>步骤三：解锁AschPay</p>
            <p>步骤四：购买一个初始妖精</p>
            <p>步骤四：上传图片生成通过GAN生成妖精</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "HowPlay"
}
</script>

<style lang="scss" scoped>
.main {
    margin-top: 46px;
    text-align: left;
    padding: 20px;
    color: #111;
}
</style>

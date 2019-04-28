<template>
  <div class="hello">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  async mounted() {
  },
  methods: {
    async sign() {
      const address = this.tronWeb.defaultAddress.base58;
      const result = await this.tronWeb.trx.sign(this.tronWeb.toHex(address));
      return result
    }
  }
}
</script>

<style scoped>
</style>

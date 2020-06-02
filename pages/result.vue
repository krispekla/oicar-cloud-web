<template>
  <div>
    te323st
    {{ result }}
  </div>
</template>

<script>
export default {
  name: 'CalculatorResult',
  // data() {
  //   return {
  //     result: null
  //   }
  // },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    result: Object
  },
  created() {
    this.result = this.$route.params.result
    // eslint-disable-next-line no-console
    console.log(this.$route)
  }
}
</script>

<style></style>

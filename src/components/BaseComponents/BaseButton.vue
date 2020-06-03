<template>
  <button
    @click="onClick"
    :disabled="disabled"
    :type="type"
    :class="['btn w-100 ', cssCompute, customCss]"
    :style="{ width: width + 'px', height }"
  >
    <slot></slot>
    <i v-if="icon" :class="['btn-icon-placement', icon]"></i>
    {{ value }}
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    value: [String, Number],
    width: String,
    height: Number,
    customCss: String,
    icon: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cssCompute() {
      return this.customCss ? `${this.customCss}` : 'btn-primary'
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>

<style>
.btn-icon-placement {
  position: absolute;
  top: 18px;
  left: 25px;
  width: 25px;
  height: 25px;
}
</style>

<template>
  <validation-provider :name="name" :rules="calculateValidations" v-slot="{ errors }" slim>
    <div class="form-group base-input">
      <div v-if="errors[0]" class="base-input-error col-12 text-1  text-danger mb-2" for="input">{{
        errors[0]
      }}</div>
      <label v-if="label" class="mr-5 align-self-end text-1" :style="customStyle" for="input">{{
        label ? label : null
      }}</label>
      <input
        :class="[
          'form-control text-2-rubik text-primary',
          customCss,
          errors[0] ? 'error-border' : '',
        ]"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        @input="onInput"
        :ref="name"
        v-bind="$props"
        :disabled="disabled"
        :readonly="readonly"
        :max-length="maxLength"
        :max="max"
      />
    </div>
  </validation-provider>
</template>

<script>
import { componentValidationMixin } from '@/utils/helper'

export default {
  name: 'BaseInput',
  mixins: [componentValidationMixin],
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: String,
    name: String,
    value: [String, Number],
    disabled: Boolean,
    readonly: Boolean,
    maxLength: [Number, String],
    max: [Number, String],
    width: Number,
    height: Number,
    customStyle: String,
    customCss: String,
    required: Boolean,
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>

<style>
.base-input input {
  position: relative;
  max-width: 316px;
  height: 41px;
  border-radius: 5px;
  border: 1px solid #f3f3f3;
  background: rgba(224, 231, 255, 0.3);
}
.base-input input:hover,
.base-input input:focus {
  background: rgba(225, 232, 255, 0.233) !important;
  border: 1px solid #dadadafa;
}

.base-input input[readonly] {
  background: rgba(203, 215, 255, 0.233) !important;
}

.base-input-error {
  text-align: end;
}

.error-border {
  border: 1px solid #d63649 !important;
}
</style>

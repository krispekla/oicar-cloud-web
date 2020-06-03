<template>
  <div class="form-group base-radio">
    <div class="custom-control">
      <input
        :name="name"
        type="radio"
        :class="['custom-control-input']"
        :checked="shouldBeChecked"
        :value="value"
        :id="belongsTo"
        :disabled="disabled"
        @change="onChange"
      />
      <label class="custom-control-label text-secondary" :for="belongsTo">{{ label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseRadio',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    value: {
      type: [String, Number],
    },
    modelValue: {
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
    belongsTo: {
      type: String,
      required: true,
    },
    disabled: Boolean,
    name: String,
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue == this.value
    },
  },
  methods: {
    onChange() {
      this.$emit('change', this.value)
    },
  },
}
</script>

<style>
.base-radio .custom-control-label {
  cursor: pointer;
  padding-top: 1px;
}

.base-radio .custom-control input {
  width: 20px !important;
  height: 20px !important;
  cursor: pointer;
}
.base-radio .custom-control-label::before {
  background: #fff;
  border-radius: 50% !important;
}

.base-radio .custom-control-label::after {
  cursor: pointer;
  border-radius: 50% !important;
  border: none !important;
}

.base-radio .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #fff;
  width: 20px;
  height: 20px;
  border: 1px solid #8798ad !important;
  background-color: #ffffff;
}

.base-radio .custom-control-input:checked ~ .custom-control-label::after {
  background-image: none;
}

.base-radio .custom-control [type='radio']:checked + label:after {
  width: 6px !important;
  height: 6px !important;
  background: #1e1e1e;
  position: absolute;
  top: 11px;
  left: -17px;
  border-radius: 50%;
  border: none;
}
</style>

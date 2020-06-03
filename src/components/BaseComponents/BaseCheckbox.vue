<template>
  <div class="form-group">
    <div class="checkbox-base">
      <input
        ref="input"
        type="checkbox"
        :name="name"
        :checked="shouldBeChecked"
        :value="value"
        :id="belongsTo"
        :disabled="disabled"
        :readonly="readonly"
        @change="onChange"
      />
      <label class="text-2 text-secondary" :for="belongsTo" v-if="label">
        {{ label }}
        <slot class="d-inline-block text-nowrap"></slot>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    name: String,
    value: [Number, String, Object],
    modelValue: {
      default: false,
    },
    label: {
      type: [String, Boolean],
      default: false,
    },
    belongsTo: {
      type: String,
      required: true,
    },
    trueValue: {
      type: [Boolean, Object],
      default: true,
    },
    falseValue: {
      type: [Boolean, Object],
      default: false,
    },
    disabled: Boolean,
    readonly: Boolean,
  },
  methods: {
    onChange(event) {
      const isChecked = event.target.checked

      if (this.modelValue instanceof Array) {
        const newValue = [...this.modelValue]

        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }

        this.$emit('change', newValue, { value: this.value, isChecked })
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    },
  },
  computed: {
    shouldBeChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }

      return this.modelValue === this.trueValue
    },
    input() {
      return this.$refs.input
    },
  },
}
</script>

<style>
.checkbox-base {
  padding-left: 20px;
}
.checkbox-base label {
  display: inline-block;
  position: relative;
  padding-left: 5px;
  cursor: pointer;
}
.checkbox-base label::before {
  content: '';
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 0;
  margin-left: -20px;
  border: 1px solid #8798ad;
  border-radius: 3px;
  background-color: #fff;
  -webkit-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
  -o-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
  transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
}
.checkbox-base label::after {
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 0;
  top: 0px;
  margin-left: -20px;
  padding-left: 3px;
  padding-top: 1px;
  font-size: 11px;
}
.checkbox-base input[type='checkbox'] {
  opacity: 0;
}

.checkbox-base input[type='checkbox']:checked + label::after {
  font-family: 'FontAwesome';
  font-size: 16px;
  width: 20px;
  height: 12px;
  color: #1e1e1e;
  content: '✔';
}
.checkbox-base input[type='checkbox']:disabled + label {
  opacity: 0.65;
}
.checkbox-base input[type='checkbox']:disabled + label::before {
  background-color: #eeeeee;
  cursor: not-allowed;
}
</style>

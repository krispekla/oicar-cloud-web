<template>
  <div :class="['form-group base-select', selectSize, customCss]">
    <label v-if="label" :class="['text-uppercase', computedLabel]" for="input">
      {{ label ? label : null }}
    </label>
    <multiselect
      v-model="value"
      selectLabel
      deselectLabel
      deselectGroupLabel
      selectGroupLabel
      showPointer
      :placeholder="placeholder"
      :options="options"
      :searchable="searchable"
      :openDirection="openDirection"
      :disabled="disabled"
      :selectedLabel="selectedLabel"
      :label="selectLabel"
      :track-by="trackBy"
      @input="onInput"
      @select="onSelect"
      @open="onOpen"
      @close="onClose"
    >
      <i class="fas fa-chevron-down select-caret-custom" slot="caret"></i>
    </multiselect>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'BaseSelect',
  data() {
    return {
      selectedValue: '',
    }
  },
  model: {
    prop: 'value',
  },
  components: {
    Multiselect,
  },
  props: {
    id: [Number, String],
    name: String,
    placeholder: String,
    searchable: {
      type: Boolean,
      default: false,
    },
    taggable: Boolean,
    disabled: Boolean,
    multiple: Boolean,
    value: [Object, Array, String, Number],
    closeOnSelect: Boolean,
    loading: Boolean,
    label: String,
    selectLabel: String,
    selectedLabel: {
      type: String,
      default: '',
    },
    size: String,
    openDirection: {
      type: String,
      default: 'bottom',
    },
    options: { type: [Object, Array, String, Number], default: () => [] },
    trackBy: String,
    labelCustomCss: String,
    customCss: String,
  },
  computed: {
    selectSize() {
      return `base-select-size-${this.size}`
    },
    computedLabel() {
      return this.labelCustomCss ? this.labelCustomCss : 'font-semi text-primary'
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e)
    },
    onOpen(e) {
      this.$emit('open', e)
    },
    onClose(e) {
      this.$emit('close', e)
    },
    onSelect(e) {
      this.$emit('select', e)
    },
  },
  beforeMount() {
    this.selectedValue = this.value
  },
}
</script>

<style>
.base-select {
  height: 40px !important;
}

.base-select .multiselect {
  min-width: 81px !important;
  height: 40px !important;
  border-radius: 5px;
  border: solid 1px #f3f3f3;
  background-color: #f4f6fc;
  cursor: pointer;
}
.base-select .multiselect__tags,
.base-select .multiselect__single,
.base-select .multiselect input {
  background: #f4f6fc;
  border: none;
  padding-top: 6px;
}

.base-select .select-caret-custom {
  position: absolute;
  right: 28px;
  top: 14px;
  width: 10px !important;
  color: #8798ad !important;
}
.base-select .multiselect__single {
  font-family: 'Sans';
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  padding-left: 12px;
}

.base-select .multiselect__placeholder {
  padding-left: 12px;
}

.base-select .multiselect__option--selected span::after {
  display: none;
}
.base-select .multiselect__content {
  z-index: 10500 !important;
}

.base-select .multiselect__option--highlight {
  background: #85beff !important;
}
.base-select .multiselect__input {
  font-family: 'Rubik';
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #8798ad;
}

.base-select span .multiselect__option {
  display: none;
}

.base-select .base-select-size-s {
  width: 81px;
}

.base-select .base-select-size-m {
  width: 187px;
}
</style>

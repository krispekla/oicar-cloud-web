<template>
  <validation-provider :name="name" :rules="calculateValidations" v-slot="{ errors }" slim>
    <div class="base-date">
      <div v-if="errors[0]" class="base-input-error col-12 text-1  text-danger mb-2" for="input">{{
        errors[0]
      }}</div>
      <flat-pickr v-model="selectedValue" :config="config" @on-close="onClose" />
      <i v-if="hasIcon" :class="['base-date-icon', computeDateIcon, computeCarret]"></i>
    </div>
  </validation-provider>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { componentValidationMixin } from '@/utils/helper'

export default {
  name: 'BaseDate',
  mixins: [componentValidationMixin],
  components: {
    flatPickr,
  },
  model: {
    event: 'change',
  },
  data() {
    return {
      selectedValue: '',
      dateConfig: {
        altFormat: 'F j, Y',
        altInputClass: 'base-date',
        dateFormat: 'd.m.Y.',
      },
      timeConfig: {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        // eslint-disable-next-line camelcase
        time_24hr: true,
        maxDate: this.maxDate,
        minDate: this.minDate,
        mode: {
          type: [String, Number],
          default: 'single',
        },
      },
    }
  },
  watch: {
    selectedValue: function() {
      this.$emit('change', this.selectedValue)
    },
  },
  props: {
    name: String,
    value: String,
    maxDate: [String, Date],
    minDate: [String, Date],
    dateIcon: {
      type: Boolean,
      default: false,
    },
    carret: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'date',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClose(e) {
      this.$emit('close', e)
    },
  },
  computed: {
    config() {
      return this[`${this.type}Config`]
    },
    computeDateIcon() {
      return this.dateIcon ? 'fas fa-calendar-alt text-warning' : ''
    },
    computeCarret() {
      return this.carret ? 'fas fa-chevron-down base-date-caret' : ''
    },
    hasIcon() {
      return this.carret || this.dateIcon ? true : false
    },
  },
  beforeMount() {
    this.selectedValue = this.value
  },
}
</script>

<style>
.base-date {
  position: absolute;
}

.base-date .flatpickr-input {
  height: 40px;
  border-radius: 5px;
  border: 1px solid #f3f3f3;
  background: #f4f6fc;
  text-align: center;
}

.base-date-icon {
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 20px;
}

.base-date-caret {
  position: absolute;
  right: 24px;
  top: 12px;
  width: 7px !important;
  color: #8798ad !important;
}
</style>

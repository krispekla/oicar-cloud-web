<template>
  <b-modal
    ref="modal"
    v-bind="$props"
    :no-close-on-esc="noCloseOnEsc"
    :no-stacking="noStacking"
    :no-close-on-backdrop="noCloseOnBackdrop"
    @ok="$emit('ok', $event)"
    @cancel="$emit('cancel', $event)"
    @shown="$emit('shown', $event)"
    @show="$emit('show', $event)"
    @hide="$emit('hide', $event)"
    @hidden="$emit('hidden', $event)"
  >
    <template v-slot:modal-title>
      <h4 :class="['ml-3', withoutModalHeader]">{{ title }}</h4>
    </template>
    <slot></slot>
    <span slot="modal-ok" v-html="okTitleHtml"></span>
    <span slot="modal-cancel" v-html="cancelTitleHtml"></span>
  </b-modal>
</template>

<script>
import { BModal } from 'bootstrap-vue'

export default {
  components: { 'b-modal': BModal },
  props: {
    id: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
      default: undefined,
    },
    lazy: {
      type: Boolean,
      default: true,
    },
    okTitle: {
      type: String,
      required: false,
      default: 'Spremi',
    },
    okIcon: {
      type: String,
      required: false,
      default: 'floppy-disk',
    },
    okOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    okVariant: {
      type: String,
      required: false,
      default: 'primary',
    },
    cancelTitle: {
      type: String,
      required: false,
      default: 'Odustani',
    },
    cancelIcon: {
      type: String,
      required: false,
      default: 'cross2',
    },
    cancelVariant: {
      type: String,
      required: false,
      default: 'secondary',
    },
    okDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    cancelDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    hideFooter: {
      type: Boolean,
      required: false,
      default: false,
    },
    centered: {
      type: Boolean,
      required: false,
    },
    scrollable: {
      type: Boolean,
      required: false,
    },
    noCloseOnEsc: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      noStacking: false,
      noCloseOnBackdrop: true,
    }
  },
  computed: {
    okTitleHtml() {
      return `<span class="icon icon-${this.okIcon}"></span>${this.okTitle}`
    },
    cancelTitleHtml() {
      return `<span class="icon icon-${this.cancelIcon}"></span>${this.cancelTitle}`
    },
    modal() {
      return this.$refs.modal
    },
    withoutModalHeader() {
      return this.title ? 'modal-header-custom' : 'bg-white'
    },
  },
  methods: {
    show() {
      this.modal.show()
    },
    hide() {
      this.modal.hide()
    },
  },
  beforeUpdate() {
    this.$store.dispatch('validation/clear')
  },
}
</script>

<style>
.fixed-height-and-scrollable {
  height: calc(100% - 200px);
  overflow-y: scroll;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.modal-content {
  padding: 0 !important;
}
.modal-header {
  /* background: #eff1f5; */
  border: none;
  max-height: 60px;
}

.modal-footer {
  border: none;
  /* background: #eff1f5; */
  padding: 15px 20px !important;
}

.modal-body {
  padding: 30px !important;
}

.close {
  position: absolute;
  top: 15px;
  right: 20px;
}

@media (min-width: 1200px) {
  .modal-xl {
    max-width: 1140px;
  }
}
</style>

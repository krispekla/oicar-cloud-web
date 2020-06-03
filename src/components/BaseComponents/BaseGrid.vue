<template>
  <b-table
    show-empty
    small
    stacked="md"
    :empty-text="$t('message.no_data')"
    v-bind="$props"
    @filtered="onFiltered"
    @row-clicked="onRowClick"
  >
    <template v-slot:cell(name)="row"> {{ row.value.first }} {{ row.value.last }} </template>
    <slot></slot>
    <template v-slot:row-details="row">
      <b-card>
        <ul>
          <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
        </ul>
      </b-card>
    </template>
  </b-table>
</template>

<script>
import { BTable } from 'bootstrap-vue'

export default {
  name: 'BaseGrid',
  components: {
    'b-table': BTable,
  },
  props: {
    id: String,
    showEmpty: Boolean,
    items: Array,
    fields: Array,
    value: Array,
    responsive: [Boolean, String],
    stickyHeader: [Boolean, String],
    tableVariant: String,
    headVariant: String,
    footVariant: String,
    tableClass: [String, Array, Object],
    theadClass: {
      type: [String, Array, Object],
      default: 'base-table-head-standard',
    },
    tbodyClass: {
      type: [String, Array, Object],
      default: 'base-table-body-standard cursor',
    },
    theadTrClass: [String, Array, Object],
    tbodyTrClass: [String, Array, Object],
    tfootClass: [String, Array, Object],
    fixed: Boolean,
    bordered: Boolean,
    borderless: {
      type: Boolean,
      default: true,
    },
    small: Boolean,
    primaryKey: String,
    stacked: [Boolean, String],
    filter: [String, Object, Array],
    filterOn: Array,
    sortBy: String,
    sortCompare: Function,
    sortCompareOptions: Object,
    perPage: [Number, String],
    currentPage: [Number, String],
    apiUrl: String,
    sortDesc: Boolean,
    sortDirection: String,
    busy: Boolean,
    hover: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    onRowClick(item) {
      this.$emit('rowClick', item)
    },
  },
}
</script>

<style>
.base-table-head-standard th {
  font-family: 'WorkSans', sans-serif !important;
  color: #8798ad !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  text-transform: uppercase;
}

.base-table-body-standard td {
  border-bottom: 1px solid #bfc5d2 !important;
  padding: 20px 10px !important;
  font-family: 'WorkSans', sans-serif !important;
  font-size: 14px;
  color: #8798ad;
}

.base-table-body-standard tr:hover {
  background: none !important;
}
.base-table-body-standard tr:hover > td {
  color: #2e384d !important;
}
</style>

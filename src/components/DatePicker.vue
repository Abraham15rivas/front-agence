<template>
  <v-container class="my-4">
    <v-row justify="space-between">
      <div  div class="text-overline mb-1">
        Periodo
      </div>
      <div>
        <span class="pe-5">
          <input
            id="date-from"
            v-model="filterDatePicker.dateFrom"
            type="date"
          >
        </span>
        <span>
          <input
            id="date-to"
            v-model="filterDatePicker.dateTo"
            type="date"
          >
        </span>
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'

export default defineComponent({
  name: 'DatePicker',
  watch: {
    'filterDatePicker.dateFrom': function () {
      this.$emit('filterDatePicker', this.filterDatePicker)
    },
    'filterDatePicker.dateTo': function () {
      this.$emit('filterDatePicker', this.filterDatePicker)
    }
  },
  data () {
    return {
      filterDatePicker: {
        dateFrom: moment().startOf('month').format('YYYY-MM-DD'),
        dateTo: moment().endOf('month').format('YYYY-MM-DD')
      }
    }
  }
})
</script>
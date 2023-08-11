<template>
  <div>
    <div class="text-start my-5">
      <v-chip
        elevation="5"
        variant="outlined"
      >
        {{ fullname }}
      </v-chip>
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Período
          </th>
          <th class="text-left">
            Receita Líquida
          </th>
            <th class="text-left">
            Custo Fixo
          </th>
          <th class="text-left">
            Comissão
          </th>
          <th class="text-left">
            Lucro
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in datareport"
          :key="index"
        >
          <td>{{ setFormatDate(String(item.date)) }}</td>
          <td>{{ currencyFormatter({ currency: 'BRL', value: item.net_income }) }}</td>
          <td>{{ currencyFormatter({ currency: 'BRL', value: item.salary }) }}</td>
          <td>{{ currencyFormatter({ currency: 'BRL', value: item.commission }) }}</td>
          <td
            :class="`${ Math.sign(item.profit) === -1 ? 'text-red' : ''}`"
          >
            {{ currencyFormatter({ currency: 'BRL', value: item.profit }) }}
          </td>
        </tr>
        <tr class="bg-gray">
          <td><b>Saldo</b></td>
          <td><b>{{ currencyFormatter({ currency: 'BRL', value: totals.net_income }) }}</b></td>
          <td><b>{{ currencyFormatter({ currency: 'BRL', value: totals.salary }) }}</b></td>
          <td><b>{{ currencyFormatter({ currency: 'BRL', value: totals.commission }) }}</b></td>
          <td
            :class="`${ Math.sign(totals.profit) === -1 ? 'text-red' : 'text-success'}`"
          >
            <b>{{ currencyFormatter({ currency: 'BRL', value: totals.profit }) }}</b>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

// Function for currency formatter
import currencyFormatter from '../currencyFormatter'

export default defineComponent({
  name: 'TableReport',
  props: {
    datareport: {
      type: Object
    },
    fullname: {
      type: String
    }
  },
  watch: {
    datareport () {
      this.calculateTotals()
    }
  },
  data () {
    return {
      totals: {
        net_income: 0,
        salary: 0,
        commission: 0,
        profit: 0
      }
    }
  },
  mounted () {
    this.calculateTotals()
  },
  methods: {
    calculateTotals () {
      let dataReportRaw = JSON.parse(JSON.stringify(this.datareport))

      // Totals
      this.totals.net_income  = dataReportRaw.map(item => item.net_income).reduce((prev, curr) => prev + curr, 0)
      this.totals.salary      = dataReportRaw.map(item => item.salary).reduce((prev, curr) => prev + curr, 0)
      this.totals.commission  = dataReportRaw.map(item => item.commission).reduce((prev, curr) => prev + curr, 0)
      this.totals.profit      = dataReportRaw.map(item => item.profit).reduce((prev, curr) => prev + curr, 0)
    },
    currencyFormatter ({ currency, value}) {
      return currencyFormatter({ currency, value})
    },
    setFormatDate (date) {
      let year = date.substring(0,4)
      let month = date.substring(4,6)
      return `${year}-${month}`
    }
  }
})
</script>

<style scoped>
.bg-gray {
  background-color: #6200EE;
  color: white;
}
</style>
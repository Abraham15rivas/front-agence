<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DataSerie from '../interfaces/DataSerie'
import { Chart } from 'highcharts-vue'

// Function for currency formatter
import currencyFormatter from '../currencyFormatter'

export default defineComponent({
  name: 'CommercialView',
  props: {
    dataPie: {
      type: Object
    }
  },
  components: {
    highcharts: Chart
  },
  data() {
    return {
      dataSeries: [] as DataSerie[],
      subtitle: ''
    }
  },
  watch: {
    dataPie () {
      this.organizeDataSerie()
    }
  },
  mounted () {
    this.organizeDataSerie()
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: 'pie'
        },
        title: {
          text: `Participacao na Receita líquida`
        },
        subtitle: {
          text: `Total de Receita líquida: ${this.subtitle}`
        },
        series: [{
          name: 'Receita líquida R$',
          data: this.dataSeries
        }]
      }
    }
  },
  methods: {
    getPercentage (quantity: number, total: number) {
      let percentage = (quantity * 100) / total
      return percentage ? percentage.toFixed(2) : 0
    },
    organizeDataSerie () {
      let dataPieRaw = JSON.parse(JSON.stringify(this.dataPie))

      if (!dataPieRaw) {
        return false
      }

      const dataPie   = dataPieRaw.list

      const totalInt  = dataPieRaw.total
      const total     = currencyFormatter({ currency: 'BRL', value: totalInt })

      this.subtitle = total

      for (let i: any = 0; i < dataPie.length; i++) {
        let data = dataPie[i]

        let percentage = this.getPercentage(Number(data.net_income), Number(totalInt))

        let dataSerie = {
          name: `${data.fullname}: ${percentage}%`,
          y: data.net_income,
          sliced: (i === 0),
          selected: (i === 0)
        }
        this.dataSeries.push(dataSerie)
      }
    }
  }
})
</script>
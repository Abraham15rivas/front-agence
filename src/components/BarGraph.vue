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
    dataBar: {
      type: Object
    }
  },
  components: {
    highcharts: Chart
  },
  data() {
    return {
      dataSeries: [
        1,2,3
      ],
      subtitle: '',
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    }
  },
  watch: {
    dataBar () {
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
          renderTo: 'container',
          type: 'column'
        },
        title: {
          text: `Performance Comercial`
        },
        subtitle: {
          text: `Total de Receita líquida: ${this.subtitle}`
        },
        xAxis: {
          categories: this.months,
          crosshair: true,
          accessibility: {
            description: 'Countries'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Cantidad'
          }
        },
        tooltip: {
          valueSuffix: '.'
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: this.dataSeries
      }
    }
  },
  methods: {
    getPercentage (quantity: number, total: number) {
      let percentage = (quantity * 100) / total
      return percentage ? percentage.toFixed(2) : 0
    },
    getMonth (date: any) {
      let month = date.substring(4,6)
      return month
    },
    organizeDataSerie () {
      let dataBarRaw  = JSON.parse(JSON.stringify(this.dataBar))
      const dataBar   = dataBarRaw.list

      console.log('dataBar', dataBar)

      for (let i: any = 1; i < (this.months.length + 1); i++) {
        let item = dataBar[i] === undefined ? 0 : dataBar[i]
        let data = []
        let name = null

        for (let j: any = 1; j < (this.months.length + 1); j++) {
          let keyJ = (j - 1)

          if (item === 0) {
            data.push(item)
          } else {
            let keyData =  0

            if (item[keyJ]) {
              name = item[keyJ].fullname
              keyData = Number(item[keyJ].net_income.toFixed(2))
            }

            data.push(keyData)
          }
        }

        console.log(data)

        let dataSerie = {
          name,
          data
        }

        this.dataSeries.push(dataSerie)
      }
    }
  }
})
</script>
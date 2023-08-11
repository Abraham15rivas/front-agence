<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue'
import DataSerieBar from '../interfaces/DataSerieBar'
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
      dataSeries: [] as DataSerieBar[],
      subtitle: '',
      averageFixedSalary: 0,
      yAxis: {
        min: 0,
        max: 0
      },
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
          text: this.subtitle
        },
        xAxis: {
          categories: this.months,
          crosshair: true,
          accessibility: {
            description: 'Meses'
          }
        },
        yAxis: {
          min: this.yAxis.min,
          max: this.yAxis.max,
          crosshair: true,
          title: {
            text: 'Montante'
          },
          labels: {
            formatter: function({ value }: { value: number}): string {
              let valueFormatted = currencyFormatter({ currency: 'BRL', value })
              return valueFormatted
            }
          }
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        tooltip: {
          backgroundColor: {
            linearGradient: [0, 0, 0, 60],
            stops: [
              [0, '#FFFFFF'],
              [1, '#E0E0E0']
            ]
          },
          borderWidth: 1,
          borderColor: '#AAA'
        },
        series: this.dataSeries
      }
    }
  },
  methods: {
    organizeDataSerie () {
      const dataBarRaw        = JSON.parse(JSON.stringify(this.dataBar))

      this.yAxis.max          = Number(dataBarRaw.max_income.toFixed(2))
      this.averageFixedSalary = Number(dataBarRaw.average_fixed_salary.toFixed(2))
      this.subtitle           = dataBarRaw.from_to_date

      const dataBar     = dataBarRaw.list
      const consultants = dataBarRaw.consultants

      let dataSerieAverageFixedSalary: DataSerieBar = {
        type: 'line',
        name: 'Custo Fixo Médio',
        data: []
      }

      for (let i = 0; i < consultants.length; i++) {
        let userName = consultants[i].username
        let fullName = consultants[i].fullname

        let dataSerie: DataSerieBar = {
          type: 'column',
          name: fullName,
          data: []
        }

        for (let j: any = 0; j < this.months.length ; j++) {
          let keyMonth    = (j + 1)
          let consultant  = dataBar[userName]

          let consultantNetIncome = consultant ? consultant.find((item: any) => item.date === keyMonth) : false

          if (i === 0) {
            dataSerieAverageFixedSalary.data.push(this.averageFixedSalary)
          }

          if (consultantNetIncome) {
            let netIncomeFormatted = consultantNetIncome.net_income
            dataSerie.data.push(Number(netIncomeFormatted))
          }
        }

        this.dataSeries.push(dataSerie)
      }

      this.dataSeries.push(dataSerieAverageFixedSalary)
    }
  }
})
</script>
<template>
  <v-card
    class="mx-auto my-5"
    max-width="140vh"
    variant="outlined"
    elevation="10"
  >
    <v-card-item>
      <div>
        <div class="text-overline my-2">
          Por Consultor
        </div>

        <v-divider class="py-2"></v-divider>

        <DatePicker
          @filterDatePicker="filterDatePicker"
        />

        <div>
          <v-select
            v-model="values"
            :items="items"
            chips
            label="Consultor"
            multiple
          ></v-select>
        </div>

        <div class="my-5">
          <v-sheet
            max-width="130vh"
            rounded="lg"
            width="100%"
            class="pa-4 text-center mx-auto overflow-auto scroll"
            max-height="350"
          >
            <div v-if="listReport.length === undefined && tag === 'relatorio'">
              <div
                v-for="(report, index) in listReport"
                :key="index"
              >
                <TableReport
                  class="my-5"
                  :datareport="report"
                  :fullname="getFullName(index)"
                />
              </div>
            </div>
            <div v-else-if="dataBar.length === undefined && tag === 'bar'">
              <h1>bar test</h1>
            </div>
            <div v-else-if="dataPie.length === undefined && tag === 'pie'">
              <h1>pie test</h1>
            </div>
            <div v-else>
              <v-alert
                type="info"
                title="Nothing to show"
                text="You must select a date and at least one consultant, then press one of the buttons shown below"
                variant="tonal"
              ></v-alert>
            </div>
          </v-sheet>

        </div>
      </div>
    </v-card-item>

    <v-divider class="py-1 mx-4"></v-divider>

    <v-card-actions>
      <div class="px-3 py-3">
        <v-btn @click="getReport" variant="outlined" elevation="5">
          Relatório
        </v-btn>
        <v-btn @click="getGraph('bar')" variant="outlined" elevation="5">
          Gráfico
        </v-btn>
        <v-btn @click="getGraph('pie')" variant="outlined" elevation="5">
          Pizza
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, isProxy, toRaw } from 'vue'
import moment from 'moment'
import DatePicker from '../components/DatePicker.vue'
import TableReport from '../components/TableReport.vue'
import Consultant from '../services/Consultant'
import ConsultantUser from '../interfaces/ConsultantUser'

export default defineComponent({
  name: 'CommercialView',
  components: {
    DatePicker,
    TableReport
  },
  mounted () {
    this.getListConsultants()
  },
  data() {
    return {
      listUser: [] as ConsultantUser[],
      listReport: [] as string[],
      items: [] as string[],
      values: [] as string[],
      filters: {
        from: moment().startOf('month').format('YYYY-MM-DD'),
        to: moment().endOf('month').format('YYYY-MM-DD'),
        consultants: [] as string[]
      },
      tag: 'relatorio',
      dataBar: [] as string[],
      dataPie: [] as string[]
    }
  },
  methods: {
    getFullName (username: string) {
      let filtered = this.listUser.filter((user: any) => user.userName === username)

      if (filtered[0]) {
        if (isProxy(filtered[0])) {
          let filteredRaw = toRaw(filtered[0])
          return filteredRaw.fullName
        }
      }

      return null
    },
    filterDatePicker (filter: any) {
      if (isProxy(filter)) {
       let filterRaw = toRaw(filter)
       this.filters.from = filterRaw.dateFrom
       this.filters.to = filterRaw.dateTo
      }
    },
    async getListConsultants() {
      const { data } = await Consultant.getListConsultants()

      if (data.success) {
        this.listUser = data.data

        if (this.listUser.length) {
          for (let i: any = 0; i < this.listUser.length; i++) {
            let user = this.listUser[i]
            if (isProxy(user)){
              let userRaw = toRaw(user)
              this.items.push(userRaw.fullName)
            }
          }
        }
      } else {
        console.log('algo salio mal')
      }
    },
    getConsultants () {
      this.filters.consultants = []

      for (let i: any = 0; i < this.values.length; i++) {
        let filtered = this.listUser.filter((user: any) => user.fullName === this.values[i])

        if (filtered[0]) {
          if (isProxy(filtered[0])) {
            let filteredRaw = toRaw(filtered[0])
            this.filters.consultants.push(filteredRaw.userName)
          }
        }
      }
    },
    async getReport () {
      this.getConsultants()
      this.tag = 'relatorio'

      if (this.filters.consultants.length > 0) {
        const { data } = await Consultant.getReport(this.filters)

        if (data.success) {
          this.listReport = data.data
        } else {
          console.log('algo salio mal')
        }
      } else {
        console.log('debe seleccionar al menos un consultor')
      }
    },
    async getGraph (type: string) {
      this.getConsultants()
      this.tag = type

      if (this.filters.consultants.length > 0) {
        const { data } = await Consultant.getGraph(this.filters, type)

        if (data.success) {
          const result = data.data

          if (type === 'pie') {
            this.dataPie = result
          } else if (type === 'bar') {
            this.dataBar = result
          }
          console.log(result)
        } else {
          console.log('algo salio mal')
        }
      } else {
        console.log('debe seleccionar al menos un consultor')
      }
    }
  }
})
</script>

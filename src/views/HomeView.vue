<template>
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto px-5 py-5 my-5"
    elevation="10"
    rounded
    max-width="800"
    width="100%"
  >
    <div>
      <h2 class="text-h4 font-weight-black text-orange">Protótipo para Avaliação de Candidato.</h2>

      <div class="text-h5 font-weight-medium mb-2">
        A Avaliação consiste no desenvolvimento da funcionalidade "Performance Comercial"
      </div>

      <p class="text-body-2 mb-4">
       (Comercial -> Performance Comercial)
      </p>

      <v-btn variant="text" color="orange" @click="setCommercial">Performance Comercial</v-btn>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  methods: {
    setCommercial () {
      this.$router.replace({ path: '/commercial' })
    }
  }
})
</script>

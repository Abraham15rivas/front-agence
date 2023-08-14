<template>
  <v-card class="overflow-auto">
    <v-layout>
      <NavBar />
      <v-main style="height: 100vh;" v-if="!loading">
        <router-view/>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/NavBar.vue'; // @ is an alias to /src

export default defineComponent({
  components: {
    NavBar
  },
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    this.loading = false
  }
})
</script>

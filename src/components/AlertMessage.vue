<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar.active"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      rounded="pill"
    >
      <p class="text-center">
        {{ snackbar.message }}
      </p>
    </v-snackbar>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AlertMessage',
  props: {
    alert: {
      type: Object
    }
  },
  watch: {
    'alert.active': function() {
      this.setAlert(this.alert)
    }
  },
  data: () => ({
    snackbar: {
      active: false,
      message: null,
      color: 'success',
      timeout: 2000
    }
  }),
  mounted () {
    this.setAlert(this.alert)
  },
  methods: {
    setAlert(alert) {
      this.snackbar.active  = alert.active
      this.snackbar.message = alert.message
      this.snackbar.color   = alert.color
    }
  }
})
</script>
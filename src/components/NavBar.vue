<template>
  <div>
    <v-app-bar
      color="primary"
      prominent
    >
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Agence</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :active="$route.name === 'home'" variant="text" icon="mdi-domain"  @click="setHome"></v-btn>
      <v-btn variant="text" icon="mdi-clipboard-check-multiple-outline"></v-btn>
      <v-btn variant="text" icon="mdi-file-document-edit-outline"></v-btn>
      <v-btn :active="$route.name === 'commercial'" variant="text" icon="mdi-account-group" @click="setCommercial"></v-btn>
      <v-btn variant="text" icon="mdi-microsoft-excel"></v-btn>
      <v-btn variant="text" icon="mdi-card-account-details-outline"></v-btn>
      <v-btn variant="text" icon="mdi-logout"></v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      location="bottom"
      temporary
    >
      <v-list
        :items="items"
      ></v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: 'Agence',
        value: 'agence',
      },
      {
        title: 'Projectos',
        value: 'projectos',
      },
      {
        title: 'Administrativo',
        value: 'administrativo',
      },
      {
        title: 'Comercial',
        value: 'comercial',
      },
      {
        title: 'Financeiro',
        value: 'financeiro',
      },
      {
        title: 'Usuário',
        value: 'usuário',
      },
      {
        title: 'Salir',
        value: 'salir',
      }
    ],
  }),
  watch: {
    group () {
      this.drawer = false
    }
  },
  methods: {
    setCommercial () {
      this.$router.replace({ path: '/commercial' })
    },
    setHome () {
      this.$router.replace({ path: '/' })
    }
  }
}
</script>
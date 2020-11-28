<template>
  <v-app>
    <container :is="layout">
      <router-view />
    </container>
  </v-app>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
  name: 'App',
  computed: {
    layout() {
      return this.$route.meta.layout + '-layout'
    }
  },
  components: {
    MainLayout,
    EmptyLayout
  }
}
</script>

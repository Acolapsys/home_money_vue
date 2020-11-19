<template>
  <v-app>
 <container :is="layout">
   <v-content class="ma-4"><router-view /></v-content>
   
    
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
      console.log(this.$route)
      return this.$route.meta.layout + "-layout"
    }
  },
  components: {
    EmptyLayout, MainLayout
  }




}
</script>

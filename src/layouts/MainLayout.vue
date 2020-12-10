<template>
<div>
  <Loader v-if="loading"/>


  
    <div v-else>
    <Navbar />

    <v-main class="ma-8"><router-view /> </v-main>
    <v-fab-transition>
      <v-btn
        color="blue"
        dark
        absolute
        style="bottom: 50px"
        right
        fab
        large
        router
        to="/record"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>

    <Footer />
  </div>
</div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Footer from '@/components/app/Footer'
export default {
  name: 'main-layout',
  data: () => ({
    hidden: false,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.getInfo).length) {
      await this.$store.dispatch('fetchInfo')
      
    }
    this.loading = false
  },

  components: {
    Navbar,
    Footer
  }
}
</script>

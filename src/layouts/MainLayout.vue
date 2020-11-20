<template>
  <div>
    <Navbar />
    

       <v-main class="ma-8"><router-view />
        
            </v-main>
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
             

    <!-- <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div> -->
    <Footer />
   
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Footer from '@/components/app/Footer'
// import Sidebar from '@/components/app/Sidebar'
export default {
  name: 'main-layout',
  data: () => ({ 
   
    hidden: false,
   }),
  components: {
    Navbar, Footer
    // Sidebar
  }
}
</script>

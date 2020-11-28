<template>
<v-col sm="12" md="6" lg="4">
          <v-card color="light-blue" height="310px" class="white--text pa-4">
            <v-card-title class="font-weight-light ">
              <span>Счет в валюте</span>
            </v-card-title>
            <v-card-text 
            v-for="cur of currencies"
            :key="cur"
            style="border-bottom: 2px solid white">
              <span class="headline white--text"> 
                {{ getCurrency(cur) | currency(cur)}}
                </span></v-card-text
            >
          </v-card>
          
        </v-col>

</template>

<script>
export default {
  props: ['rates'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  }),
  computed: {
    base() {
      return this.$store.getters.getInfo.bill / this.rates['RUB']
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>

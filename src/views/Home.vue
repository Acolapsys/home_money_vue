<template>
  <v-card flat>
    <v-card-title>
      <h2 class="display-1">{{ 'Menu_Bill' | localize }}</h2>
      <v-spacer></v-spacer>
      <v-btn color="light-blue" dark @click="refresh">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid>
      <Loader v-if="loading" />
      <v-row v-else>
        <HomeBill :rates="currency.rates" />
        <HomeCurrency :rates="currency.rates" :date="currency.date" />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Bill')
    }
  },
  name: 'home',
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    HomeBill,
    HomeCurrency
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.currency.rates['EUR'] = 1
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.currency.rates['EUR'] = 1
      this.loading = false
    }
  }
}
</script>

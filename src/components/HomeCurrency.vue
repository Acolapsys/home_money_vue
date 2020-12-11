<template>
  <v-col sm="12" md="6" lg="8">
    <v-card height="310px" class="orange darken-3 white--text pa-4">
      <v-card-title class="font-weight-light ">
        <span>{{ 'ExchangeRate' | localize }}</span>
      </v-card-title>
      <v-simple-table class="orange darken-3 white--text" dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="white--text">{{ 'Currency' | localize }}</th>
              <th class="white--text">{{ 'Rate' | localize }}</th>
              <th class="white--text">{{ 'Date' | localize }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur of currencies" :key="cur">
              <td>{{ cur }}</td>
              <td>{{ (rates['RUB'] / rates[cur]).toFixed(2) }} Руб</td>
              <td>{{ date | date('date') }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['USD', 'EUR']
  })
}
</script>
